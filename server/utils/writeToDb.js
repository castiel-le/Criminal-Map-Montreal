const load = require("./load");
const csvFilePath = "./server/utils/criminalActs.csv";
const DAO = require("../db/conn");
const index = {"Geo": "2dsphere"}

//insert dataset json array to MongoDB
async function insertToDB(){
  try {
    const db = new DAO();
    console.log("Loading dataset")
    const jsonArray = await load(csvFilePath);
    console.log("finished!")
    await db.connect("CriminalRecord", "CiminalActs");
    console.log("connected")
    await db.insertMany(jsonArray);
    console.log("parsed")
    await db.createIndex(index)
    await db.disconnect();
  }catch (e) {
    console.error("Could not connect to db");
  }
}

module.exports = insertToDB;