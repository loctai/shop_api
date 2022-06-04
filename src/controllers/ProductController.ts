import { Res, Req, JsonController, Get, Body, Post, Param, Delete, Put, UseBefore, QueryParams } from 'routing-controllers';
import { Response } from 'express';
import { ProductService } from '../services/ProductService';
import Container from 'typedi';
import IProduct from '../interfaces/IProduct';
import { upload } from '../helpers/upload';
import { Db } from 'mongodb';
import { CustomError } from './../helpers/Error';
import { checkDataFields } from './../utility/checkDataFields';
import { UserProperties } from '../helpers/startDb';

@JsonController('/Product')
export class ProductController {

    private service: ProductService;
    constructor() {
        this.service = Container.get(ProductService);
    }

    @Get('/products')
    public async getProducts(@Res() res: Response, @Req() req: any, @QueryParams() params: any): Promise<Response> {
        const data = await this.service.getProducts(req.user, params);
        return res.json(data);
    }

    @Get('/productsByCategory')
    public async getProductsByCategory(@Res() res: Response, @Req() req: any): Promise<Response> {
        const data = await this.service.getProductsByCategory(req.user);
        return res.json(data);
    }

    @Get('/product/:id')
    public async getProduct(@Res() res: Response, @Param('id') id: string): Promise<Response> {
        const data = await this.service.getProduct(id);
        return res.json(data);
    }

    @Post('/product')
    @UseBefore(upload.fields([{ name: 'image', maxCount: 5 }, { name: 'other_images', maxCount: 5 }]))
    public async addProduct(@Body() product: any, @Res() res: Response): Promise<Response> {
        const data = await this.service.createProduct(product);
        return res.json(data);
    }

    @Put('/product/:id')
    public async updateProduct(@Body() product: IProduct, @Param('id') id: string, @Res() res: Response): Promise<Response> {
        const data = await this.service.updateProduct(id, product);
        return res.json(data);
    }

    @Get('/testDb')
    public async testProduct(@Res() res: Response, @Req() req: any): Promise<Response> {
        try {
            const db = req.db as Db;

            const data = {
                phone: '42323423',
                email: 'asdflkjl',
            };

            const check = checkDataFields(data, UserProperties);

            if (!check) {
                throw new CustomError('test', 400);
            }
            const result = await db.collection('users').insertOne(data);

            return res.json({ data: result });
        } catch (error) {
            throw error;
        }
    }

    @Delete('/products')
    public async deleteProduct(@Res() res: Response, @QueryParams() query: any): Promise<Response> {
        const data = await this.service.deleteProduct(query.productIds);
        return res.json(data);
    }
}
