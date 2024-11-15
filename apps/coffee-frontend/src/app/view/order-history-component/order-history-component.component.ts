import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { OrdersModel } from '../../schema/model/orders.model';

@Component({
  selector: 'app-order-history-component',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './order-history-component.component.html',
  styleUrls: ['./order-history-component.component.scss'],
})
export class OrderHistoryComponentComponent {
  public displayedColumns: string[] = ['id', 'coffeeType', 'size', 'sugar', 'timestamp', 'milk'];

  @Input() orderHistory: OrdersModel[] = [];
}
