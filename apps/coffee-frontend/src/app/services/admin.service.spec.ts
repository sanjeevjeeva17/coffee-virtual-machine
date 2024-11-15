import { TestBed } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environment/environment';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });

    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store tokens in session storage', () => {
    const mockResponse: { access_token: string; user: { username: string } } = {
      access_token: 'test_token',
      user: { username: 'test_user' }
    };

    service.login('test_user', 'test_password').subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(sessionStorage.getItem('access_token')).toBe(mockResponse.access_token);
      expect(sessionStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
    });

    const req = httpMock.expectOne(`${environment.apiEndpoint}auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'test_user', password: 'test_password' });
    req.flush(mockResponse);
  });

  it('should return the access token from session storage', () => {
    const token = 'test_token';
    sessionStorage.setItem('access_token', token);
    expect(service.getToken()).toBe(token);
  });
});
