import axios, {type AxiosResponse} from 'axios';

import type Result from './types/result';

const url = "/post/search"


const makeRequestConfig = (data : {title : string}) => {
    return {title : data.title};
}


interface SearchItem {
    title : string,
    id : string,
    date : string
}



export default async(data : {title : string}) : Promise<Array<SearchItem>>  => {
    let res : AxiosResponse;
    try {
        res = await axios.get(url,{
            params : makeRequestConfig(data)
        });
    }catch(e) {
        throw e;
    }
    
    if(res.status != 200)
        throw res.data;
    
    return JSON.parse(res.data);

}