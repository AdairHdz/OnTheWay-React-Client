export {}

describe("Registry Page Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/registry")
    })

    it("Should show 'Este campo es obligatorio' in names field because no text was introduced", () => {
        cy.get('#names').focus()        
        cy.get('#lastName').focus()
        cy.get('.input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Este campo es obligatorio' in names field because only white spaces were introduced", () => {
        cy.get('#names').type("      ")
        cy.get('#lastName').focus()
        cy.get('.input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Este campo es obligatorio' in lastName field because no text was introduced", () => {
        cy.get('#lastName').focus()
        cy.get('#names').focus()
        cy.get(':nth-child(4) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Este campo es obligatorio' in lastName field because only white spaces were introduced", () => {
        cy.get('#lastName').type("        ")
        cy.get('#names').focus()
        cy.get(':nth-child(4) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Por favor inserte un nombre de menos de 30 caracteres' in names field", () => {
        cy.get('#names').type("Jesús Nauyotzin Ipalnemoani Her")
        cy.get('#lastName').focus()
        cy.get('.input-error-text').should("contain.text", "Por favor inserte un nombre de menos de 30 caracteres")
    })

    it("Should show 'Por favor inserte un apellido de menos de 30 caracteres' in lastName field", () => {
        cy.get('#lastName').type("Hernández Fernández Gómez Mende")
        cy.get('#names').focus()
        cy.get(':nth-child(4) > .input-error-text').should("contain.text", "Por favor inserte un apellido de menos de 30 caracteres")
    })

    it("Should show 'Por favor inserte un nombre que solo contenga letras, espacios y/o acentos' in names field (4da1r Benj4m1%)", () => {
        cy.get('#names').type("4da1r Benj4m1%")
        cy.get('#lastName').focus()
        cy.get('.input-error-text').should("contain.text", "Por favor inserte un nombre que solo contenga letras, espacios y/o acentos")
    })

    it("Should show 'Por favor inserte un nombre que solo contenga letras, espacios y/o acentos' in names field (5ebastián)", () => {
        cy.get('#names').type("5ebastián")
        cy.get('#lastName').focus()
        cy.get('.input-error-text').should("contain.text", "Por favor inserte un nombre que solo contenga letras, espacios y/o acentos")
    })
    
    it("Should show 'Por favor inserte un apellido que solo contenga letras, espacios y/o acentos' in lastName field", () => {
        cy.get('#lastName').type("Hernandez Orti5")
        cy.get('#names').focus()
        cy.get(':nth-child(4) > .input-error-text').should("contain.text", "Por favor inserte un apellido que solo contenga letras, espacios y/o acentos")
    })

    it("Should show 'Este campo es obligatorio' in email field", () => {
        cy.get('#emailAddress').focus()
        cy.get('#names').focus()
        cy.get(':nth-child(5) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Por favor inserte una dirección de correo válida' in email field", () => {
        cy.get('#emailAddress').type("abcd@gmail,com")
        cy.get('#names').focus()
        cy.get(':nth-child(5) > .input-error-text').should("contain.text", "Por favor inserte una dirección de correo válida")
    })

    it("Should show 'Por favor inserte una dirección de correo con 254 caracteres o menos' in email field", () => {
        cy.get('#emailAddress').type("abcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcdefghilabcde@gmail.com")
        cy.get('#names').focus()
        cy.get(':nth-child(5) > .input-error-text').should("contain.text", "Por favor inserte una dirección de correo con 254 caracteres o menos")
    })

    it("Should show 'Este campo es obligatorio' in password field", () => {
        cy.get('#password').focus()
        cy.get('#names').focus()
        cy.get(':nth-child(6) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Por favor inserte una contraseña de al menos 8 caracteres' in password field", () => {
        cy.get('#password').type("1234567")
        cy.get('#names').focus()
        cy.get(':nth-child(6) > .input-error-text').should("contain.text", "Por favor inserte una contraseña de al menos 8 caracteres")
    })

    it("Should show 'Por favor inserte una contraseña de longitud igual o menor a 50 caracteres' in password field", () => {
        cy.get('#password').type("123456789012345678901234567890123456789012345678901")
        cy.get('#names').focus()
        cy.get(':nth-child(6) > .input-error-text').should("contain.text", "Por favor inserte una contraseña de longitud igual o menor a 50 caracteres")
    })

    it("Should show 'Por favor introduzca una contraseña con al menos una minúscula, una mayúscula, un símbolo y un número' in password field", () => {
        cy.get('#password').type("AdairBenjamin2008")
        cy.get('#names').focus()
        cy.get(':nth-child(6) > .input-error-text').should("contain.text", "Por favor introduzca una contraseña con al menos una minúscula, una mayúscula, un símbolo y un número")
    })

    it("Should show 'Este campo es obligatorio' in state field", () => {
        cy.get('#stateId').focus()
        cy.get('#names').focus()
        cy.get(':nth-child(7) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Nombre de negocio' field when user type is SERVICE_PROVIDER", () => {
        cy.get('#userType').select("Proveedor de servicio")
        cy.get('#businessName').should("exist")
    })
        
    it("Should NOT show 'Nombre de negocio' field when user type is SERVICE_REQUESTER", () => { 
        cy.get('#userType').select("Solicitante de servicio")
        cy.get('#businessName').should("not.exist")
    })

    it("Should show 'Este campo es obligatorio' in businessName field", () => { 
        cy.get('#userType').select("Proveedor de servicio")
        cy.get('#businessName').type("            ")
        cy.get('.btn-primary').click()
        cy.get(':nth-child(9) > .input-error-text').should("contain.text", "Este campo es obligatorio")
    })

    it("Should show 'Por favor ingrese solo letras, espacios y/o acentos' in businessName field", () => { 
        cy.get('#userType').select("Proveedor de servicio")
        cy.get('#businessName').type("Mis servicios 2")
        cy.get('.btn-primary').click()
        cy.get(':nth-child(9) > .input-error-text').should("contain.text", "Por favor ingrese solo letras, espacios y/o acentos")
    })

    it("Should show 'Por favor asegúrese de que el nombre no exceda los 30 caracteres' in businessName field", () => { 
        cy.get('#userType').select("Proveedor de servicio")
        cy.get('#businessName').type("ioMisServiciosdsfnjkdglnjbgdnkf")
        cy.get('.btn-primary').click()
        cy.get(':nth-child(9) > .input-error-text').should("contain.text", "Por favor asegúrese de que el nombre no exceda los 30 caracteres")
    })

    it("Should show 'Imagen de negocio' field when user type is SERVICE_PROVIDER", () => {
        cy.get('#userType').select("Proveedor de servicio")
        cy.get('#evidenceFiles').should("exist")
    })

    it("Should NOT show 'Imagen de negocio' field when user type is SERVICE_PROVIDER", () => {
        cy.get('#userType').select("Solicitante de servicio")
        cy.get('#evidenceFiles').should("not.exist")
    })    

    it("Should succeed in registering a service requester", () => { 
        cy.get('#names').type("Adair Benjamín")
        cy.get('#lastName').type("Hernández Ortiz")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('#stateId').select("Veracruz")
        cy.get('#userType').select("Solicitante de servicio")
        cy.get('.btn-primary').click()
        cy.get(".rounded-md > .font-bold").should("exist")
        cy.get(".rounded-md > .font-bold").should("contain.text", "Registro exitoso")
    })

    it("Should succeed in registering a service provider", () => { 
        cy.get('#names').type("Yazmín Alejandra")
        cy.get('#lastName').type("Luna Herrera")
        cy.get('#emailAddress').type("bipepek125@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('#stateId').select("Veracruz")
        cy.get('#userType').select("Proveedor de servicio")
        cy.get('#businessName').type("ServiExpress")
        cy.get('.btn-primary').click()
        cy.get(".rounded-md > .font-bold").should("exist")
        cy.get(".rounded-md > .font-bold").should("contain.text", "Registro exitoso")
    })

    it("Should show 'Dirección de correo ya registrada' when registering a service provider with a repeated email address", () => { 
        cy.get('#names').type("Yazmín Alejandra")
        cy.get('#lastName').type("Luna Herrera")
        cy.get('#emailAddress').type("bipepek652@slvlog.com")
        cy.get('#password').type("AdairBenjamin2008$")
        cy.get('#stateId').select("Veracruz")
        cy.get('#userType').select("Proveedor de servicio")
        cy.get('#businessName').type("ServiExpress")
        cy.get('.btn-primary').click()
        cy.get(".rounded-md > .font-bold").should("exist")
        cy.get(".rounded-md > .font-bold").should("contain.text", "Dirección de correo ya registrada")
    })
})