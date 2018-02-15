import * as AuthActions from './auth.actions';
export interface State {
    authToken: string;
    authenticated: boolean
}

const initialState: State = {
    authToken: null,
    authenticated: false
};
export function authReducer(state = initialState, action: AuthActions.AuthAction) {
    switch (action.type) {
        case (AuthActions.SIGNIN):
        case (AuthActions.SIGNUP):
            return {
                ...state,
                authenticated: true
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                authenticated: false,
                authToken: null
            };
        case (AuthActions.SET_TOKEN): return {
            ...state,
            authToken: action.payload
        };
        default: return state;
    }
}