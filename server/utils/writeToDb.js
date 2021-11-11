const load = require("./load");
const csvFilePath = "./server/utils/criminalActs.csv";
const DAO = require("../db/conn");

//insert dataset json array to MongoDB
async function insertToDB(){
  try {
    const db = new DAO();
    const jsonArray = await load(csvFilePath);
    await db.connect("CriminalRecord", "CiminalActs");
    await db.insertMany(jsonArray);
    await db.disconnect();
  }catch (e) {
    console.error("Could not connect to db");
  }
}

module.exports = insertToDB;