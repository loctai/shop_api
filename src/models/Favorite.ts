import { model, Schema } from 'mongoose';
import IFavorite from '../interfaces/IFavorite';
import mongoose from 'mongoose';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<IFavorite>({
    ...base,
    user_id: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
});

export const FavoriteModel = model<IFavorite>('Favorite', schema);
