/// <reference types="cypress" />
import RenderlessPasswordApp from '../RenderlessPasswordApp.vue'

describe('<RenderlessPasswordApp />', () => {
  it('renders and validates', () => {
    cy.mount(RenderlessPasswordApp)

    cy.get('.complexity').should('have.class', 'low')
    cy.get('#password').type('password')
    cy.get('.complexity').should('have.class', 'mid')
    cy.get('#password').clear().type('password123')
    cy.get('.complexity').should('have.class', 'high')

    cy.get('button').contains('Submit').should('be.disabled')
    cy.get('#confirmation').type('password123')
    cy.get('button').contains('Submit').should('not.be.disabled')
  })
})