const LiveMartStorage = require("../livemart/livemart_storage").default
const LiveMart = require("../livemart/livemart").default

const BACKEND_URL =
  process.env.NEXT_PUBLIC_URL || "https://api.livemart.store"
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY
const APP_SECRET = process.env.NEXT_PUBLIC_APP_SECRET

const livemart = new LiveMart({
  api_url: BACKEND_URL,
  headers: {
    "store-key": APP_KEY,
    "store-secret": APP_SECRET
  }
})

const livemartStorage = new LiveMartStorage()

module.exports.livemart = livemart
module.exports.livemartStorage = livemartStorage
