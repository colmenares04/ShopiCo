import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entities';
import { Product } from 'src/products/entities/product.entities';

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: number;

    @ManyToOne(() => Order, (order) => order.items)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @Column()
    product_id: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    qty: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unit_price: number;
}