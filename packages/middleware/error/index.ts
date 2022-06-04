import {Request,Response,NextFunction} from 'express';
import {ErrorException} from './err_type';
import loggerFactory from './logger';


const logger = loggerFactory("basic");

const userHandling = (req : Request,res : Response,e : ErrorException) => {
    res.status(e.code);
    res.send(e.message);
    logger(req.ip,e);
}

const systemHandling = (req : Request,res : Response,e : ErrorException) => {
    res.sendStatus(e.code);
    logger(req.ip,e);
}

const isRawError = (e : any) : boolean => {
    return e.code == undefined || e.message == undefined || e.object == undefined;
}

const convertRawErrorToString = (e : any) : string => {
    if(typeof e === "object")return JSON.stringify(e);
    return e as string;
}

export default (req : Request,res : Response,next : NextFunction) => {
    try {
        next();
    }catch(e) {
        if (isRawError(e)) {
            systemHandling(req,res,{
                code :500,
                message : convertRawErrorToString(e),
                object : "SYSTEM"
            });
            return;
        }
        const exception = e as ErrorException;
        if(exception.object == "USER")userHandling(req,res,e);
        systemHandling(req,res,e);
    }
}