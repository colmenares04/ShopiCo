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
        ];

        const products = this.productRepository.create(productsData);
        await this.productRepository.save(products);
        console.log('✅ Seed: 4 productos insertados correctamente.');
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }
}