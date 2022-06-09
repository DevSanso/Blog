import {Express,Router,Request,Response,NextFunction} from 'express';
import user from '@local/router_user';
import editor from '@local/router_editor';
import post from '@local/router_post';
import error from "@local/middleware_error";





export default  (e : Express) => {
    let root = Router();
    
    root.use("/user",user);
    root.use("/post/editor",editor);
    root.use("/post",post);
    root.use(error);

    e.use(root);
}