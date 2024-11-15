import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetailDtoModel } from '../schema/dto/orderDetailDto.model';
import { CoffeeOrderDto } from '../schema/dto/coffeeOrderDto.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl: string = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  public getOrderHistory():Observable<OrderDetailDtoModel> {
    return this.http.get<OrderDetailDtoModel>(`${this.apiUrl}orders`);
  }

  public createOrder(payload: { item: string; quantity: number } | CoffeeOrderDto): Observable<CoffeeOrderDto> {
    return this.http.post<CoffeeOrderDto>(`${this.apiUrl}orders`, payload);
  }
}
