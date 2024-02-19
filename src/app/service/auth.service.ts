import { TokenDetails } from './../common/enums/TokenDetails';
import { Injectable } from '@angular/core';
import { User } from '../common/enums/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:3000/api/auth/";
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  })

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<Object> {
    return this.http.post(this.url, JSON.stringify(user), { headers: this.httpHeaders }).pipe(
      map((response: any) => {
        if (response && response['token']) {
          localStorage.setItem('token', response['token']);
          return true;
        }
        return false;
      }), catchError((error) => throwError(() => error))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate([""]);
  }

  isUserLoggedIn() {
    const JwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }
    return !JwtHelper.isTokenExpired(token);
  }

  getTokenDetails(): TokenDetails | null {
    const JwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return JwtHelper.decodeToken(token);
  }
}
