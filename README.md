

  <h1>
    <img alt="Feito pelo Grupo Undefined" src="https://img.shields.io/badge/feito%20por-Grupo Undefined-%12554891">
  </h1>
  
  
 
</p>
<h1 align="center">
    <img alt="NextLevelWeek" title="#NextLevelWeek" src="./assets/images/logo-inventario-project.png">
</h1>

<h4 align="center"> 
	🚧  Inventário Raro Labs  📋  Em desenvolvimento 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-contribuidores">Contribuidores</a> • 
 <a href="#user-content--licença">Licença</a>
</p>


##  Sobre o projeto

📋 O Sistema de Inventário é uma ferramente criada como etapa de conclusão do curso Raro Academy, proporcionado pela RaroLabs.

A aplicação visa mitigar os problemas de controle dos equipamentos da empresa que são enviados a seus colaboradores para realizarem suas atividades laborais.

Com o sistema, a empresa poderá acompanhar agora quais equipamentos foram enviados para cada colaborador, o tempo de uso, o tempo para reposição, o tempo de retorno deste equipamento para manutenção na sede da empresa, entre outras informações.

---

## Funcionalidades

- [x] O Administrador pode criar um usuário do sistema:
- [x] O Usuário pode fazer login no sistema e se autenticar.
- [x] O Usuário pode criar, editar e deletar um colaborador no banco de dados:
  - [x] cadastra nome do colaborador, RG e CPF;
  - [x] cadastra e-mail;
  - [x] cadastra telefone;
  - [x] e o endereço que o colaborador deverá receber os equipamentos;
	- [x] a aplicação buscará, via api externa, os dados do CEP informado e retornará o endreço completo do colaborador;

- [x] O Usuário pode criar um novo tipo de equipamento
  - [x] esse tipo de equipamento define os tipos de equipamento que a empresa utiliza

- [x] O Usuário pode criar um novo equipamento
- [x] O Usuário pode atribuir um equipamento a um colaborador, o que irá gerar um log de movimentação;
- [ ] O Usuário deverá poder importar uma lista de usuários em formatos como csv e json e incluídos no sistema;
- [ ] Utilizar um novo client de cálculo de frete para maior exatidão do tempo de entrega e recebimento dos equipamentos;
---

## Como executar o projeto

Este projeto está implementado somente no Backend, no momento, rodando na pasta  

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend.

```bash

# Clone este repositório
$ git clone git@github.com:Joaopdev/Inventario-Raro.git

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000 

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:



#### [](https://github.com/Joaopdev/Inventario-Raro)**Server**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Axios](https://axios-http.com/docs/intro)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[dotENV](https://github.com/motdotla/dotenv)**
-   **[Express](https://expressjs.com/)**
-   **[Faker](https://github.com/marak/Faker.js/)**
-   **[JWT](https://github.com/auth0/node-jsonwebtoken)**
-   **[MariaDB](https://mariadb.org/)**
-   **[Morgan](https://www.npmjs.com/package/morgan)**
-   **[MySQL](https://www.mysql.com/)**
-   **[Node-Fetch](https://github.com/node-fetch/node-fetch)**
-   **[Reflect-Metadata](https://github.com/rbuckton/reflect-metadata)**
-   **[Sendgrid](https://github.com/sendgrid/sendgrid-nodejs/)**
-   **[Ts-node](https://github.com/TypeStrong/ts-node)**
-   **[TypeDi](https://docs.typestack.community/typedi/v/develop/01-getting-started)**
-   **[TypeOrm](https://typeorm.io/)**

> Veja o arquivo  [package.json](hhttps://github.com/Joaopdev/Inventario-Raro/blob/refinamento_README/package.json)



#### [](https://github.com/Joaopdev/Inventario-Raro)**Utilitários**

-   API:  **[VIA CEP API](viacep.com.br/ws/01001000/json/)**

-   Teste de API:  **[Insomnia](https://insomnia.rest/)**

---

## 🦸 Autores

-   **[Bernardo Cruz](https://github.com/cruzbernardo)**
-   **[Gabriel Correa](https://github.com/GabsVasc)**
-   **[Jackson Luan](https://github.com/JacksonLRD)**
-   **[João Paulo](https://github.com/Joaopdev)**

 

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

---
