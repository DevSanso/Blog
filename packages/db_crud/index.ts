import type {PoolConnection,RowDataPacket} from 'mysql2/promise';

import {ErrorException} from '@local/middleware_error/err_type';

import createFn from './query/create';
import readFn from './query/read';
import deleteFn from './query/delete';

import {Ops} from './query/utils/op';
import {PostField,TagField,PostImgField} from './fields';




export type InterfaceKeys<T> = Array<keyof T>; 
type Value<T ,P extends keyof T> = T | Pick<T,P>;



interface CreateModel<CF> {
    create<PICK extends keyof CF>(conn :  Promise<PoolConnection> | PoolConnection,field : InterfaceKeys<CF>,val : Value<CF,PICK>) : Promise<void>
}

interface ReadModel<T> {
    read(conn : Promise<PoolConnection> | PoolConnection,field : InterfaceKeys<T>,ops : Ops<T> | null) : Promise<RowDataPacket[][]>
}

interface DeleteModel<T> {
    delete(conn : Promise<PoolConnection> | PoolConnection,ops : Ops<T>) : Promise<void>;
}

const sort = <F,PICK extends keyof F>(f : InterfaceKeys<F>,val : Value<F,PICK>) : Array<string> => f.map(value => val[value as string])


class Model<T> implements CreateModel<T>,ReadModel<T>,DeleteModel<T> {
    private table : string;
    public constructor(tableName : string) {
        this.table = tableName;
    }

    public async create<PICK extends keyof T>(conn : Promise<PoolConnection> | PoolConnection,field : InterfaceKeys<T>,val : Value<T,PICK>) {
        const c = conn instanceof Promise ? await conn : conn;

        const query = createFn(this.table,field as string[],sort(field,val));
        try {
            await c.execute(query);
        }catch(e) {
            const exception  : ErrorException= {
                code : 507,
                message : e,
                object : "SYSTEM"
            }
            throw exception;
        }
    }
    public async read(conn : Promise<PoolConnection> | PoolConnection,field : InterfaceKeys<T>,ops :Ops<T> | null) : Promise<RowDataPacket[][]> {
        const c = conn instanceof Promise ? await conn : conn;
        const query = readFn(this.table,field,ops);

        return await c.query(query) as RowDataPacket[][];
       
    }

    public async delete(conn : Promise<PoolConnection> | PoolConnection,ops : Ops<T>) {
        const c = conn instanceof Promise ? await conn : conn;

        const query = deleteFn(this.table,ops);
        try {
            await c.execute(query);
        }catch(e) {
            const exception  : ErrorException= {
                code : 507,
                message : e,
                object : "SYSTEM"
            }
            throw exception;
        }
    }
}

export default {
    post : {
        create : () : CreateModel<PostField> => new Model<PostField>("post"),
        read : () : ReadModel<PostField> => new Model<PostField>("post"),
        delete : () : DeleteModel<PostField> => new Model<PostField>("post")
    },
    tags : {
        create : () : CreateModel<TagField> => new Model<TagField>("tags"),
        read : () : ReadModel<TagField> => new Model<TagField>("tags"),
        delete : () : DeleteModel<TagField> => new Model<TagField>("tags")

    },
    postImg : {
        create : () : CreateModel<PostImgField> => new Model<PostImgField>("post_img"),
        read : () : ReadModel<PostImgField> => new Model<PostImgField>("post_img"),
        delete : () : DeleteModel<PostImgField> => new Model<PostImgField>("post_img")

    }
}






















