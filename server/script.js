/**
 * Script to call method to insert data into MongoDB
 * @author Castiel Le & Nael Louis
 */

const insertToDB = require("./utils/writeToDb");

/**
 * call insetToDB function to load the Atlas with dataset
 */
(async () => {
  await insertToDB()
})();
