import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.ordersService.createOrder(orderData);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
