import { model, Schema } from 'mongoose';
import IComment from '../interfaces/IComment';
import mongoose from 'mongoose';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<IComment>({
    ...base,
    rating: {
        required: [true, 'You did not enter the product rating.'],
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    content: {
        required: [true, 'Enter the product content.'],
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const CommentModel = model<IComment>('Comment', schema);
