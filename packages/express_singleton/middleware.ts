import {Express} from 'express';
import session from 'express-session';
import * as helmet from 'helmet';
import bodyParser from 'body-parser';


import page from "@local/middleware_page";
import db from "@local/middleware_db";
import access from '@local/middleware_access_restriction';


const sessionMiddleware =(e : Express) => {
    let config = {
        secret: 'keyboard cat',
        cookie : {
            secure : false
        }  
    };
    if(e.get("env")=="production") {
        e.set('trust proxy', 1) 
        config.cookie.secure = true 
    }

    e.use(session(config));
};

const secureMiddleware = (e : Express) => {



};

const frameworkMiddleware = (e : Express) => {
    sessionMiddleware(e);
    secureMiddleware(e);

    e.use(bodyParser.urlencoded());
    e.use(bodyParser.json());
};


export default (e : Express) => {
    frameworkMiddleware(e);

    e.use(page);
    e.use(db);
    e.use(access);
};

