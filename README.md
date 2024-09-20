### Teste Dev Junior - Legaplan

### Funcionalidades

- Criar, listar, atualizar e deletar tarefas.
- Armazenamento persistente de tarefas usando arquivos JSON.
- Interface amigável com spinners de carregamento.

### Pré-requisitos

Certifique-se de que você tenha o seguinte instalado:

- Utilizei o node v20.15.1
- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) (vem com o Node.js)

### Instalação

```bash

git clone  https://github.com/andersona16/dev-junior-legaplan.git

yarn install

ou

npm install
```

### Executando a Aplicaçã

```bash

npm run dev

 ou

yarn dev
```

### Endpoints da API

#### Busque todas as tarefas.

```http
GET /api/tasks
```

#### Crie uma nova tarefa. Espera um corpo JSON com a seguinte estrutura:

```http
POST /api/tasks
```

```json
[
  {
    "title": "Título da tarefa"
  }
]
```

#### Busque uma única tarefa pelo seu ID.

```http
GET /api/tasks/${id}
```

#### Atualize o status de conclusão de uma tarefa. Espera um corpo JSON com a seguinte estrutura:

```json
[
  {
    "isCompleted": true
  }
]
```

```http
POST /api/rings
```

#### Deletar uma tarefa pelo seu ID.

```http
DELETE /api/tasks/${id}
```

### Tecnologias Usadas

- Next.js: Framework para construir aplicações React.
- React: Biblioteca para construir interfaces de usuário.
- TypeScript: Superconjunto do JavaScript para tipagem estática.
- SASS: Pré-processador CSS para estilização.
- UUID: Biblioteca para gerar identificadores únicos.
- Bcrypt: Biblioteca para hashing de senhas.
- JsonWebToken: Biblioteca para gerenciamento de tokens JWT.
- dotenv: Módulo para carregar variáveis de ambiente.
