# MyWallet - Backend

## Descrição
Backend para sistema de controle financeiro pessoal, permitindo cadastro, login, registro, edição, remoção e listagem de transações financeiras, com autenticação JWT e persistência em MongoDB Atlas.

## Como rodar localmente

1. Clone o repositório:
   ```
   git clone <url-do-repositorio>
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
   DATABASE_URL=<sua_string_de_conexao_mongodb>
   JWT_SECRET=<sua_jwt_secret>
   PORT=5000
   ```
4. Inicie o servidor:
   ```
   npm start
   ```

## Variáveis de ambiente necessárias
- `DATABASE_URL`: string de conexão do MongoDB Atlas
- `JWT_SECRET`: chave secreta para geração dos tokens JWT
- `PORT`: porta do servidor (opcional, padrão 5000)

## Deploy na Render
1. Faça login em [https://render.com/](https://render.com/)
2. Clique em "New Web Service"
3. Conecte seu repositório do GitHub
4. Escolha o repositório deste projeto
5. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: adicione as mesmas do seu `.env`
6. Clique em "Create Web Service"
7. Aguarde o deploy e copie o link gerado

## Link do deploy
> [https://mywallet-0lxd.onrender.com](https://mywallet-0lxd.onrender.com)

---

## Rotas principais
- `POST /sign-up` - Cadastro de usuário
- `POST /sign-in` - Login de usuário
- `POST /transactions` - Criar transação (autenticado)
- `GET /transactions` - Listar transações (autenticado)
- `PUT /transactions/:id` - Editar transação (autenticado)
- `DELETE /transactions/:id` - Remover transação (autenticado) 
