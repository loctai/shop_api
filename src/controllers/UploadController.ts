import { Controller, Post, Res, JsonController, UploadedFile, UploadedFiles } from 'routing-controllers';
import { Response } from 'express';
import { upload } from '../helpers/upload';
import { ApiResult } from './ApiResult';
import IApiResult from '../interfaces/IApiResult';

@Controller('/Upload')
@JsonController()
export class UploadController {
    @Post('/file')
    public saveFile(@UploadedFile('photo', { options: upload }) file: any, @Res() res: Response): Response<IApiResult> {
        return res.json(new ApiResult({}));
    }

    @Post('/files')
    public saveFiles(@UploadedFiles('photos', { options: upload }) file: any, @Res() res: Response): Response<IApiResult> {
        return res.json(new ApiResult({}));
    }
}
