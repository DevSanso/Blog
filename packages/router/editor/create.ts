import {Request,Response} from 'express';
import {v4 as uuidv4} from 'uuid';

import dbCrud from '@local/db_crud';

import "@local/extends/express/request";


interface Body {
    title : string,
    tags : Array<string>
    content : string
}


const chkContentType = (contentType : string) => contentType == "application/json";
const chkBodyType = (b : Body) => {
    return typeof b.title === "string" && typeof b.content === "string";
}

export default async (req : Request,res : Response) => {
    if(!chkContentType(req.headers["content-type"])) {
        res.status(400);
        res.send("not content-type json");
        return;
    }
    const requestBody : Body = req.body;

    if(!chkBodyType(requestBody)) {
        res.status(400);
        res.send("not matching json value types");
        return;
    }
    const uuid = uuidv4();
    const date = (new Date()).toString()
    const conn = req.dbPool.getDbConnection();
    await dbCrud.post.create().create(conn,["title","content","id","date"],{
        "title" : requestBody.title,
        "content" : requestBody.content,
        "id" : uuid,
        "date" : "NOW()"
    });
    (await conn).release();

    res.redirect(`/post?url=${uuid}`);
}