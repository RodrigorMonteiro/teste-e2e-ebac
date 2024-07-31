Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('fillCheckout', (city, street, zipcode, phone) => {
    cy.get('.woocommerce-message').find('.button').click()
  cy.get('.checkout-button').click()
  cy.get('#billing_city').clear().type(city)
  cy.get('#billing_address_1').clear().type(street)
  cy.get('#billing_postcode').clear().type(zipcode)
  cy.get('#billing_phone').clear().type(phone)
  cy.get('#terms').click()
  cy.get('#place_order').click()
  cy.wait(750)
  cy.get('.page-title').should('have.text', 'Pedido recebido')
})
