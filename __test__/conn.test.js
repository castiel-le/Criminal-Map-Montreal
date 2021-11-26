const mock = require("jest");
const request = require("supertest")
const router = require("../server/routes/root");
const DAO = require("../server/db/conn");

jest.mock("../server/db/conn");
jest.setTimeout(15000);

describe("Get a document from the db", () => {
    test("Should return only one document", async () => {
        let resultDoc = { "_id": "619bd1864238d0d7f75994e9", "CATEGORIE": "Vol de véhicule à moteur", "DATE": "2020-10-12", "QUART": "nuit", "PDQ": "49", "Geo": { "type": "Point", "coordinates": [-73.49771442385476, 45.67852431721866] } };
        jest.spyOn(DAO.prototype, "findSingleCase").mockResolvedValue(resultDoc);
        let response = await request(router).get("/:id").query(
            "619bd1864238d0d7f75994e9"
        );
        expected(response.text).toMatch(resultDoc);
        expected(response.statusCode).toEqual(200);
    });
});
