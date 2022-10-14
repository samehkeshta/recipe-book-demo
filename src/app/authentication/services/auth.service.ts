import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { SignUpRequest, SignUpResponse } from '../models/signup.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey: string = 'AIzaSyDp1lsfIvoIIJG-efK5jtjQZ8bf0hYzCOE';
  user = new Subject<User>();

  constructor(private httpClient: HttpClient) {}

  signup(request: SignUpRequest) {
    const url: string =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      this.apiKey;

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
      this.apiKey;

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

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
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
