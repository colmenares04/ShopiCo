import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entities';

@Injectable()
export class ProductsService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }
    /*
    
    onApplicatiobBootsrap: Utilizado para la inyección del sed de la prueba técnica.
    */
    async onApplicationBootstrap() {
        await this.seed();
    }

    async seed() {
        const count = await this.productRepository.count();
        if (count > 0) return;

        const productsData = [
            {
                name: 'Apple Watch',
                description: 'Smartwatch de última generación',
                price: 98.10,
                image_url: 'https://picsum.photos/400/400?1',
            },
            {
                name: 'iPad Pro',
                description: 'Tablet profesional de alto rendimiento',
                price: 599.99,
                image_url: 'https://picsum.photos/400/400?2',
            },
            {
                name: 'Hoodie Blanca',
                description: 'Sudadera cómoda y moderna',
                price: 35.00,
                image_url: 'https://picsum.photos/400/400?3',
            },
            {
                name: 'Zapatillas Deportivas',
                description: 'Ideales para running',
                price: 79.99,
                image_url: 'https://picsum.photos/400/400?4',
            },
            {
                name: 'iPhone 15 Pro',
                description: 'Cámara de 48MP y cuerpo de titanio',
                price: 999.00,
                image_url: 'https://picsum.photos/400/400?5',
            },
            {
                name: 'MacBook Air M2',
                description: 'Potencia increíble en un diseño ultra delgado',
                price: 1099.00,
                image_url: 'https://picsum.photos/400/400?6',
            },
            {
                name: 'Audífonos Bluetooth',
                description: 'Cancelación de ruido activa y sonido Hi-Fi',
                price: 129.50,
                image_url: 'https://picsum.photos/400/400?7',
            },
            {
                name: 'Teclado Mecánico RGB',
                description: 'Switches brown para una escritura táctil',
                price: 85.00,
                image_url: 'https://picsum.photos/400/400?8',
            },
            {
                name: 'Monitor Gaming 4K',
                description: 'Frecuencia de actualización de 144Hz',
                price: 450.00,
                image_url: 'https://picsum.photos/400/400?9',
            },
            {
                name: 'Cámara Mirrorless',
                description: 'Captura tus momentos con calidad profesional',
                price: 850.00,
                image_url: 'https://picsum.photos/400/400?10',
            },
            {
                name: 'Mochila Impermeable',
                description: 'Compartimento acolchado para laptop',
                price: 45.99,
                image_url: 'https://picsum.photos/400/400?11',
            },
            {
                name: 'Lámpara de Escritorio LED',
                description: 'Temperatura de color ajustable y puerto USB',
                price: 29.99,
                image_url: 'https://picsum.photos/400/400?12',
            },
            {
                name: 'Mouse Ergonómico',
                description: 'Reduce la fatiga durante largas jornadas',
                price: 55.00,
                image_url: 'https://picsum.photos/400/400?13',
            },
            {
                name: 'Smart Speaker',
                description: 'Controla tu hogar con comandos de voz',
                price: 49.99,
                image_url: 'https://picsum.photos/400/400?14',
            },
        ];

        const products = this.productRepository.create(productsData);
        await this.productRepository.save(products);
        console.log('Productos insertados correctamente.');
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }
}