<template>
  <div id="app">

    <gas-price></gas-price>

    <gas-limit></gas-limit>
  </div>
</template>

<script>
import GasPrice from './components/GasPrice'
import GasLimit from './components/GasLimit'

export default {
  name: 'app',
  components: {
    GasPrice,
    GasLimit
  }
}
</script>

<style>
#app {
}
</style>
