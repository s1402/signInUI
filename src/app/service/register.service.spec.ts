import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../common/enums/User';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpTestingController: HttpTestingController;
  let url: string;
  let mockUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(RegisterService);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = 'http://localhost:3000/api/users/';
    mockUser = {
      username: 'harry',
      email: 'harry123@gmail.com',
      password: '3734@Aa12',
      isAdmin: "true"
    }
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http POST endpoint and register a User', () => {
    //ACT
    service.register(mockUser).subscribe((data) => {
      expect(data).toBeTruthy();
    })

    //ASSERT
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should call http POST endpoint and throw an error', () => {
    //ACT
    service.register(mockUser).subscribe(
      {
        error: (err) => {
          expect(err).toBeDefined();
          expect(err.status).toBe(400);
          expect(err.statusText).toBe('Bad Request');
        }
      }
    )

    //ASSERT
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(null, { status: 400, statusText: 'Bad Request' });
  });

  it('should call http POST endpoint and return false', () => {
    //ACT
    service.register(mockUser).subscribe((data) => {
      expect(data).toBeFalsy();
    })

    //ASSERT
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(null);
  });
});
