import { model, Schema } from 'mongoose';
import ICart from '../interfaces/ICart';
import mongoose from 'mongoose';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<ICart>({
    ...base,
    user_id: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
    ],
});

export const CartModel = model<ICart>('Cart', schema);
