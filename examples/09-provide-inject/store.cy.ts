import { Store } from './store.js'
import Users from './users.vue'

describe('store', () => {
  it('seeds the initial state', () => {
    const store = new Store({
      users: []
    })

    expect(store.getState()).to.eql({ users: [] })
  })

  it('adds a user', () => {
    const store = new Store({
      users: []
    })

    store.addUser({ name: 'Alice' })

    expect(store.getState()).to.eql({ 
      users: [{ id: 1, name: 'Alice' }]
    })
  })

  it('removes a user', () => {
    const store = new Store({
      users: [{ id: 1, name: 'Alice' }]
    })

    store.removeUser({ id: 1, name: 'Alice' })

    expect(store.getState()).to.eql({ 
      users: [] 
    })
  })

  it('renders a user', () => {
    cy.mount(Users, {
      global: {
        provide: {
          store: new Store({
            users: []
          })
        }
      }
    })

    cy.get('#username').type('Alice')
    cy.get('button').contains('Add User').click()
    cy.contains('ID: 1. Name: Alice')

    cy.get('#username').type('Bob')
    cy.get('button').contains('Add User').click()
    cy.get('div').contains('ID: 2. Name: Bob')
  })
})
