# Projeto de Gerenciamento de Conexões e Mensagens

Este projeto é uma aplicação web desenvolvida com React, TypeScript, Firebase Firestore e Firebase Functions. Ele permite gerenciar conexões, contatos e o envio de mensagens agendadas, seguindo as regras especificadas.

# Funcionalidades

## Funcionalidades

- Conexões:

  Criar, listar e excluir conexões.

  Cada conexão pode ter vários contatos vinculados.

- Contatos:

  Criar, listar e excluir contatos.

  Vincular contatos a conexões existentes.

- Envio de Mensagens (Broadcast):

  Selecionar contatos específicos para envio de mensagens.

  Agendar o envio de mensagens para um horário futuro.

  Simular o envio de mensagens (atualizar o status para "enviada").

- Gerenciamento de Mensagens:

  Filtrar mensagens por status (agendadas e enviadas).

  Atualizar automaticamente o status das mensagens agendadas para "enviada" no horário programado (usando Firebase Functions).

## Stack utilizada

**Front-end:** React, TypeScript, Material-UI (MUI), TailwindCSS, React Hook, Yup Form, React Router

**Back-end:** Firebase Firestore , Firebase Functions, Firebase Auth

## Instalação

Pré-requisitos:
Node.js (v20 ou superior)

Firebase CLI (npm install -g firebase-tools)

Conta no Firebase (https://firebase.google.com/)

---

1 - Clone o Repositório:

```bash
  npm install my-project
  cd my-project
```

2 - Instale as Dependências:

```bash
  npm install my-project
  cd my-project
```

3 - Configuração do Firebase:

No Console do Firebase, crie um novo projeto.

Vá para Configurações do Projeto > Configurações Gerais e adicione um aplicativo web.

Anote as credenciais do Firebase (apiKey, authDomain, projectId, etc.).

Crie um arquivo .env na raiz do projeto com as credenciais:

```
VITE_FIREBASE_API_KEY=SUA_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=SEU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=SEU_APP_ID
```

4 - Inicialize o Firebase Functions:

Na pasta functions, inicialize o Firebase:

```bash
firebase init functions
```

Siga as instruções para configurar o Firebase Functions.

5 - Execute o Projeto:

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

6 - Implante as Firebase Functions:

```bash
cd functions
firebase deploy --only functions
```

## Firebase Functions

A função updateScheduledMessages é executada periodicamente (a cada 1 minuto) para verificar se há mensagens agendadas que precisam ser enviadas. Se o horário programado for atingido, o status da mensagem é atualizado para "enviada".
