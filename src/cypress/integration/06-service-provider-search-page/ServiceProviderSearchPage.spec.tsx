export { }

describe("Service Provider Search Page Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('.btn-primary').click()
        cy.get('[href="/providers"] > .flex').click()
    })

    it("Should display 'Campo obligatorio' in state field", () => {
        cy.get('#state').focus()
        cy.get('#kindOfService').focus()
        cy.get('.input-error-text').should("contain.text", "Campo obligatorio")
    })

    it("Should display 'Campo obligatorio' in city field", () => {
        cy.get('#city').focus()
        cy.get('#kindOfService').focus()
        cy.get('.input-error-text').should("contain.text", "Campo obligatorio")
    })

    it("Should NOT display results", () => {
        cy.get('#kindOfService').select("Compra de fármacos")
        cy.get('#state').select("Veracruz")
        cy.get('#city').select("Minatitlán")        
        cy.get('.btn-primary').click()
        cy.get('.mx-auto').should("contain.text", "Parece ser que no hay proveedores de servicios que cumplan con los criterios que especificó")
    })

    it("Should display results", () => {
        cy.get('#kindOfService').select("Pago de servicios")
        cy.get('#state').select("Veracruz")
        cy.get('#city').select("Coatepec")        
        cy.get('.btn-primary').click()
        cy.get('.flex-grow > .font-bold').should("contain.text", "ServiExpress")
    })

    it("Should display service provider info page", () => {
        cy.get('#kindOfService').select("Compra de fármacos")
        cy.get('#state').select("Veracruz")
        cy.get('#city').select("Coatepec")        
        cy.get('.btn-primary').click()
        cy.get('.flex-grow > .font-bold').click()
        cy.get('.btn-primary').click()
    })

    it("Should display new service request form", () => {
        cy.get('#kindOfService').select("Compra de fármacos")
        cy.get('#state').select("Veracruz")
        cy.get('#city').select("Coatepec")        
        cy.get('.btn-primary').click()
        cy.get('.flex-grow > .font-bold').click()
        cy.get('.btn-primary').click()
        cy.get('.text-xl').should("contain.text", "Solicitar servicio")
    })
})