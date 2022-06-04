import {Request,Response,NextFunction} from 'express';

import "@local/extends/express_session/user_info";


type RestrictionInfo = {method : Array<"GET" | "POST" | "PUT" | "DELETE">};


interface AccessRestrictions {
    [url : string] : RestrictionInfo
}

interface RequestRestrictionInfo{
    method : string
}

const AccessList  : AccessRestrictions= {
    "/post/editor" : {method : ["POST","DELETE"]}
}


const findUrlRestriction = (url : string) : RestrictionInfo | null => {
    const info = AccessList[url];
   if(info == undefined)return null;

   return info;
}

const isMatchRestrction = (info : RestrictionInfo,value : RequestRestrictionInfo) =>  {
    return (info.method as Array<string>).indexOf(value.method) != -1;
}

const isExistSessionData = (req : Request) => req.session != undefined && req.session.userInfo != undefined;

const isMatchingAccessIp = (req : Request) => req.session.userInfo.ip == req.ip;

export default (req : Request,res : Response,next : NextFunction) => {
    const restrction = findUrlRestriction(req.url);
    if(restrction == null){
        next();
        return;
    }
    if(!isMatchRestrction(restrction,req)) {
        next();
        return;
    }
    if(!isExistSessionData(req)) {
        res.sendStatus(401);
        return;
    }

    if(!isMatchingAccessIp(req)) {
        res.sendStatus(401);
        return;
    }
    next();
}