import { AuthService } from './../auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    if (this.authService.getTokenDetails()?.isAdmin) {
      return true;
    }
    this.router.navigate(['home']);
    return false;
  }
}
