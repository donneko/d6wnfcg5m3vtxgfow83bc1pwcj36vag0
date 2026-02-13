import { xssMeasures } from "./xss-measures.js";
/**
 * HTMLElementを生成します。
 * 警告:この関数には"XSS"の脆弱性があります!!
 * 警告:この関数は必ず、安全が確認された内部のみで使用してください。
 * 警告:この関数はユーザーの直接入力はしないでください。
 * @param {string} tagName - HTMLElementのタグの名前
 * @param {string} inputInnerText - タグの中に入れるテキスト (innerTextで挿入)
 * @returns - HtmlElementを返します
 */
export function createElement(tagName,inputInnerText){
    /** @type {HTMLElement} */
    const newElement = document.createElement(tagName);
    newElement.innerText = xssMeasures(inputInnerText)
    return newElement;
}