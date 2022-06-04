import IProduct from './IProduct';

export default interface IFavorite {
  _id?: string;
  user_id: string;
  product: IProduct;
}
