
import { UserModel } from '../models/User';
import IUser from '../interfaces/IUser';
import { Service } from 'typedi';
import IApiResult from '../interfaces/IApiResult';
import { ApiResult } from '../controllers/ApiResult';
import { checkPasswordMatch, compareSyncPass, hashCode, sendTokenToClient } from '../helpers/auth';
import { CustomError } from '../helpers/Error';
import { Model } from 'mongoose';

@Service()
export class AuthService {
    protected Model: Model<IUser>;

    constructor() {
        this.Model = UserModel;
    }

    public async register(user: IUser): Promise<IApiResult> {
        try {
            const isPassMatched = checkPasswordMatch(user.password, user.re_password);

            if (!isPassMatched) {
                throw new CustomError('passwords do not match', 400);
            }

            const data = await this.Model.create({ ...user, password: hashCode(user.password) });
            const returnData = await this.Model.findOne({ _id: data._id });

            return new ApiResult(returnData);
        } catch (error) {
            throw error;
        }
    }

    public async login(user: IUser): Promise<IApiResult> {
        try {
            const dbUser = await this.Model.findOne({ email: user.email }).select('+password');

            if (!dbUser) {
                throw new CustomError('There is no such user', 401);
            } else {
                if (!compareSyncPass(user.password, dbUser.password)) {
                    throw new CustomError('Please check your password', 400);
                }
            }

            return new ApiResult({ user: dbUser, token: sendTokenToClient(dbUser) });
        } catch (error) {
            throw error;
        }
    }

    public async getUsers(): Promise<IApiResult> {
        try {
            const data = await this.Model.find();
            return new ApiResult(data);
        } catch (error) {
            throw error;
        }
    }
}
