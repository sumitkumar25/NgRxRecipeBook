import { Action } from "@ngrx/store";
export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";
export const SET_TOKEN = "SET_TOKEN";
export const PRE_SIGNUP = "PRE_SIGNUP";
export const PRE_SIGNIN = "PRE_SIGNIN";
export class SignUp implements Action {
    readonly type = SIGNUP;
}
export class SignIn implements Action {
    readonly type = SIGNIN;
}
export class Logout implements Action {
    readonly type = LOGOUT;
}
export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) { }
}
export class PreSignup implements Action {
    readonly type = PRE_SIGNUP;
    constructor(public payload: { username: string, password: string }) { }
}
export class PreSignin implements Action {
    readonly type = PRE_SIGNIN;
    constructor(public payload: { username: string, password: string }) { }
}
export type AuthAction =
    SignUp |
    SignIn |
    Logout |
    SetToken |
    PreSignup|
    PreSignin;