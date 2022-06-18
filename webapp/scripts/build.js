const { execSync } = require('child_process');
const esbuild = require('esbuild');
const fs = require('fs');
const os = require('os');




const makeHtmlText = (css,scriptSrc) => {
    return `<!DOCTYPE html><html><link href='${css}' rel='stylesheet'></html>`+
    `<body><main id='app'></main><script src='${scriptSrc}'></script></body>`
};

const loader = () => {
    return {
        '.jpg' : 'dataurl',
        '.png' : 'dataurl'
    };
};


const createHtmlFile = (root,name,css,scriptSrc) => {
    const data  = makeHtmlText(css,scriptSrc);
    const fd = fs.openSync(`${root}/static/${name}.html`,"w");
    fs.writeSync(fd,data);
}

const build = (fileName) => {
    const root = process.cwd();
    createHtmlFile(root,fileName,`/bundle/${fileName}.css`,`/bundle/${fileName}.js`);

    esbuild.build({
        entryPoints : [`${root}/src/${fileName}.ts`],
        loader:loader(),
        bundle : true,
        outfile : `${root}/static/bundle/${fileName}.js`
    });
}


if(os.platform() == "win32") {
    console.error("not support win32 path");
    process.exit(1);
}

if(!fs.existsSync(`${process.cwd()}/static`)) 
    fs.mkdirSync(`${process.cwd()}/static`);
else {
    execSync(`rm -rf ${process.cwd()}/static`);
    fs.mkdirSync(`${process.cwd()}/static`);
}


build("index");
build("search");

