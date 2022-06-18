

const url = "/post"

export const redirectPostPage = (host : string,id : string) => location.href = `${host}${url}?uuid=${id}`;