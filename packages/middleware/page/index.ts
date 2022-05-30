import {env} from 'process';
import {join,parse,ParsedPath} from 'path';
import {existsSync} from 'fs';

import {Request,Response,NextFunction} from 'express';
import mappingJson from './mapping_ext.json';

const WWWPath = env.WWW_DIRECTORY != undefined ? env.WWW_DIRECTORY : "./www";
const mapping = (() => {
    return Array.from(mappingJson);
})();


const isMatchingExt = (url : string,mapping : Array<string>) => {
    const ret = mapping.findIndex((value,index,array) => {
        return value == parse(url).ext;
    });
    return ret != -1? true : false;
};

const makeFilePathFromUrl = (root : string,url : string) => join(root,url);

export default (req : Request,res : Response,next : NextFunction) =>{

    if(req.method == "GET" && isMatchingExt(req.url,mapping)) {
        const filePath = makeFilePathFromUrl(WWWPath,req.url);

        if(existsSync(filePath))
            res.status(400);
        else {
            res.sendFile(filePath);
            res.status(200);
        }
        return;
    }

    next();
}