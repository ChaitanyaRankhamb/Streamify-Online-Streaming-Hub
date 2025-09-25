import clientPromise from "./db";

export default async function getDB() {
  const client = await clientPromise;
  const db = client.db("Streamify - Online Streaming Hub");
  console.log("Connected to MongoDB");
  return db;
}