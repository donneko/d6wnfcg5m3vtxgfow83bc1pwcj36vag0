import {LoadingEventController} from "./loading-event/src/js/main.js";
import {PpeningStart} from "./opening-event/src/js/opening-event.js";

class FirstEventController{
    constructor(){
        this.startLoading();
    }
    startLoading(){
        const loading = new LoadingEventController();
        loading.onEnd(()=>this.startOpening());
    }
    startOpening(){
        new PpeningStart();
    }
}

new FirstEventController();