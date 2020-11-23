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

import { mount } from '@vue/test-utils'

describe('Message', () => {
  it('renders variant correctly when passed', () => {
    const wrapper = mount(Message, {
      props: {
        variant: 'success'
      }
    })

    expect(wrapper.classes()).toContain('success')
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
  function navbarFactory(props) {
    return mount(Navbar, {
      props
    })
  }

  it('shows login authenticated is true', () => {
    const wrapper = navbarFactory({ authenticated: true })
    expect(wrapper.html()).toContain('Logout')
  })

  it('shows logout by default', () => {
    const wrapper = navbarFactory()
    expect(wrapper.find('a').text()).toBe('Login')
  })

  it('shows login when authenticated is false', () => {
    const wrapper = navbarFactory({ authenticated: false })
    expect(wrapper.find('a').text()).toBe('Login')
  })
})
