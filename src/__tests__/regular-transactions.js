/* eslint-disable max-nested-callbacks */
const Moneyhub = require("..")
const config = require("../../examples/config.local")
const {expect} = require("chai")

describe("Regular transactions", () => {
  let moneyhub
  const userId = config.testUserId

  before(async () => {
    moneyhub = await Moneyhub(config)
  })

  it("get regular transactions", async () => {
    const {data} = await moneyhub.getRegularTransactions({userId})
    expect(data.length).to.be.above(0)
    expect(data[0]).to.have.property("seriesId")
  })

})
