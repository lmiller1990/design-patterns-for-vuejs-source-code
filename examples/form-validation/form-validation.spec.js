import { render, screen, fireEvent } from '@testing-library/vue'
import FormValidation from './form-validation.vue'

describe('FormValidation', () => {
  it('fills out form correctly', async () => {
    render(FormValidation)

    await fireEvent.update(
      screen.getByLabelText('Name'),
      { target: { value: 'lachlan' } }
    )

     await fireEvent.update(screen.getByDisplayValue('kg'), 'lb')

    await fireEvent.update(
      screen.getByLabelText('Weight'),
      { target: { value: '150' } }
    )

    expect(screen.queryByRole('error')).toBe(null)
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

  it('shows errors for invalid inputs', async () => {
    render(FormValidation)

    await fireEvent.update(screen.getByLabelText('Name'), '')
    await fireEvent.update(screen.getByLabelText('Weight'), '5')
    await fireEvent.update(screen.getByDisplayValue('kg'), 'lb')

    expect(screen.getAllByRole('error')).toHaveLength(2)
  })
})
