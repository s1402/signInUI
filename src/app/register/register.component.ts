import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { RegisterService } from '../service/register.service';
import { User } from '../common/enums/User';
import { Router } from '@angular/router';
import { CustomError } from '../common/enums/CustomErrors';

@Component({
  selector: 'sign-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(public registerService: RegisterService, private router: Router) { }

  hideAlert: boolean = true;

  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    isAdmin: new FormControl(false),
  });

  register() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const user: User = this.form.value;
    this.registerService.register(user).subscribe({
      next: ((response) => {
        if (response) {
          this.hideAlert = false;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000)
        }
      }),
      error: (response) => {
        if (response.error['error']) {
          this.form.setErrors(response);
        }
        else {
          this.form.setErrors({ "error": CustomError.SERVER_IS_DOWN });
        }
      }
    })
  }

  get email() {
    return this.form.get('email');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get isAdmin() {
    return this.form.get('isAdmin');
  }

  closeAlert() {
    this.hideAlert = true;
  }
}
