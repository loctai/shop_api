import { Get, Post, Res, JsonController, Body } from 'routing-controllers';
import { Response } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/AuthService';
import IUser from '../interfaces/IUser';

@JsonController('/Auth')
export class AuthController {
    private service: AuthService;
    constructor() {
        this.service = Container.get(AuthService);
    }

    @Post('/register')
    public async register(@Body() user: IUser, @Res() res: Response): Promise<Response> {
        const result = await this.service.register(user);
        return res.json(result);
    }

    @Get('/test')
    public async testFunction(@Res() res: Response): Promise<Response> {
        return res.send('this is test function');
    }

    @Post('/login')
    public async login(@Body() user: IUser, @Res() res: Response): Promise<Response> {
        const result = await this.service.login(user);
        return res.json(result);
    }

    @Get('/getUsers')
    public async getUsers(@Res() res: Response): Promise<Response> {
        const result = await this.service.getUsers();
        return res.json(result);
    }
}
