import axios from 'axios';

export type ResponseBody = {
    title : string
    date : string
    content : string,
    img : {
        data : string | null
    }
};

const url = "/post";
 const postUrl= (host : string,id : string) => location.href = `${host}${url}?uuid=${id}`;

export const post = async(host : string,id : string) : Promise<ResponseBody | null> => {
    const res = await axios.get(postUrl(host,id));
    if(res.status != 200)
        return null;
    
    return res.data as ResponseBody;
};



