export class LoadPercent{

    #EVENT = Object.freeze([
        "percent",
        "complete"
    ])
    /**
     *  以下のような設定でロードされたパーセントを出力する
     * 
     * @param {NodeListOf<HTMLElement>} Element 
     * @param {string | number} id - コールバック時に認識する用 
     */
    constructor(Element,id){
        this.id = id;
        this.element = Element;
        this.loadStatus = [];
        this.loadCount = 0;
        this.loadMaxCount = 0;

        this.events = []

        this.setInitEventCount(this.element);
        this.setInitEvent(this.element);
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

    /**
     * ロードを監視する対象の最大数を取得
     * @param {NodeListOf<HTMLElement>} Element 
     */
    setInitEventCount(Element){
        if( !Element || Element.length === 0)this.allLoadComplete("none");

        Element.forEach(() => {
            this.loadMaxCount++
        });
    }
    /**
     * ロードを監視する対象にイベントリスナーを追加
     * @param {NodeListOf<HTMLElement>} Element 
     */
    setInitEvent(Element){
        
        if( !Element || Element.length === 0)this.allLoadComplete("none");
        Element.forEach(element => {
            /** @type {HTMLElement} */
            const e = element;
            if(e instanceof HTMLMediaElement ){
                this.#setInitMediaEvent(e);
            }else{
                this.#setInitUsuallyEvent(e);
            }
        });
        
    }
    #setInitMediaEvent(Element){
            /** @type {HTMLMediaElement} */
            const e = Element;
            if(e.readyState >= e.HAVE_FUTURE_DATA){
                this.loadComplete("Loaded")
            };

            e.addEventListener("canplay",()=> this.loadComplete("normal"))
            e.addEventListener("error",()=> this.loadComplete("error"))
    }
    #setInitUsuallyEvent(Element){
            /** @type {HTMLElement} */
            const e = Element;
            if(e.complete){
                this.loadComplete("Loaded")
            };

            e.addEventListener("load",()=> this.loadComplete("normal"))
            e.addEventListener("error",()=> this.loadComplete("error"))
    }
    /**
     * ロードされた時
     * @param {string} status ステータス
     */
    loadComplete(status){
        this.loadCount++;
        this.loadStatus.push(status);
        this.emit("percent",{
            percent: this.loadCompletePercent() ,
            status: status ,
        });

        if(this.loadCount === this.loadMaxCount){
            this.allLoadComplete(this.loadStatus);
        }
    }
    loadCompletePercent(naw = this.loadCount,max = this.loadMaxCount){

        const percent = Math.floor((naw / max) * 100);
        return percent;
    }
    allLoadComplete(status){
        this.emit("complete",{
            percent:this.loadCompletePercent(),
            status:status,
            number:this.loadMaxCount,
        });
    }
    confirmation(){
        this.emit("percent",{
            percent: this.loadCompletePercent() ,
            status: "confirmation" ,
        });
    }
}