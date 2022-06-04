import { Service } from 'typedi';
import IApiResult from '../interfaces/IApiResult';
import { ApiResult } from '../controllers/ApiResult';
import { Model } from 'mongoose';
import IFavorite from '../interfaces/IFavorite';
import IUser from '../interfaces/IUser';
import { FavoriteModel } from '../models/Favorite';
import { CustomError } from '../helpers/Error';

@Service()
export class FavoriteService {
  protected Model: Model<any>;

  constructor() {
    this.Model = FavoriteModel;
  }

  public async create(
    favoriteProduct: IFavorite,
    user: IUser
  ): Promise<IApiResult> {
    try {
      const dbData = {
        user_id: user.id,
        product: favoriteProduct.product,
      };

      const isInclude = await this.Model.findOne({
        user_id: user.id,
        product: favoriteProduct.product,
      });

      if (isInclude) {
        throw new CustomError('Product already in favorites', 400);
      }

      const result = await this.Model.create(dbData);
      return new ApiResult(result);
    } catch (error) {
      throw error;
    }
  }

  public async getAll(userId: string): Promise<IApiResult> {
    try {
      const result = await this.Model.find({ user_id: userId })
        .select('-user_id')
        .populate('product');
      return new ApiResult(result);
    } catch (error) {
      throw error;
    }
  }

  public async deleteByProductId(productIds: Array<string>): Promise<any> {
    try {
      await this.Model.deleteMany({
        _id: {
          $in: productIds,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string): Promise<IApiResult> {
    try {
      if (!id) {
        throw new CustomError('Id is required', 400);
      }
      await this.Model.findOneAndDelete({ product: id });
      return new ApiResult(undefined);
    } catch (error) {
      throw error;
    }
  }
}
