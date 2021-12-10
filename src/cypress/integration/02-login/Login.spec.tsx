export {}

describe("Login Page Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/login")
    })

    it("Should show 'Este campo es obligatorio' in email field because no text was introduced", () => {
        cy.get("[name='emailAddress']").focus()
        cy.get("[name='password']").focus()        
        cy.get(':nth-child(3) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Este campo es obligatorio' in email field because only white spaces were introduced", () => {
        cy.get("[name='emailAddress']").type("         ")
        cy.get("[name='password']").focus()        
        cy.get(':nth-child(3) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Este campo es obligatorio' in password field because no text was introduced", () => {
        cy.get("[name='password']").focus()
        cy.get("[name='emailAddress']").focus()
        cy.get(':nth-child(4) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Este campo es obligatorio' in password field because only white spaces were introduced", () => {
        cy.get("[name='password']").type("          ")
        cy.get("[name='emailAddress']").focus()
        cy.get(':nth-child(4) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Por favor inserte una dirección de correo válida' in email field because a comma was inserted instead of a dot", () => {
        cy.get("[name='emailAddress']").type("abcd@gmail,com")
        cy.get("[name='password']").focus()        
        cy.get(':nth-child(3) > .input-error-text').should("contain.text", "Por favor inserte una dirección de correo válida")
    })

    it("Should show 'Por favor inserte una dirección de correo válida' in email field because no '@' was found", () => {
        cy.get("[name='emailAddress']").type("abcdhotmail.com")
        cy.get("[name='password']").focus()        
        cy.get(':nth-child(3) > .input-error-text').should("contain.text", "Por favor inserte una dirección de correo válida")
    })

    it("Should show 'Por favor inserte una dirección de correo con 254 caracteres o menos' in email field", () => {
        cy.get("[name='emailAddress']").type("abcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcde@gmail.com")
        cy.get("[name='password']").focus()        
        cy.get(':nth-child(3) > .input-error-text').should("contain.text", "Por favor inserte una dirección de correo con 254 caracteres o menos")
    })

    it("Should show 'Por favor inserte una contraseña de longitud igual o menor a 50 caracteres' in password field", () => {
        cy.get("[name='emailAddress']").type("adairho16@gmail.com")
        cy.get("[name='password']").type("abcHefghilabcdefg1ilabcdefgh%labcdefghilabcdefghila")
        cy.get('.btn-primary').focus()
        cy.get('.input-error-text').should("contain.text", "Por favor inserte una contraseña de longitud igual o menor a 50 caracteres")
    })

    it("Should show 'Credenciales incorrectas' in email field", () => {
        cy.get("[name='emailAddress']").type("bipepek652@slvlog.com")
        cy.get("[name='password']").type("dslkgjjkdfglnrnskf")
        cy.get('.btn-primary').click()        
        cy.get('.rounded-md').should("contain.text", "Credenciales incorrectas")        
    })

    it("Should login successfully as service requester", () => {
        cy.get("[name='emailAddress']").type("bipepek652@slvlog.com")
        cy.get("[name='password']").type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.get('.font-bold').should("contain.text", "Verificar cuenta")
    })

    it("Should login successfully as service provider", () => {
        cy.get("[name='emailAddress']").type("bipepek125@slvlog.com")
        cy.get("[name='password']").type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.get('.font-bold').should("contain.text", "Verificar cuenta")
    })
})