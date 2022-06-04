import basic from './logger/basic';
import {ErrorException} from './err_type';

type LoggerFunc = (ip : string,e :ErrorException) => void;

const loggerFactory = (logger : "basic") : LoggerFunc=> {
    return basic;
}


export default loggerFactory;