import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entities';
import { OrderItem } from './entities/order-item.entities';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem])],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule { }
