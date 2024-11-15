import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthDtoModel } from '../schema/dto/authDto.model';

@Injectable()
export class AdminService {
  private apiUrl: string = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<AuthDtoModel> {
    const loginPayload = { username, password };
    return this.http.post<AuthDtoModel>(this.apiUrl+'auth/login', loginPayload).pipe(
      tap(response => {
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  public getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
}
