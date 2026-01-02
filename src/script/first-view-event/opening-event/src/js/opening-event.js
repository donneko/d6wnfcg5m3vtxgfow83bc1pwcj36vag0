export class PpeningStart{
    #el = {
        START_BUTTON:null,
        OPENING_BODY:null,
        START_BODY:null,
        VIDEO_BODY:null,
        OPENING_VIDEO:null,
        OPENING_VIDEO_BUTTON:null,
    }
    #elName = Object.freeze({
        START_BUTTON:"#js-opening-start-button",
        OPENING_BODY:".js-opening-body",
        START_BODY:".js-opening-start-body",
        VIDEO_BODY:".js-opening-video-body",
        OPENING_VIDEO:".js-opening-video",
        OPENING_VIDEO_BUTTON:"#js-opening-video-skip-button",
    })
    constructor(){
        this.isVideoPley= false;
        this.FN_LIST = [];

        this.#initGetElement();
        this.#initEvent();
        this.#initDisplay();
    }

    onEnd(fn){
        if(!fn) return ;
        this.FN_LIST.push(fn);
    }
    #emitEnd(){
        this.FN_LIST.forEach((fn)=>fn());
    }
    #initGetElement(){
        this.#el.START_BUTTON = document.querySelector(`${this.#elName.START_BUTTON}`);
        this.#el.OPENING_BODY = document.querySelector(`${this.#elName.OPENING_BODY}`);
        this.#el.START_BODY = document.querySelector(`${this.#elName.START_BODY}`);
        this.#el.VIDEO_BODY = document.querySelector(`${this.#elName.VIDEO_BODY}`);
        this.#el.OPENING_VIDEO = document.querySelector(`${this.#elName.OPENING_VIDEO}`);
        this.#el.OPENING_VIDEO_BUTTON = document.querySelector(`${this.#elName.OPENING_VIDEO_BUTTON}`);
    }
    #initEvent(){
        // スタートボタン系
        this.EL_START_BUTTON.addEventListener("click",(e)=>{this.#videoPley()});
        document.addEventListener("keydown",(e)=>{
            if(e.code === "Space" && !this.isVideoPley){
                e.preventDefault();
                this.#videoPley();
                this.isVideoPley = true;
            }
        })
        // 動画スタートボタン
        this.EL_OPENING_VIDEO_BUTTON.addEventListener("click",(e)=>{this.#videoSkip()});
        // 動画の終了検知
        this.EL_OPENING_VIDEO.addEventListener("ended",()=>{this.#videoEnd()})
        }

    #videoPley(){
        this.#videoPleyDispleyChange();
        setTimeout(()=>{
            this.EL_OPENING_VIDEO.play();
            this.EL_OPENING_VIDEO.muted = false;
            this.EL_OPENING_VIDEO.volume = 1.0;
        },500);
    }
    #videoPleyDispleyChange(){
        this.EL_START_BODY.style.transition = "opacity 0.5s ease";
        this.EL_START_BODY.style.opacity = "0";

        this.EL_START_BODY.addEventListener("transitionend",()=>{
            this.#IsActiveStart(false);
            this.#IsActiveVideo(true);
        }, { once: true })
    }
    #videoSkip(){
        this.#removeDisplay();
    }
    #videoEnd(){
        setTimeout(()=>{
            this.#removeDisplay();
        },500);
    }
    #removeDisplay(){
        this.EL_OPENING_BODY.style.transition = "transform 0.5s ease"
        this.EL_OPENING_BODY.style.transform = "translateY(-100%)"
        this.EL_OPENING_BODY.addEventListener("transitionend",()=>{
            this.EL_OPENING_BODY.remove();
            this.#emitEnd();
        }, { once: true })
    }

    /** 表示を初期状態にします */
    #initDisplay(){
        this.#IsActiveStart(true);
        this.#IsActiveVideo(false);
        this.#IsActiveStartTransition(true);
    }
    /** スタートセクションに is-active を追加または消去します。 @param {boolean} bool - is-active の追加、消去  */
    #IsActiveStart(bool){
        if(bool){
            this.EL_START_BODY.classList.add("is-active")
        }else{
            this.EL_START_BODY.classList.remove("is-active")
        }
    }
    /** ビデオセクションに is-active を追加または消去します。 @param {boolean} bool - is-active の追加、消去  */
    #IsActiveVideo(bool){
        if(bool){
            this.EL_VIDEO_BODY.classList.add("is-active")
        }else{
            this.EL_VIDEO_BODY.classList.remove("is-active")
        }
    }
    /** スタートセクションに is-transition を追加または消去します。 @param {boolean} bool - is-active の追加、消去  */
    #IsActiveStartTransition(bool){
        if(bool){
            this.EL_START_BODY.classList.add("is-transition")
        }else{
            this.EL_START_BODY.classList.remove("is-transition")
        }
    }
    /** スタートボタン @type {HTMLElement} */
    get EL_START_BUTTON(){ return this.#el.START_BUTTON; }
    /** オープニングセクション @type {HTMLElement} */
    get EL_OPENING_BODY(){ return this.#el.OPENING_BODY; }
    /** スタートボタンのセクション @type {HTMLElement} */
    get EL_START_BODY(){ return this.#el.START_BODY; }
    /** ビデオ再生のセクション @type {HTMLElement} */
    get EL_VIDEO_BODY(){ return this.#el.VIDEO_BODY; }
    /** ビデオ再生のビデオ @type {HTMLVideoElement} */
    get EL_OPENING_VIDEO(){ return this.#el.OPENING_VIDEO; }
    /** ビデオスキップボタン @type {HTMLElement} */
    get EL_OPENING_VIDEO_BUTTON(){ return this.#el.OPENING_VIDEO_BUTTON; }
}
