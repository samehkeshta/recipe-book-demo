import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule {}
