import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'src/app/recipes/services/recipe.service';
import { Recipe } from 'src/app/recipes/models/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private url: string =
    'https://recipe-book-demo-d8cb3-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
  ) {}

  public saveRecipes() {
    const recipes = this.recipeService.getRecipes();

    return this.httpClient.put(this.url, recipes);
  }

  public fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(this.url)
      .pipe(
        map(res => {
          return res.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          })
        }),
        tap(res => {
          this.recipeService.setRecipes(res);
        })
      );
  }
}
