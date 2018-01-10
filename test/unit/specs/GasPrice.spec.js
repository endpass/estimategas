import { mount } from 'vue-test-utils'
import GasPrice from '@/components/GasPrice'

describe('GasPrice', () => {
  const wrapper = mount(GasPrice)

  it('should show a description', () => {
    expect(wrapper.contains('.gas-price .description')).toBe(true)
    expect(wrapper.find('.gas-price .description').text()).toBeTruthy()
  })
})
