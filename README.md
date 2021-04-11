# Backend Desafio FPF

Nodejs

## Ferramentas utilizadas:

- **Sequelize:** ORM usado para conversação com banco de dados.
- **DotEnv:** Usado para lidar com variáveis de ambiente.
- **Yup:** Usado para validações de schemas.

## Banco de dados da aplicação:

- Mysql


## Como executar o projeto:

Para ter acesso ao projeto  basta fazer um git clone, como fazer ?

Caso não tenha git abra o terminal no linux e cole:
  > \$ sudo apt-get install git-all

Apos instalar abra o terminal no linux e cole o seguinte comando:
  > \$ git clone https://github.com/FabioWendel/backend-desafio-fpf.git

Caso esteja usando Windows baixe o git para usar o comando,  acesse o link:
  > \$ https://git-scm.com/downloads

Apos instalar abra o git bash e cole o seguinte comando:
  > \$ git clone https://github.com/FabioWendel/backend-desafio-fpf.git

Feito o passo a cima vamos abrir o repositorio com o seguinte comando linux/windows:
  > \$ cd backend-desafio-fpf

Caso tudo certo até aqui vamos instalar as dependencias com o seguinte comando linux/windows:
  > \$ npm install

Crie uma copia do arquivo .env.example, renomeie para .env e adicione os devidos valores.

Execute o script para executar as migrations:
   > \$ npx sequelize db:migrate

Execute a aplicação:
   > \$ npm run dev
