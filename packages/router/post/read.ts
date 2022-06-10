import {NextFunction, Request,Response} from 'express';
import { RowDataPacket } from 'mysql2';

import {Post} from '@local/metadata';
import Ops from '@local/db_crud/op';
import {PostField} from '@local/db_crud/fields';
import dbCrud from '@local/db_crud';

import "@local/extends/express/request";


const handler = async (req : Request,res : Response) => {
    const queryValue = req.query.uuid;
    if(typeof queryValue === "undefined") {
        res.status(400);
        res.send("not exist uuid query");
        return;
    }
    let ops : Ops<PostField>  = {} as Ops<PostField>;
    ops["id"] = {value : `"${queryValue}"`,op : "="};
    const conn = req.dbPool.getDbConnection();
    const rows = await dbCrud.post.read().read(conn,["title","date","content"],ops);
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


    const body : Omit<Post,"id"> = {
        title : row.title,
        date : row.date,
        content : row.content
    }
    
    res.status(200);
    res.send(JSON.stringify(body));
};

export default (req : Request,res : Response,next : NextFunction) => {
    handler(req,res).catch(value => next(value));
}