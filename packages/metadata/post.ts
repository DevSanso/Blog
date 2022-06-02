export interface Post {
    title : string
    hash : string
    content : string
    date : string
}

export interface PostTag {
    hash : string,
    tags : Array<string>
}