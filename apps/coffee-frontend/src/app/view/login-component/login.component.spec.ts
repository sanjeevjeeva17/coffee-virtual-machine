import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let adminService: jest.Mocked<AdminService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    adminService = {
      login: jest.fn()
    } as unknown as jest.Mocked<AdminService>;

    router = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      providers: [
        { provide: AdminService, useValue: adminService },
        { provide: Router, useValue: router }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate form fields', () => {
    const username = component.loginForm.controls['username'];
    const password = component.loginForm.controls['password'];

    username.setValue('');
    password.setValue('');
    expect(component.loginForm.valid).toBeFalsy();

    username.setValue('invalid-email');
    expect(username.valid).toBeFalsy();
    username.setValue('test@example.com');
    expect(username.valid).toBeTruthy();

    password.setValue('12345');
    expect(password.valid).toBeFalsy();
    password.setValue('123456');
    expect(password.valid).toBeTruthy();
  });
});
