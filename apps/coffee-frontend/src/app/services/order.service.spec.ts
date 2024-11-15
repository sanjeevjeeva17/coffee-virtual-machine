import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environment/environment';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService]
    });

    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get order history', () => {
    const mockOrderHistory = [
      { orderId: 1, item: 'Coffee', quantity: 2 },
      { orderId: 2, item: 'Tea', quantity: 1 }
    ];

    service.getOrderHistory().subscribe(orderHistory => {
      expect(orderHistory).toEqual(mockOrderHistory);
    });

    const req = httpMock.expectOne(`${environment.apiEndpoint}orders`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrderHistory);
  });

  it('should create an order', () => {
    const mockOrder = { orderId: 3, item: 'Espresso', quantity: 1 };
    const payload = { item: 'Espresso', quantity: 1 };

    service.createOrder(payload).subscribe(order => {
      expect(order).toEqual(mockOrder);
    });

    const req = httpMock.expectOne(`${environment.apiEndpoint}orders`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockOrder);
  });
});
