import IProduct from './IProduct';

export default interface ICategory {
    _id?: string;
    id?: string;
    title: string;
    image: string;
    products: [IProduct];
}
