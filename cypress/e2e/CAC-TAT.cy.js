/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    const threeSecondsInMs = 3000
    const dados = {}

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    //Aula 1
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equals','Central de Atendimento ao Cliente TAT')
    })

    //Aula 2 - Exercício - Exercício extra 1

    Cypress._.times(5,() =>{
        it('preenche os campos obrigatórios e envia o formulário', function() {

            cy.clock()
            
            cy.get('#firstName').type('Nome').click()
            cy.get('#lastName').type('Sobrenome').click()
            cy.get('#email').type('email@teste.com.br').click()
            cy.get('#open-text-area').type('texto da ajuda bem grande',{delay: 100}).click()
            cy.contains('button','Enviar').click()

            cy.get('.success').should('be.visible')

            cy.tick(threeSecondsInMs)
            cy.get('.success').should('not.be.visible')
            
        })
    })

    //Aula 2 - Exercício extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.clock()
        
        cy.get('#firstName').type('Nome').click()
        cy.get('#lastName').type('Sobrenome').click()
        cy.get('#email').type('email-e').click()
        cy.get('#open-text-area').type('texto da ajuda bem grande, com muitas informações mesmo',{delay: 0}).click()
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
        cy.tick(threeSecondsInMs)
        cy.get('.error').should('not.be.visible')

    })

    //Aula 2 - Exercício extra 3
    it('telefone vazio', function () {
        cy.clock()

        cy.get('#firstName').type('Nome').click()
        cy.get('#lastName').type('Sobrenome').click()
        cy.get('#email').type('wesley92silva@gmail.com').click()
        cy.get('#phone').type('aba').click().should('have.text','')
        cy.get('#open-text-area').type('texto da ajuda bem grande').click()
        cy.contains('button','Enviar').click()


        cy.get('.success').should('be.visible')

        cy.tick(threeSecondsInMs)
        cy.get('.success').should('not.be.visible')
    })

    //Aula 2 - Exercício extra 4 - Aula 5 Exercício extra
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Nome').click()
        cy.get('#lastName').type('Sobrenome').click()
        cy.get('#email').type('wesley92silva@gmail.com').click()
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('texto da ajuda bem grande').click()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Aula 2 - Exercício extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Nome').click().should('have.value','Nome').clear().should('have.value','')
        cy.get('#lastName').type('Sobrenome').click().should('have.value','Sobrenome').clear().should('have.value','')
        cy.get('#email').type('wesley92silva@gmail.com').click().should('have.value','wesley92silva@gmail.com').clear().should('have.value','')
        cy.get('#phone').type('4132657225').click().should('have.value','4132657225').clear().should('have.value','')
    })

    //Aula 2 - Exercício extra 6 - Exercício extra 8
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.clock()

        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

        cy.tick(threeSecondsInMs)
        cy.get('.error').should('not.be.visible')
    })

    //Aula 2 - Exercício extra 7 - Comandos customizados
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })

    //Aula 3 - 
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('select').select('YouTube').should('have.value','youtube')
    })

    //Aula 3 - 
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })

    //Aula 3 - 
    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('select').select(1).should('have.value','blog')
    })

    //Aula 4 -

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]').should('have.length',3).each(function(radio){
                                                                        cy.wrap(radio).check()
                                                                        cy.wrap(radio).should('be.checked')
                                                                    })
    })

    //Aula 5

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('#check input[type="checkbox"]').as('checkbox').check().last().uncheck().should('not.be.checked')
    })

    //Aula 6

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json').then(input => {expect(input[0].files[0].name).to.equal('example.json')})
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'}).then(input => {expect(input[0].files[0].name).to.equal('example.json')})
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('exampleFile')
        cy.get('#file-upload').selectFile('@exampleFile').then(input => {expect(input[0].files[0].name).to.equal('example.json')})
    })

    //Aula 7

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })


    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })

    //Aula 8 - package.json
    //Aula 9

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success').should('not.be.visible').invoke('show').should('be.visible').and('contain', 'Mensagem enviada com sucesso.').invoke('hide').should('not.be.visible')
        cy.get('.error').should('not.be.visible').invoke('show').should('be.visible').and('contain', 'Valide os campos obrigatórios!').invoke('hide').should('not.be.visible')
      })

    it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('textarea').invoke('val', longText).should('have.value', longText)
    })
    
    it('faz uma requisição HTTP', function() {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK')
            expect(response.body).to.include('CAC TAT')
          })

    })
    
    it.only('exibe o gato', function(){
        cy.get('#cat').invoke('show').should('be.visible')
    })
    
  })