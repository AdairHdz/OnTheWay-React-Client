export {}

describe("Statistics Page Tests", () => {
    beforeEach(() => {        
        cy.visit("http://localhost:3000")
        cy.get('#emailAddress').type("bipepek125@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.get('[href="/statistics"] > .flex').click()
    })

    it("Should display 'Este campo es obligatorio' in starting date field", () => {        
        cy.get('#startingDate').focus()
        cy.get('#endingDate').focus()
        cy.get(':nth-child(1) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should display 'Este campo es obligatorio' in ending date field", () => {        
        cy.get('#endingDate').focus()
        cy.get('#startingDate').focus()        
        cy.get(':nth-child(2) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should display 'No hemos podido recuperar los datos necesarios. Por favor, intente más tarde' message when no data is available", () => {
        cy.pause()
        cy.get('form > .mx-auto').click()
        cy.get('.font-light').should("contain.text", "No hemos podido recuperar los datos necesarios. Por favor, intente más tarde")
    })    
})