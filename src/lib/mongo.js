import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI;

if (!uri) {
  throw new Error("Missing MONGO_DB_URI");
}

let client = new MongoClient(uri);
let clientPromise = client.connect();

export default clientPromise;