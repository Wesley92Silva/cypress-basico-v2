Cypress.Commands.add('fillMandatoryFieldsAndSubmit', dados =>{
    cy.get('#firstName').type('Nome').click()
    cy.get('#lastName').type('Sobrenome').click()
    cy.get('#email').type('email@teste.com.br').click()
    cy.get('#open-text-area').type('texto da ajuda bem grande',{delay: 0}).click()
    cy.contains('button','Enviar').click()
    cy.get('.success').should('be.visible')
})