/**
 * Test the load and read of the csv file
 * @author Castiel Le & Nael Louis
 */

const { test, expect } = require("@jest/globals")
const load = require("../utils/load.js")
const path = "./__test__/test.csv"

test("get json file from csv file", async () => {
  let testObj = await load(path)
  console.log(testObj[0])
  //Categorie is MÃ©fait because of the different encoding
  let expected = {
    "CATEGORIE": "MÃ©fait",
    "DATE": "2021-04-12",
    "QUART": "soir",
    "PDQ": "50",
    "Geo": {
      "type": "Point",
      "coordinates": [-73.62308621281647, 45.49686399748815]
    }
  }
  expect(testObj[0]).toMatchObject(expected)
})

test("validate the length of the array", async () => {
  let testObj = await load(path)
  console.log(testObj)
  expect(testObj.length).toEqual(2)
})

test("file does not exist", async () => {
  expect.assertions(1)
  try {
    await load("randompath")
  } catch (e) {
    expect(e.message).toMatch("ENOENT: no such file or directory, open 'randompath'")
  }
})

test("wrong format file", async () => {
  let testObj = await load("./__test__/random.txt")
  expect(testObj).toEqual([])
})