import {Express} from 'express';


import page from "@local/middleware_page";




export default (e : Express) => {
    e.use(page);
}