import {ARTICLE_DATA} from"./data/index.js";
import {commandConverter} from "./util/command-converter.js";
import {HtmlElementChanger} from "./util/html-element-changer.js";
import {DataStoreController} from "./util/data-store-controller.js";
import {addCssClass} from "./util/add-css-class.js";



class ProcessSectionController{
    constructor(){
        this.#init();
    }
    #init(){
        this.#initElement();
        this.#initDataSet();
        this.#initEvent();
    }
    #initElement(){
        this.EL_TAG_BOX_BUTTONS     = new HtmlElementChanger(".js-tag-box-buttons")
        this.EL_BACKGROUND_MEDIA    = new HtmlElementChanger(".js-background-media")
        this.EL_CONTENT_TITLE       = new HtmlElementChanger(".js-content-title")
        this.EL_CONTENT_TEXT        = new HtmlElementChanger(".js-content-text")
        this.EL_CONTENT_BACK_BUTTON = new HtmlElementChanger(".js-control-back-button")
        this.EL_CONTENT_EACH_BUTTON = new HtmlElementChanger(".js-control-each-button")
        this.EL_CONTENT_NEXT_BUTTON = new HtmlElementChanger(".js-control-next-button")
    }
    #initDataSet(){
        this.DATA_STORE = new DataStoreController(ARTICLE_DATA);
    }
    #initEvent(){
        this.EL_TAG_BOX_BUTTONS
        this.EL_CONTENT_BACK_BUTTON
        this.EL_CONTENT_EACH_BUTTON
        this.EL_CONTENT_NEXT_BUTTON
    }
    #uiChangeTitle(title){
        this.EL_CONTENT_TITLE.changeNewDomElement("p",title)
    }
    #uiChangeText(text){
        this.EL_CONTENT_TEXT.changeNewDomElement("p",text)
    }
    #uiChangeMedia(){
        const CMD_OBJ = commandConverter(cmd)

        this.EL_BACKGROUND_MEDIA.changeNewDomElement(CMD_OBJ.cmd,"",{src:CMD_OBJ.arg})
    }
    #tagSet(){
        const TAG_NAME = this.DATA_STORE.allList("tagName");

        // HtmlElementの作成とクラス名の追加
        const newElement = TAG_NAME.map((tagName)=>{
            const element = document.createElement("button").innerText = tagName;
            const newElement = addCssClass(element,["process-filter-button"])
            return newElement;
        });

        this.EL_TAG_BOX_BUTTONS.getElement().innerHTML = newElement;
    }
}

new ProcessSectionController();