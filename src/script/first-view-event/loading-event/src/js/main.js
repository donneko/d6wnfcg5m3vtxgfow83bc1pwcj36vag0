import {TextChanger} from "./load-text-change/loading-event-text-change.js";
import {LoadPercentManager} from "./load-percent-system/loading-event-percent-manager.js";



export class LoadingEventController{
    #ElementName = Object.freeze({
        PERCENT_TEXT:"js-loading-percent-text",
        PERCENT_LINE:"js-loading-percent-line",
        LOADING_TITLE:"js-loading-title-text",
        LOADING_AREA:"js-loading-event",
    })
    #Elements = {
        EL_PERCENT_TEXT:null,
        EL_PERCENT_LINE:null,
        EL_LOADING_TITLE:null,
        EL_LOADING_AREA:null,
    }
    #SettingLoadPercentManager = Object.freeze({
        element:document,
        target:["img","video"],
    })
    #InternalData = {
        LoadPercentManager:null,
        TextChanger:null,
    }
    /**
     * ロードパーセントからテキストアニメーションを制御する
     */
    constructor(){
        this.FN_LIST = [];
        
        this.#initAll();
        this.Start();
        this.percentChanger(0);
    }
    onEnd(fn){
        if(!fn) return ;
        this.FN_LIST.push(fn);
    }
    #emitEnd(){
        this.FN_LIST.forEach((fn)=>fn());
    }
    #initAll(){
        this.#initGetElement();
        this.#initTextChanger();
        this.#initLoadPercentManager();
    }
    #initGetElement(){
        const LINE = document.querySelector(`.${this.#ElementName.PERCENT_LINE}`);
        const TEXT = document.querySelector(`.${this.#ElementName.PERCENT_TEXT}`);
        const TITLE = document.querySelector(`.${this.#ElementName.LOADING_TITLE}`);
        const AREA = document.querySelector(`.${this.#ElementName.LOADING_AREA}`);

        this.#Elements.EL_PERCENT_LINE = LINE;
        this.#Elements.EL_PERCENT_TEXT = TEXT;
        this.#Elements.EL_LOADING_TITLE = TITLE;
        this.#Elements.EL_LOADING_AREA = AREA;

    }
    #initTextChanger(){
        const CHANGER = new TextChanger(this.EL_LOADING_TITLE);
        this.#InternalData.TextChanger = CHANGER
    }
    #initLoadPercentManager(){
        const PERECENT = new LoadPercentManager(this.#SettingLoadPercentManager);
        this.#InternalData.LoadPercentManager = PERECENT;
    }
    Start(){
        /** 最初から文字化けアニメーションを入れる {@link ./load-text-change/loading-event-text-change.js|(テキストアニメーション用スクリプト)} */
        // this.TextChanger.startAnimation("LOADING",90,10);

        this.LoadPercentManager.on("change",(e)=>this.loadChange(e));
        this.LoadPercentManager.on("complete",(e)=>this.loadComplete(e));

        this.LoadPercentManager.updatePercent();
    }
    loadChange(value){
        const percent = value.data.percent;
        this.percentChanger(percent);
    }
    percentChanger(percent){
        this.EL_PERCENT_LINE.style.width = `${percent}%`;
        this.EL_PERCENT_TEXT.innerText = `${percent}%`;

    }

    loadComplete(value){
        setTimeout(()=>{
            this.stopTextChanger();
        },0)
    };
    stopTextChanger(){

        const text = this.EL_LOADING_TITLE.innerText;
        this.TextChanger.stopAnimation({
            mode:"change",
            from:`${text}`,
            to:"CONPLETE",
            sec:20,
            pa:95,
        });
        this.TextChanger.onEnd((e)=>{
            this.percentChanger(100);
            this.MyRemove()
        });
    };
    MyRemove(){
            setTimeout(()=>{
                this.EL_LOADING_AREA.style.transition = "opacity 1s ease-out";
                this.EL_LOADING_AREA.style.opacity = "0";
                this.EL_LOADING_AREA.style.pointerEvents = "none";
                this.EL_LOADING_AREA.addEventListener("transitionend",()=>{
                    this.EL_LOADING_AREA.remove();
                    this.#emitEnd();
                })
            },500)
    }
    /** @type {HTMLElement} */
    get EL_PERCENT_LINE(){
        return this.#Elements.EL_PERCENT_LINE;
    }
    /** @type {HTMLElement} */
    get EL_PERCENT_TEXT(){
        return this.#Elements.EL_PERCENT_TEXT;
    }
    /** @type {HTMLElement} */
    get EL_LOADING_TITLE(){
        return this.#Elements.EL_LOADING_TITLE;
    }
    /** @type {HTMLElement} */
    get EL_LOADING_AREA(){
        return this.#Elements.EL_LOADING_AREA;
    }
    get TextChanger(){
        return this.#InternalData.TextChanger;
    }
    get LoadPercentManager(){
        return this.#InternalData.LoadPercentManager;
    }
}
