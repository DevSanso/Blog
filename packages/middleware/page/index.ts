import {env,cwd} from 'process';
import path from 'path';
import {join,parse,ParsedPath} from 'path';
import {existsSync} from 'fs';

import {Request,Response,NextFunction} from 'express';
import mappingJson from './mapping_ext.json';

const WWWPath = env.WWW_DIRECTORY != undefined ? (()=> {
    if(!path.isAbsolute(env.WWW_DIRECTORY)) {
        console.error("plz set WWW_DIRECTORY path absolute path");
        process.exit(1);
    }
    return env.WWW_DIRECTORY;
})() : path.join(cwd(),"./www");

const mapping = (() => {
    return Array.from(mappingJson);
})();


const isMatchingExt = (url : string,mapping : Array<string>) => {
    const ret = mapping.findIndex((value,index,array) => {
        return value == parse(url).ext;
    });
    return ret != -1? true : false;
};
const chkUrlAndNoBodyAndEmptyQuery = (req : Request) => {
    return req.body == undefined && req.query== {} && path.extname(req.url) == "";
}
const makeFilePathFromUrl = (root : string,url : string) => join(root,url);

export default (req : Request,res : Response,next : NextFunction) =>{
    if(req.method == "GET") {
        if(req.url == "/")req.url == "/";
        else if(chkUrlAndNoBodyAndEmptyQuery(req))req.url=`${req.url}.html`;
    }
        
    
    
    if(req.method == "GET" && isMatchingExt(req.url,mapping)) {
        const filePath = makeFilePathFromUrl(WWWPath,req.url);
        if(!existsSync(filePath))
            res.sendStatus(400);
        else {
            res.status(200);
            res.sendFile(filePath);
        }
        return;
    }

    next();
}