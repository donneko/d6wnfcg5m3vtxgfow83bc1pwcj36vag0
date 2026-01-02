import {LoadPercent} from "./loading-event-percent.js";


export class LoadPercentManager{
    #EVENT = Object.freeze([
        "complete",
        "change"
    ])
    constructor(setting = {}){
        this.loadPercentMax = 0;
        this.loadPercentNaw = 0;
        /** ロードパーセントが配列で入る */
        this.loadPercents = [];
        this.events = [];

        const TARGET_TAGS = this.#tagCheck(setting?.target,setting?.element);
        const PERCENT_MAX = this.setLoadPercentMax(TARGET_TAGS);
        if(PERCENT_MAX !== 0){
            this.loadPercentMax = PERCENT_MAX;
            this.setLoadPercent(TARGET_TAGS,setting?.element);
        }else{
            //監視対象(tag)が存在しないとき
            this.emit("complete",{percent:this.loadPercentNaw,data:this.loadPercents,});
        }

    }
    /**
     * 監視範囲に、そのタグが存在しているのかをチェックする。
     * @param {Array<String>} list HtmlTagが入る 
     * @param element -監視範囲のElement
     */
    #tagCheck(list,element = document){
        const NEW_LIST = list.filter((el)=>{
            try {
                const EL_DATA = element.querySelectorAll(`${el}`);
                if(EL_DATA.length === 0){
                    throw Error(`【 ${el} 】は存在しないタグです`)
                }
                return true;
            } catch (error) {
                console.warn(error);
                return false
            }
        });
        return NEW_LIST;
    }
    /**
     * 監視対象のHtmlTagの1種類を100として、それをHtmlTagの数分掛け算する
     * @param {Array} list 
     */
    setLoadPercentMax(list){
        const max = 100 * list.length;
        return max;
    }
    /**
     * 監視クラスを呼び出す
     * @param {Array<string>} target -HtmlTagのリスト
     * @param element -監視範囲のElement
     */
    setLoadPercent(target = ["div"],element = document){

        target.forEach((targetTag)=>{
            const el = element.querySelectorAll(`${targetTag}`);
            this.loadPercents[targetTag] = [];
            const loader = new LoadPercent(el,targetTag);

            loader.on("percent",(e)=>this.loadComplete(e));
            loader.confirmation();
        })
    };
    loadComplete(obj = {}){
        const id = obj?.id;
        const percent = obj?.data.percent;
        this.loadPercents[id] = percent;

        this.updatePercent();
    }
    updatePercent(){
        let percent = 0;

        for( const key in this.loadPercents){
            const value = this.loadPercents[key];
            percent += value;
        }

        this.loadPercentNaw = percent;
        this.emit("change",{percent:this.loadPercentNaw,data:this.loadPercents,});

        if(this.isComplete()){
            this.emit("complete",{percent:this.loadPercentNaw,data:this.loadPercents,});
            this.count++
        }
    }
    isComplete(){
        const is = (this.loadPercentMax === this.loadPercentNaw);
        return is;
    }

    on(type,callback){

        if(!this.#EVENT.includes(type))return;
        if(!this.events[type]){
            
            this.events[type] = [];
        };
        this.events[type].push(callback);
    }
    emit(type,data){
        const event = this.events[type];

        if(!event)return;
        event.forEach((fn)=>fn({data:data,id:this.id}))
    }
}
