it('Dohvati stranicu statistika', function () {
    cy.visit('http://localhost:3000/statistics')
})
it('Pričekaj pet sekundi i provjeri URL', function () {
  cy.wait(5000)
  cy.url().should('include', 'statistics')
})