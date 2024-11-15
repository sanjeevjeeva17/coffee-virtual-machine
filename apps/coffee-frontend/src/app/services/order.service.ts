import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl: string = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  public getOrderHistory():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}orders`);
  }

  public createOrder(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}orders`, payload);
  }
}
