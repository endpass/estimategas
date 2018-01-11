// Use EthGasStation API for now, switch to own API later
const GAS_STATION_API = 'https://ethgasstation.info/json/ethgasAPI.json'
const CRYPTO_COMPARE_API = 'https://min-api.cryptocompare.com/data/price'

export default {
  endpoints: {
    gasStation: GAS_STATION_API,
    cryptoCompare: CRYPTO_COMPARE_API
  },
  // Standard gas limits
  gasLimits: {
    // Limit for standard transaction
    transaction: 21000,
    // Limit for ICO token
    token: 200000,
    // ENS or other complex smart contract
    ens: 500000
  },
  // Default currency for prices
  defaultCurrency: "USD",
  // Fiat currencies that are available
  currenciesAvailable: [
    "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", 
    "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK",
    "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD",
    "ZAR"]
}
