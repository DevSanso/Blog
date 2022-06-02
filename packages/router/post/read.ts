import {Request,Response} from 'express';
import { RowDataPacket } from 'mysql2';

import * as query from './query';
import {Post} from '@local/metadata';

import "@local/extends/express/request";


export default async (req : Request,res : Response) => {
    const queryValue = req.query.uuid;
    if(typeof queryValue === "undefined") {
        res.status(400);
        res.send("not exist uuid query");
        return;
    }
    const sqlQuery = query.makeSelectContentQuery(queryValue as string);
    const conn = await req.dbPool.getDbConnection();
    let result : Post;
    try {
        result = await (async () => {
            return await conn.query(sqlQuery) as RowDataPacket[]
        })()[0] as Post;
    }catch(e) {
        throw e;
    }finally {
        conn.release();
    }


    const body : Omit<Post,"hash"> = {
        title : result.title,
        date : result.date,
        content : result.content
    }
    
    res.status(200);
    res.send(JSON.stringify(body));
}