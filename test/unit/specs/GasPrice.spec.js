import { mount } from 'vue-test-utils'
import moxios from 'moxios'

import config from '@/config'
import GasPrice from '@/components/GasPrice'

describe('GasPrice', () => {
  let wrapper
  let expectedPrices = {
    lowPrice: 24,
    normalPrice: 30,
    highPrice: 90
  }

  beforeEach(() => {
    moxios.install()

    moxios.stubRequest(config.endpoints.gasStation, {
      status: 200,
      response: {
        safeLow: 240.0,
        average: 300.0,
        fast: 900.0
      }
    })

    wrapper = mount(GasPrice)

  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should show a gas price description', () => {
    expect(wrapper.contains('.gas-price .description')).toBe(true)
    expect(wrapper.find('.gas-price .description').text()).toBeTruthy()
  })

  it('should show default prices before fetching updates', () => {
    let vm = wrapper.vm
    // empty method to not stub ajax every time
    wrapper.setMethods({
      fetchPriceFromGasStation: () => {}
    })

    checkValue('.low-price .price', vm.lowPrice)
    checkValue('.normal-price .price', vm.normalPrice)
    checkValue('.high-price .price', vm.highPrice)
  })

  it('should update prices from gas station api', (done) => {
    moxios.wait( () => {
      checkValue('.low-price .price', expectedPrices.lowPrice)
      checkValue('.normal-price .price', expectedPrices.normalPrice)
      checkValue('.high-price .price', expectedPrices.highPrice)
      done()
    })
  })

  // check that a displayed price is equal to a data variable
  let checkValue = (selector, value) => {
    let el = wrapper.find(selector)
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe(value.toString())
  }

})
