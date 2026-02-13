import {getHtmlElementFromDom} from"../../util/get-dom/get-html-element-from-dom.js";
class HtmlElementChanger{
    constructor(cssSelector){
        this.#initElement(cssSelector);
    }
    #initElement(cssSelector){
        this.HTML_ELEMENT = getHtmlElementFromDom(cssSelector)
    }
    /**
     * innerHTMLを使用しています。XSSに注意してください!!
     */
    changeDom(dom){
        this.HTML_ELEMENT.innerHTML = `${dom}`
    }
}


function Test_changeDom_TimeChange(list = ["<p>example</p>"],time = 500){

    const CHANGER = new HtmlElementChanger(".example")

    list.forEach((request, index) => {
        setTimeout(()=>{
            CHANGER.changeDom(request)
        },(index * time))
    });
}

const list = [
    "<h1>example</h1>",
    "<h5>埼玉</h5>",
    "<map>開放</map>",
    "<p>群</p>",
    "<button>最高</button>",
];
Test_changeDom_TimeChange(list)