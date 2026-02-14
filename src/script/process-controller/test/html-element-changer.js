import {getHtmlElementFromDom} from"../../util/get-dom/get-html-element-from-dom.js";
import {xssMeasures} from"./xss-measures.js";
import {createElement} from"./create-element.js";
class HtmlElementController{
    constructor(cssSelector){
        this.#initElement(cssSelector);
    }
    #initElement(cssSelector){
        this.HTML_ELEMENT = getHtmlElementFromDom(cssSelector)
    }
    changeNewDomElement(tagName,inputInnerText){
        const addressed = xssMeasures(inputInnerText)
        const request = createElement(tagName,addressed)
        this.#changeDom(request)
    }
    /**
     * innerHTMLを使用しています。XSSに注意してください!!
     */
    #changeDom(dom){
        this.HTML_ELEMENT.replaceChildren(dom)
    }
}


function Test_changeDom_TimeChange(list = [["p","hello"]],time = 500){

    const CHANGER = new HtmlElementChanger(".example")

    list.forEach((request, index) => {
        setTimeout(()=>{
            CHANGER.changeNewDomElement(...request)
        },(index * time))
    });
}
const list = [
    ["p","hello"],
    ["p","ju"],
    ["p","ffffff"],
    ["p","aaaa"],
    ["p","ggggg"],
];
Test_changeDom_TimeChange(list)