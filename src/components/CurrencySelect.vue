<template>
  <div class="currency-select">
    <div class="select">
      <select v-model="selectedCurrency">
        <option v-for="curr in allCurrencies"
                :value="curr.code">{{curr.code}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import config from '@/config'

import currencies from '@/data/currencies.json'

export default {
  name: 'CurrencySelect',
  data () {
    return {
      allCurrencies: currencies,
      selectedCurrency: currencies[config.defaultCurrency]
    }
  }
}
</script>
