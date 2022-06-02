import {Express} from 'express';
import user from '@local/router_user';
import editor from '@local/router_editor';



export default  (e : Express) => {
    e.use("/user",user);
    e.use("/post/editor",editor);
}