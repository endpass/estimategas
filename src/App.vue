<template>
  <div id="app">

    <gas-price></gas-price>

    <gas-limit></gas-limit>

    <gas-faq></gas-faq>

    <page-footer></page-footer>
  </div>
</template>

<script>
import GasPrice from './components/GasPrice'
import GasLimit from './components/GasLimit'
import GasFaq from './components/GasFaq'
import PageFooter from './components/PageFooter'

export default {
  name: 'app',
  components: {
    GasPrice,
    GasLimit,
    GasFaq,
    PageFooter
  }
}
</script>

<style lang="scss">
// Variables
// Colors
$primary: #4b0472;
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
