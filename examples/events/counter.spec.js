import { mount } from '@vue/test-utils'
import Counter, { submitValidator } from './counter.vue'

describe('Counter', () => {
  it('emits an event with the current count', async () => {
    const wrapper = mount(Counter) 
    await wrapper.find('#increment').trigger('click')
    await wrapper.find('#submit').trigger('click')
    expect(wrapper.emitted().submit[0]).toEqual([1])
  })
})

describe('submitValidator', () => {
  it('throws and error when count isNaN', () => {
    const actual = () => submitValidator('1')
    expect(actual).toThrow()
  })

  it('returns true when count is a number', () => {
    const actual = () => submitValidator(1)
    expect(actual).not.toThrow()
  })
})
