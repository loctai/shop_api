import { ObjectId } from 'mongoose';
export default interface ICart {
    _id?: string;
    user_id: string;
    products: Array<ObjectId>;
}
