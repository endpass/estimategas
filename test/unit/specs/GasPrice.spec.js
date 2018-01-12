import { shallow } from 'vue-test-utils'
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
    let wrapper = shallow(GasPrice)
    expect(wrapper.contains('.gas-price .description')).toBe(true)
    expect(wrapper.find('.gas-price .description').text()).toBeTruthy()
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
    // moxios request MUST be stubbed before wrapper is shallowed
    let wrapper = shallow(GasPrice)
    wrapper.setData({maxPrice:90})
    moxios.wait( () => {
      let vm = wrapper.vm
      expect(vm.lowPrice).toEqual(expectedPrices.lowPrice)
      expect(vm.normalPrice).toEqual(expectedPrices.normalPrice)
      expect(vm.highPrice).toEqual(expectedPrices.highPrice)

      done()
    })
  })

  it('should have a default fiat currency', () => {
    let wrapper = shallow(GasPrice)
    expect(wrapper.vm.fiatCurrency).toEqual(config.defaultCurrency)
  })

  it('should get eth fiat price from cryptocompare', (done) => {
    moxios.stubRequest(/cryptocompare.com\/data\/price/, {
      status: 200,
      response: {
        USD: 1200.31
      }
    })
    // moxios request MUST be stubbed before wrapper is shallowed
    let wrapper = shallow(GasPrice)

    // Needed to trigger fetching price
    let currency = {code: config.defaultCurrency}
    wrapper.vm.updateCurrency(currency)
    moxios.wait( () => {
      expect(wrapper.vm.ethFiatPrice).toEqual(120031)
      done()
    })
  })

  it('should fetch block info from BlockCypher', (done) => {
    moxios.stubRequest(/api\.blockcypher\.com/, {
      status: 200,
      response: {
        height: 4897066,
        unconfirmed_count: 53125,
        high_gas_price: 60102127578,
        medium_gas_price: 20000000000,
        low_gas_price: 5000000000
      }
    })
    // moxios request MUST be stubbed before wrapper is shallowed
    let wrapper = shallow(GasPrice)

    // Needed to trigger fetching price
    moxios.wait( () => {
      expect(wrapper.find('.block-height .value').text()).toEqual('4897066')
      expect(wrapper.find('.unconfirmed-count .value').text()).toEqual('53125')
      done()
    })
  })

})
