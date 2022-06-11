const process = require('child_process');




const cpBuildApp = () => {
    process.exec("cp -rf  ./app/build ./tests/www",(err,stdout,stderr)=> {
        if(err)throw err;
    });
}


process.exec("cd app && npm run build",(err,stdout,stderr)=> {
    if(err)throw err;
    if(stderr != "")console.error(stderr);
    if(stdout != "")console.log(stdout);

    cpBuildApp();
});

