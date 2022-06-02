import {Request,Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import * as query from './query';

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


    const conn = await req.dbPool.getDbConnection();
    await conn.beginTransaction();
    const uuid = uuidv4();
    try {
        const contentQuery = query.makeCreateContentQuery({
            title : requestBody.title,
            hash : uuid,
            content : requestBody.content
        });
        
        await conn.execute(contentQuery);
        const tagQuerys = query.makeCreateTagQuerys({
            hash : uuid,
            tags : requestBody.tags
        });
        const combineTagQuery = tagQuerys.reduce((pre,current,index,arr) : string => pre + current);
        await conn.execute(combineTagQuery);
        conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }finally {
        conn.release();
    }
    
    res.redirect(`/post?url=${uuid}`);
}