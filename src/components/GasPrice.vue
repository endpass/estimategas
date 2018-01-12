<template>
  <div class="section gas-price">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle">Ethereum Transaction Costs</p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <currency-select @currency-selected="updateCurrency"></currency-select>
          </div>
        </div>
      </div>

      <h1 class="title">Gas Price</h1>
      <p class="subtitle description">
      The gas price, typically calculated in Gwei, changes depending on
      transaction activity in the Ethereum network.
      </p>
      <div class="columns">
        <div class="column low-price">
          <div class="box">
            <p class="title">Cheap</p>
            <p>The cheapest price likely to still get your transaction
            through</p>
            <p class="price stat">{{ lowPrice }}</p>
            <span class="stat-caption">Gwei</span>
            <p class="fiat-price">
              <span class="symbol">{{selectedCurrency.symbol}}</span>
              <span class="value">{{ standardTxPrice(lowPrice) }}</span>
            </p>
          </div>
        </div>
        <div class="column normal-price">
          <div class="box">
            <p class="title">Normal</p>
            <p>A good balance of speed and value</p>
            <p class="price stat">{{ normalPrice }}</p>
            <span class="stat-caption">Gwei</span>
            <p class="fiat-price">
              <span class="symbol">{{selectedCurrency.symbol}}</span>
              <span class="value">{{ standardTxPrice(normalPrice) }}</span>
            </p>
          </div>
        </div>
        <div class="column high-price">
          <div class="box">
            <p class="title">Fast</p>
            <p>More expensive, but get your transaction confirmed fast</p>
            <p class="price stat">{{ highPrice }}</p>
            <span class="stat-caption">Gwei</span>
            <p class="fiat-price">
              <span class="symbol">{{selectedCurrency.symbol}}</span>
              <span class="value">{{ standardTxPrice(highPrice) }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import config from '@/config'
import CurrencySelect from '@/components/CurrencySelect'


export default {
  name: 'GasPrice',
  components: {
    CurrencySelect
  },
  data () {
    return {
      // Sane defaults for gas price in Gwei
      lowPrice: 5,
      normalPrice: 20,
      highPrice: 60,
      ethFiatPrice: 0, // int eth price in cents
      selectedCurrency: {code: config.defaultCurrency}
    }
  },
  methods: {
    updateCurrency(currency) {
      this.selectedCurrency = currency
      this.fetchFiatPrice()
    },

    //Fetch gas prices and set them in data
    fetchPriceFromGasStation() {
      axios.get(config.endpoints.gasStation)
      .then(response => {
        let gasPrices = response.data
        this.lowPrice = gasPrices.safeLow / 10
        this.normalPrice = gasPrices.average / 10
        this.highPrice = gasPrices.fast / 10
      })
      .catch(e => console.log(e))
    },

    // Fetch fiat price of eth from coinmarketcap
    fetchFiatPrice() {
      axios.get(config.endpoints.cryptoCompare,
      {
        params: {
          fsym: 'ETH',
          tsyms: this.fiatCurrency
        }
      })
      .then(response => {
        this.ethFiatPrice =
          parseInt(parseFloat(response.data[this.fiatCurrency]) *100)
      })
      .catch(e => console.log(e))
    },
    // compute tx price in fiat for gas price in Gwei and gas limit
    txPrice(gasPrice, gasLimit) {
      let pricePerGwei = this.ethFiatPrice / 1000000000 // price in cents
      return Math.floor(pricePerGwei * gasPrice * gasLimit) / 100
    },
    standardTxPrice(gasPrice) {
      return this.txPrice(gasPrice, config.gasLimits.transaction)
    }
  },
  computed: {
    fiatCurrency() {
      return this.selectedCurrency.code
    }
  },
  mounted() {
    this.fetchPriceFromGasStation()
  }
}

</script>

<style scoped>
</style>
