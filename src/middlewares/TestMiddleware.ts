
import { NextFunction } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class TestMiddleware implements ExpressMiddlewareInterface {
    public use(req: any, res: Response, next: NextFunction): void {
        next();
    }
}
