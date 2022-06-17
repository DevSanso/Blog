import {NextFunction, Request,Response} from 'express';
import {v4 as uuidv4} from 'uuid';

import dbCrud, { InterfaceKeys } from '@local/db_crud';
import  {PostImgField } from '@local/db_crud/fields';

import "@local/extends/express/request";


interface Body {
    title : string
    tags : Array<string>
    content : string
    img : string | undefined
}


const chkContentType = (contentType : string) => contentType == "application/json";
const chkBodyType = (b : Body) => {
    return typeof b.title === "string" && typeof b.content === "string";
}
const makeImageDataDbData = (b : Body,uuid : string) => {
    if(b.img == undefined)
        return [["id"],{id:`"${uuid}"`}];

    return [["id","data"],{id:`"${uuid}"`,data : `"${b.img}"`}];
}

const handler = async (req : Request,res : Response) => {
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

    const uuid = uuidv4().toString().replaceAll("-","");
    const conn = await req.dbPool.getDbConnection();

    try {
        await dbCrud.post.create().create(conn,["title","content","id","date"],{
            "title" : `\"${requestBody.title}\"`,
            "content" : `\"${requestBody.content}\"`,
            "id" : `\"${uuid}\"`,
            "date" : "NOW()"
        });
        let [field,data]  = makeImageDataDbData(requestBody,uuid);
        await dbCrud.postImg
            .create()
            .create(conn,field as InterfaceKeys<PostImgField>,data as PostImgField);
        conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }finally {
        conn.release();
    }

    res.redirect(`/post?url=${uuid}`);
};


export default (req : Request,res : Response,next : NextFunction) => {
    handler(req,res).catch(value => next(value));
}