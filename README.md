## 🚀 Projeto

Essa é uma mini aplicação com o objetivo de fazer consultas a [SuperHero API](https://superheroapi.com/). Nela, você conseguirá...
- Criar uma conta;
- Visualizar uma lista de super heróis;
- Favoritar/Desfavoritar super heróis;
- Visualizar lista de super heróis favoritados;
- Buscar por um super herói;
- Escolher o tema da aplicação (dark/light).

## 🔭 Link Online: [superheroes](https://mymrttsuperheroes.netlify.app/)

## ⚡ Tópico Importante ⚡
Foi necessário a utilização do [cors anywhere - bridged](https://cors.bridged.cc) para a correção do erro de CORS após os requests na API.

- Você consegue visualzar no arquivo apiSuperHero (src / services / apiSuperHero.js).

## 💻 Linguagem, Tecnologias e Bibliotecas 
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [React](https://reactjs.org)
- [Redux](https://redux.js.org/)
- [Redux-Persist](https://github.com/rt2zz/redux-persist)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Styled Components](https://styled-components.com/)
- [Axios](https://github.com/axios/axios)
- [Cypress](https://www.cypress.io/)

## Back-end
O back-end foi construído através de um clould open source chamado [Back4App](https://www.back4app.com/)
- Nesse cloud estão armanezados os usuários cadastrados na aplicação. 

## Como Instalar o Projeto
```bash
# 1. Clone o Projeto
$ git clone https://github.com/mymrtt/superheroes

# 2. Instale as Dependências
# Para yarn:
$ yarn install

# Para npm:
$ npm install

```
## Como Rodar o Projeto
```bash
# 1. Entre na pasta
$ cd superheroes

# 2. Rode localmente
# Para yarn:
$ yarn start

# Para npm:
$ npm start
```

## Testes Automatizados Utilizando [Cypress](https://www.cypress.io/)

- Como rodar os testes?
```bash
# 1. Abra o Cypress
# Para yarn:
$ yarn cy:open

# Para npm:
$ npm cy:open

# 2. Rode o Cypress e o projeto ao mesmo tempo. Para isso, abra outra aba em seu terminal, e execute...
# Para yarn:
$ yarn start

# Para npm:
$ npm start

# 3. Selecione um dos arquivos com os testes na janela do cypress

```


Feito com ♥ por [Yasmin Miranda](https://www.linkedin.com/in/yasmin-miranda/)
