import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entities';
import { OrderItem } from './order-item.entities';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @Column('decimal', { precision: 10, scale: 2, default: 10.00 })
    shipping_fee: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
    discount: number; // 

    @Column({ default: 'PENDING' })
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    items: OrderItem[];
}