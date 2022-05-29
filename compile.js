const process = require('child_process');
const { stringify } = require('querystring');
const p = require('./package.json');

const k = Object.keys(p.dependencies).filter((value,index,array)=> {
    return value.includes("@local");
});

const path = k.map((value,index,array)=>{
    return p.dependencies[value].substring(5);
});


path.forEach(value => {
    process.exec(`npx tsc --build ${value}`);
});










