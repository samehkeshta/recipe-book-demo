import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputElementRef?: ElementRef;
  @ViewChild('amountInput') amountInputElementRef?: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    this.shoppingListService.addIngredient(new Ingredient(nameInput.value, parseFloat(amountInput.value)));
  }

  addIngredientViewChild() {
    this.shoppingListService.addIngredient(
      new Ingredient(this.nameInputElementRef?.nativeElement.value, parseFloat(this.amountInputElementRef?.nativeElement.value))
      );
  }
}
