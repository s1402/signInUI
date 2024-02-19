import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../common/validators/CustomValidators';
import { CustomError } from '../common/enums/CustomErrors';

@Component({
  selector: 'sign-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      localStorage.removeItem('token')
    }
  }

  login() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const user = this.form.value;
    this.authService.login(user).subscribe(
      {
        next: (response) => {
          if (response) {
            this.router.navigate(["home"]);
          }
        },
        error: (response) => {
          if (response.error['error']) {
            this.form.setErrors(response.error);
          }
          else {
            this.form.setErrors({ "error": CustomError.SERVER_IS_DOWN });
          }
        }
      }
    );
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}