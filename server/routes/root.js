const express = require("express");
const router = express.Router();
const DAO = require("../db/conn");
const db = new DAO();

router.get("/all", async function(req, res){
  await db.connect("CriminalRecord", "CriminalActs");
  let response = await db.findAll();
  return res.send(response);
});

router.get("/case/:id", async function(req, res){
  await db.connect("CriminalRecord", "CriminalActs");
  if(req.params.id === undefined){
    console.log("No param")
    return res.sendStatus(404)
  } else{
    try{
      let singleCase = await db.findSingleCase(req.params.id);
      console.dir(singleCase);
      return res.send(singleCase);
    } catch(e){
      return res.sendStatus(404)
    }
  }
});

router.get("/rectangle", async function(req, res){
  await db.connect("CriminalRecord", "CriminalActs");
  let neLat = req.params.neLat ? req.params.neLat : 0;
  let neLon = req.params.neLon ? req.params.neLon : 0;
  let swLat = req.params.swLat ? req.params.swLat : 0;
  let swLon = req.params.swLon ? req.params.swLon : 0;
  let polygon = await db.findPolygon(neLat, neLon, swLat, swLon);
  if(polygon === {}){
    return res.sendStatus(404)
  }
  return polygon;
})

module.exports = router;
