<template>
  <div class="section gas-price">
    <div class="container">
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
          </div>
        </div>
        <div class="column normal-price">
          <div class="box">
            <p class="title">Normal</p>
            <p>A good balance of speed and value</p>
            <p class="price stat">{{ normalPrice }}</p>
            <span class="stat-caption">Gwei</span>
          </div>
        </div>
        <div class="column high-price">
          <div class="box">
            <p class="title">Fast</p>
            <p>More expensive, but get your transaction confirmed fast</p>
            <p class="price stat">{{ highPrice }}</p>
            <span class="stat-caption">Gwei</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// Use EthGasStation API for now, switch to own API later
const GAS_STATION_API = 'https://ethgasstation.info/json/ethgasAPI.json'

export default {
  name: 'GasPrice',
  data () {
    return {
      // Sane defaults for gas price in Gwei
      lowPrice: 5,
      normalPrice: 20,
      highPrice: 60
    }
  },
  methods: {
    //Fetch gas prices and set them in data
    fetchPriceFromGasStation() {
      axios.get(GAS_STATION_API)
      .then(response => {
        let gasPrices = response.data
        this.lowPrice = gasPrices.safeLow / 10
        this.normalPrice = gasPrices.average / 10
        this.highPrice = gasPrices.fast / 10
      })
      .catch(e => console.log(e))
    }
  },
  mounted() {
    this.fetchPriceFromGasStation()
  }
}
</script>

<style scoped>
</style>
