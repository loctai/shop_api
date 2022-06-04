import { Controller, Post, Res, JsonController, Body } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import { BlogService } from '../services/BlogService';
import { ApiResult } from './ApiResult';

@Controller()
@JsonController()
export class BlogController {

    constructor(private blogService: BlogService = Container.get(BlogService)) { }

    @Post('/blog')
    public async register(@Body() blog: any, @Res() res: Response): Promise<Response> {
        const data = await this.blogService.createBlog(blog);
        return res.json(new ApiResult(data));
    }
}
