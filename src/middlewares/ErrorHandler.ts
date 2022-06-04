import { NextFunction, Response, Request } from 'express';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { DbErrors } from '../helpers/dbErrors';

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(error: any, request: Request, response: Response, next: NextFunction): void {

    const error_name = error.name !== 'MongoError' ? error.name : error.code;
    let message = undefined;
    let validation_fields = undefined;
    let status = error.status || 500;

    switch (error_name) {
      case DbErrors.DUPLICATE_KEY:
        validation_fields = [...Object.keys(error.keyPattern)];
        message = 'Please check the relevant fields again.';
        status = 400;
        break;

      case DbErrors.DUPLICATE_KEY_2:
        validation_fields = [...Object.keys(error.keyPattern)];
        message = 'Please check the relevant fields again.';
        status = 400;
        break;

      case DbErrors.VALIDATION_ERROR:
        const returnData = [];
        const obj = error.errors;
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            returnData.push({ name: key, message: obj[key].message });
          }
        }
        validation_fields = returnData;
        status = 400;
        break;

      default:
        message = error.message;
        break;
    }

    return next(
      response.status(status).json({
        status: false,
        message,
        validation_fields,
        code: status,
      }));
  }
}
