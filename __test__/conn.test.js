const mock = require("jest");
const request = require("supertest")
const app = require("../server/app");
const DAO = require("../server/db/conn");

jest.mock("../server/db/conn");

describe("Get /:id", () => {
    test("Should return only one document", async () => {
        let resultDoc = { "_id": "random" };
        jest.spyOn(DAO.prototype, "findSingleCase").mockResolvedValue(resultDoc);
        let response = await request(app).get("/case/random");
        expect(response.text).toEqual(JSON.stringify(resultDoc))
        expect(response.statusCode).toEqual(200);
        expect(response.type).toMatch("application/json")
    });
});

describe("Get an area", () => {
    test("Should return every case within the given area", async () => {
        let resultDoc = { "_id": "random" };
        jest.spyOn(DAO.prototype, "findPolygon").mockResolvedValue(resultDoc);
        let response = await request(app).get("/case/area/?neLon=-73.7021255493164&neLat=45.46205707250824&swLon=-73.53973388671875&swLat=45.54555282705949");
        expect(response.text).toEqual(JSON.stringify(resultDoc))
        expect(response.statusCode).toEqual(200);
        expect(response.type).toMatch("application/json")
    });
});

describe("Get all", () => {
    test("Should return all documents", async () => {
        let resultDoc = { "_id": "random" };
        jest.spyOn(DAO.prototype, "findAll").mockResolvedValue(resultDoc);
        let response = await request(app).get("/case/al");
        console.log(response.body);
        expect(response.text).toEqual(JSON.stringify(resultDoc))
        expect(response.statusCode).toEqual(200);
        expect(response.type).toMatch("application/json")
    });
});