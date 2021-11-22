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
  async createIndex(index) {
    return await this.collection.createIndex(index)
  }

  async findOne(id) {
    let result = await this.collection.findOne({ id: id });
    return result;
  }

  async findAll() {
    let result = await this.collection.find();
    return result.toArray();
  }

  async findPolygon(northELong, northELat, southWLong, southWLat) {
    let point1 = [southWLong, southWLat];
    let point2 = [southWLong, northELat];
    let point3 = [northELong, northELat];
    let point4 = [northELong, southWLat];
    let result = await this.collection.find({
      geo: {
        $geoWithin:
        {
          $geometry: {
            type: "Polygon",
            coordinates: [[point1, point2, point3, point4, point1]]
          }
        }
      }
    });
    return result.toArray();
  }
  //disconnect from MongoDB
  async disconnect() {
    this.client.close();
  }
}

module.exports = DAO;