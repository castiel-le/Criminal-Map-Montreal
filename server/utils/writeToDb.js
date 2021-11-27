/**
 * Perform data insertion to MongoDB
 * @author Castiel Le & Nael Louis
 */

const load = require("./load");
const csvFilePath = "./server/utils/criminalActs.csv";
const DAO = require("../db/conn");
const index = { "Geo": "2dsphere" }

/**
 * insert dataset json array to MongoDB
 */
async function insertToDB() {
  try {
    //create DAO object
    const db = new DAO();
    console.log("Loading dataset")
    //Load the json array from the file
    const jsonArray = await load(csvFilePath);
    console.log("finished!")
    //Connect or create the database and collection
    await db.connect("CriminalRecord", "CriminalActs");
    console.log("connected")
    //insert the data we got from the file
    await db.insertMany(jsonArray);
    console.log("parsed")
    await db.createIndex(index)
    //Disconnect the db
    await db.disconnect();
  } catch (e) {
    console.error("Could not connect to db");
  }
}

module.exports = insertToDB;