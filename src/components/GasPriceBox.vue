<template>
  <div class="box">
    <slot name="title"></slot>
    <slot name="description"></slot>

    <p class="price">
      <span class="stat value">{{ price }}</span>
      <span class="symbol">Gwei</span>
    </p>
    <p class="eth-price">
      <span class="value">{{ standardTxEthPrice(price) }}</span>
      <span class="symbol">ETH</span>
    </p>
    <p class="fiat-price">
      <span class="symbol">{{currency.symbol}}</span>
      <span class="value">{{ standardTxFiatPrice(price) }}</span>
    </p>
  </div>
</template>

<script>
import ethUnit from 'ethjs-unit'
import config from '@/config'

export default {
  name: 'GasPriceBox',
  props: {
    price: Number, // gas price in Gwei
    currency: Object,
    ethFiatPrice: Number //fiat price of eth in cents
  },
  data () {
    return {
    }
  },
  methods: {
    // tx price in fiat for gas price in Gwei
    standardTxEthPrice(gasPrice) {
      let amtWei = ethUnit.toWei(gasPrice, 'gwei') *
        config.gasLimits.transaction
      return ethUnit.fromWei(amtWei, 'ether')
    },
    // tx price in fiat for gas price in Gwei
    standardTxFiatPrice(gasPrice) {
      return this.txPrice(gasPrice, config.gasLimits.transaction)
    },
    // compute tx price in fiat for gas price in Gwei and gas limit
    txPrice(gasPrice, gasLimit) {
      let pricePerGwei = this.ethFiatPrice / 1000000000 // price in cents
      let txPrice = Math.floor(pricePerGwei * gasPrice * gasLimit) / 100
      return txPrice.toFixed(2)
    },
  }
}
</script>
