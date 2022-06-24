import axios from 'axios';

export type RequestBody = {
    title : string
    tags : Array<string>
    content : string
    img : string
};
type RedirectUrl = string;


const url = "/post/editor";


 const postUrl= (host : string,id : string) => location.href = `${host}${url}?uuid=${id}`;


export const editorPost = async (body : RequestBody) : Promise<RedirectUrl> => {
    const res = await axios.post(`${location.host}${url}`,body);
    return res.status == 302 ? res.headers["Location"] : "/"
}