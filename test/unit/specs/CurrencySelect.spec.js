import { mount } from 'vue-test-utils'

import config from '@/config'
import CurrencySelect from '@/components/CurrencySelect'

describe('CurrencySelect', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CurrencySelect)
  })

  it('should contain a currency select element', () => {
    expect(wrapper.contains('select')).toBe(true)
  })

  it('should show default currency from config', () => {
    expect(wrapper.vm.selectedCurrency).toEqual(config.defaultCurrency)
    expect(wrapper.find('select').element.value).toEqual(config.defaultCurrency)
  })

  it('should emit an event when the currency changes', () => {
    let el = wrapper.find('select')
    el.element.value = 'CAD'
    el.trigger('change')
    expect(wrapper.emitted()['currency-selected']).toBeTruthy()
  })
})
