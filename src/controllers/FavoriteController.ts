import { Post, Res, Get, Req, JsonController, Body, Param, Delete } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import IFavorite from '../interfaces/IFavorite';
import { FavoriteService } from '../services/FavoriteService';

@JsonController('/Favorite')
export class AuthController {
    private service: FavoriteService;
    constructor() {
        this.service = Container.get(FavoriteService);
    }

    @Post('/favorite')
    public async addToFavorites(@Body() favoriteProduct: IFavorite, @Res() res: Response, @Req() req: any): Promise<Response> {
         const result = await this.service.create(favoriteProduct, req.user);
        return res.json(result);
    }

    @Get('/favorites')
    public async getFavorites(@Res() res: Response, @Req() req: any): Promise<Response> {
        const result = await this.service.getAll(req.user.id);
        return res.json(result);
    }

    @Delete('/favorite/:id')
    public async deleteFavorite(@Res() res: Response, @Param('id') id: string): Promise<Response> {
        const result = await this.service.delete(id);
        return res.json(result);
    }
}
