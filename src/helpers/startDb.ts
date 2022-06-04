import { Db, CreateCollectionOptions } from 'mongodb';

export interface IIUser {
    phone: string;
    email: string;
}

export const UserProperties = {
    phone: {
        bsonType: 'string',
        description: 'must be a string and required',
    },
    email: {
        bsonType: 'string',
        pattern: '@mongodb/.com$',
        description: 'must be a string and match',
    },
} as CreateCollectionOptions;

export const startDb = async (mongoClient: Db) => {

    const isCollectionIncludes = await mongoClient.listCollections().toArray().then(docs => (
        docs.find((item: any) => item.name === 'users')
    ));

    const options: CreateCollectionOptions = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['phone', 'email'],
                properties: UserProperties,
            },
        },
    };

    if (!isCollectionIncludes) {
        mongoClient.createCollection('users', options);
    }
};
