import {env} from 'process';
import {join} from 'path';
import express,{Request,Response,NextFunction} from 'express';


const WWWPath = env.WWW_DIRECTORY != undefined ? env.WWW_DIRECTORY : "./www";


const mapping : Map<string,string> = (()=>{
    let m = new Map();
    m.set("/","index");
    m.set("/login","login");

    return m;
})();

const changePhyPath = (mapping : Map<string,string>,path : string) => mapping.get(path); 

const combinePath = (base : string,path : string) => join(base,path);


export default (req : Request,res : Response,next : NextFunction) =>{
    if(req.method = "GET") {
        let directoryPath = changePhyPath(mapping,req.baseUrl);
        if (directoryPath == undefined) {
            next();
            return;
        }
        res.send(`hello world : ${directoryPath}`);
        res.status(200);
        return;
    }

    next();

}