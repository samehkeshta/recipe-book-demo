import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DropDownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    DropDownDirective,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropDownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    CommonModule
  ]
})
export class SharedModule {}
