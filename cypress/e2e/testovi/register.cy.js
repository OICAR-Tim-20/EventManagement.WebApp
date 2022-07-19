describe('Register test', function () {
    it('Dohvati stranicu za autentikaciju', function () {
        cy.visit('http://localhost:3000')
    })
    it('Prikaži tab register', function() {
        cy.get('#tab-register').click()
    })
    it('Unesi username, password i email u input', function (){
        cy.get('#register-username')
          .type('E2ETest')
        cy.get('#register-email')
          .type('admin@admin.test')
        cy.get('#register-password')
          .type('E2ETest')
    })
    it('Klikni gumb submit', function () {
       cy.get('#register-submit').click()
    })
  })