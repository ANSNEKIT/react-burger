
describe('home page test', () => {
  const bun1Id = 'ingredient-0';
  const titleBun1 = 'Булка бигмак для теста';

  const bun2Id = 'ingredient-1';
  const titleBun2 = 'Булка бигтейсти для теста';

  const main1Id = 'ingredient-2';
  const titleMain1 = 'Бигмак для теста'

  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });

  it('Load ingredients', () => {
    cy.checkIngredient(bun1Id, titleBun1);
    cy.checkIngredient(bun2Id, titleBun2);
    cy.checkIngredient(main1Id, titleMain1);
  });

  it('Drag bun and main ingredients to constructor', () => {
    cy.dragAndDropIngredient(bun1Id);
    cy.dragAndDropIngredient(bun2Id);
    cy.dragAndDropIngredient(main1Id);
  });

  it('Open modal ingredient', () => {
    cy.openModal();
  });

  it('Close modal on click close button', () => {
    cy.openModal();

    cy.get('@modal').get('[data-test-id=modal-close-btn]').click();

    cy.hasClosedModal();
  });

  it('Close modal on click overlay', () => {
    cy.openModal();

    cy.get("@overlay").click('topLeft', { force: true });

    cy.hasClosedModal();
  });

  it('Close modal on keydown ESC', () => {
    cy.openModal();

    cy.get('body').type('{esc}');

    cy.hasClosedModal();
  });
});
