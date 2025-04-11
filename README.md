# Gerenciador de Projetos

Este projeto é uma aplicação web para gerenciamento de projetos, desenvolvida como parte de um desafio técnico da Clicksign.

## ✨ Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) - Gerenciamento de estado
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- [json-server](https://github.com/typicode/json-server) - API fake para testes

## 📋 Funcionalidades

- Criação de projetos com nome, cliente, datas, imagem de capa e favoritos
- Validação de formulário com regras específicas
- Pesquisa e filtros dinâmicos
- Ordenação alfabética dos projetos
- Layout 100% responsivo
- Upload de imagem com preview (base64)
- Persistência com `json-server`

## 🚀 Instalação e Execução

1. **Clone o repositório

    ```bash
        git clone https://github.com/taiprogrammer/gerenciador-projetos.git

    ```bash
        cd gerenciador-projetos

2. **Instale as dependências

    ```bash
    npm install

3. **Inicie o servidor do json-server

    ```bash
    npm run dev:server

4. **Inicie o servidor front end

    ```bash
    npm run dev

5. **Acesse a aplicação em `http://localhost:5173`

## 📁 Estrutura do Projeto
src/
├── assets/            # Ícones e imagens
├── components/        # Componentes reutilizáveis
├── pages/             # Páginas (Home, CreateProject, etc)
├── server/            # Configuração do axios
├── stores/            # Pinia stores
├── utils/             # Helpers como toBase64
├── App.vue
├── main.ts

Feito com ❤️ por [Taiza Marques Sousa](https://github.com/taiprogrammer)