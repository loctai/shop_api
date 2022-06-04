import { model, Schema } from 'mongoose';
import IUser from '../interfaces/IUser';

const base = {
    createdAt: {
        type: Date,
        default: Date,
    },
};

const schema = new Schema<IUser>({
    ...base,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [
            true,
            'Email field is required',
        ],
        index: true,
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please enter a valid email address !',
        ],
    },
    phone: {
        type: String,
        required: [true,
            'This field is required'],
        unique: true,
        match: [
            /^[+]*[0-9]*[ ]{0,1}[(]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[)]{0,1}[ ]{0,1}[0-9]{1,3}[ ]{0,1}[0-9]{2}[ ]{0,1}[0-9]{2}[ ]{0,1}[-\.\/]{0,1}[ ]{0,1}[0-9]{1,5}$/g,
            'Please enter a valid phone number',
        ],
    },
    avatar: {
        type: String,
        default: 'default.jpg',
    },
    password: {
        required: true,
        type: String,
        select: false,
        minlength: 6,
    },
});

export const UserModel = model<IUser>('User', schema);
