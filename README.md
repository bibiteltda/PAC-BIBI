# **BiBi – Transporte Escolar**

### **PAC - Projeto de Aprendizagem Colaborativa Extensionista**

Curso de Engenharia de Software – Católica de Santa Catarina

---

## **Autores**

* Eric Gabriel Caetano
* Felipe da Silva Chawischi
* Francisco Marcelo Caetano Costa
* Gabriel Felipe Alves Bandoch
* João Guilherme Tamanini Dalmarco
* Lucas Grimes Ceola

---

## **Professores Orientadores**

* **Luiz Carlos Camargo**
* **Claudinei Dias**

---

## **Entidade Beneficiada e Justificativa do PAC**

O projeto beneficia **transportadores escolares autônomos** que precisam lidar diariamente com organização de rotas, controle de alunos, comunicação com responsáveis e gestão financeira.

Atualmente, muitos realizam esse processo de forma manual, ocasionando:

* falhas de comunicação,
* atrasos,
* perda de informações,
* dificuldade no controle de pagamentos.

O **BiBi – Transporte Escolar** surge como uma solução digital que **moderniza, automatiza e organiza** toda a operação do transporte escolar, contribuindo para um serviço mais eficiente e seguro.

---

## **Descrição do Aplicativo**

O **BiBi – Transporte Escolar** é uma plataforma web para gestão completa do transporte escolar, oferecendo recursos para alunos, responsáveis, motoristas e administradores.

### **Principais Funcionalidades**

#### **1. Cadastro e Gestão de Alunos**

* Informações: nome, idade, responsável, contato e instituição.
* Associação dos alunos a rotas específicas.

#### **2. Comunicação com Responsáveis**

* Alertas e notificações via **e-mail** ou **WhatsApp**.
* Área de mensagens para contato direto (*opcional*).

#### **3. Controle de Pagamentos**

* Registro e acompanhamento de mensalidades.
* Emissão de boletos.
* Relatórios financeiros (*opcional*).

#### **4. Segurança e Acessibilidade**

* Login seguro com níveis de acesso: administrador, motorista e responsável.
* Interface responsiva (desktop, tablet e mobile).

---

## **Tecnologias Utilizadas**

* **React.js** – Interface
* **TailwindCSS** – Estilização
* **Sails.js (Node.js)** – Backend
* **PostgreSQL** – Banco de dados

---

## **Requisitos para Preparar o Ambiente de Desenvolvimento**

### **Pré-requisitos**

* Node.js 18+
* PostgreSQL 14+
* npm ou yarn
* Git

---

## **📥 Instalação e Execução**

### **1. Clonar o Repositório**

```bash
git clone https://github.com/bibiteltda/PAC-BIBI
```

---

### **2. Instalar Dependências do Frontend**

```bash
cd frontend
npm install
```

---

### **3. Instalar Dependências do Backend**

```bash
cd ../backend
npm install
```

---

### **4. Configuração do Backend**

Criar um arquivo `.env` dentro da pasta `backend`:

```
DATABASE_URL=postgres://usuario:senha@localhost:5432/bibi
JWT_SECRET=sua_chave_secreta
PORT=1337
```
---

### **5. Executar o Backend**

```bash
cd backend
sails lift
```

---

### **6. Executar o Frontend**

```bash
cd ../frontend
npm start;
```
---

## **Prints das Principais Telas**

### **Tela de Login**

Interface inicial para autenticação de motoristas, responsáveis e administradores.
![login](./docs/prints/login.png)

---

### **Dashboard**

Resumo geral do transporte, rotas, alunos e notificações importantes.
![dashboard](./docs/prints/relatorio.png)

---

### **Cadastro de Alunos**

Formulário para adicionar e editar alunos vinculados às rotas.
![cadastro-aluno](./docs/prints/cadastro-aluno.png)

---

### **Lista de Rotas**

Visualização completa das rotas e alunos associados.
![rotas](./docs/prints/rotas.png)

---

### **Pagamentos**

Tela com status de mensalidades, histórico de pagamentos e relatórios.
![pagamentos](./docs/prints/pagamentos.png)
