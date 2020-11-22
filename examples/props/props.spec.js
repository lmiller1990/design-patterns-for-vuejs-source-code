import { render, screen } from '@testing-library/vue'
import Message, { validateVariant } from './Message.vue'
import Navbar from './Navbar.vue'

describe('Message', () => {
  it('renders variant correctly when passed', () => {
    const { container } = render(Message, {
      props: {
        variant: 'success'
      }
    })

    expect(container.firstChild.classList).toContain('success')
  })

  it('validates valid variant prop', () => {
    ;['success', 'warning', 'error'].forEach(variant => {
      expect(() => validateVariant(variant)).not.toThrow()
    })
  })

  it('throws error for invalid variant prop', () => {
    expect(() => validateVariant('invalid')).toThrow()
  })
})

describe('Navbar', () => {
  function renderNavbar(props) {
    render(Navbar, {
      props
    })
  }

  it('shows login authenticated is true', () => {
    renderNavbar({ authenticated: true })
    screen.getByText('Logout')
  })

  it('shows logout by default', () => {
    renderNavbar()
    screen.getByText('Login')
  })

  it('shows login when authenticated is false', () => {
    renderNavbar({ authenticated: false })
    screen.getByText('Login')
  })
})
