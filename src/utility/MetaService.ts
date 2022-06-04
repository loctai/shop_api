import { Model } from 'mongoose';

export default class MetaService<T> {
  public DbModel: Model<T>;

  constructor(model: Model<any>) {
    this.DbModel = model;
  }

  public async createMetaData(params: any): Promise<any> {
    const total_count = await this.DbModel.countDocuments();

    const pages = Math.ceil(total_count / Number(params.limit));
    const page = Number(params.skip) / Number(params.limit) + 1;

    return {
      pages,
      page,
      total_count,
    };
  }
}
