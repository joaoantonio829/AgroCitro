# AgroCitro: Sistema de Monitoramento Agrícola (Plantio, Irrigação e Colheita)

Este projeto consiste em uma aplicação web front-end (HTML/CSS/JavaScript) que interage com um servidor back-end simples em Node.js (Express) para gerenciar dados de plantio, irrigação e colheita em um banco de dados MySQL.

---

## 1. Estrutura do Repositório

A estrutura do seu projeto deve seguir este formato para que os caminhos de arquivos funcionem corretamente:

```
/
├── index.html
├── irrigacao.html
├── plantio.html
├── colheita.html
├── nossahistoria.html
├── script.js
├── style.css
├── /projeto
│   ├── /css
│   │   └── style1.css
│   └── /img
│       └── banner.jpg (Imagem mencionada em index.html)
└── /repositorio
    └── bancoDados.js
```

### Nota sobre os arquivos de estilo

- `style.css` está na raiz e é usado para as páginas de cadastro (`plantio.html`, `irrigacao.html`, `colheita.html`).
- `style1.css` está dentro de `projeto/css/` e é usado para a página principal (`index.html`).

---

## 2. Configuração e Dependências

Para que o back-end funcione, você precisa ter o **Node.js** instalado e as seguintes bibliotecas:

- `express` (para o servidor web)
- `mysql2/promise` (para comunicação com o MySQL)

### 2.1. Configuração do Banco de Dados

1. Crie o banco de dados no seu servidor MySQL com o nome `agrocitro`.
2. Verifique as credenciais no arquivo `repositorio/bancoDados.js`. Por padrão, ele está configurado da seguinte forma:

```js
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Insira sua senha, se houver
    database: 'agrocitro'
});
```

3. Crie as tabelas `plantio`, `irrigacao` e `colheita` no banco `agrocitro` com as colunas necessárias, compatíveis com os campos usados no `bancoDados.js`.

### 2.2. Instalação das Dependências

Abra o terminal na raiz do projeto e execute:

```bash
# Inicializa um novo projeto Node.js
npm init -y 

# Instala as dependências necessárias
npm install express mysql2
```

---

## 3. Execução do Projeto

O projeto possui duas partes: o servidor back-end Node.js e o front-end HTML.

### 3.1. Inicialização do Servidor Back-end (Node.js)

O servidor é responsável por fornecer as rotas (endpoints) para interação com o banco de dados.

1. Abra o terminal na raiz do projeto.
2. Execute o servidor:

```bash
node script.js
```

> O servidor será iniciado na porta `3000`, conforme definido no final do arquivo `script.js`.

### 3.2. Visualização do Front-end (HTML)

1. Use a extensão **Live Server** (ou similar) no seu editor de código (como o VS Code).
2. Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

> A interface será aberta no navegador. Os links para `/plantio`, `/irrigacao` e `/colheita` acessam o servidor Node.js na porta 3000.

---

## 4. Testes e Validação (Postman)

Você pode usar o **Postman** ou **Insomnia** para testar os endpoints da API.

> Assuma que o servidor está rodando em: `http://localhost:3000`

### 4.1. Endpoints de Consulta (GET)

| Função           | Método | URL                                    | Descrição                             |
|------------------|--------|----------------------------------------|----------------------------------------|
| Obter Plantios   | GET    | `http://localhost:3000/plantio`        | Lista todos os registros de plantio.   |
| Obter Irrigação  | GET    | `http://localhost:3000/irrigacao`      | Lista todos os agendamentos.           |
| Obter Colheita   | GET    | `http://localhost:3000/colheita`       | Lista todos os registros de colheita.  |
| Obter Totais     | GET    | `http://localhost:3000/plantas`        | Retorna o total de plantas cadastradas.|

---

### 4.2. Endpoints de Inclusão (POST)

Todos os endpoints de inclusão exigem um corpo (Body) em formato **JSON**.

#### 4.2.1. Registrar Plantio

- **Método:** POST  
- **URL:** `http://localhost:3000/adicionar-plantio`  
- **Body (JSON):**

```json
{
    "variedade": "Laranja Lima",
    "dataPlantio": "2024-08-01",
    "quantidade": 150,
    "localizacao": "Setor A, Linha 5"
}
```

#### 4.2.2. Agendar Irrigação

- **Método:** POST  
- **URL:** `http://localhost:3000/adicionar-irrigacao`  
- **Body (JSON):**

```json
{
    "Horario_Inicial": "18:00",
    "Horario_Final": "19:30"
}
```

#### 4.2.3. Registrar Colheita

- **Método:** POST  
- **URL:** `http://localhost:3000/adicionar-colheita`  
- **Body (JSON):**

```json
{
    "Data_Colheita": "2025-01-10",
    "Quantidade_Colhida": 850,
    "Qualidade": "Excelente"
}
```
