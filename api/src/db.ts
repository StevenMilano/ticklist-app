import { MongoClient } from 'mongodb';

const {
  MONGO_URI = 'mongodb://0.0.0.0:27017/ticklist-api',
} = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();

client.connect();