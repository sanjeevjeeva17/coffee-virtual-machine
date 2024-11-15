import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPanelComponent } from './admin-panel.component';
import { ResourceService } from '../../services/resource.service';
import { ResourceHelperService } from '../../services/resource-helper.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let resourceService: jest.Mocked<ResourceService>;
  let resourceHelperService: jest.Mocked<ResourceHelperService>;
  let orderService: jest.Mocked<OrderService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    resourceService = {
      getResources: jest.fn(),
      loadResources: jest.fn(),
    } as unknown as jest.Mocked<ResourceService>;

    resourceHelperService = {
      checkResourceStatus: jest.fn(),
    } as unknown as jest.Mocked<ResourceHelperService>;

    orderService = {
      getOrderHistory: jest.fn(),
    } as unknown as jest.Mocked<OrderService>;

    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [AdminPanelComponent, MatCardModule, MatTableModule, MatButtonModule, MatToolbarModule, HttpClientModule],
      providers: [
        { provide: ResourceService, useValue: resourceService },
        { provide: ResourceHelperService, useValue: resourceHelperService },
        { provide: OrderService, useValue: orderService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should clear session and navigate to dashboard on logout', () => {
    component.logout();
    expect(sessionStorage.length).toBe(0);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
