export default interface IProduct {
    _id?: string;
    title: string;
    price: number;
    description: string;
    price_with_discount?: number;
    product_image: string;
    image_file?: FormData;
    category_id: string;
    category_name: string;
}
