import {Express} from 'express';
import session from 'express-session';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import page from "@local/middleware_page";


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
    e.use(helmet());
};

const frameworkMiddleware = (e : Express) => {
    sessionMiddleware(e);
    secureMiddleware(e);

    e.use(bodyParser.urlencoded());
};


export default (e : Express) => {
    frameworkMiddleware(e);

    e.use(page);
};

