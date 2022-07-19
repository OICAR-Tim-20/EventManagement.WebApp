describe('Login test', function () {
  it('Dohvati stranicu za autentikaciju', function () {
      cy.visit('http://localhost:3000')
  })
  it('Unesi username i password u input', function (){
      cy.get('#login-username')
        .type('testAdmin')
      cy.get('#login-password')
        .type('password')
  })
  it('Klikni gumb submit', function () {
     cy.get('#login-submit').click()
  })
  it('Pričekaj pet sekundi i provjeri URL', function () {
    cy.wait(5000)
    cy.url().should('include', 'http://localhost:3000/')
  })
})