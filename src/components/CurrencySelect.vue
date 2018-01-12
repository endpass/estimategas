<template>
  <div class="currency-select">
    <div class="select">
      <select v-model="selectedCurrency" @change="currencySelected">
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
      selectedCurrency: config.defaultCurrency //currency code as string
    }
  },
  mounted () {
    this.loadCurrency()
    this.currencySelected()
  },
  methods: {
    loadCurrency() {
      let savedCurrency = this.$cookie.get('currency')
      this.selectedCurrency = savedCurrency || config.defaultCurrency
    },
    currencySelected() {
      this.$cookie.set('currency', this.selectedCurrency, 365)
      this.$emit('currency-selected',
      this.allCurrencies[this.selectedCurrency])
    }
  }
}
</script>
