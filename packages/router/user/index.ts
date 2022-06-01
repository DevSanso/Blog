import {Request,Response,Router} from 'express';
import bcrypt from 'bcrypt';


import '@local/extends/express_session/user_info';


import userInfo from './user.json';

import '@local/extends/express_session/user_info';


const loginHandler = (req : Request,res : Response) =>  {
    const email = req.body.email;
    if(email != userInfo.email){
        res.sendStatus(400);
        return;
    }
    
    let salt = bcrypt.genSaltSync(10);
    const clientPassword = bcrypt.hashSync(req.body.password,salt);
    const localPassword = bcrypt.hashSync(userInfo.password,salt);

    if(clientPassword != localPassword){
        res.sendStatus(400);
        return;
    }
    
    req.session.userInfo = {ip : req.ip};
    req.session.save(err => {
        if (err != undefined)throw err;
    });
    res.redirect("/");
};
const logoutHandler = (req : Request,res : Response) => {
    req.session.destroy(err=>{
        if (err != undefined)throw err;
    });
    res.redirect("/");
};

const router = Router();
router.post("/login",loginHandler);
router.post("/logout",logoutHandler);


export default router;