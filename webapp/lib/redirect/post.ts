import * as local from '@lib/storage/storage';
const url = "/post"

export const redirectPostPage = (host : string,id : string) =>{
    local.setPostId(id);
    location.href = `${host}${url}`;
};