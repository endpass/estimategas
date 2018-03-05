<template>
  <div class="gas-price">
    <div class="narrow section header dark-bg">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <p class="page-title">Ethereum Transaction Costs</p>
          </div>
          <div class="level-item is-hidden-touch">
            <p class="block-height">Block <span
               class="value">{{blockHeight}}</span></p>
          </div>
          <div class="level-item is-hidden-touch">
            <p class="unconfirmed-count"><span
               class="value">{{unconfirmedCount}}</span>Unconfirmed Transactions</p>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <currency-select @currency-selected="updateCurrency"></currency-select>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <h1 class="title">Gas Price</h1>
        <p class="subtitle description">
        The gas price, typically calculated in Gwei, changes depending on
        transaction activity in the Ethereum network.
        </p>
        <div class="columns">
          <div class="column low-price">
            <gas-price-box :currency="selectedCurrency" :price="lowPrice"
              :eth-fiat-price="ethFiatPrice">
              <p slot="title" class="box-title">Cheap</p>
              <p slot="description">The cheapest price likely to still get your transaction through</p>
            </gas-price-box>
          </div>

          <div class="column normal-price">
            <gas-price-box :currency="selectedCurrency" :price="normalPrice"
              :eth-fiat-price="ethFiatPrice">
              <p slot="title" class="box-title">Normal</p>
              <p slot="description">A good balance of speed and value</p>
            </gas-price-box>
          </div>

          <div class="column high-price">
            <gas-price-box :currency="selectedCurrency" :price="highPrice"
              :eth-fiat-price="ethFiatPrice">
              <p slot="title" class="box-title">Fast</p>
              <p slot="description">More expensive, but get your transaction confirmed fast</p>
            </gas-price-box>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ethUnit from 'ethjs-unit'

import config from '@/config'
import CurrencySelect from '@/components/CurrencySelect'
import GasPriceBox from '@/components/GasPriceBox'


export default {
  name: 'GasPrice',
  components: {
    CurrencySelect,
    GasPriceBox
  },
  data () {
    return {
      // Sane defaults for gas price in Gwei
      lowPrice: 5,
      normalPrice: 20,
      highPrice: 60,
      maxPrice: 60, //maximum price from blockcypher to sanity check
      ethFiatPrice: 0, // int eth price in cents
      selectedCurrency: {code: config.defaultCurrency},
      blockHeight: 0,
      unconfirmedCount: 0
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
        this.lowPrice = Math.floor(gasPrices.safeLow / 10)
        this.normalPrice = Math.floor(gasPrices.average / 10)
        // As sanity check, highPrice is averaged between multiple sources
        let highPrice = gasPrices.fast / 10
        this.highPrice = Math.floor((this.maxPrice + highPrice) / 2)
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
    fetchBlockInfo() {
      axios.get(config.endpoints.blockCypher)
      .then(response => {
        this.blockHeight = response.data.height
        this.unconfirmedCount = response.data.unconfirmed_count
        this.maxPrice =
          parseInt(ethUnit.fromWei(response.data.high_gas_price,'gwei'))
      })
      .catch(e => console.log(e))
    },
  },
  computed: {
    fiatCurrency() {
      return this.selectedCurrency.code
    }
  },
  mounted() {
    this.fetchBlockInfo()
    this.fetchPriceFromGasStation()
  }
}

</script>

<style lang="scss">
.page-title {
	font-size: 1.6rem;
}
</style>
