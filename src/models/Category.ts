import mongoose, { model, Schema } from 'mongoose';
import ICategory from '../interfaces/ICategory';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<ICategory>({
    ...base,
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

export const CategoryModel = model<ICategory>('Category', schema);
