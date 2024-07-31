/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";
import { fakerPT_BR } from '@faker-js/faker';

let dadosCheckout

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

      before(() => {
        cy.fixture('checkout').then(checkout => {
            dadosCheckout = checkout
        })
    });
  beforeEach(() => {
      cy.visit('minha-conta')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
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
  cy.fixture('checkout').then((dados) => {
    cy.fillCheckout(dados.city, dados.street, dados.zipCode, dados.phone)
})
cy.get('.page-title').should('have.text', 'Pedido recebido')

  });



})