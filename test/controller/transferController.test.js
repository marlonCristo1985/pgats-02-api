const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')

const app = require('../../app')


//const userService = require('../service/userService')

describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando informo rementente e destinatário inexistente recebo 400', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "marlon",
                    to: "sofia",
                    amount: 1200
                })
            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')
        })
    })

    describe('GET /transfers', () => {
        //its para testes de get
    })
})