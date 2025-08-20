// Bibliotecas usados nos testes
const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')

// Importação da aplicação a ser testada

const app = require('../../app')

// Mocks
    // import do transfer para ser mocado
const transferService = require('../../service/transferService')


//const userService = require('../service/userService')

// Testes
describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo remetente e destinatário inexistente recebo 400', async () => {
            const resposta = await request(app)
            // chamada direta para o controller

                .post('/transfer')
                .send({
                    from: "marlon",
                    to: "sofia",
                    amount: 1200
                })
            expect(resposta.status).to.equal(400)
        })

        it('Quando informo remetente inexistente recebo a mensagem: "Usuário não encontrado"', async()=>{
            const resposta = await request(app)
            
            .post('/transfer')
            .send({
                from: "tcp",
                to: "marlon",
                amount: 2500
            })
            expect(resposta.body).to.have.property('error','Usuário não encontrado')

        })

        it('Quando informo destinatário inexistente recebo a mensagem: "Usuário não encontrado"', async()=>{
            const resposta = await request(app)

            .post('/transfer')
            .send({
                from:"marlon",
                to: "inexistente",
                amount: 2000
            })
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        })

        it('Usando Mocks: Quando informo rementente e destinatário inexistente recebo 400', async () => {
            // Mocar apenas a função transfer do Service, pois quero testar somente o controller
            const transferServiceMock = sinon.stub(transferService,'transfer')

            // mocando um dos retornos de erro do service, estou olhando para o metodo transfer para ver esses comportamentos
            transferServiceMock.throws(new Error('Usuário não encontrado'))

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "marlon",
                    to: "sofia",
                    amount: 1200
                })
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

            // Reseto o Mock
            sinon.restore();
        })

        it('Quando deixo de informar o remetente recebo 400 do controller', async () =>{
            const resposta = await request (app)

                .post('/transfer')
                .send({
                    from:"",
                    to: "teste",
                    amount: 100
                })

                expect(resposta.status).to.equal(400)
        })
    })


    describe('GET /transfers', () => {
        //its para testes de get
    })
})