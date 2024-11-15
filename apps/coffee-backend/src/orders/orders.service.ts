import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const newOrder = this.orderRepository.create(orderData);
    return await this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
}
