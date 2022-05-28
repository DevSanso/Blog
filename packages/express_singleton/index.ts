import {Server} from 'http';

import  express from "express";

import middleware_register from "./middleware";

const app : Listener = (()=>{
    let e = express();
    e.listen()
    middleware_register(e);
    return e;
})();


interface Listener {
    listen(port: number, hostname: string, callback?: () => void): Server;
}

export default app;
