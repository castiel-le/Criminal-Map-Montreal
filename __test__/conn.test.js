const mock = require("jest");
const request = require("supertest")
const app = require("../server/app");
const DAO = require("../server/db/conn");

jest.mock("../server/db/conn");

describe("Get a document from the db", () => {
    test("Should return only one document", async () => {
        let resultDoc = { "_id": "random"};
        jest.spyOn(DAO.prototype, "findSingleCase").mockResolvedValue(resultDoc);
        let response = await request(app).get("/case/random");
        expect(response.text).toEqual(JSON.stringify(resultDoc))
        expect(response.statusCode).toEqual(200);
        expect(response.type).toMatch("application/json")
    });
});
