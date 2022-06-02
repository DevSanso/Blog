import {Post,PostTag} from "@local/metadata";


const defined = {
    postTableName : "post",
    postTagsTableName : "tags",

    postTable : {
        title : "title",
        id : "hash",
        content : "cotent",
        date : "date"
    },
    postTagsTable : {
        id : "hash",
        tag : "tag"
    }
}



export function makeCreateTagQuerys(meta : PostTag) : Array<string> {
    const tagField = defined.postTagsTable;
    return meta.tags.map((value)=>`INSERT INTO ${defined.postTagsTableName}` +
        `(${tagField.id},${tagField.tag}) VALUES(${meta.hash},${value});`);
}


export function makeCreateContentQuery(p : Omit<Post,"date">) : string {
    const field = defined.postTable;
    return `INSERT INTO ` + 
    `${defined.postTableName}(${field.title},${field.id},${field.content},${field.date}) `
    +`VALUES(${p.title},${p.content},${p.hash},NOW());`;
}



export function makeSelectContentQuery(uuid : string) : string {
    const field = defined.postTable;
    return `SELECT ${field.title},${field.date},${field.content} FROM ` +
    `${defined.postTableName} WHERE ${field.id} = ${uuid};`;
}


export function makeDeleteContentQuery(uuid : string) : string {
    const field = defined.postTable;
    return `DELETE FROM ${defined.postTableName} WHERE ${field.id} = ${uuid};`;
}