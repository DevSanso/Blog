export type CauseObject = "USER" | "SYSTEM" ;


export interface ErrorException {
    code : number,
    message : string,
    object : CauseObject
}