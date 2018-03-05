<template>
  <div class="gas-price-box card">
    <div class="card-header">
    	<div class="card-header-title is-centered">
    		<slot name="title"></slot>
    	</div>
    </div>

    <div class="card-content">
    	<p class="price">
    	  <span class="stat">{{ price }}</span>
    	  <span class="symbol">Gwei</span>
    	</p>
    </div>

    <div class="card-content card-description">
    	<slot name="description"></slot>
    </div>

    <div class="card-footer">
    	<p class="card-footer-item eth-price">
    	  <span class="value">{{ standardTxEthPrice(price) }}</span>
    	  <span class="symbol">ETH</span>
    	</p>
    	<p class="card-footer-item fiat-price">
    	  <span class="symbol">{{currency.symbol}}</span>
    	  <span class="value">{{ standardTxFiatPrice(price) }}</span>
    	</p>
    </div>
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

<style lang="scss">
.gas-price-box {
	display: flex;
	flex-direction: column;
	text-align: center;
	height: 100%;

	.card-footer {
		margin-top: auto;
	}
	.card-footer-item {
		align-items: baseline;
	}
}

.box-title {
	font-size: 1.4rem;
	font-weight: 400;
	text-transform: uppercase;
	color: #4b0472;
}

</style>
