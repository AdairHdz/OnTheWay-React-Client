export {}

describe("New Service Request Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()        
    })

    it("Should display 'Sin resultados'", () => {
        cy.get('#date').type("2019-12-23")
        cy.get('.btn-primary').click()
        cy.get('.font-bold').should("contain.text", "Sin resultados")
    })

    it("Should display the list of service requests", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.get('.font-bold').should("not.exist")        
    })

    it("Should cancel the service request", () => {
        cy.pause()
        cy.get('.btn-primary').click()                
        cy.pause()
        cy.get('.btn-primary-outlined').should("exist")
        cy.get('.btn-primary-outlined').click()
        cy.get('.font-bold').should("contain.text", "Solicitud de servicio cancelada")
    })

    it("Should hide the 'cancel button' because the service request has already been canceled", () => {
        cy.pause()
        cy.get('.btn-primary').click()                
        cy.pause()        
        cy.get('.btn-primary-outlined').should("not.exist")        
    })
})