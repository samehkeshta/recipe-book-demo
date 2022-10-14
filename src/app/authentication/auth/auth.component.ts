import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.login(form.value).subscribe((resData) => {
        form.reset();
        this.handleSuccess();
      }, (errMessage) => this.handleError(errMessage));
    } else {
      this.authService.signup(form.value).subscribe((resData) => {
        form.reset();
        this.handleSuccess();
      }, (errMessage) => this.handleError(errMessage));
    }
  }

  private handleSuccess() {
    this.isLoading = false;
    this.error = null;

    this.router.navigate(['./recipes']);
  }

  private handleError(errMessage: string) {
    this.error = errMessage;
    this.isLoading = false;
  }
}
