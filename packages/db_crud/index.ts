import {PoolConnection,RowDataPacket} from 'mysql2/promise';

import createFn from './query/create';
import readFn from './query/read';
import deleteFn from './query/delete';

import {Ops} from './query/utils/op';
import {PostField,TagField} from './fields';

type InterfaceKeys<T> = Array<keyof T>; 
type Value<T ,P extends keyof T> = T | Pick<T,P>;



interface CreateModel<CF> {
    create<PICK extends keyof CF>(conn : Promise<PoolConnection>,field : InterfaceKeys<CF>,val : Value<CF,PICK>) : Promise<void>
}

interface ReadModel<T> {
    read(conn : Promise<PoolConnection>,field : InterfaceKeys<T>,ops : Ops<T>) : Promise<RowDataPacket[][]>
}

interface DeleteModel<T> {
    delete(conn : Promise<PoolConnection>,ops : Ops<T>) : Promise<void>;
}

const sort = <F,PICK extends keyof F>(f : InterfaceKeys<F>,val : Value<F,PICK>) : Array<string> => f.map(value => val[value as string])


class Model<T> implements CreateModel<T>,ReadModel<T>,DeleteModel<T> {
    private table : string;
    public constructor(tableName : string) {
        this.table = tableName;
    }

    public async create<PICK extends keyof T>(conn : Promise<PoolConnection>,field : InterfaceKeys<T>,val : Value<T,PICK>) {
        const c = await conn;
        await c.beginTransaction();

        const query = createFn(this.table,field as string[],sort(field,val));
        try {
            await c.execute(query);
            c.commit();
        }catch(e) {
            c.rollback();
            throw e;
        }
    }
    public async read(conn : Promise<PoolConnection>,field : InterfaceKeys<T>,ops :Ops<T>) : Promise<RowDataPacket[][]> {
        const c = await conn;
        const query = readFn(this.table,field,ops);

        return await c.query(query) as RowDataPacket[][];
       
    }

    public async delete(conn : Promise<PoolConnection>,ops : Ops<T>) {
        const c = await conn;
        await c.beginTransaction();

        const query = deleteFn(this.table,ops);
        try {
            await c.execute(query);
            c.commit();
        }catch(e) {
            c.rollback();
            throw e;
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

    }
}






















