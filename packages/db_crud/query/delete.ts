import {Ops} from './utils/op';

const makeCond = <T>(o: Ops<T>) : string => {
    const ks = Object.keys(o);
    return ks.reduce((pre,current,index,arr)=> {
        const ele = o[current] as { value: any; op: "=" | "<" | ">" | "<=" | ">="; };
        return `${pre}` + ` ${current} ${ele.op} "${ele.value}" `
    },"");
}


const makeDeleteQuery = <T>(table : string,op : Ops<T>) => {
    return `Delete FROM ${table} WHERE ${makeCond(op)};`;
}

export default makeDeleteQuery;