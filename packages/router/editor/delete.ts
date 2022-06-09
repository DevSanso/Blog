import {NextFunction, Request,Response} from 'express';
import Ops from '@local/db_crud/op';
import {PostField,TagField,PostImgField} from '@local/db_crud/fields';
import dbCrud from '@local/db_crud';


import "@local/extends/express/request";

const handler = async (req : Request,res : Response) => {
    const queryValue = req.params.uuid;
    
    if(typeof queryValue === "undefined") {
        res.status(400);
        res.send("not exist uuid query");
        return;
    }
    let cond  : Ops<PostField | TagField | PostImgField> = {} as Ops<PostField | TagField | PostImgField>;
    cond["id"] = {value : queryValue,op : "="};
    const conn =await req.dbPool.getDbConnection();
    try {
        await conn.beginTransaction();
        await dbCrud.tags.delete().delete(conn,cond as Ops<TagField>);
        await dbCrud.postImg.delete().delete(conn,cond as Ops<PostImgField>);
        await dbCrud.post.delete().delete(conn,cond as Ops<PostField>);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        console.log(`error : ${JSON.stringify(e)}`);
        throw e;
    }finally {
        conn.release();
    }
    

    res.redirect("/");
};

export default (req : Request,res : Response,next : NextFunction) => {
    handler(req,res).catch(value => next(value));
}