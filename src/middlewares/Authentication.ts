import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { CustomError } from '../helpers/Error';
import jwt from 'jsonwebtoken';

// Authentication middleware
@Middleware({ type: 'before' })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  public use(request: any, response: any, next: any): any {

    const nonSecurePaths = ['/api/Auth/login', '/api/Auth/register', '/api/upload', '/api/Product/testDb'];

    const headers = request.headers;
    const { authorization } = headers;

    if (nonSecurePaths.includes(request.path) || !request.path.startsWith('/api/')) { return next(); }

    if (!authorization) {
      return next(new CustomError('You are not authorized to access this address.', 401));
    } else {
      const token = (authorization as string).split(' ')[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return next(
            new CustomError(
              'You are not authorized to access this address.',
              401
            )
          );
        }

        request.user = decoded;
      });

    }
    next();
  }
}
