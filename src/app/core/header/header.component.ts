import { Component, OnInit } from '@angular/core';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  constructor(private store: Store<fromApp.AppState>) {
  }
  ngOnInit() {
    this.authState = this.store.select('auth');
  }
  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipe());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
