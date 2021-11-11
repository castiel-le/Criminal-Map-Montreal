require("dotenv").config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient } = require("mongodb");

//connecting to the database, creating a collection, inserting many, and disconnecting
let instance = null;

class DAO {
  //constructor for DAO object
  constructor() {
    if (!instance) {
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  //connect to MongoDB
  async connect(dbname, collName) {
    if (this.db) {
      return;
    }
    await this.client.connect();
    this.db = await this.client.db(dbname);
    console.log("Successfully connected to MongoDB database " + dbname);
    this.collection = await this.db.collection(collName)
  }

  //insert the parsed dataset into MongoDB 
  async insertMany(array) {
    let result = await this.collection.insertMany(array);
    console.log(result.insertedCount)
    return result.insertedCount;
  }

  //create indexers for collection
  async createIndex(index){
    return await this.collection.createIndex(index)
  }

  //disconnect from MongoDB
  async disconnect() {
    this.client.close();
  }
}

module.exports = DAO;