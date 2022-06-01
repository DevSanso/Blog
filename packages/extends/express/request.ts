import {Request} from 'express';
import {PoolConnection} from 'mysql2/promise';

interface DBPool {
    getDbConnection() : Promise<PoolConnection>            
}

declare module 'express' {
    interface Request {
        dbPool : DBPool
    }
};

