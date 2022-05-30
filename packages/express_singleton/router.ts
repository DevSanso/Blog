import {Express} from 'express';
import user from '@local/router_user';




export default  (e : Express) => {
    e.use("/user",user);
}