import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entities';
import { OrderItem } from './entities/order-item.entities';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemsRepository: Repository<OrderItem>,
    ) { }

    async create(orderData: any, userId: number) {
        const order = this.ordersRepository.create({
            user_id: userId,
            total: orderData.total,
            shipping_fee: orderData.shipping_fee || 10.0,
            discount: orderData.discount || 0,
            status: 'CONFIRMED',
            items: orderData.items.map((item: any) => ({
                product_id: item.product_id,
                qty: item.qty || 1,
                unit_price: item.unit_price
            }))
        });
        return await this.ordersRepository.save(order);
    }

    async findAllByUser(userId: number) {
        return await this.ordersRepository.find({
            where: { user_id: userId },
            relations: ['items', 'items.product'],
            order: { created_at: 'DESC' }
        });
    }
}
