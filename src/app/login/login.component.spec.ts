import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../common/enums/User';
import { of, throwError } from 'rxjs';
import { CustomError } from '../common/enums/CustomErrors';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockUser: User;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'isUserLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [{ provide: Router, useValue: routerSpy },
      { provide: AuthService, useValue: authServiceSpy }]
    })
      .compileComponents();
    mockUser = {
      username: 'harry',
      email: 'harry123@gmail.com',
      password: '3734@Aa12',
      isAdmin: "true"
    };

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // mock isUserLoggedIn to false:
    authServiceSpy.isUserLoggedIn.and.returnValue(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove the token from localstorage in ngOnInit ', fakeAsync(() => {
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJlNjgwZDhmYWJiMmU1YmYyYjdhZjQiLCJ1c2VybmFtZSI6InJhaiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDgwMjM3Mzh9.TKtro7zD6cFuSJ9--zV8GaM0CGZ-FtBkrk9k-xl7GJc"

    //ARRANGE
    localStorage.setItem('token', mockToken);
    authServiceSpy.isUserLoggedIn.and.returnValue(true);

    //ACT
    component.ngOnInit();
    tick();

    //ASSERT
    expect(localStorage.getItem('token')).toBeNull();
  }));

  it('should return as form is invalid', fakeAsync(() => {
    //ARRANGE
    authServiceSpy.login.and.returnValue(of(true));

    // InValid values for form
    component.form.controls['username'].setValue("");
    component.form.controls['password'].setValue("");

    //ACT
    component.login();

    //ASSERT
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it('should navigate to home if login is sucessful', fakeAsync(() => {
    //ARRANGE
    authServiceSpy.login.and.returnValue(of(true));

    // Valid values for form
    component.form.controls['username'].setValue(mockUser.username);
    component.form.controls['password'].setValue(mockUser.password);

    //ACT
    component.login();

    //ASSERT
    expect(routerSpy.navigate).toHaveBeenCalledWith(["home"]);
  }));

  it('should throw error from BE', fakeAsync(() => {
    //ARRANGE
    const errorResponse = { error: { error: 'Custom error' } };
    authServiceSpy.login.and.returnValue(throwError(() => errorResponse));

    // Valid values for form
    component.form.controls['username'].setValue(mockUser.username);
    component.form.controls['password'].setValue(mockUser.password);

    //ACT
    component.login();

    //ASSERT
    expect(component.form.errors).toBe(errorResponse.error)
  }));

  it('should throw error SERVER_IS_DOWN', fakeAsync(() => {
    //ARRANGE
    const errorResponse = { "error": CustomError.SERVER_IS_DOWN }
    authServiceSpy.login.and.returnValue(throwError(() => errorResponse));

    // Valid values for form
    component.form.controls['username'].setValue(mockUser.username);
    component.form.controls['password'].setValue(mockUser.password);

    //ACT
    component.login();

    //ASSERT
    expect(component.form.errors).toEqual(errorResponse);
  }));
});
