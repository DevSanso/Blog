const process = require('child_process');

process.exec("rm ./packages/**/*.js");
process.exec("rm ./packages/middleware/**/*.js");