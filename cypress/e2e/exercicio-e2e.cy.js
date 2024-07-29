/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
// import * as faker from 'faker'
import * as faker from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('minha-conta')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
    cy.fixture('perfil').then(dados => {
        cy.get('#username').type(dados.usuario)
        cy.get('#password').type(dados.senha, {log: false})
        cy.get('.woocommerce-form > .button').click()
    })
    produtosPage.visitarUrl()
    cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[1].nomeProduto, 0)
        produtosPage.addProdutoCarrinho(
          dados[1].tamanho, 
          dados[1].cor, 
          dados[1].quantidade)
        })
    cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[2].nomeProduto, 0)
        produtosPage.addProdutoCarrinho(
            dados[2].tamanho, 
            dados[2].cor, 
            dados[2].quantidade)
        })
    cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[0].nomeProduto, 0)
        produtosPage.addProdutoCarrinho(
            dados[0].tamanho, 
            dados[0].cor, 
            dados[0].quantidade)
        })
    cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[3].nomeProduto, 0)
        produtosPage.addProdutoCarrinho(
            dados[3].tamanho, 
            dados[3].cor, 
            dados[3].quantidade)
        })
        //Criar page object para as seguintes linhas
  cy.get('.woocommerce-message > .button').click()
  cy.get('.checkout-button').click()
  cy.get('#billing_city').clear().type('faker.location.city()')
  cy.get('#billing_address_1').clear().type('faker.location.street()')
  cy.get('#billing_postcode').clear().type('57035000')
  cy.get('#billing_phone').clear().type('999999999')
  cy.get('#terms').click()
  cy.get('#place_order').click()
  cy.get('.page-title').should('have.text', 'Pedido recebido')
  });


})