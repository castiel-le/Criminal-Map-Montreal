const express = require("express");
const router = express.Router();
const DAO = require("../db/conn");
const db = new DAO();

router.get("/all", async function(req, res){
  let allData = await db.findAll();
  return res.send(allData);
});

router.get("/:id", async function(req, res){
  if(req.params.id === undefined){
    console.log("No param")
    return res.sendStatus(404)
  } else{
    return res.send(await db.findOne(req.params.id))
  }
});

router.get("/rectangle", async function(req, res){
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
