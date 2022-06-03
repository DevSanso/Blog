const splitRest = (arr : Array<any>) : string => arr.reduce((pre,current,index,arr)=> `${pre},${current}`,"");
const makeCreateQuery = <T extends string | number>(
    table : string,field : Array<string>,value :Array<T>) => {

    return `INSERT INTO ${table}(${splitRest(field)}) VALUES(${splitRest(value)})`;
};
export default  makeCreateQuery;