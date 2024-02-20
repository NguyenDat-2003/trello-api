import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from '~/config/environment';

//---Tạo một đối tượng trelloDatabaseInStance ban đầu là null
let trelloDatabaseInStance = null;

//---Khởi tạo một đối tượng client instance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const CONNECT_DB = async () => {
    //---GỌi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
    await mongoClientInstance.connect();
    trelloDatabaseInStance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const CLOSE_DB = async () => {
    // eslint-disable-next-line no-console
    console.log('Chay vao close db');
    await mongoClientInstance.close();
};

export const GET_DB = () => {
    if (!trelloDatabaseInStance)
        throw new Error('Must connect to Databse First');
    return trelloDatabaseInStance;
};
