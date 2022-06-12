export interface Post {
    title : string
    id : string
    content : string
    date : string
    img : string | undefined
}

export interface PostTag {
    id : string,
    tags : Array<string>
}