export class DataStoreController{
    /**
     * 
     * @param {Array<object>} dataTable
     */
    constructor(dataTable){
        this.DATA_TABLE = dataTable;
        this.listNowNumber = 0;
    }
    next(){
        // リストの上限処理
        if( this.listNowNumber >= this.DATA_TABLE.length ) return ;

        this.listNowNumber++
        return this.DATA_TABLE[this.listNowNumber]
    }
    back(){
        // リストの最小処理
        if( this.listNowNumber <= 0 ) return ;

        this.listNowNumber--
        return this.DATA_TABLE[this.listNowNumber]
    }

    selectNumber(number){
        return this.DATA_TABLE[number];
    }

    allList(key){
        if(key == null){
            return this.DATA_TABLE;
        }else{
            return this.DATA_TABLE.map(table => table[key]);
        }
    }

    // TODO:あとでJSdoc追加
    searchDataTable(key,value){
        return this.DATA_TABLE.fill(table => table[key] === value)
    }
}