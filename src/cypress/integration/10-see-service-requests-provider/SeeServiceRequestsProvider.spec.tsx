export {}

describe("See Service Requests Provider Tests", () => {
    beforeEach(() => {        
        cy.visit("http://localhost:3000")
        cy.get('#emailAddress').type("bipepek125@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
    })
    
    it("Should hide 'Aceptar' button because the service request was canceled", () => {
        cy.get('[href="/services"] > .flex').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("not.exist")
    })

    it("Should hide 'Rechazar' button because the service request was canceled", () => {
        cy.get('[href="/services"] > .flex').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary-outlined').should("not.exist")
    })

    it("Should show 'Aceptar' button because the service request is pending of acceptance", () => {
        cy.get('[href="/services"] > .flex').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("exist")
    })

    it("Should show 'Rechazar' button because the service request is pending of acceptance", () => {
        cy.get('[href="/services"] > .flex').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary-outlined').should("exist")
    })

    it("Should display 'Solicitud de servicio aceptada' message when the service request has been accepted", () => {
        cy.get('[href="/services"] > .flex').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.get('.font-bold').should("contain.text", "Solicitud de servicio aceptada")
    })
    
    it("Should display 'Solicitud de servicio rechazada' message when the service request has been rejected", () => {
        cy.get('[href="/services"] > .flex').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary-outlined').click()
        cy.get('.font-bold').should("contain.text", "Solicitud de servicio rechazada")
    })
})