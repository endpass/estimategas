import { mount } from 'vue-test-utils'
import moxios from 'moxios'

import config from '@/config'
import GasPrice from '@/components/GasPrice'

describe('GasPrice', () => {
  let expectedPrices = {
    lowPrice: 24,
    normalPrice: 30,
    highPrice: 90
  }

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('should show a gas price description', () => {
    let wrapper = mount(GasPrice)
    expect(wrapper.contains('.gas-price .description')).toBe(true)
    expect(wrapper.find('.gas-price .description').text()).toBeTruthy()
  })

  it('should show default prices before fetching updates', () => {
    let wrapper = mount(GasPrice)
    let vm = wrapper.vm
    // empty method to not stub ajax every time
    wrapper.setMethods({
      fetchPriceFromGasStation: () => {}
    })

    checkValue(wrapper, '.low-price .price', vm.lowPrice)
    checkValue(wrapper, '.normal-price .price', vm.normalPrice)
    checkValue(wrapper, '.high-price .price', vm.highPrice)
  })

  it('should update prices from gas station api', (done) => {
    moxios.stubRequest(config.endpoints.gasStation, {
      status: 200,
      response: {
        safeLow: 240.0,
        average: 300.0,
        fast: 900.0
      }
    })
    // moxios request MUST be stubbed before wrapper is mounted
    let wrapper = mount(GasPrice)
    moxios.wait( () => {
      checkValue(wrapper, '.low-price .price', expectedPrices.lowPrice)
      checkValue(wrapper, '.normal-price .price', expectedPrices.normalPrice)
      checkValue(wrapper, '.high-price .price', expectedPrices.highPrice)
      done()
    })
  })

  it('should have a default fiat currency', () => {
    let wrapper = mount(GasPrice)
    expect(wrapper.vm.fiatCurrency).toEqual(config.defaultCurrency)
  })

  it('should get eth fiat price from cryptocompare', (done) => {
    moxios.stubRequest(/cryptocompare.com\/data\/price/, {
      status: 200,
      response: {
        USD: 1200.31
      }
    })
    // moxios request MUST be stubbed before wrapper is mounted
    let wrapper = mount(GasPrice)
    moxios.wait( () => {
      expect(wrapper.vm.ethFiatPrice).toEqual(120031)
      done()
    })
  })

  it('should correctly calculate tx fiat price', () => {
    let wrapper = mount(GasPrice)
    wrapper.setData({ethFiatPrice: 120031})
    expect(wrapper.vm.txPrice(20,21000)).toEqual(0.5)
    expect(wrapper.vm.txPrice(40,21000)).toEqual(1)
    expect(wrapper.vm.txPrice(20,200000)).toEqual(4.8)
    expect(wrapper.vm.txPrice(40,200000)).toEqual(9.6)
  })

  it('should display fiat price at each gas price', () => {
    let wrapper = mount(GasPrice)
    wrapper.setData({ethFiatPrice: 120031})

    checkValue(wrapper, '.low-price .fiat-price .value', 0.12)
    checkValue(wrapper, '.normal-price .fiat-price .value', 0.5)
    checkValue(wrapper, '.high-price .fiat-price .value', 1.51)
  })

  it('should display eth price at each gas price', () => {
    let wrapper = mount(GasPrice)

    // Based on default hardcodes gas price
    checkValue(wrapper, '.low-price .eth-price .value', 0.000105)
    checkValue(wrapper, '.normal-price .eth-price .value', 0.00042)
    checkValue(wrapper, '.high-price .eth-price .value', 0.00126)
  })

  // check that a displayed price is equal to a data variable
  let checkValue = (wrapper, selector, value) => {
    let el = wrapper.find(selector)
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe(value.toString())
  }

})
