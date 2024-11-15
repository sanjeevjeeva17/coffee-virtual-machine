import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OrderHistoryComponentComponent } from '../order-history-component/order-history-component.component';
import { ResourceOverviewComponent } from '../resource-overview/resource-overview.component';
import { ResourceService } from '../../services/resource.service';
import { ResourceValue } from '../../schema/model/resourceValue';
import { LoadResourcesDto } from '../../schema/dto/loadResourceDto';
import { ResourceHelperService } from '../../services/resource-helper.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    OrderHistoryComponentComponent,
    ResourceOverviewComponent,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  providers: [ResourceService, ResourceHelperService, OrderService],
})
export class AdminPanelComponent implements OnInit {
  resourceStatus = signal<ResourceValue>({
    almond: 0,
    skimmed: 0,
    soy: 0,
    whole: 0,
    sugar: 0,
    coffeeBean: 0,
    message: '',
  });

  constructor(private resourceService: ResourceService, private resourceHelperService: ResourceHelperService, private orderService: OrderService, private router: Router) {}

  orderHistory = signal<[]>([]);

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.resourceService.getResources().subscribe({
      next: (response) => {
        this.resourceStatus.set(response);
        console.log('Resource status updated:', response);
      },
      error: (error) => {
        console.log('Error fetching resources:', error.error.message);
      },
    });
    this.fetchOrderHistory();
  }

  fetchOrderHistory(): void {
    this.orderService.getOrderHistory().subscribe({
      next: (response) => {
        this.orderHistory.set(response);
      },
      error: (error) => {
        console.error('Error fetching order history:', error);
      },
    });
  }

  onLoadResource(): void {
    const payload: LoadResourcesDto = {
      milk: {
        soy: 2,
        almond: 2,
        whole: 2,
        skimmed: 2,
      },
      sugar: 1,
      coffeeBean: 1
    };

    this.resourceService.loadResources(payload).subscribe({
      next: (response) => {
        this.resourceStatus.set(this.resourceHelperService.checkResourceStatus(response));
        console.log('Resources loaded successfully:', response);
      },
      error: (error) => {
        console.error('Error loading resources:', error);
      },
    });
  }
}
