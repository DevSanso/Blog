const fs =  require('fs/promises');
const mysql = require('mysql2/promise');
const { exit } = require('process');


const config = {
    host : "localhost",
    port :3306,
    user : 'root',
    password : '',
    database : 'blog'
}


const main = async() => {
    let c = await mysql.createConnection(config);
    let query= await fs.readFile("./scripts/sql/sql.sql");
    let querys = query.toString().replace("\\n","").split(";");


    for(i=0;i<querys.length-1;i++) {
        await c.execute(querys[i]+";");
    }
    exit(0);
}


main();