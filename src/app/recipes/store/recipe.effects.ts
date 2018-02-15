import { Effect, Actions } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromRecipe from './recipe.reducers';
import { Injectable } from '@angular/core';
@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.action$.ofType(RecipeActions.FETCH_RECIPE)
        .switchMap(
            (action: RecipeActions.FetchRecipe) => {
                return this.httpClient.get<Recipe[]>('https://recipebook-1632a.firebaseio.com//recipes.json', {
                    observe: 'body',
                    responseType: 'json'
                })
            }
        )
        .map(
            (recipes) => {
                console.log(recipes);
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.FETCH_RECIPE,
                    payload: recipes
                }
            }
        );
    @Effect({ dispatch: false })
    recipeStore = this.action$.ofType(RecipeActions.STORE_RECIPE)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, recipeState]) => {
            const req = new HttpRequest('PUT', 'https://recipebook-1632a.firebaseio.com//recipes.json', recipeState.recipes, { reportProgress: true });
            return this.httpClient.request(req);
        })
    constructor(private action$: Actions, private httpClient: HttpClient, private store: Store<fromRecipe.FeatureState>) { }

}