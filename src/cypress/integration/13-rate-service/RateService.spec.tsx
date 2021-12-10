export {}

describe("Rate Service Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
    })

    it("Should not display 'Calificar servicio' button because the service request was canceled", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("not.exist")
    })

    it("Should not display 'Calificar servicio' button because the service request was rejected", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("not.exist")
    })    

    it("Should display 'Calificar servicio' button because the service request is marked as completed", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("exist")
        cy.get('.btn-primary').click()
        cy.get('.text-2xl').contains("Calificación").should("exist")
    })

    it("Should display 'Este campo es obligatorio' in title field", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("exist")
        cy.get('.btn-primary').click()
        cy.get('.text-2xl').contains("Calificación").should("exist")
        cy.get('#title').focus()
        cy.get('#details').focus()
        cy.get(':nth-child(1) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should display 'Este campo es obligatorio' in details field", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("exist")
        cy.get('.btn-primary').click()
        cy.get('.text-2xl').contains("Calificación").should("exist")
        cy.get('#details').focus()
        cy.get('#title').focus()        
        cy.get(':nth-child(2) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should display 'La reseña ha sido registrada con éxito' when a new reviews has been correctly registered", () => {
        cy.pause()
        cy.get('.btn-primary').click()
        cy.pause()
        cy.get('.btn-primary').should("exist")
        cy.get('.btn-primary').click()
        cy.get('.text-2xl').contains("Calificación").should("exist")
        cy.get('.justify-center > :nth-child(4)').click()
        cy.get('#title').type("Título de la reseña")
        cy.get('#details').type("Detalles de la reseña")        
        cy.get('.mx-auto').click()
        cy.get('.rounded-md > .text-sm').should("contain.text", "La reseña ha sido registrada con éxito")        
    })
})