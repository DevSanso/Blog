import {Server} from 'http';

import  express from "express";

import middleware_register from "./middleware";
import router_register from './router';




const app : Listener = (()=>{
    let e = express();
    middleware_register(e);
    router_register(e);
    return e;
})();


interface Listener {
    listen(port: number, hostname: string, callback?: () => void): Server;
}

export default app;
