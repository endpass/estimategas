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
          <div class="box">
            <p class="title">Simple Transaction</p>
            <p>For sending ETH to another account</p>
            <p class="limit stat">{{ gasLimits.transaction }}</p>
          </div>
        </div>
        <div class="column token-limit">
          <div class="box">
            <p class="title">ICO Token</p>
            <p>For sending or claiming ERC20 tokens</p>
            <p class="limit stat">{{ gasLimits.token }}</p>
          </div>
        </div>
        <div class="column ens-limit">
          <div class="box">
            <p class="title">ENS</p>
            <p>For registering an ENS domain or calling another complex
            smart contract</p>
            <p class="limit stat">{{ gasLimits.ens }}</p>
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
