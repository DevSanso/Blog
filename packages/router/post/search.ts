import {Request,Response} from 'express';
import { RowDataPacket } from 'mysql2';
import Fuse from 'fuse.js';

import {Post} from '@local/metadata';
import Ops from '@local/db_crud/op';
import {PostField as f} from '@local/db_crud/fields';
import dbCrud from '@local/db_crud';

import "@local/extends/express/request";


export default async (req : Request,res : Response) => {
    const queryValue = req.query.title as string;

    if(typeof queryValue === "undefined") {
        res.status(400);
        res.send("not exist uuid query");
        return;
    }
    const conn = req.dbPool.getDbConnection();


    const rows = await dbCrud.post.read().read(conn,["title","id","date"],null);
    (await conn).release();

    if(rows.length == 0) {
        res.sendStatus(204);
        return;
    }

    const cast = rows[0].map(value => {
        return value as Omit<Post,"content">
    });

    const fuse = new Fuse(cast,{
        keys : ["title"]
    });

    const result = fuse.search(queryValue).map((value) => value.item);
    
    res.status(200);
    res.send(JSON.stringify(result));
}