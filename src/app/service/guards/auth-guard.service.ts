
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean {

    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate([""])
    return false;
  }
}
