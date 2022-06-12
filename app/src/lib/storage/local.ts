const local = window.localStorage;


type DocumentKey = "search" | "post";

const set = (key : string,value : string) => local.setItem(key,value);
export const setItem = (doc: DocumentKey,key : string,value : string) => set(`${doc}.${key}`,value);

const get = (key : string) => local.getItem(key);
export const getltem = (doc : DocumentKey,key : string) => get(`${doc}.${key}`);
