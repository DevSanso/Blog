import {Request,Response} from 'express';
import Ops from '@local/db_crud/op';
import {PostField as f} from '@local/db_crud/fields';
import dbCrud from '@local/db_crud';


import "@local/extends/express/request";

export default async (req : Request,res : Response) => {
    const queryValue = req.query.uuid;
    if(typeof queryValue === "undefined") {
        res.status(400);
        res.send("not exist uuid query");
        return;
    }
    let cond  : Ops<f>;
    cond["id"] = {value : queryValue,op : "="};
    const conn = req.dbPool.getDbConnection();
    await dbCrud.post.delete().delete(conn,cond);
    (await conn).release();

    res.redirect("/");
}