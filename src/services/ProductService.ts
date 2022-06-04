import { Model } from 'mongoose';
import IProduct from 'src/interfaces/IProduct';
import Container, { Service } from 'typedi';
import { ProductModel } from '../models/Product';
import IApiResult from '../interfaces/IApiResult';
import { ApiResult } from '../controllers/ApiResult';
import IUser from '../interfaces/IUser';
import { FavoriteService } from './FavoriteService';
import IComment from '../interfaces/IComment';
import { CommentService } from './CommentService';
import { getProductsQuery } from '../repository/Product';
import MetaService from '../utility/MetaService';

@Service()
export class ProductService extends MetaService<IProduct> {
  protected Model: Model<IProduct>;
  private favoriteService: FavoriteService;
  private commentService: CommentService;

  constructor() {
    super(ProductModel);
    this.favoriteService = Container.get(FavoriteService);
    this.commentService = Container.get(CommentService);
    this.Model = ProductModel;
  }

  //#region CreateProduct
  public async createProduct(product: IProduct): Promise<IApiResult> {
    try {
      const createdProduct = await this.Model.create(product);
      return new ApiResult(createdProduct);
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#region GetProducts
  public async getProducts(user: IUser, params?: any): Promise<IApiResult> {
    try {
      const products = await this.Model.aggregate(getProductsQuery({ user, params }));

      const data = products.length > 0 ? products[0].data : [];
      const meta = products.length > 0 ? products[0].meta : {};

      return new ApiResult(data, meta);
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#region GetProdcutsByCategory
  public async getProductsByCategory(user: IUser): Promise<IApiResult> {
    try {
      const equalsProductIdAndUser = [
        {
          $match: {
            $expr: {
              $and: [
                // prettier-ignore
                { $eq: ['$$product_id', '$product'] },
                { $eq: ['$user_id', user.id] },
              ],
            },
          },
        },
      ];

      const result = await this.Model.aggregate()
        .lookup({
          from: 'favorites',
          let: { product_id: '$_id' },
          as: 'is_favorite',
          pipeline: equalsProductIdAndUser,
        })
        .addFields({
          is_favorite: {
            $cond: [{ $eq: [{ $size: '$is_favorite' }, 0] }, false, true],
          },
        })
        .group({ _id: '$category', data: { $push: '$$ROOT' } })
        .project({ _id: 0, category: '$_id', products: '$data' })
        .lookup({
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        })
        .unwind({ path: '$category' });
      // .project({
      //  category: {
      //    _id: '$category._id',
      //    title: '$category.title',
      //    image: '$category.image',
      //    text: '$category.text',
      //  },
      //  products: 1,
      // })
      // .limit(10)
      // .sort({ category: 1 });

      return new ApiResult(result);
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#region GetProduct
  public async getProduct(id: string): Promise<IApiResult> {
    try {
      const dbProduct = await this.Model.findOne({ _id: id });
      return new ApiResult(dbProduct);
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#region DeleteProduct
  public async deleteProduct(productIds: Array<any>): Promise<IApiResult> {
    try {
      await this.Model.deleteMany({
        _id: {
          $in: productIds,
        },
      });
      await this.favoriteService.deleteByProductId(productIds);
      return new ApiResult({ message: 'Product deleted' });
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#region UpdateProduct
  public async updateProduct(
    id: string,
    product: IProduct
  ): Promise<IApiResult> {
    try {
      const updatedProduct = await this.Model.findOneAndUpdate(
        { _id: id },
        product,
        { new: true }
      );
      return new ApiResult(updatedProduct);
    } catch (error) {
      throw error;
    }
  }
  //#endregion

  //#region AddComment
  public async addCommentToProduct(comment: IComment): Promise<IApiResult> {
    try {
      this.commentService.createComment(comment);

      return new ApiResult({ message: 'Product deleted' });
    } catch (error) {
      throw error;
    }
  }
}
//#endregion
