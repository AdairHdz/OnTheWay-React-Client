export {}

describe("Account Verification Page Tests", () => {    

    it("Should display 'Este campo es obligatorio' in verification code field", () => {
        cy.visit("http://localhost:3000/login")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.get('#verificationCode').type("       ")
        cy.get('.btn-primary').click()
        cy.get('.input-error-text').should("contain.text", "Este campo es obligatorio")        
    })

    it("Should display 'El código de verificación debe tener 8 dígitos' in verification code field", () => {
        cy.visit("http://localhost:3000/login")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.get('#verificationCode').type("1234567")
        cy.get('.btn-primary').click()
        cy.get('.input-error-text').should("contain.text", "El código de verificación debe tener 8 dígitos")        
    })

    it("Should disable the 'send new verification code' button after clicking it and should display new verification code sent message", () => {
        cy.visit("http://localhost:3000/login")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.get('.btn-primary-outlined').click()
        cy.get('.btn-primary-outlined').should("be.disabled")
        cy.get('.rounded-md > .text-sm').should("contain.text", "Hemos enviado un nuevo código de verificación a tu dirección de correo electrónico")
    })

    it("Should display 'No se ha podido verificar su cuenta. Por favor, intente más tarde' when the code introduced does not match", () => {
        cy.visit("http://localhost:3000/login")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.get('#verificationCode').type("12345678")
        cy.get('.btn-primary').click()
        cy.get('.rounded-md > .text-sm').should("contain.text", "Ocurrió un error inesperado. Por favor, intente más tarde")
    })

    it("Should verify the account of the service requester successfully", () => {
        cy.visit("http://localhost:3000/login")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.get('.rounded-md > .text-sm').should("contain.text", "Hemos verificado su cuenta. Ahora podrá iniciar sesión")
    })

    it("Should verify the account of the service provider successfully", () => {
        cy.visit("http://localhost:3000/login")
        cy.get('#emailAddress').type("bipepek125@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.pause()        
        cy.get('.btn-primary').click()
        cy.get('.rounded-md > .text-sm').should("contain.text", "Hemos verificado su cuenta. Ahora podrá iniciar sesión")
    })
})