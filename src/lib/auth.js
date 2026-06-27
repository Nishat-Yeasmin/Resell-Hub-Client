import dns from "node:dns";
dns.setServers(["8.8.8.8","8.8.4.4"]);
import { betterAuth } from "better-auth";

import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);

console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI);
console.log("AUTH_DB_NAME:", process.env.AUTH_DB_NAME);

try {
  await client.connect();
  console.log("✅ Mongo Connected");
} catch (err) {
  console.error("❌ Mongo Error:", err);
}

await client.connect();

console.log("MONGO_DB_URI:", process.env.MONGO_DB_URI);
console.log("AUTH_DB_NAME:", process.env.AUTH_DB_NAME);

try {
  await client.connect();
  console.log("✅ Mongo Connected");
} catch (err) {
  console.error("❌ Mongo Error:", err);
}

const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({

     emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

   user:{
    additionalFields:{
      role:{
        defaultValue:"buyer"
      }
    }
  }
});