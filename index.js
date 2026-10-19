require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Missing MONGODB_URI. Add it to back/.env.");
  process.exit(1);
}

const client = new MongoClient(uri);

async function start() {
  try {
    await client.connect();
    await client.db().command({ ping: 1 });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exitCode = 1;
    await client.close();
  }
}

start();
