import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthAction from './auth.actions';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.action$.ofType(AuthAction.PRE_SIGNUP)
        .map((action: AuthAction.PreSignup) => {
            return action.payload;
        })
        .switchMap((authData: { username: string, password: string }) => {
            return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken())
        })
        .mergeMap((token: string) => {
            return [
                { type: AuthAction.SIGNUP },
                {
                    type: AuthAction.SET_TOKEN,
                    payload: token
                },
            ]
        });
    @Effect()
    authSignin = this.action$.ofType(AuthAction.PRE_SIGNIN)
        .map((action: AuthAction.PreSignin) => {
            return action.payload;
        })
        .switchMap((authData: { username: string, password: string }) => {
            return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken())
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                { type: AuthAction.SIGNIN },
                {
                    type: AuthAction.SET_TOKEN,
                    payload: token
                },
            ]
        });
    @Effect({ dispatch: false })
    authLogout = this.action$.ofType(AuthAction.LOGOUT)
        .do(() => {
            this.router.navigate(['/']);
        })
    constructor(private action$: Actions, private router: Router) { }
}