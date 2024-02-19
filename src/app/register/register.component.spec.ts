import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../service/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../common/enums/User';
import { of, throwError } from 'rxjs';
import { CustomError } from '../common/enums/CustomErrors';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockUser: User;

  beforeEach(async () => {

    registerServiceSpy = jasmine.createSpyObj('RegisterService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [RegisterService, { provide: RegisterService, useValue: registerServiceSpy },
        { provide: Router, useValue: routerSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    registerServiceSpy = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    mockUser = {
      username: 'harry',
      email: 'harry123@gmail.com',
      password: '3734@Aa12',
      isAdmin: "true"
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("return from register method for invalid form", () => {
    // ARRANGE:
    // INVALID FORM
    component.form.controls['email'].setValue("");
    component.form.controls['username'].setValue("");
    component.form.controls['password'].setValue("");

    // ACT
    component.register();

    // ASSERT
    expect(registerServiceSpy.register).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.form.errors).toBeNull();
  })

  it("should register the user and navigate to login page : /", fakeAsync(() => {
    // ARRANGE:
    // Valid FORM
    component.form.setValue(mockUser);
    registerServiceSpy.register.and.returnValue(of(true));

    // ACT
    component.register();
    tick();

    // ASSERT
    expect(component.hideAlert).toBeFalse();
    tick(2000);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);

  }));

  it("should throw error from BE", fakeAsync(() => {
    // ARRANGE:
    // Valid FORM
    component.form.setValue(mockUser);
    const mockError = { error: { error: 'Error From BE' } }
    registerServiceSpy.register.and.returnValue(throwError(() => mockError));

    // ACT
    component.register();
    tick();

    // ASSERT
    expect(component.form.errors).toBe(mockError);
  }));

  it("should throw error SERVER_IS_DOWN", fakeAsync(() => {
    // ARRANGE:
    // Valid FORM
    component.form.setValue(mockUser);
    const mockError = { error: CustomError.SERVER_IS_DOWN }
    registerServiceSpy.register.and.returnValue(throwError(() => mockError));

    // ACT
    component.register();
    tick();

    // ASSERT
    expect(component.form.errors).toEqual(mockError);
  }));

  it("should call isAdmin and return true", () => {
    // ARRANGE:
    // Valid FORM
    component.form.setValue(mockUser);

    // ACT
    const isAdmin = component.isAdmin;

    // ASSERT
    expect(isAdmin).toBeTruthy();
  });

  it("should call closeAlert and hideAlert should become true", () => {
    // ARRANGE:
    component.hideAlert = false;

    // ACT
    component.closeAlert();

    // ASSERT
    expect(component.hideAlert).toBeTruthy();
  });
});
