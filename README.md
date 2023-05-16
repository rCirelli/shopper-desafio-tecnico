# Desafio Técnico Fullstack - Shopper

Este projeto foi feito com o [Next.js](https://nextjs.org/)

## Para rodar localmente

Primeiro, crie o arquivo ```.env``` na raiz do projeto, utilizando como base o ```.env.example```:

```bash
# arquivo .env

# não esqueça de colocar a mesma senha do banco de dados
# no arquivo docker-compose e no .env

DATABASE_URL="mysql://root:my_secret_password@localhost:3306/app_db"
```
```bash
# arquivo docker-compose.yml

version: '3'

services:
  db:
    image: mysql:8.0-debian
    container_name: db
    environment:
      MYSQL_ROOT_PASSWORD: my_secret_password
      MYSQL_DATABASE: app_db
      MYSQL_USER: db_user
      MYSQL_PASSWORD: db_user_pass
    ports:
      - "3306:3306"
    volumes:
      - dbdata:/var/lib/mysql
volumes:
  dbdata:
```

Após isso, instale as dependências do projeto:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Depois, inicie o container do banco de dados com o comando:

```bash
npm run db:init
```

Aguarde a inicialização do container, então execute o servidor do Next:
```bash
npm run dev
```

Abra o endereço [http://localhost:3000](http://localhost:3000) em seu navegador para visualizar o projeto em execução.

## Outros comandos úteis

Para resetar o banco de dados para seu estado inicial:

```bash
npm run db:reset
```

__________________
Parar ou retomar a execução do container do banco de dados:
```bash
npm run db:down
# pára o container

npm run db:up
#retoma a execução do container
```