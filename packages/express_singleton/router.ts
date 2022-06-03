import {Express} from 'express';
import user from '@local/router_user';
import editor from '@local/router_editor';
import post from '@local/router_post';


export default  (e : Express) => {
    e.use("/user",user);
    e.use("/post/editor",editor);
    e.use("/post",post);
}