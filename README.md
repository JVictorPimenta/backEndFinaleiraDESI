# backEndFinaleiraDESI

Backend do projeto final FullStack: um sistema escolar com autenticação, autorização por papéis e CRUDs para alunos, turmas, matrículas e notas.

## Tecnologias

- Node.js
- Express
- MySQL
- Sequelize
- JWT
- bcrypt
- CORS

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto usando o `.env.example` como base.

3. Configure o banco MySQL no `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=finaleiradesi
DB_USER=root
DB_PASSWORD=
```

4. Crie o banco de dados no MySQL:

```sql
CREATE DATABASE finaleiradesi;
```

5. Inicie o servidor:

```bash
npm run dev
```

Por padrão, a API roda em:

```txt
http://localhost:3000
```

## Variáveis de ambiente

Veja o arquivo `.env.example` para a configuração completa.

Principais variáveis:

- `PORT`: porta do servidor.
- `JWT_SECRET`: segredo usado para assinar os tokens JWT.
- `ADMIN_EMAIL`: email do administrador padrão.
- `ADMIN_PASSWORD`: senha do administrador padrão.
- `CORS_ORIGIN`: origens permitidas para o front-end.

## Admin padrão

Ao iniciar o servidor, o sistema cria um usuário administrador padrão caso ele ainda não exista.

Valores padrão:

```txt
Email: admin@finaleiradesi.com
Senha: admin123
```

Esses valores podem ser alterados no `.env`.

## Rotas principais

### Autenticação

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/register-professor`

### Alunos

- `GET /students`
- `GET /students/:id`
- `POST /students`
- `PUT /students/:id`
- `DELETE /students/:id`

### Turmas

- `GET /classes`
- `GET /classes/:id`
- `POST /classes`
- `PUT /classes/:id`
- `DELETE /classes/:id`

### Matrículas

- `GET /enrollments`
- `GET /enrollments/:id`
- `POST /enrollments`
- `PUT /enrollments/:id`
- `DELETE /enrollments/:id`

### Notas

- `GET /grades`
- `GET /grades/:id`
- `POST /grades`
- `PUT /grades/:id`
- `DELETE /grades/:id`

## Scripts

```bash
npm start
npm run dev
npm test
```
