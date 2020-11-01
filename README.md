## 🚀 Projeto

Essa é uma mini aplicação com o objetivo de fazer consultas a [SuperHero API](https://superheroapi.com/) e listar, filtrar, e favoritar super heróis de diferentes universos.

## Tópico Importante
Foi necessário a utilização de um proxy e [cors anywhere - heroku](https://cors-anywhere.herokuapp.com) para o request na API porque, após qualquer request, a API retornava um erro de Cors. Pesquisei bastante sobre, até que cheguei nessa solução.

- O proxy foi implementado no arquivo package.json;
- O cors anywhere, no arquivo apiSuperHero.js (src/services/apiSuperHero.js).

## 💻 Tecnologias, Bibliotecas e Linguagem
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [React](https://reactjs.org)
- [Redux](https://redux.js.org/)
- [Redux-Persist](https://github.com/rt2zz/redux-persist)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Styled Components](https://styled-components.com/)
- [Axios](https://github.com/axios/axios)

## Backend
O backend está em um clould Open Source chamado [Back4App](https://www.back4app.com/)
- Nesse cloud estão armanezados os usuários cadastrados na aplicação. 

## Como Instalar
```bash
# 1. Clone o Projeto
$ git clone https://github.com/mymrtt/super-hero

# 2. Instale as Dependências

Para yarn:
$ yarn install

Para npm:
$ npm install

```
## Como Rodar
```bash
# 1. Entre na pasta
$ cd superheroes

# 2. Rode localmente

Para yarn:
$ yarn start

Para npm:
$ npm start
```


Made with ♥ by [Yasmin Miranda](https://www.linkedin.com/in/yasmin-miranda/)
