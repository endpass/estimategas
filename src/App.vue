<template>
  <div id="app">

    <gas-price></gas-price>

    <gas-limit></gas-limit>

    <gas-faq></gas-faq>
  </div>
</template>

<script>
import GasPrice from './components/GasPrice'
import GasLimit from './components/GasLimit'
import GasFaq from './components/GasFaq'

export default {
  name: 'app',
  components: {
    GasPrice,
    GasLimit,
    GasFaq
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

.section.narrow {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
