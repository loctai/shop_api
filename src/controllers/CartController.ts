import { Post, Res, Req, JsonController, Body, Delete, Param, Get } from 'routing-controllers';
import { Request, Response } from 'express';
import Container from 'typedi';
import { CartService } from '../services/CartService';

interface IRequest extends Request {
    user: any;
}
@JsonController('/Cart')
export class CartController {
    private service: CartService;

    constructor() {
        this.service = Container.get(CartService);
    }

    @Get('/')
    public async getCart(@Res() res: Response, @Req() req: any): Promise<Response> {
        const result = await this.service.getAll(req.user);
        return res.json(result);
    }

    @Post('/cart')
    public async addProductToCart(@Body() body: any, @Res() res: Response, @Req() req: any, next: any): Promise<Response> {
        const result = await this.service.addProductToCart(body.product_id, req.user);
        return res.json(result);
    }

    @Delete('/cart/:id')
    public async deleteCartItem(@Res() res: Response, @Param('id') id: string, @Req() req: IRequest): Promise<Response> {
        const result = await this.service.deleteProductFromCart(id, req.user);
        return res.json(result);
    }
}
