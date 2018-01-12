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

<style lang="scss">
// Variables
// Colors
$primary: #8e44ad;
$white: #ecf0f1;

// Global styles
.dark-bg {
  background: $primary;
  color: $white;

  .title, .subtitle {
    color: $white;
  }
}
</style>
