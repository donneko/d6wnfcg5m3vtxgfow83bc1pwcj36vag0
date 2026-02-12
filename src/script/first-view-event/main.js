import {LoadingEventController} from "./loading-event/src/js/main.js";
import {PpeningStart} from "./opening-event/src/js/opening-event.js";

class FirstEventController{
    constructor(){
        this.startLoading();
        this.#bodyOverflowHidden(true);
    }
    startLoading(){
        const loading = new LoadingEventController();
        loading.onEnd(()=>{
                this.startOpening()
            });
    }

    startOpening(){
        const opening = new PpeningStart();
        opening.onEnd(()=>this.#bodyOverflowHidden(false));

        if(this.#isOpeningFlag()){
            opening.EndRemoveDisplay()
            this.#bodyOverflowHidden(false)
            return;
        }

        setTimeout((()=>{
            opening.init()
            this.#setOpeningFlag()
        }),500)
    }

    #bodyOverflowHidden(bool){
        if(bool){
            document.body.classList.add("scroll-lock")
        }else{
            document.body.classList.remove("scroll-lock")
        }
    }
    #isOpeningFlag(){
        const tmp = localStorage.getItem("isOpening");

        if(tmp == null) return false; //errorならとりあえず見せる!!

        if(tmp === "true"){
            return true
        }else{
            return false
        };
    }
    #setOpeningFlag(){
        localStorage.setItem("isOpening","true");
    }

}

new FirstEventController()