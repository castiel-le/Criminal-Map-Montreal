/**
 * Routers with endpoint send corresponding set of data to Express Application server
 * Swaggers API Documentation for each endpoints
 * @author Castiel Le & Nael Louis
 */

/* eslint-disable max-len */
const express = require("express");
const router = express.Router();
const DAO = require("../db/conn");
const db = new DAO();
const cache = require("memory-cache");

/**
 * @swagger
 * /case/all:
 *   get:
 *     summary: Retrieve a list of Criminal Records
 *     description: Retrieve a list of Criminal Records of Montreal from 2015 until now (DO NOT EXECUTE THE QUERY HERE!!!)
 *     responses: 
 *       200:
 *         description: A list of Criminal Records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Object ID in MongoDB
 *                   example: "619d4fbf9ef2242d17fee333"
 *                 CATEGORIE:
 *                   type: string
 *                   description: Category of the crime
 *                   example: "Vol de véhicule à moteur"
 *                 DATE:
 *                   type: string
 *                   description: Date of the crime(YYYY-MM-DD)
 *                   example: "2018-09-13"
 *                 QUART:
 *                   type: string
 *                   description: Shift of the crime(jour, soir, nuit)
 *                   example: "jour"
 *                 PDQ:
 *                   type: string
 *                   description: The number of the police department in charge
 *                   example: "30"
 *                 Geo:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: type of the geospatial object
 *                       example: "Point"
 *                     coordinates:
 *                       type: number
 *                       description: coordinate of the crime scence
 *                       example: [-73.62677804694519, 45.567779812980355] 
 */
router.get("/all", async function (req, res) {
  await db.connect("CriminalRecord", "CriminalActs");
  //get from cache
  let response = cache.get("allDoc");
  //if cache empty
  if (!response) {
    //query the db
    response = await db.findAll();
    //put into cache for next time
    cache.put("allDoc", response);
  }
  return res.send(response);
});

/**
 * @swagger
 * /case/area/?neLon={neLon}&neLat={neLat}&swLon={swLon}&swLat={swLat}:
 *   get:
 *     summary: Retrieve a list of Criminal Records in a rectangle-shaped area
 *     description: Retrieve a list from the Criminal Records of Montreal from 2015 until now in a rectangle-shaped area
 *     parameters:
 *       - in: path
 *         name: neLat
 *         required: true
 *         description: North East Latitude of the area
 *         schema: 
 *           type: number
 *       - in: path
 *         name: neLon
 *         required: true
 *         description: North East Longitude of the area
 *         schema:
 *           type: number
 *       - in: path
 *         name: swLat
 *         required: true
 *         description: South West Latitude of the area
 *         schema:
 *           type: number
 *       - in: path
 *         name: swLon
 *         required: true
 *         description: South West Longitude of the area
 *         schema:
 *           type: number
 *     responses: 
 *       200:
 *         description: A case of Criminal Records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Object ID in MongoDB
 *                   example: "619d4fbf9ef2242d17fee333"
 *                 CATEGORIE:
 *                   type: string
 *                   description: Category of the crime
 *                   example: "Vol de véhicule à moteur"
 *                 DATE:
 *                   type: string
 *                   description: Date of the crime(YYYY-MM-DD)
 *                   example: "2018-09-13"
 *                 QUART:
 *                   type: string
 *                   description: Shift of the crime(jour, soir, nuit)
 *                   example: "jour"
 *                 PDQ:
 *                   type: string
 *                   description: The number of the police department in charge
 *                   example: "30"
 *                 Geo:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: type of the geospatial object
 *                       example: "Point"
 *                     coordinates:
 *                       type: number
 *                       description: coordinate of the crime scence
 *                       example: [-73.62677804694519, 45.567779812980355] 
 */
router.get("/area", async function (req, res) {
  await db.connect("CriminalRecord", "CriminalActs");
  //parse values to float
  let neLat = parseFloat(req.query.neLat)
  let neLon = parseFloat(req.query.neLon)
  let swLat = parseFloat(req.query.swLat)
  let swLon = parseFloat(req.query.swLon)
  let projection = { Geo: 1}
  try {
    //get the polygon from the cache
    let polygon = cache.get("rectangle" + neLat + swLon);
    //If it wasn't cached
    if (!polygon) {
      //get from the db
      polygon = await db.findPolygon(neLon, neLat, swLon, swLat, projection);
      //insert into cache for next time
      cache.put("rectangle" + neLat + swLon, polygon);
    }
    //polygon return empty cursor
    if (polygon === {}) {
      //send 404
      return res.sendStatus(404)
    }
    //else send polygon 
    return res.send(polygon);
  } catch (e) {
    return res.send(e.message)
  }
})


/**
 * @swagger
 * /case/{id}:
 *   get:
 *     summary: Retrieve a single case of Criminal Records
 *     description: Retrieve single case from the Criminal Records of Montreal from 2015 until now 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ObjectId of the case in MongoDB to retrieve
 *         schema: 
 *           type: string
 *     responses: 
 *       200:
 *         description: A case of Criminal Records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Object ID in MongoDB
 *                   example: "619d4fbf9ef2242d17fee333"
 *                 CATEGORIE:
 *                   type: string
 *                   description: Category of the crime
 *                   example: "Vol de véhicule à moteur"
 *                 DATE:
 *                   type: string
 *                   description: Date of the crime(YYYY-MM-DD)
 *                   example: "2018-09-13"
 *                 QUART:
 *                   type: string
 *                   description: Shift of the crime(jour, soir, nuit)
 *                   example: "jour"
 *                 PDQ:
 *                   type: string
 *                   description: The number of the police department in charge
 *                   example: "30"
 *                 Geo:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: type of the geospatial object
 *                       example: "Point"
 *                     coordinates:
 *                       type: number
 *                       description: coordinate of the crime scence
 *                       example: [-73.62677804694519, 45.567779812980355] 
 */
router.get("/:id", async function (req, res) {
  await db.connect("CriminalRecord", "CriminalActs");
  //check if the id is there
  if (req.params.id === undefined) {
    console.log("No param")
    //if it isn't send 404
    return res.sendStatus(404)
  } else {
    try {
      //get from cache
      let singleCase = cache.get("file" + req.params.id);
      //if doesn't exist in cache
      if (!singleCase) {
        //get from db
        singleCase = await db.findSingleCase(req.params.id);
        //put in chache
        cache.put("file" + req.params.id, singleCase);
      }
      return res.send(singleCase);
    } catch (e) {
      return res.send(e);
    }
  }
});

module.exports = router;
