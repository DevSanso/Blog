import {ErrorException} from '../err_type';





export default (ip : string,e : ErrorException) => {
    console.log(`date : ${new Date()} , access ip : ${ip}, cause object : ${e.object} , exception : ${e.message}`);
}