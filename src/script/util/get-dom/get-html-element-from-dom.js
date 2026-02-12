import{isValidationOfStringAndNotNull}from"./is-validation-of-string-and-not-null.js";
    /**
     * HtmlElementを取得するメソット
     * @param {String} cssSelector - 取得するHtmlElementのCSSの名前
     * @typedef {Object} option - 取得方法などのオプション
     * @property {HTMLElement} targetObject - 取得するターゲットエレメント
     * @returns {(HTMLElement|null)} - 取得した結果
     */
    export function getHtmlElementFromDom(cssSelector = null,option = {targetObject:document}){
        if(!isValidationOfStringAndNotNull(cssSelector)) return null;
        return option?.targetObject?.querySelector(cssSelector);
    }