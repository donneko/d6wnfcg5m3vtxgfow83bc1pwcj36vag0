export class TextChanger{
    underscore(number = 1,text = "_"){
        let list = [];
        for(let i = 0;i < number;i++){
            list.push(text);
        }
        return list.join("");
    }
    #TEXT_LIST = Object.freeze(`qwertyuiopasdfghjklZxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM${this.underscore(10,"_")}`)

    /**
     * 
     * @param {HTMLElement} Element
     */
    constructor(Element){

        /** @type {string} */
        this.text = "";
        /** @type {HTMLElement} */
        this.element = null;
        /** @type {string} */
        this.textContents = "";
        /** @type {number} */
        this.pasent = 10;
        this.ID;
        this.consp = [];
        this.endEvent = [];
        try {
            this.element = Element;

        } catch (error) {
            console.warn(error);
        }
    }
    onEnd(fn){
        this.endEvent.push(fn);
    }
    emitEnd(data){
        this.endEvent.forEach((fn)=>{
            fn(data);
        })
    }
    startAnimation(text,pa = 10,second = 100){
        this.pasent = pa;
        
        let Next_text = text;
        this.ID = setInterval(()=>{
            
            const nexttext = this.changeTexts(Next_text);

            Next_text = nexttext;
            this.textContent = nexttext;

        },second);
    }
    /**
     * 
     * @param {string} text 
     */
    changeTexts(text,totext = ""){
        const textList = text.split("") //リスト
        const changeNumber = this.ChangeNumber(textList.length,totext.length);

        const texts = this.#changeText(textList,changeNumber,totext);
        return texts;
    }
    ChangeNumber(length,totext){
        const list = [];
        if(totext){
            for(let i = 0;totext > i;i++){
                if(Math.floor(Math.random() * 100) <= this.pasent){
                    list.push(true);
                }else{
                    list.push(false);
                }
            }
            return list;
        }
        for(let i = 0;length > i;i++){
            if(Math.floor(Math.random() * 100) <= this.pasent){
                list.push(true);
            }else{
                list.push(false);
            }
        }
        return list;
    }
    /**
     * 
     * @param {string[]} textList 
     * @param {boolean[]} changeNumber 
     * @private
     */
    #changeText(textList,changeNumber,totext){
        const consp = this.consp;
        const TEXT = changeNumber.map((text,index)=>{
            if(text && !consp.includes(index)){
                const list = this.#getRandomText();
                const text = list.join("");
                return text;
            }else{
                if(totext){
                    consp.push(index)
                    return totext[index]
                }else{
                    return textList[index];
                }
            }
        });
        this.consp = consp;
        return TEXT.join("");
    }



    /**
     * 
     * @param {number} length 
     */
    #getRandomText(length = 1){
        const TEXT = this.#TEXT_LIST.split("");
        const LIST = [];
        for(let i = 0; i < length; i++){
            const TEXT_NUMBER = Math.floor(Math.random() * TEXT.length);
            const text = TEXT[TEXT_NUMBER];
            LIST.push(text);
        }
        return LIST;
    }


    stopAnimation(query = {}){
        const mode = query?.mode ?? "stop";
        const from = query?.from ?? this.textContent;
        const to = query?.to ?? "ERROR";
        const second = query?.sec ?? 1000;
        this.pasent = query?.pa ?? 90;

        clearInterval(this.ID);

        if(mode === "change"){

            let Next_text
            this.ID = setInterval(()=>{
                const nexttext = this.changeTexts(from,to);

                Next_text = nexttext;
                this.textContent = nexttext;


                if(this.textContent === to){
                    clearInterval(this.ID);
                    this.emitEnd();
                }
            },second);
        }
    }


    // テキストを変える

    #textChange(value){
        this.element.innerText = value;
    }

    set textContent(value){
        this.textContents = value;
        this.#textChange(value);
    }
    get textContent(){
        return this.textContents;
    }


}
