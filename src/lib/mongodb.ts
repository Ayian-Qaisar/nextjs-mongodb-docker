import { MongoClient } from "mongodb";

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

const options = {};

const client = new MongoClient(uri, options);
const clientPromise = global._mongoClientPromise || client.connect();

global._mongoClientPromise = clientPromise;

export default clientPromise;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
