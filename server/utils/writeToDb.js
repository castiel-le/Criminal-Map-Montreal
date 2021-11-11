const load = require("./load");
const csvFilePath = "./criminalActs";
const DAO = require("../db/conn");

(async () => {
  try {
    const db = new DAO();
    const jsonArray = await load(csvFilePath);
    await db.connect("CriminalRecord", "CiminalActs");
    await db.insertMany(jsonArray);
  }catch (e) {
    console.error("Could not connect to db");
  }
})();