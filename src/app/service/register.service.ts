import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../common/enums/User';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url: string = "http://localhost:3000/api/users/";
  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  })

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<Object> {
    return this.http.post(this.url, JSON.stringify(user), { headers: this.httpHeaders }).pipe(
      map((response: any) => {
        if (response) {
          return true;
        }
        return false;
      }),
      catchError((error) => throwError(() => error)
      ));
  }

}
