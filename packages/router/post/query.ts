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


export function makeSelectContentQuery(uuid : string) : string {
    const field = defined.postTable;
    return `SELECT ${field.title},${field.date},${field.content} FROM ` +
    `${defined.postTableName} WHERE ${field.id} = ${uuid};`;
}


