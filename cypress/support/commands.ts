/// <reference types="cypress" />


declare global {
  namespace Cypress {
    interface Chainable {
      checkIngredient(ingredientId: string, title: string): Chainable<void>;
      dragAndDropIngredient(ingredientId: string): Chainable<void>;
      openModal(): Chainable<void>;
      hasClosedModal(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('checkIngredient', (ingredientId: string, title: string) => {
cy.get(`[data-test-id=${ingredientId}]`).as('ing').get('[data-test-id=ingredient-name]').contains(title).should('exist');
});

Cypress.Commands.add('dragAndDropIngredient', (ingredientId: string) => {
  cy.get(`[data-test-id=${ingredientId}]`).as('ing');
  cy.get("[data-test-id=burger-constructor]").as('constructor');

  cy.get("@ing")
    .trigger('mousedown', { which: 1, button: 0 })
    .trigger('dragstart');
  cy.get("@constructor").trigger('drop');

  cy.get("@constructor").get('@ing').should('exist');
});

Cypress.Commands.add('openModal', () => {
    cy.get('[data-test-id=ingredient-0]').as('bun1').click();
    cy.get("[data-test-id=modal-content]").as('modal').should('be.visible');
    cy.get("[data-test-id=modal-overlay]").as('overlay').should('exist');
});

Cypress.Commands.add('hasClosedModal', () => {
  cy.get('@modal').should('not.exist');
  cy.get('@overlay').should('not.exist');
})
