import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm?: NgForm;

  private ingredientEditStartedSub?: Subscription;
  editMode: boolean = false;
  editedItemIndex: number = -1;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientEditStartedSub = this.shoppingListService.ingredientEditStarted.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;

        const editedItem = this.shoppingListService.getIngredient(index);
        this.slForm?.setValue({
          name: editedItem.name,
          amount: editedItem.amount
        });
      }
    );
  }

  onSaveIngredient() {
    const newIngredient = new Ingredient(this.slForm?.value.name, parseFloat(this.slForm?.value.amount));

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm?.reset();
  }

  onDelete() {
    if (this.editedItemIndex > -1) {
      this.shoppingListService.removeIngredient(this.editedItemIndex);
    }

    this.onClear();
  }

  ngOnDestroy(): void {
    this.ingredientEditStartedSub?.unsubscribe();
  }
}
