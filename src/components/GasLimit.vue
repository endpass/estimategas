<template>
  <div class="section gas-limit">
    <div class="container">
      <h1 class="title">Gas Limit</h1>
      <p class="subtitle description">
      The gas limit depends on the complexity of the trasaction. It is
      higher if you are interacting with a smart contract, like a token from
      an ICO.
      </p>

      <div class="columns">
        <div class="column transaction-limit">
          <div class="gas-limit-box card">
            <div class="card-header">
            	<p class="box-title card-header-title is-centered">Simple Transaction</p>
            </div>
            <div class="card-content">
            	<p class="limit stat">{{ gasLimits.transaction }}</p>
            	<p>For sending ETH to another account</p>
            </div>
          </div>
        </div>
        <div class="column token-limit">
          <div class="gas-limit-box card">
            <div class="card-header">
            	<p class="box-title card-header-title is-centered">ICO Token</p>
            </div>
            <div class="card-content">
            	<p class="limit stat">{{ gasLimits.token }}</p>
            	<p>For sending or claiming ERC20 tokens</p>
            </div>
          </div>
        </div>
        <div class="column ens-limit">
          <div class="gas-limit-box card">
            <div class="card-header">
            	<p class="box-title card-header-title is-centered">ENS</p>
            </div>
            <div class="card-content">
            	<p class="limit stat">{{ gasLimits.ens }}</p>
            	<p>For registering an ENS domain or calling another complex
            	smart contract</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: 'GasLimit',
  data () {
    return {
      gasLimits: config.gasLimits

    }
  }
}
</script>

<style lang="scss">
.gas-limit-box {
	text-align: center;
	height: 100%;
}

.stat {
	display: block;
	font-weight: 600;
	font-size: 3rem;
}
.symbol {
	font-size: 0.8rem;
	text-transform: uppercase;
	font-weight: 600;
}
.value {
	margin: 0 0.2rem;
	font-size: 1.2rem;
	font-weight: 600;
}
</style>
