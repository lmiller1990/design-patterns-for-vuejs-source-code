import { render, screen, fireEvent } from '@testing-library/vue'
import FormValidation from './form-validation.vue'

describe('FormValidation', () => {
  it('fills out form correctly', async () => {
    render(FormValidation)

    await fireEvent.update(screen.getByLabelText('Name'), 'lachlan') 
    await fireEvent.update(screen.getByDisplayValue('kg'), 'lb')
    await fireEvent.update(screen.getByLabelText('Weight'), '150')

    expect(screen.queryByRole('error')).toBe(null)
  })

  it('shows errors for invalid inputs', async () => {
    render(FormValidation)

    await fireEvent.update(screen.getByLabelText('Name'), '')
    await fireEvent.update(screen.getByLabelText('Weight'), '5')
    await fireEvent.update(screen.getByDisplayValue('kg'), 'lb')

    expect(screen.getAllByRole('error')).toHaveLength(2)
  })

  it('emits a submit event with patientForm when valid form submitted', async () => {
    const { emitted } = render(FormValidation)

    await fireEvent.update(screen.getByLabelText('Name'), 'lachlan')
    await fireEvent.update(screen.getByLabelText('Weight'), '150')
    await fireEvent.update(screen.getByDisplayValue('kg'), 'lb')
    await fireEvent.click(screen.getByText('Submit'))

    expect(emitted().submit[0]).toEqual([
      {
        patient: {
          name: 'lachlan',
          weight: {
            value: 150,
            units: 'lb'
          }
        }
      }
    ])
  })
})

import { mount } from '@vue/test-utils'

describe('FormValidation', () => {
  it('fills out form correctly', async () => {
    const wrapper = mount(FormValidation)

    await wrapper.find('[role="name"]').setValue('lachlan')
    await wrapper.find('[role="weight-units"]').setValue('lb')
    await wrapper.find('[role="weight"]').setValue('150')

    expect(wrapper.findAll('[role="error"]')).toHaveLength(0)
  })

  it('shows errors for invalid inputs', async () => {
    const wrapper = mount(FormValidation)

    await wrapper.find('[role="name"]').setValue('')
    await wrapper.find('[role="weight-units"]').setValue('lb')
    await wrapper.find('[role="weight"]').setValue('50')

    expect(wrapper.findAll('[role="error"]')).toHaveLength(2)
  })

  it('emits a submit event with patientForm when valid form submitted', async () => {
    const wrapper = mount(FormValidation)

    await wrapper.find('[role="name"]').setValue('lachlan')
    await wrapper.find('[role="weight-units"]').setValue('kg')
    await wrapper.find('[role="weight"]').setValue('100')
    await wrapper.find('[role="submit"]').trigger('submit.prevent')

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
