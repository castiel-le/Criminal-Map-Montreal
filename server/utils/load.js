const csv = require("csvtojson")

module.exports = async function load() {
  try {
    const csvFilePath = "./server/utils/criminalActs.csv"
    const jsonArray = await csv().fromFile(csvFilePath);
    return jsonArray;
  }catch (err) {
    console.error(err.message);
    throw err;
  }
}