const { test, expect } = require("@jest/globals")
const load = require("../server/utils/load")

test("get json file from csv file", async () => {
    let testobj = await load()
    expect(testobj[0]["LONGITUDE"]).toEqual("-73.62677804694519")
})