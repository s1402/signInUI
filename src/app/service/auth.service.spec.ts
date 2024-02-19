import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { User } from '../common/enums/User';
import { Router } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { TokenDetails } from '../common/enums/TokenDetails';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let url: string;
  let mockUser: User;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule

      ],
      providers: [{ provide: Router, useValue: routerSpy }]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);

    url = "http://localhost:3000/api/auth/";
    mockUser = {
      username: 'harry',
      email: 'harry123@gmail.com',
      password: '3734@Aa12',
      isAdmin: "true"
    };

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.removeItem('token');
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a successful HTTP POST request to login a user', () => {
    const mockResponse = { token: 'mockToken' };

    service.login(mockUser).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(localStorage.getItem('token')).toBe(mockResponse.token);
    })

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(JSON.stringify(mockUser));

    req.flush(mockResponse);
  });

  it('should make HTTP POST call to login method and  throw an error', () => {

    service.login(mockUser).subscribe({
      error: (error: any) => {
        expect(error).toBeDefined();
        expect(error.statusText).toBe('UnAuthorised');
        expect(error.status).toBe(401);
      }
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe("POST");
    req.flush(null, { status: 401, statusText: 'UnAuthorised' });
  });

  it('should call logout method', () => {
    //Arrange
    localStorage.setItem('token', 'mocktoken');

    //Act
    service.logout();

    //Assert
    expect(localStorage.getItem('token')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should call isUserLoggedIn and return true', () => {

    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJlNjdiZThmYWJiMmU1YmYyYjdhZTciLCJ1c2VybmFtZSI6InNoaXYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDc2Nzc5OTJ9.ZqtQJc97BL-jCDb3__Ru2mktcsriD_1qmKTYU4FwDEY"

    //Arrange
    localStorage.setItem('token', mockToken);

    //Act
    const result = service.isUserLoggedIn();

    //Assert
    expect(result).toBeTrue();
  });

  it('should call http POST endpoint and register a User', () => {
    //ACT
    service.login(mockUser).subscribe((data) => {
      expect(data).toBeFalsy();
    })

    //ASSERT
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });

  it('should call getTokenDetails and return true', () => {

    //Arrange
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJlNjdiZThmYWJiMmU1YmYyYjdhZTciLCJ1c2VybmFtZSI6InNoaXYiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MDc2Nzc5OTJ9.ZqtQJc97BL-jCDb3__Ru2mktcsriD_1qmKTYU4FwD"
    localStorage.setItem('token', mockToken);
    const mockResponse: TokenDetails = { _id: '65be67be8fabb2e5bf2b7ae7', username: 'shiv', isAdmin: true, iat: 1707677992 };

    //Act
    const result = service.getTokenDetails();

    //Assert
    expect(result).toEqual(mockResponse);
  });
});
