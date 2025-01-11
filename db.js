const mongodb = require("mongodb");
const dotenv = require("dotenv").config();

let collection = null;
const uri = process.env.MONGO_URI;

const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function connectToDatabase() {
  try {
    if (!uri) {
      throw new Error("MONGO_URI is not defined in the .env file");
    }

    
     client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("learn");
    collection = database.collection("books");
    
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

// Call the connection function
connectToDatabase();
const db =client.db("learn")
// Export the collection asynchronously (after the connection is established)
module.exports = db;
