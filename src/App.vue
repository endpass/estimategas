<template>
  <div id="app">
    <gas-price/>

    <gas-limit/>
  </div>
</template>

<script>
import GasPrice from './components/GasPrice'
import GasLimit from './components/GasLimit'
import CurrencySelect from './components/CurrencySelect'

export default {
  name: 'app',
  components: {
    GasPrice,
    GasLimit,
    CurrencySelect
  }
}
</script>

<style>
#app {
}
</style>
