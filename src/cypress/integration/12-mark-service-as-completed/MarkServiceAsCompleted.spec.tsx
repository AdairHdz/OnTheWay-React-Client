export { }

describe("Mark Service As Completed Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
    })

    it("Should not display 'Marcar como completado' button because the service request was canceled", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("not.exist")
    })

    it("Should not display 'Marcar como completado' button because the service request was rejected", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("not.exist")
    })

    it("Should display message 'La solicitud de servicio se ha marcado como concluida' after marking service request as completed", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').click()
        cy.get('.rounded-md > .text-sm').should("contain.text", "La solicitud de servicio se ha marcado como concluida")
    })
})