const Moneyhub = require("../../src/index")
const config = require("../config")

const DEFAULT_BANK_ID = "1b3cd579899b5f5b666c15561a48c8b6" // dag bank
// const DEFAULT_BANK_ID = "fa37a6ecc38eea38bdf3dd0fdcb68fab" // monzo
const DEFAULT_STATE = "foo"
const DEFAULT_DATA_SCOPES =
  "accounts:read accounts:write transactions:read:all transactions:write categories:read categories:write"

console.log(
  "\n\nUsage: `node get-authorize-url.js bankId[optional] state[optional]` \n\n"
)

const [bankId = DEFAULT_BANK_ID, state = DEFAULT_STATE] = process.argv.slice(2)

if (!bankId) throw new Error("bank id needs to be provided")

const start = async () => {
  try {
    const moneyhub = await Moneyhub(config)
    const data = await moneyhub.getAuthorizeUrl({
      state,
      scope: `openid offline_access id:${bankId} ${DEFAULT_DATA_SCOPES}`,
    })
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

start()