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
    try {
        await conn.beginTransaction();
        await conn.execute(query.makeDeleteContentQuery(queryValue as string));
        conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }finally {
        conn.release();
    }

    res.redirect("/");
}