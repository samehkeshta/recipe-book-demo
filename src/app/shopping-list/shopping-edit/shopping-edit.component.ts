import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameInputElementRef?: ElementRef;
  @ViewChild('amountInput') amountInputElementRef?: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    this.ingredientAdded.emit(new Ingredient(nameInput.value, parseFloat(amountInput.value)));
  }

  addIngredientViewChild() {
    this.ingredientAdded.emit(
      new Ingredient(this.nameInputElementRef?.nativeElement.value, parseFloat(this.amountInputElementRef?.nativeElement.value))
      );
  }
}
