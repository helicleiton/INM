# Roadmap — Instituto Novo Milênio (site)

**Última atualização do checklist:** 2026-03-25

**Legenda:** `[x]` concluído · `[ ]` pendente · `[/]` em parte / precisa revisão

---

## Correções iniciais (1–2 semanas)

| Status | Item |
|--------|------|
| [x] | Ambiente local estável: Node/npm no PATH no Windows; documentação de fallback (`C:\Program Files\nodejs\`) se o terminal não achar `node` — ver [README.md](./README.md#desenvolvimento-local-windows) |
| [x] | `npm run lint` sem **erros** (restam apenas *warnings* de fast-refresh em componentes `ui/*` e `SiteContentContext`) |
| [x] | Revisão de textos e identidade (**Instituto Novo Milênio**) e metadados em `index.html` (título, descrição, OG + `og:image`) |
| [x] | Admin: deixar explícito no UI que login é **demonstração** até existir backend |
| [/] | `npm audit` — executado `npm audit fix` (sem `--force`); ainda há avisos que exigiriam upgrade major (jsdom/vite) — revisar antes de forçar |

**Já feito nesta fase**

- [x] Build de produção validado com sucesso (`vite build`) após ajustes de tema e admin.
- [x] `ThemeProvider` (`next-themes`) no `main.tsx` para compatibilidade com `useTheme` do Sonner e `darkMode: class` do Tailwind.
- [x] Correções ESLint em `command.tsx`, `textarea.tsx`, `tailwind.config.ts` (import ESM do `tailwindcss-animate`).

---

## Implementações básicas (2–4 semanas)

| Status | Item |
|--------|------|
| [x] | Conteúdo fora do só `mockData.ts` tipado: `src/data/content.json` + `public/data/content.json` + carregamento via `fetch` (`SiteContentProvider` + React Query) |
| [x] | Formulários (contato, voluntário, doações) com validação (react-hook-form + zod) e destino por **mailto:** (abre cliente de e-mail; sem backend ainda) |
| [x] | SEO por rota (títulos, meta, OG) — `react-helmet-async` + componente `PageMeta` nas páginas principais |
| [/] | Acessibilidade: link “Ir para o conteúdo” + `main` com `id`; revisar contraste/modais em rodada futura |
| [x] | Code-splitting de rotas (`React.lazy` + `Suspense`) em `App.tsx` |

**Já feito nesta fase**

- [x] `HelmetProvider` em `main.tsx`; `PageMeta` em páginas públicas cobertas.
- [x] `mockData.ts` reexporta de `content.json` para compatibilidade.
- [x] Formulários com schemas em `src/lib/schemas/forms.ts`.

---

## Intermediárias (1–3 meses)

| Status | Item |
|--------|------|
| [x] | Backend **Firebase**: Firestore (`site/publicContent`), Storage (upload), regras em `firebase/` |
| [/] | Admin `/admin/*` com CRUD: **Projetos** com criar/editar/excluir + upload de imagem; demais seções ainda em lista (expandir depois) |
| [x] | Autenticação **Firebase Auth** (e-mail/senha) quando `VITE_FIREBASE_*` está definido; sem env, login continua em modo demonstração (`localStorage`) |
| [/] | E-mail: mensagens em `inboxMessages` no Firestore; envio automático por e-mail = Cloud Function ou extensão (ver [README](./README.md#firebase-backend)) |
| [x] | Variáveis `.env.example` + documentação Vercel; previews por PR dependem da configuração do projeto na Vercel |

**Já feito nesta fase**

- [x] Firebase: `src/lib/firebase/*`, `AuthProvider`, formulários públicos gravam em `inboxMessages` quando Firebase está ativo.
- [x] Sem variáveis Firebase: admin em modo demonstração (`localStorage`) como antes.

---

## Avançadas (3–6+ meses)

| Status | Item |
|--------|------|
| [ ] | CMS headless (Sanity, Strapi, Directus) ou fluxo rascunho → publicação |
| [ ] | Multilíngue (i18n), se necessário |
| [ ] | Analytics + consentimento LGPD (orientação jurídica) |
| [ ] | E2E com Playwright em fluxos críticos; testes de componentes nas áreas instáveis |
| [ ] | Observabilidade (Sentry, uptime, alertas de deploy) |
| [ ] | Hardening: CSP, rate limit em APIs, política de secrets |

**Já feito nesta fase**

- [x] Repositório Git inicializado; commit inicial; push para [helicleiton/INM](https://github.com/helicleiton/INM) (branch `main`).
- [x] Deploy em produção na Vercel (projeto ligado ao repositório; domínio `*.vercel.app`).

---

## Como atualizar este arquivo

Ao concluir um item, marque `[x]` na linha correspondente e, se quiser, adicione uma linha curta em **“Já feito nesta fase”** com o que foi feito e o PR/commit.
