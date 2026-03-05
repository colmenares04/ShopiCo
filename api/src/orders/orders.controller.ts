import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() orderData: any, @Req() req: any) {
        return this.ordersService.create(orderData, req.user.userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Req() req: any) {
        return this.ordersService.findAllByUser(req.user.userId);
    }
}
