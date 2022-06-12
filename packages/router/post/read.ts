import {NextFunction, Request,Response} from 'express';
import { RowDataPacket } from 'mysql2';

import {Post} from '@local/metadata';
import Ops from '@local/db_crud/op';
import {PostField, PostImgField} from '@local/db_crud/fields';
import dbCrud from '@local/db_crud';

import "@local/extends/express/request";


const handler = async (req : Request,res : Response) => {
    const queryValue = req.query.uuid;
    if(typeof queryValue === "undefined") {
        res.status(400);
        res.send("not exist uuid query");
        return;
    }
    let ops : Ops<PostField | PostImgField>  = {} as Ops<PostField | PostImgField>;
    ops["id"] = {value : `"${queryValue}"`,op : "="};
    const conn = req.dbPool.getDbConnection();
    const rows = await dbCrud.post.read().read(conn,["title","date","content"],ops as Ops<PostField>);
    const rowsImg = await dbCrud.postImg.read().read(conn,["data"],ops as Ops<PostImgField>);
    (await conn).release();
    if(rows.length == 0) {
        res.sendStatus(400);
        return;
    }

    let row = rows[0][0] as {
        title : string,
        date : string,
        content : string
    };

        
    let body = {
        title : row.title,
        date : row.date,
        content : row.content
    }
    if(rowsImg.length != 0) {
        let data = rowsImg[0][0] as {data : string};
        body["img"] = data;
    }
    
    res.status(200);
    res.send(JSON.stringify(body));
};

export default (req : Request,res : Response,next : NextFunction) => {
    handler(req,res).catch(value => next(value));
}