import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Recipe test', 'This a recipe test', 'http://picturetherecipe.com/wp-content/uploads/2018/06/Chicken-Cutlets-by-PictureTheRecipe-Featured-680x900.jpg'),
    new Recipe('Recipe test 22', 'This a recipe test 22', 'http://picturetherecipe.com/wp-content/uploads/2018/06/Chicken-Cutlets-by-PictureTheRecipe-Featured-680x900.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();// return a copy of the recipes since arrays are reference type in javascript
  }
}
