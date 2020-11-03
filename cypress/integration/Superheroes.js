describe('Superheroes Flow', () => {
  it('Should see superheroes list', () => {
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

    cy.get('[data-testid="header-superheroes"]')
    .click()
  
    cy.wait(2000).scrollTo('bottom', { easing: 'linear' })
    cy.wait(3000).scrollTo('top', { easing: 'linear' })
  })
})