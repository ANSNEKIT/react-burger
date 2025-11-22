
describe('home page test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  it('Load ingredients', () => {
    cy.get('[data-test-id=ingredient-0]').as('bun1').get('[data-test-id=ingredient-name]').contains('Булка бигмак для теста').should('exist');
    cy.get('[data-test-id=ingredient-1]').as('bun2').get('[data-test-id=ingredient-name]').contains('Булка бигтейсти для теста').should('exist');
    cy.get('[data-test-id=ingredient-2]').as('main1').get('[data-test-id=ingredient-name]').contains('Бигмак для теста').should('exist');
  });

  it('Drag bun and main ingredients to constructor', () => {
    cy.get('[data-test-id=ingredient-0]').as('bun1');
    cy.get('[data-test-id=ingredient-2]').as('main1');
    cy.get('[data-test-id=ingredient-3]').as('main2');
    cy.get("[data-test-id=burger-constructor]").as('constructor');

    // Перетаскиваем булку
    cy.get("@bun1").trigger('dragstart');
    cy.get("@constructor").trigger('drop');

    // Перетаскиваем ингредиент
    cy.get("@main1").trigger('dragstart');
    cy.get("@constructor").trigger('drop');

    // Перетаскиваем ингредиент 2
    cy.get("@main2").trigger('dragstart');
    cy.get("@constructor").trigger('drop');

    cy.get("@constructor").get('@bun1').should('exist');
    cy.get("@constructor").get('@main1').should('exist');
    cy.get("@constructor").get('@main2').should('exist');
  });

  it('Open modal ingredient', () => {
    cy.get('[data-test-id=ingredient-2]').as('main1').click();

    cy.get("[data-test-id=modal-content]").should('be.visible');
    cy.get("[data-test-id=modal-overlay]").as('overlay').should('exist');
  });

  it('Close modal on click close button', () => {
    cy.get('[data-test-id=ingredient-0]').as('bun1').click();
    cy.get("[data-test-id=modal-content]").as('modal').should('be.visible');
    cy.get("[data-test-id=modal-overlay]").as('overlay').should('exist');

    cy.get('@modal').get('[data-test-id=modal-close-btn]').click();

    cy.get('@modal').should('not.exist');
    cy.get('@overlay').should('not.exist');
  });

  it('Close modal on click overlay', () => {
    cy.get('[data-test-id=ingredient-0]').as('bun1').click();
    cy.get("[data-test-id=modal-content]").as('modal').should('be.visible');
    cy.get("[data-test-id=modal-overlay]").as('overlay').should('exist');

    cy.get("@overlay").click('topLeft', { force: true });

    cy.get('@modal').should('not.exist');
    cy.get('@overlay').should('not.exist');
  });

  it('Close modal on keydown ESC', () => {
    cy.get('[data-test-id=ingredient-1]').as('bun1').click();
    cy.get("[data-test-id=modal-content]").as('modal').should('be.visible');
    cy.get("[data-test-id=modal-overlay]").as('overlay').should('exist');

    cy.get('body').type('{esc}');

    cy.get('@modal').should('not.exist');
    cy.get('@overlay').should('not.exist');
  });
});
