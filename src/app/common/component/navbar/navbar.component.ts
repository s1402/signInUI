import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'sign-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService : AuthService, public route: Router ){}

  getActiveRoute() : string{
    return this.route.url;
  }
}
