import "cypress-localstorage-commands"

Cypress.Commands.add("login", () => {
    cy.request({
        method: "POST",
        url: "http://localhost:8000/users/login",
        body: {
            emailAddress: "adairho16@gmail.com",
            password: "Adahplf0015$"
        }
    })
    .its("body")  
    .then(body => {     
        console.log(body)
        cy.setLocalStorage("user-data", JSON.stringify(body))
    })
})