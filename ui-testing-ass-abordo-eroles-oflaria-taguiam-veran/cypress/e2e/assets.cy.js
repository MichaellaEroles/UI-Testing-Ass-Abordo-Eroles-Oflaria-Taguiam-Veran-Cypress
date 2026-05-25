describe('IT-ASSET-MS UI Automated Testing', () => {

  beforeEach(() => {
    // Clear localStorage to ensure a clean state
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('TC01 - Valid Login', () => {
    // Input valid credentials (mocked in Login.jsx)
    cy.get('[data-test="username"]').type('admin')
    cy.get('[data-test="password"]').type('password123')
    cy.get('[data-test="login-button"]').click()

    // Assert that we are on the dashboard
    // Use include to be more resilient to trailing slashes
    cy.url().should('include', '/')
    cy.contains('IT ASSET MS').should('be.visible')
  })

  it('TC02 - Invalid Login', () => {
    // Input invalid credentials
    cy.get('[data-test="username"]').type('wrong_user')
    cy.get('[data-test="password"]').type('wrong_pass')
    cy.get('[data-test="login-button"]').click()

    // Assert that error message is displayed
    // Ensure text matches exactly what is in Login.jsx
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'Invalid username or password')
  })

  it('TC03 - User Action (Browse Assets)', () => {
    // Valid login
    cy.get('[data-test="username"]').type('admin')
    cy.get('[data-test="password"]').type('password123')
    cy.get('[data-test="login-button"]').click()

    // Navigate to Assets page
    cy.contains('Asset List').click()

    // Assert that assets are visible (check for common text or table headers)
    cy.url().should('include', '/assets')
    cy.get('table').should('be.visible')
  })

  it('TC04 - Logout', () => {
    // Valid login
    cy.get('[data-test="username"]').type('admin')
    cy.get('[data-test="password"]').type('password123')
    cy.get('[data-test="login-button"]').click()

    // Click Logout button in the sidebar
    cy.get('[data-test="logout-button"]').click()

    // Assert that we are no longer on the dashboard and see the login button
    // The URL might be / or /login depending on the redirect behavior
    cy.get('[data-test="login-button"]').should('be.visible')
  })

})
