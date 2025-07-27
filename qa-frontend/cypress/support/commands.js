Cypress.Commands.add('loginAsAdmin', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[name="email"]').type('admin@sunion.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });