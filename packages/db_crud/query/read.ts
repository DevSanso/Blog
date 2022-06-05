import {Ops} from './utils/op';

const splitRest = (arr : Array<any>) : string => arr.reduce((pre,current,index,arr)=> `${pre},${current}`);

const makeCond = <T>(o: Ops<T>) : string => {
    const ks = Object.keys(o);
    return ks.reduce((pre,current,index,arr)=> {
        const ele = o[current] as { value: any; op: "=" | "<" | ">" | "<=" | ">="; };
        return `${pre}` + ` ${current} ${ele.op} ${ele.value} `
    },"");
}




const makeReadQuery = <T>(table : string,selectFields : Array<keyof T>,op : Ops<T> | null) => {
    if(op != null) {
        return `SELECT ${splitRest(selectFields)} FROM ${table} WHERE ${makeCond(op)};`;
    }else {
        return `SELECT ${splitRest(selectFields)} FROM ${table}`;
    }
}

export default makeReadQuery;