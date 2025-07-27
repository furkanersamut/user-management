describe('Login Page', () => {
  it('should login successfully with valid credentials', () => {
    cy.visit('http://localhost:3000/');

    cy.get('input[name="email"]').type('admin@sunion.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome to the Dashboard');
    cy.wait(4000);
  });
  
  it('should show error with invalid credentials', () => {
    cy.visit('http://localhost:3000/');

    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    
    cy.get('p').should('contain', 'Invalid');
  });
});