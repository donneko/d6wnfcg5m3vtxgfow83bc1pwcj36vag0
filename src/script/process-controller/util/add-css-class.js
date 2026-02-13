/**
 * 
 * @param {HTMLElement} element 
 * @param {String} cssClassList 
 * @returns - 追加したelement
 */
export function addCssClass(element,cssClassList){
    cssClassList.forEach(cssClass => {
        element.classList.add(cssClass);
    });
    return element
}