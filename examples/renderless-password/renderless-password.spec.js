import { render, screen, fireEvent } from '@testing-library/vue'
import TestComponent from './App.vue'
import AppWithCustomValidator from './AppWithCustomValidator.vue'
import { isMatching, calcComplexity } from './renderless-password.js'

describe('isMatching', () => {
  it('returns true when matching', () => {
    expect(isMatching('a', 'b')).toBe(false)
  })

  it('returns true when matching', () => {
    expect(isMatching('a', 'a')).toBe(true)
  })
})

describe('calcComplexity', () => {
  const results = [
    ['a'.repeat(3), 0],
    ['a'.repeat(6), 1],
    ['a'.repeat(8), 2],
    ['a'.repeat(11), 3],
  ]

  test.each(results)('return correct complexity based on length', (input, output) => {
    expect(calcComplexity(input)).toBe(output)
  })
})

describe('component using renderless-password', () => {
  it('supports custom validator', async () => {
    render(AppWithCustomValidator)

    await fireEvent.update(
      screen.getByRole('password'), 'this is a long password')
    await fireEvent.update(
      screen.getByRole('confirmation'), 'this is a long password')

    expect(screen.getByText('Submit').disabled).toBeTruthy()
  })

  it('meets default requirements', async () => {
    render(TestComponent)

    await fireEvent.update(
      screen.getByLabelText('Password'), 'this is a long password')
    await fireEvent.update(
      screen.getByLabelText('Confirmation'), 'this is a long password')

    expect(screen.getByRole('password-complexity').classList).toContain('high')
    expect(screen.getByText('Submit').disabled).toBeFalsy()
  })

  it('does not meet complexity requirements', async () => {
    render(TestComponent)

    await fireEvent.update(
      screen.getByLabelText('Password'), 'shorty')
    await fireEvent.update(
      screen.getByLabelText('Confirmation'), 'shorty')

    expect(screen.getByRole('password-complexity').classList).toContain('low')
    expect(screen.getByText('Submit').disabled).toBeTruthy()
  })

  it('password and confirmation does not match', async () => {
    render(TestComponent)

    await fireEvent.update(
      screen.getByLabelText('Password'), 'abc')
    await fireEvent.update(
      screen.getByLabelText('Confirmation'), 'def')

    expect(screen.getByText('Submit').disabled).toBeTruthy()
  })
})
