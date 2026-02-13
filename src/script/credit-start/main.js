import {getHtmlElementFromDom} from"../util/get-dom/get-html-element-from-dom.js";

class CreditStart{
    constructor(){
        this.#init();
    }
    #init(){
        this.#initElement();
        this.#initObserver();
    }
    #initElement(){
        this.CREDIT_BOX = getHtmlElementFromDom(".js-credit-box");
    }
    #initObserver(){
        this.OBSERVER = new IntersectionObserver(enm =>{
            enm.forEach((e)=>{
                if(!e.isIntersecting)return;

                this.#creditsAnimationStart();
            })
        },{
            rootMargin:"-50px"
        });

        this.OBSERVER.observe(this.CREDIT_BOX);
    }
    #creditsAnimationStart(){
        this.#isActive(true)
        this.OBSERVER.unobserve(this.CREDIT_BOX);
    }
    #isActive(bool){
        if(bool){
            this.CREDIT_BOX.classList.add("is-active")
        }else{
            this.CREDIT_BOX.classList.remove("is-active")
        }
    }
}

new CreditStart();

