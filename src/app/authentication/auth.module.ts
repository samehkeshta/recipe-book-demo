import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    FormsModule,
    AuthenticationRoutingModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
