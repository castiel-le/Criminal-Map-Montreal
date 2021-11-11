const insertToDB = require("./utils/writeToDb")

//call insetToDB function to load the Atlas with dataset
async() =>{
  await insertToDB()
}