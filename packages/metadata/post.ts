export interface Post {
    title : string
    id : string
    content : string
    date : string
}

export interface PostTag {
    id : string,
    tags : Array<string>
}