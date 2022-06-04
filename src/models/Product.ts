import mongoose, { model, Schema } from 'mongoose';
import IProduct from '../interfaces/IProduct';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<IProduct>({
    ...base,
    title: {
        type: String,
        required: [true, 'The product title is a required field.'],
        unique: [true, 'This product name already exists, please enter a different title.'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is a required field.'],
    },
    description: {
        type: String,
        required: [true, 'The product description is a required field.'],
    },
    price_with_discount: {
        type: Number,
        required: [true, 'Product price is a required field.'],
    },
    other_images: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
        default: 'default_product_img.jpg',
    },
    is_favorite: {
        type: Boolean,
        default: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
},
    {
        timestamps: true,
        versionKey: false,
        autoIndex: true,
    }
);

schema.index({ title: 'text', description: 'text' });

export const ProductModel = model<IProduct>('Product', schema);
