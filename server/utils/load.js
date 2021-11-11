const csv = require("csvtojson")

//read csv file using csvtojson library
module.exports = async function load(csvFilePath) {
  try {
    let jsonArray = await csv().fromFile(csvFilePath);
    jsonArray = jsonArray.filter((element) => {
      //parse the longitude and latitude from string to float
      let longitude = parseFloat(element["LONGITUDE"]);
      let latitude = parseFloat(element["LATITUDE"]);
      //check if the longitude and latitude is 0 and filter the one with 0 out
      /**
       * the csv provider put a 0 on the longtitude and/or 
       * latitude every criminal case which does not have one.
       */
      if (longitude === 0 || latitude === 0) {
        //remove the object with longitude and/or latitude of 0
        // object.splice(index, 1);
        return false;
      }

      //create geospatial object for quicker search
      element.Geo = { "type": "Point", "coordinates": [longitude, latitude] };

      //remove unecessary field from the object
      /**
       * The X and Y is special coordinate that will not be used.
       * The longitude and latitude are already on the geospatial object 
       * so they are removed because of redundency.
      */
      delete element["X"];
      delete element["Y"];
      delete element["LATITUDE"];
      delete element["LONGITUDE"];
      return true;
    })
    return jsonArray;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}