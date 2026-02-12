import {getHtmlElementFromDom} from"../util/get-dom/get-html-element-from-dom.js";

class VideoPlayController{
    constructor(){
        this.#init()
    }
    #init(){
        this.#initEl()
        this.#initEvent()
    }
    #initEl(){
        // サンプル動画
        this.PLAY_BUTTON_IMG   = getHtmlElementFromDom(".js-video-play-button-img");
        this.PLAY_BUTTON_TEXT  = getHtmlElementFromDom(".js-video-play-button-text");
        this.PLAY_BER          = getHtmlElementFromDom(".js-video-play-ber");
        this.PLAY_VIDEO_SAMPLE = getHtmlElementFromDom(".js-video-sample");

        // 本動画
        this.PLAY_VIDEO_BOX    = getHtmlElementFromDom(".js-video-play-video-box");
        this.PLAY_VIDEO        = getHtmlElementFromDom(".js-video-play-video");
        this.PLAY_VIDEO_BUTTON_BACK   = getHtmlElementFromDom(".js-video-button-back");
    }
    #initEvent(){
        // 再生/停止系
        this.PLAY_BUTTON_IMG.addEventListener("click",()=>this.#VideoPlay())
        this.PLAY_BUTTON_TEXT.addEventListener("click",()=>this.#VideoPlay())
        this.PLAY_VIDEO_BUTTON_BACK.addEventListener("click",()=>this.#VideoStop())

        // 再生バー
        this.PLAY_VIDEO_SAMPLE.addEventListener("timeupdate",()=>{
            this.#changePercent()
        })
    }
    #changePercent(){
        const percent = (this.PLAY_VIDEO_SAMPLE.currentTime / this.PLAY_VIDEO_SAMPLE.duration) * 100;
        this.PLAY_BER.style.width = `${percent}%`
    }
    #VideoPlay(){
        this.#isScrollLock(true);
        this.#isVideoActive(true);
        this.PLAY_VIDEO.load()
        this.PLAY_VIDEO.play()
        this.PLAY_VIDEO.muted = false;
        this.PLAY_VIDEO.volume = 1;
    }
    #VideoStop(){
        this.#isVideoActive(false);
        this.#isScrollLock(false);
        this.PLAY_VIDEO.pause()
        this.PLAY_VIDEO.muted = true;
    }
    #isScrollLock(bool){
        if(bool){
            document.body.classList.add("scroll-lock")
        }else{
            document.body.classList.remove("scroll-lock")
        }
    }
    #isVideoActive(bool){
        if(bool){
            this.PLAY_VIDEO_BOX.classList.add("is-active")
        }else{
            this.PLAY_VIDEO_BOX.classList.remove("is-active")
        }
    }
}

new VideoPlayController();