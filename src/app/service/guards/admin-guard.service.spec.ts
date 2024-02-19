import { TestBed } from '@angular/core/testing';

import { AdminGuardService } from './admin-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/enums/User';
import { of } from 'rxjs';
import { TokenDetails } from 'src/app/common/enums/TokenDetails';

describe('AdminGuardService', () => {
  let service: AdminGuardService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  authServiceSpy = jasmine.createSpyObj('AuthService', ['getTokenDetails']);
  routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: Router, useValue: routerSpy },
      { provide: AuthService, useValue: authServiceSpy }]
    });
    service = TestBed.inject(AdminGuardService);

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call canActivate and return true', () => {
    //ARRANGE 
    let mockTokenDetails: TokenDetails = {
      username: 'harry',
      iat: 1707677992,
      isAdmin: true
    };
    authServiceSpy.getTokenDetails.and.returnValue(mockTokenDetails);

    //ACT
    const canActivate = service.canActivate();

    //ASSERT
    expect(canActivate).toBeTruthy();
  });

  it('should call canActivate and return false and call router.navigate', () => {
    //ARRANGE 
    let mockTokenDetails: TokenDetails = {
      username: 'harry',
      iat: 1707677122,
      isAdmin: false
    };
    authServiceSpy.getTokenDetails.and.returnValue(mockTokenDetails);

    //ACT
    const canActivate = service.canActivate();

    //ASSERT
    expect(canActivate).toBeFalsy();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });
});
