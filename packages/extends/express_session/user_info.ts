import session from 'express-session';


interface UserInfo {
    ip : string
}

declare module 'express-session' {
    interface SessionData {
        userInfo : UserInfo
    }
}