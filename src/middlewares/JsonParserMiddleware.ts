import { json } from 'body-parser';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'before', priority: 2 })
export class JsonBodyParserMiddleware implements ExpressMiddlewareInterface {
    public use(request: any, response: any, next?: (err?: any) => any): any {
        return json()(request, response, next);
    }
}
