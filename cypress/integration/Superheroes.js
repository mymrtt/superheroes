import { heroes } from '../abstration/superheroes'

describe('Superheroes Flow', () => {
  it('Should see superheroes list', () => {
    heroes.initialActions()

    cy.wait(20000)
  
    .scrollTo('bottom', { easing: 'linear' })
    cy.wait(4000).scrollTo('top', { easing: 'linear' })
    cy.wait(2000)
  });

  it('Should search for a superhero', () => {
    heroes.initialActions()
  
    cy.get('[data-testid="search-input"]')
    .type('black panther')
    .should('have.value', 'black panther')

    cy.get('[data-testid="search-button"]')
    .click()

    cy.wait(2000)
  });

  it('Should see the details of the superheros appearance', () => {
    heroes.initialActions()

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
    heroes.initialActions()

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
    heroes.initialActions()

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
    heroes.initialActions()

    cy.wait(5000)

    cy.get('[data-testid="logout-button"]')
    .click()
  });
})