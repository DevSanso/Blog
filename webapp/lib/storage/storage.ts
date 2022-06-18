const local = window.localStorage;

export const setPostId = (id : string) => local.setItem("postID",id);

export const getPostId = ()  => local.getItem("postID");

export const setSearchTitle = (title : string) => local.setItem("searchTitle",title);

export const getSearchTitle = () => {
    const v = local.getItem("searchTitle");
    return v != null ? v : "";
}