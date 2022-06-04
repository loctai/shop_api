import { Model, ObjectId } from 'mongoose';
// import { CustomError } from 'src/helpers/Error';
import { CategoryModel } from '../models/Category';
import { Service } from 'typedi';
import ICategory from '../interfaces/ICategory';
import { ApiResult } from '../controllers/ApiResult';
import IApiResult from '../interfaces/IApiResult';
import { CustomError } from '../helpers/Error';

@Service()
export class CategoryService {
    protected Model: Model<ICategory>;

    constructor() {
        this.Model = CategoryModel;
    }

    public async createCategory(category: ICategory): Promise<IApiResult> {
        try {
            const isIncludesInDb = await this.Model.findOne({ title: category.title });

            if (isIncludesInDb) {
                throw new CustomError('This field exists in the database!', 400);
            }

            const result = await this.Model.create(category);
            return new ApiResult(result);
        } catch (error) {
            throw error;
        }
    }

    public async deleteCategories(category_ids: Array<string>): Promise<IApiResult> {
        try {
            await this.Model.deleteMany({ _id: { $in: category_ids } });
            return new ApiResult('Deletion successful');
        } catch (error) {
            throw error;
        }
    }

    public async updateCategory(categoryId: string, category: ICategory): Promise<IApiResult> {
        try {
            const result = await this.Model.findOneAndUpdate({ _id: categoryId }, category, { new: true }); // prettier-ignore
            return new ApiResult(result);
        } catch (error) {
            throw error;
        }
    }

    public async getCategories(): Promise<IApiResult> {
        try {
            const result = await this.Model.find({}).populate('products');
            return new ApiResult(result);
        } catch (error) {
            throw error;
        }
    }

    public async addProductToCategory(product: ObjectId, category_id: string): Promise<IApiResult> {
        try {
            const result = await this.Model.updateOne({ _id: category_id }, {
                $push: {
                    products: product,
                },
            });
            return new ApiResult(result);
        } catch (error) {
            throw error;
        }
    }
}
