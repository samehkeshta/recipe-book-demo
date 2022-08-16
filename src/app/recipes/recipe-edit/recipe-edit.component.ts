import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id?: number;
  editMode: boolean = false;
  recipeForm: FormGroup

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        this.initForm();
      }
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  private initForm() {
    let recipe: Recipe;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(this.createNewIngredient(ingredient));
        }
      }
    } else {
      recipe = new Recipe(0, '', '', '', []);
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls(): any {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    this.controls.push(this.createNewIngredient(null))
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

    //to remove all controls
    //(<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  private createNewIngredient(ingredient?: Ingredient) {
    return new FormGroup({
      'name': new FormControl(ingredient?.name, Validators.required),
      'amount': new FormControl(ingredient?.amount, [
        Validators.required, Validators.pattern(/^[1-9]\d*$/)
      ])
    });
  }
}
