import { mount } from 'vue-test-utils'
import moxios from 'moxios'

import config from '@/config'
import GasLimit from '@/components/GasLimit'

describe('GasLimit', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GasLimit)
  })

  it('should show a gas limit description', () => {
    expect(wrapper.contains('.gas-limit .description')).toBe(true)
    expect(wrapper.find('.gas-limit .description').text()).toBeTruthy()
  })

  it('should show gas limits from config', () => {
    checkValue('.transaction-limit .limit', config.gasLimits.transaction)
    checkValue('.token-limit .limit', config.gasLimits.token)
    checkValue('.ens-limit .limit', config.gasLimits.ens)
  })

  // check that a displayed price is equal to a data variable
  let checkValue = (selector, value) => {
    let el = wrapper.find(selector)
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe(value.toString())
  }
})
