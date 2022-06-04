import { Post, Res, JsonController, Body } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/AuthService';
import IUser from '../interfaces/IUser';

@JsonController('/Comment')
export class CommentController {
    private service: AuthService;
    constructor() {
        this.service = Container.get(AuthService);
    }

    @Post('/register')
    public async register(@Body() user: IUser, @Res() res: Response): Promise<Response> {
        const result = await this.service.register(user);
        return res.json(result);
    }

    @Post('/login')
    public async login(@Body() user: IUser, @Res() res: Response): Promise<Response> {
        const result = await this.service.login(user);
        return res.json(result);
    }
}
