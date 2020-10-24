import { mount } from '@vue/test-utils'
import FormValidation from './form-validation.vue'

describe('FormValidation', () => {
  it('fills out form correctly', async () => {
    const wrapper = mount(FormValidation)

    await wrapper.find('#name').setValue('lachlan')
    await wrapper.find('#weight-units').setValue('lb')
    await wrapper.find('#weight').setValue('150')

    expect(wrapper.findAll('.error')).toHaveLength(0)
  })

  it('shows errors for invalid inputs', async () => {
    const wrapper = mount(FormValidation)

    await wrapper.find('#name').setValue('')
    await wrapper.find('#weight-units').setValue('lb')
    await wrapper.find('#weight').setValue('50')

    expect(wrapper.findAll('.error')).toHaveLength(2)
  })

  it('emits a submit event with patientForm when valid form submitted', async () => {
    const wrapper = mount(FormValidation)

    await wrapper.find('#name').setValue('lachlan')
    await wrapper.find('#weight-units').setValue('kg')
    await wrapper.find('#weight').setValue('100')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')[0]).toEqual([
      {
        patient: {
          name: 'lachlan',
          weight: {
            value: 100,
            units: 'kg'
          }
        }
      }
    ])
  })
})
