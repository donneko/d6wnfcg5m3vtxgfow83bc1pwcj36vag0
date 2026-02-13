
export function commandConverter(input){

    const META_TAG = Object.freeze({
        open: "(",
        close:")",
    })

    const cmd = [];
    const arg = [];
    let flag = false;
    for(const text of input){
        if(text === META_TAG.open ){
            flag = true;
            continue;
        }
        if(text === META_TAG.close){
            flag = false;
            continue;
        }
        if(flag){
            arg.push(text);
            continue;
        }

        cmd.push(text);
        continue
    }
    const CMD_TEXT = cmd.join("");
    const ARG_TEXT = arg.join("");

    return {cmd:CMD_TEXT,arg:ARG_TEXT,}
}
