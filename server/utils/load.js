const csv = require("csvtojson")

module.exports = async function load(csvFilePath) {
    try {
        const jsonArray = await csv().fromFile(csvFilePath);
        jsonArray.forEach((element, index, object) => {
            let longitude = parseFloat(element["LONGITUDE"]);
            let latitude = parseFloat(element["LATITUDE"])
            if (longitude == 0 || latitude == 0) {
                object.splice(index, 1);
                return;
            }

            element.Geo = { "type": "Point", "coordinates": [longitude, latitude] };

            delete element["X"];
            delete element["Y"];
            delete element["LATITUDE"];
            delete element["LONGITUDE"];
        })
        return jsonArray;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}