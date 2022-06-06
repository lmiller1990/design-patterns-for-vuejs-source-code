import { render, screen, fireEvent } from '@testing-library/vue'
import Counter, { submitValidator } from './counter.vue'

describe('Counter', () => {
  it('emits an event with the current count', async () => {
    const { emitted } = render(Counter) 

    await fireEvent.click(screen.getByRole('increment'))
    await fireEvent.click(screen.getByRole('submit'))

    expect(emitted().submit[0]).toEqual([1])
  })
})

describe('submitValidator', () => {
  it('throws and error when count isNaN', () => {
    const actual = () => submitValidator(NaN)
    expect(actual).toThrow()
  })

  it('throws and error when count is NOT a number', () => {
    const actual = () => submitValidator([])
    expect(actual).toThrow()
  })

  it('returns true when count is a number', () => {
    const actual = () => submitValidator(1)
    expect(actual).not.toThrow()
  })
})

import { mount } from '@vue/test-utils'

describe('Counter', () => {
  it('emits an event with the current count', async () => {
    const wrapper = mount(Counter) 
    await wrapper.find('[role="increment"]').trigger('click')
    await wrapper.find('[role="submit"]').trigger('click')
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
