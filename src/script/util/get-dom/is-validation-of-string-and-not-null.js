    /**
     * nullではない文字列を判別
     * @param {string} InputValueToCheck - チェックする値
     * @returns {boolean} - true : 正常値 | false : 異常値
     * @private
     */
    export function isValidationOfStringAndNotNull(InputValueToCheck){
        if(InputValueToCheck === null) return false;
        if(typeof InputValueToCheck  !== "string") return false;
        return true;
    }