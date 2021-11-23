require("dotenv").config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient, ObjectId } = require("mongodb");

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
    //if db exist return 
    if (this.db) {
      return;
    }
    //Else connect to db
    await this.client.connect();
    //Create db
    this.db = await this.client.db(dbname);
    console.log("Successfully connected to MongoDB database " + dbname);
    //And create the collection 
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

  //Query for one document that has the the id gotten in input
  async findOne(id) {
    let result = await this.collection.findOne({ "id": ObjectId(id) });
    return result;
  }

  //Query for all the document in the collection
  async findAll() {
    let result = await this.collection.find();
    return result.toArray();
  }

  //Find all document in which the geo is inside the polygon 
  async findPolygon(neLong, neLat, swLong, swLat) {
    //Create variable as to not exceed the number of character possible in a line
    let point1 = [swLong, swLat];
    let point2 = [swLong, neLat];
    let point3 = [neLong, neLat];
    let point4 = [neLong, swLat];
    //Query to find all document in which the geo respect the query
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
    //return the array
    return result.toArray();
  }
  //disconnect from MongoDB
  async disconnect() {
    this.client.close();
  }
}

module.exports = DAO;