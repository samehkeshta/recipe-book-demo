import { Injectable } from "@angular/core";
import { Ingredient } from "src/app/shared/models/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";
import { Recipe } from "../models/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Skillet Chicken Thighs',
      'Skillet Chicken Thighs with White Wine-Butter Sauce',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/09/23/0/FNK_Skillet-Chicken-Thighs_H1_s4x3.jpg.rend.hgtvcom.406.271.suffix/1632420651769.jpeg',
      [
        new Ingredient('bay leaves', 2),
        new Ingredient('shallots, finely chopped', 2)
      ]),
    new Recipe(
      2,
      'Chicken Pasta',
      'Hearty Tuscan Chicken Pasta',
      'http://del.h-cdn.co/assets/16/04/3200x1800/hd-aspect-1453934758-chicken-bacon-spaghetti-delish.jpg',
      [
        new Ingredient('slices bacon', 6),
        new Ingredient('cloves garlic', 2),
        new Ingredient('c. baby spinach', 3)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();// return a copy of the recipes since arrays are reference type in javascript
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes.slice().find(r => r.id === id);
  }
}
