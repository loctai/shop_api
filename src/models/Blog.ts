import { model, Schema } from 'mongoose';
import IBlog from '../interfaces/IBlog';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<IBlog>({
    ...base,
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

export const BlogModel = model<IBlog>('Blog', schema);
