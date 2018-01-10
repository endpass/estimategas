<template>
  <div class="section gas-price">
    <div class="container">
      <h1 class="title">Gas Price</h1>
      <p class="subtitle description">
      The gas price, typically calculated in Gwei, changes depending on
      transaction activity in the Ethereum network.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GasPrice',
  data () {
    return {
      // Sane defaults for gas price in Gwei
      lowPrice: 5,
      normalPrice: 20,
      highPrice: 60
    }
  }
}
</script>

<style scoped>
</style>
