import { Component, OnInit } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  currentRecipe?: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => this.currentRecipe = recipe
    );
  }

}
