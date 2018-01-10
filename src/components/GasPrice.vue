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
          </div>
        </div>
        <div class="column normal-price">
          <div class="box">
            <p class="title">Normal</p>
            <p>A good balance of speed and value</p>
            <p class="price stat">{{ normalPrice }}</p>
          </div>
        </div>
        <div class="column high-price">
          <div class="box">
            <p class="title">Fast</p>
            <p>More expensive, but get your transaction confirmed fast</p>
            <p class="price stat">{{ highPrice }}</p>
          </div>
        </div>
      </div>
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
