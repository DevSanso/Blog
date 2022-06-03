const splitRest = (arr : Array<any>) : string => {
    let s = arr.reduce((pre,current,index,arr)=> `${pre},${current}`,"") as string;
    return s.substring(1);
}
const makeCreateQuery = <T extends string | number>(
    table : string,field : Array<string>,value :Array<T>) => {
    return `INSERT INTO ${table}(${splitRest(field)}) VALUES(${splitRest(value)});`;
};
export default  makeCreateQuery;