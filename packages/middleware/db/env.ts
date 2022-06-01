const fn = (x : string | undefined,init : string) => {
    return x != undefined? x : init; 
}

export default {
    host : fn(process.env.DATABASE_HOST,"localhost"),
    port : parseInt(fn(process.env.DATABASE_PORT,"3306")),
    user : fn(process.env.DATABASE_USER,"root"),
    password : fn(process.env.DATABASE_PASSWORD,""),
    database : fn(process.env.DATABASE_DBNAME,"blog")
}