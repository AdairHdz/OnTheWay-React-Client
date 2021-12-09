export {}

describe("Service Provider Home Page Tests", () => {
    beforeEach(() => {        
        cy.visit("http://localhost:3000")
        cy.get('#emailAddress').type("bipepek125@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
    })
    
    it("Should display service provider data", () => {
        cy.get('.flex > .p-5 > .font-bold').should("contain.text", "ServiExpress")
        cy.get('.text-md').should("contain.text", "Yazmín Alejandra Luna Herrera")
    })

    // it("Should display filters form", () => {
    //     cy.get('.p-3 > p').click()                
    //     cy.get('.p-3 > p').should("contain.text", "Ocultar filtros")
    //     cy.get('form > .text-lg').contains("Tipo de servicio").should("exist")
    // })

    it("Should open 'New Service Request' modal", () => {
        cy.get('.bg-yellow-500').click()
        cy.get('.text-lg').should("contain.text", "Nueva tarifa")        
    })

    it("Should close 'New Service Request' modal", () => {
        cy.get('.bg-yellow-500').click()
        cy.get('.text-lg').should("contain.text", "Nueva tarifa")
        cy.get('.justify-end > .svg-inline--fa > path').click()
        cy.get('#kindOfService').should("not.exist")
    })
    
})