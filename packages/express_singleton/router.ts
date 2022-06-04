import {Express} from 'express';
import user from '@local/router_user';
import editor from '@local/router_editor';
import post from '@local/router_post';
import error from "@local/middleware_error";

export default  (e : Express) => {
    e.use("/user",user.use(error));
    e.use("/post/editor",editor.use(error));
    e.use("/post",post.use(error));
}