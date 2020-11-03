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
  
    cy.wait(3000).scrollTo('bottom', { easing: 'linear' })
    cy.wait(4000).scrollTo('top', { easing: 'linear' })
    cy.wait(2000)
  });

  it('Should search for a superhero', () => {
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

    cy.get('[data-testid="search-input"]')
    .type('black panther')
    .should('have.value', 'black panther')

    cy.get('[data-testid="search-button"]')
    .click()

    cy.wait(2000)
  });

  it('Should see the details of the superheros appearance', () => {
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

    cy.get('[data-testid="search-input"]')
    .type('Cannonball')
    .should('have.value', 'Cannonball')

    cy.get('[data-testid="search-button"]')
    .click()

    cy.get('[data-testid="hero-details-appearance"]')
    .click()

    cy.wait(2000)

    cy.get('[data-testid="hero-details-appearance-button"]')
    .click()
    cy.wait(2000)
  });

  it('Should see the details of the superheros biography', () => {
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

    cy.get('[data-testid="search-input"]')
    .type('Cannonball')
    .should('have.value', 'Cannonball')

    cy.get('[data-testid="search-button"]')
    .click()

    cy.get('[data-testid="hero-details-biography"]')
    .click()

    cy.wait(2000)

    cy.get('[data-testid="hero-details-biography-button"]')
    .click()
    cy.wait(2000)
  });

  it('Should see the details of the superheros powerstats', () => {
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

    cy.get('[data-testid="search-input"]')
    .type('Cannonball')
    .should('have.value', 'Cannonball')

    cy.get('[data-testid="search-button"]')
    .click()

    cy.get('[data-testid="hero-details-powerstats"]')
    .click()

    cy.wait(2000)

    cy.get('[data-testid="hero-details-powerstats-button"]')
    .click()
    cy.wait(2000)
  });

  it('Should logout from application', () => {
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

    cy.wait(3000)

    cy.get('[data-testid="logout-button"]')
    .click()
  });
})