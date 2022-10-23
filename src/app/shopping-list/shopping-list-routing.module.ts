import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from "./shopping-list.component";

const appRoutes: Routes = [
  {path: '', component: ShoppingListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule {}
