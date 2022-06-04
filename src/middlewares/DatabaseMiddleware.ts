import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { mongodbClient } from '../index';

@Middleware({ type: 'before' })
export class DatabaseMiddleware implements ExpressMiddlewareInterface {
    public use(request: any, response: any, next?: (err?: any) => any): any {
        request.db = mongodbClient.db('beauty-center');
        next();
    }
}
