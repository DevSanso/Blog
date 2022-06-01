import {Request,Response,NextFunction} from 'express';
import mysql,{Pool,PoolOptions,PoolConnection} from 'mysql2/promise';


import config from './env';

const convertPoolOption = (p : Partial<PoolOptions>) : PoolOptions  =>  {return {...p};};


class WrapperDbPool {
    private _pool : Pool
    public constructor(pool : Pool) {this._pool = pool;}

    public getDbConnection() : Promise<PoolConnection> { return this._pool.getConnection();}
}

interface ExtendRequest extends Request {
    dbPool : WrapperDbPool
}


const asExtendRequest = (req : Request,pool : Pool) : ExtendRequest =>{
    let wrap = req as ExtendRequest;
    wrap.dbPool = new WrapperDbPool(pool);
    
    return wrap;
};



export default (req : Request,res : Response,next : NextFunction) => {
    const pool = mysql.createPool(convertPoolOption(config));
    asExtendRequest(req,pool);
    next();
}

