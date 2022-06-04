import { Post, Res, JsonController, Body, UseBefore, Get, Put, Delete, QueryParams, Param } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import { CategoryService } from '../services/CategoryService';
import ICategory from '../interfaces/ICategory';
import { upload } from '../helpers/upload';
import { ObjectId } from 'mongoose';

interface IAddProduct {
    product_id: ObjectId;
    category_id: string;
}

@JsonController('/Category')
export class CategoryController {
    private service: CategoryService;
    constructor() {
        this.service = Container.get(CategoryService);
    }

    @Post('/category')
    @UseBefore(upload.single('image'))
    public async createCategory(@Body() category: ICategory, @Res() res: Response): Promise<Response> {
        const result = await this.service.createCategory(category);
        return res.json(result);
    }

    @Get('/categories')
    public async getCategories(@Res() res: Response): Promise<Response> {
        const result = await this.service.getCategories();
        return res.json(result);
    }

    @Put('/addProduct')
    public async addProductToCategory(@Body() body: IAddProduct, @Res() res: Response): Promise<Response> {
        const { product_id, category_id } = body;
        const result = await this.service.addProductToCategory(product_id, category_id);
        return res.json(result);
    }

    @Put('/updateCategory/:categoryId')
    @UseBefore(upload.single('image'))
    public async updateCategory(@Param('categoryId') category_id: string, @Body() category: ICategory, @Res() res: Response): Promise<Response> {
        const result = await this.service.updateCategory(category_id, category);
        return res.json(result);
    }

    @Delete('/deleteCategory')
    public async deleteCategories(@Res() res: Response, @QueryParams() query: any): Promise<Response> {
        const result = await this.service.deleteCategories(query.categoryIds);
        return res.json(result);
    }
}
