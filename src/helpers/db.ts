import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose
    .connect(process.env.DBKEY, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('mongo db connect');
    });
};

export default connectDatabase;
