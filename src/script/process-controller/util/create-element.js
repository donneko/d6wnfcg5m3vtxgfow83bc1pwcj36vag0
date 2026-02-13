
function createElement(tagName,inputInnerText){
    /** @type {HTMLElement} */
    const NEW_ELEMENT = document.createElement(tagName);
    NEW_ELEMENT.innerText =inputInnerText;
    return NEW_ELEMENT;
}

console.log(createElement("p","hello"));
console.log(createElement("button","うん"));
console.log(createElement("h1","日本"));
