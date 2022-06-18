import axios from 'axios';



export interface ResultElement {
    title : string
    id : string
    date : string
}

export type ResponseBody = Array<ResultElement>;
export const emptyBody = () : ResponseBody => new Array<ResultElement>() as  Array<ResultElement>;

const makeUrl = (host : string,url : string,query : string) => `${host}/${url}?title=${query}`;

export const search = async(title : string) : Promise<ResponseBody> => {
    const res = await axios.get(makeUrl(location.host,"post/search",title));
    if(res.status != 200)
        throw `/post/search error -> status :${res.status} body : ${res.data}`;

    return JSON.parse(res.data) as ResponseBody;
}