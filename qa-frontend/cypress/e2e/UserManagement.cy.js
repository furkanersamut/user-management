describe('User Management UI', () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  
    //get all users
    cy.request('GET', 'http://localhost:3001/users').then((response) => {
      const usersToDelete = response.body.filter(
        (user) => user.email === 'testuser@example.com'
      );
  
      //delete each user
      usersToDelete.forEach((user) => {
        cy.request('DELETE', `http://localhost:3001/users/${user.id}`);
      });
    });
  
    //create a clean user
    cy.request('POST', 'http://localhost:3001/users', {
      name: 'Test User',
      email: 'testuser@example.com',
    });
  
    //go to the page and get users
    cy.intercept('GET', '**/users').as('getUsers');
    cy.visit('http://localhost:3000/users');
    cy.wait('@getUsers');
  
    //check if the user is created
    cy.get('[data-cy="user-row"]').should('contain', 'Test User');
  });

  it('should list users', () => {
    cy.get('[data-cy="user-row"]').should('exist');
    cy.get('[data-cy="user-row"]').its('length').should('be.gte', 1);
  });

  it('should create a new user', () => {
    const name = 'New User';
    const email = 'newuser@example.com';

    cy.get('[data-cy="user-form-name"]').clear().type(name);
    cy.get('[data-cy="user-form-email"]').clear().type(email);
    cy.intercept('POST', '**/users').as('createUser');
    cy.get('[data-cy="user-form-submit"]').click();

    cy.wait('@createUser');
    cy.get('[data-cy="user-row"]').last().should('contain', name).and('contain', email);
  });

  it('should update a user', () => {
    const originalName = 'Test User';
    const updatedName = 'Updated Name Modified';

    cy.get('[data-cy="user-row"]').contains(originalName)
      .closest('[data-cy="user-row"]')
      .within(() => {
        cy.get('[data-cy="edit-button"]').click();
      });

    cy.get('[data-cy="user-form-name"]').clear().type(updatedName);

    cy.intercept('PUT', '**/users/*').as('updateUser');
    cy.get('[data-cy="user-form-submit"]').click();

    cy.wait('@updateUser');
    cy.get('[data-cy="user-row"]').should('contain', updatedName);
    cy.get('[data-cy="user-row"]').should('not.contain', originalName);
  });

  it('should delete a user', () => {
    const userToDelete = 'Delete Test User';
    const emailToDelete = 'deleteuser@example.com';
  
    //create a user for the test
    cy.request('POST', 'http://localhost:3001/users', {
      name: userToDelete,
      email: emailToDelete,
    });
  
    //refresh the page and wait for the user
    cy.intercept('GET', '**/users').as('getUsers');
    cy.visit('http://localhost:3000/users');
    cy.wait('@getUsers');
  
    //delete the user
    cy.intercept('DELETE', '**/users/*').as('deleteUser');
    cy.intercept('GET', '**/users').as('getUsersAfterDelete');
  
    cy.get('[data-cy="user-row"]').contains(userToDelete)
      .closest('[data-cy="user-row"]')
      .within(() => {
        cy.get('[data-cy="delete-button"]').click();
      });
  
    cy.wait('@deleteUser');
    cy.wait('@getUsersAfterDelete');
  
    cy.get('[data-cy="user-row"]').should('not.contain', userToDelete);
  });

  it('should show error when trying to create user with invalid email', () => {
    cy.get('[data-cy="user-form-name"]').clear().type('Invalid Email User');
    cy.get('[data-cy="user-form-email"]').clear().type('not-an-email');
    cy.get('[data-cy="user-form-submit"]').click();

    cy.get('[data-cy="error-email"]').should('be.visible').and('contain', 'Invalid email address');
  });

  it('should prevent creating user without name', () => {
    cy.get('[data-cy="user-form-name"]').clear();
    cy.get('[data-cy="user-form-email"]').clear().type('noname@example.com');
    cy.get('[data-cy="user-form-submit"]').click();

    cy.get('[data-cy="error-name"]').should('be.visible').and('contain', 'Name is required');
  });

  it('should prevent creating user with duplicate email', () => {
    const name = 'Duplicate Email User';
    const email = 'testuser@example.com';

    cy.get('[data-cy="user-form-name"]').clear().type(name);
    cy.get('[data-cy="user-form-email"]').clear().type(email);

    cy.intercept('POST', '**/users').as('createUser');
    cy.get('[data-cy="user-form-submit"]').click();

    cy.wait('@createUser');
    cy.get('[data-cy="error-api"]').should('exist').and('contain', 'Email already exists');
  });
  afterEach(() => {
    //delete the new user
    cy.request('GET', 'http://localhost:3001/users').then((response) => {
      const users = response.body;
      const testUser = users.find(u => u.email === 'newuser@example.com');
      if (testUser) {
        cy.request('DELETE', `http://localhost:3001/users/${testUser.id}`);
      }
    });
  });
});
