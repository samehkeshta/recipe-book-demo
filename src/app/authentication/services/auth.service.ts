import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { SignUpRequest, SignUpResponse } from '../models/signup.model';
import { User } from '../models/user.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any;

  user = new BehaviorSubject<User>(null);

  constructor(
    private httpClient: HttpClient,
    private router: Router) {}

  signup(request: SignUpRequest) {
    const url: string =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      environment.firbaseApiKey;

    return this.httpClient
      .post<SignUpResponse>(url, {
        email: request.email,
        password: request.password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        })
      );
  }

  login(request: LoginRequest) {
    const url: string =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      environment.firbaseApiKey;

    return this.httpClient
      .post<LoginResponse>(url, {
        email: request.email,
        password: request.password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);

    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occured!';

    if (!errorRes.error || !errorRes.error.error) {
      const err = new Error(errorMessage);
      return throwError(() => err);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user corresponding to this email.';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;

      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
    }

    const err = new Error(errorMessage);
    return throwError(() => err);
  }
}
