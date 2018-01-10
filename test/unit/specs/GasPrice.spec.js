import { mount } from 'vue-test-utils'
import GasPrice from '@/components/GasPrice'

describe('GasPrice', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(GasPrice)
  })

  it('should show a description', () => {
    expect(wrapper.contains('.gas-price .description')).toBe(true)
    expect(wrapper.find('.gas-price .description').text()).toBeTruthy()
  })

  it('should show the low price', () => {
    let el = wrapper.find('.low-price .price')
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe(wrapper.vm.lowPrice.toString())
  })

  it('should show the normal price', () => {
    let el = wrapper.find('.normal-price .price')
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe(wrapper.vm.normalPrice.toString())
  })

  it('should show the high price', () => {
    let el = wrapper.find('.high-price .price')
    expect(el.exists()).toBe(true)
    expect(el.text()).toBe(wrapper.vm.highPrice.toString())
  })
})
