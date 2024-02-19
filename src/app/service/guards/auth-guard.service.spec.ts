import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/enums/User';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockUser: User;
  authServiceSpy = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);
  routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: Router, useValue: routerSpy },
      { provide: AuthService, useValue: authServiceSpy }]
    });
    service = TestBed.inject(AuthGuardService);
    mockUser = {
      username: 'harry',
      email: 'harry123@gmail.com',
      password: '3734@Aa12',
      isAdmin: "true"
    };

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call canActivate and return true', () => {
    //ARRANGE 
    authServiceSpy.isUserLoggedIn.and.returnValue(true);

    //ACT
    const canActivate = service.canActivate();

    //ASSERT
    expect(canActivate).toBeTruthy();
  });

  it('should call canActivate and return false and call router.navigate', () => {
    //ARRANGE 
    authServiceSpy.isUserLoggedIn.and.returnValue(false);

    //ACT
    const canActivate = service.canActivate();

    //ASSERT
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
    expect(canActivate).toBeFalsy();
  });
});
