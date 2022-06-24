import React,{useEffect} from 'react';
import axios,{AxiosResponse} from 'axios';
import root from '@lib/init/ui';





const LoginView = () => {
    const chkUrl = "will make chk url";


    const isOkCode =  (res : AxiosResponse) => res.status == 200;
    const chkSession = async () => {
        const res  = await axios.get(chkUrl);
        return  isOkCode(res);
    }
    const moveLocation = (url : string) => {
        location.href = url;
    };
    
    useEffect(()=> {
        chkSession().then((value)=> {
            value ? moveLocation("/") : undefined;
        }).catch((e)=> {
            throw e;
        })
    },[]);
    
    return (
        <div>
            <form action="/user/login" method="post">
                <input type="email" name="email"></input>
                <input type="paasword" name="password"></input>
                <input type="submit"></input>
            </form>
        </div>
    );
};


root.render(<LoginView></LoginView>);