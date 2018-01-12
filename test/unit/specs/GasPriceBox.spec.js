import { mount } from 'vue-test-utils'

import GasPriceBox from '@/components/GasPriceBox'

describe('GasPriceBox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(GasPriceBox, {
      propsData: {
        price: 20,
        currency: {code: 'USD', symbol: '$'},
        ethFiatPrice: 120031
      }
    })
  })

  it('should show currency symbol', () => {
    expect(wrapper.find('.fiat-price .symbol').text()).toEqual('$')
  })

  it('should show gwei price', () => {
    expect(wrapper.find('.price .value').text()).toEqual('20')
  })

  it('should show eth price', () => {
    expect(wrapper.find('.eth-price .value').text()).toEqual('0.00042')
  })

  it('should show fiat price', () => {
    expect(wrapper.find('.fiat-price .value').text()).toEqual('0.50')
  })

  it('should correctly calculate tx fiat price', () => {
    wrapper.setData({ethFiatPrice: 120031})
    expect(wrapper.vm.txPrice(20,21000)).toEqual('0.50')
    expect(wrapper.vm.txPrice(40,21000)).toEqual('1.00')
    expect(wrapper.vm.txPrice(20,200000)).toEqual('4.80')
    expect(wrapper.vm.txPrice(40,200000)).toEqual('9.60')
  })
})
