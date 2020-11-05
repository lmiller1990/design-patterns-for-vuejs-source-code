import { mount } from '@vue/test-utils'
import { Store } from './store.js'
import Users from './users.vue'

describe('store', () => {
  it('seeds the initial state', () => {
    const store = new Store({
      users: []
    })

    expect(store.getState()).toEqual({ users: [] })
  })

  it('adds a user', () => {
    const store = new Store({
      users: []
    })

    store.addUser({ name: 'Alice' })

    expect(store.getState()).toEqual({ 
      users: [{ name: 'Alice' }]
    })
  })

  it('removes a user', () => {
    const store = new Store({
      users: [{ name: 'Alice' }]
    })

    store.removeUser({ name: 'Alice' })

    expect(store.getState()).toEqual({ 
      users: [] 
    })
  })

  it('renders a user', async () => {
    const wrapper = mount(Users, {
      global: {
        provide: {
          store: new Store({
            users: []
          })
        }
      }
    })

    await wrapper.find('input').setValue('Alice')
    await wrapper.find('button').trigger('submit.prevent')

    expect(wrapper.html()).toContain('Alice')
  })
})
