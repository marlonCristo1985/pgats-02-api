# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:
   ```
npm install express swagger-ui-express
   ```

## Estrutura de Diretórios
- `controller/` — Lógica dos endpoints
- `service/` — Regras de negócio
- `model/` — Dados em memória
- `app.js` — Configuração do Express e rotas
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação da API

## Como rodar

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

## Documentação Swagger
Acesse a documentação interativa em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints

### Registro de Usuário
- `POST /register`
- Body: `{ "username": "string", "password": "string", "favorecidos": ["string"] }`

### Login
- `POST /login`
- Body: `{ "username": "string", "password": "string" }`

### Listar Usuários
- `GET /users`

### Transferência
- `POST /transfer`
- Body: `{ "from": "string", "to": "string", "amount": number }`

### Listar Transferências
- `GET /transfers`

## Regras de Negócio
- Login exige usuário e senha.
- Não é possível registrar usuários duplicados.
- Transferências acima de R$ 5.000,00 só são permitidas para favorecidos.
- O banco de dados é em memória (os dados são perdidos ao reiniciar).

## Testes
Para testar com Supertest, importe o `app.js` diretamente.

---

Desenvolvido para fins educacionais.
