import { Service } from 'typedi';
import IApiResult from '../interfaces/IApiResult';
import { ApiResult } from '../controllers/ApiResult';
import { Model } from 'mongoose';
import { CommentModel } from '../models/Comment';
import IComment from '../interfaces/IComment';

@Service()
export class CommentService {
    protected Model: Model<IComment>;

    constructor() {
        this.Model = CommentModel;
    }

    public async createComment(comment: IComment): Promise<IApiResult> {
        try {
            const commentData = await this.Model.create(comment);
            return new ApiResult({ message: 'Comment created', data: commentData });
        } catch (error) {
            throw error;
        }
    }
}
