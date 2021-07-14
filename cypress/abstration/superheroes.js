export const heroes = {
  initialActions: () => {
    cy.visit('http://localhost:3000')

    cy.get('[data-testid="signin-screen"]')
    .click()

    cy.get('[data-testid="signin-email"]')
    .type('yoyo@teste.com')
    .should('have.value', 'yoyo@teste.com')

    cy.get('[data-testid="signin-password"]')
    .type('123456')
    .should('have.value', '123456')

    cy.get('#login-submit').submit()
  }
}