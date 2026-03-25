# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Roadmap

Planejamento, prioridades e itens já concluídos: veja [ROADMAP.md](./ROADMAP.md).

## Desenvolvimento local (Windows)

- Instale o [Node.js LTS](https://nodejs.org/) (inclui `npm`).
- Se no terminal do Cursor o comando `node` não for reconhecido, use o caminho completo, por exemplo:
  - `& "C:\Program Files\nodejs\node.exe" -v`
  - `& "C:\Program Files\nodejs\npm.cmd" run dev`
- Depois de instalar o Node, reinicie o Cursor para atualizar o `PATH` do terminal.
- O Vite está configurado para a porta **8080** (`vite.config.ts`): abra `http://localhost:8080/`.

Conteúdo editável do site público: `public/data/content.json` (espelho em `src/data/content.json` para o bundle). O app também tenta carregar `/data/content.json` em tempo de execução.

## Firebase (backend)

1. Crie um projeto em [Firebase Console](https://console.firebase.google.com/), ative **Authentication** (E-mail/senha) e **Firestore** e **Storage**.
2. Copie `.env.example` para `.env.local` e preencha as variáveis `VITE_FIREBASE_*` (Configurações do projeto → Seus apps → Web).
3. Publique as regras de segurança: `firebase deploy --only firestore:rules,storage` (com [Firebase CLI](https://firebase.google.com/docs/cli) instalado) ou cole o conteúdo de `firebase/firestore.rules` e `firebase/storage.rules` no console.
4. Crie um usuário em **Authentication** para acessar `/admin` (com variáveis Firebase o login deixa de ser só “demonstração”).
5. No painel **Configurações**, use **“Publicar dados iniciais”** para gravar o JSON padrão em `site/publicContent` no Firestore.
6. **E-mail automático:** mensagens de formulário são gravadas em `inboxMessages`. Para notificar por e-mail, use uma [Cloud Function](https://firebase.google.com/docs/functions) ou a extensão [Trigger Email](https://extensions.dev/extensions/firebase/firestore-send-email) (não incluída neste repositório).
7. **Vercel:** adicione as mesmas variáveis `VITE_FIREBASE_*` em Environment Variables e faça um novo deploy.
