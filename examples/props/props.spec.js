import { mount } from '@vue/test-utils'
import Message, { validateVariant } from './Message.vue'
import Navbar from './Navbar.vue'

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
