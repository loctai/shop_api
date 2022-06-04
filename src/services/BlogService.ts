
import { Service } from 'typedi';
import { BlogModel } from '../models/Blog';

interface IBlog {
    title: string;
    text: string;
}

@Service()
export class BlogService {
    public async createBlog(blog: IBlog): Promise<any> {
        return await BlogModel.create(blog);
    }
}
