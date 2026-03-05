import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entities';
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password_hash: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}