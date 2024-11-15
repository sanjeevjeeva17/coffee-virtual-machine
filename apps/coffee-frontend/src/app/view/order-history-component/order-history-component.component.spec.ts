import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoryComponentComponent } from './order-history-component.component';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { OrdersModel } from '../../schema/model/orders.model';

describe('OrderHistoryComponentComponent', () => {
  let component: OrderHistoryComponentComponent;
  let fixture: ComponentFixture<OrderHistoryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryComponentComponent, MatTableModule], // Standalone component should be imported, not declared
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHistoryComponentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
