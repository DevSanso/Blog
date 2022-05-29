import {env} from 'process';
import {join} from 'path';
import {existsSync} from 'fs';

import {Request,Response,NextFunction} from 'express';
import mappingJson from './mapping.json';

const WWWPath = env.WWW_DIRECTORY != undefined ? env.WWW_DIRECTORY : "./www";


const mapping : Map<string,string> = (()=>{
    let m = new Map(Object.entries(mappingJson));
    return m;
})();

const splitPath = (url : string) => url.split("/");

const changePhyPath = (mapping : Map<string,string>,path : string) => mapping.get(path); 

const MappingFilePath = (base : string,url : string,origin : string,directoyPath : string) => {
    let p = url.replace(origin,directoyPath);
    return join(base,p);
}

const matchString = (keys : Array<string>,str : string)  : string | null  => {
    const find = keys.filter(value => {
        value == str
    });
    if(find.length == 0) return null;

    return find[0];
}

export default (req : Request,res : Response,next : NextFunction) =>{
    if(req.method = "GET") {
        let first = splitPath(req.url)[1];
        let directoryPath = matchString(Array.from(mapping.keys()),`/${first}`);

        if(directoryPath != null) {
            let filePath = MappingFilePath(WWWPath,req.url,`$/{first}`,directoryPath);
            
            if (existsSync(filePath)) {
                res.sendFile(filePath);
                res.status(200);
            }else {
                res.status(404);
            }
            return;
        }

        next();
        return;
    }

    next();

}