# 🚀 CodeLeap Network - Frontend Challenge

Este projeto é uma plataforma de rede social moderna, construída com o estado da arte do ecossistema React. Focado em performance, acessibilidade e arquitetura escalável, utiliza as versões mais recentes do **Next.js 15/16** e **React 19**.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15/16](https://nextjs.org/) (App Router)
*   **Biblioteca**: [React 19](https://react.dev/)
*   **ORM**: [Prisma 7](https://www.prisma.io/) com PostgreSQL (Driver Adapters)
*   **API**: Native Route Handlers (Next.js)
*   **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/) (Configuração via `@theme inline`)
*   **Validação & Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Testes**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
*   **Gestão de Estado**: Hooks customizados com `useSyncExternalStore` para sincronização nativa com Browser APIs.
*   **Utilidades**: `date-fns` (formatação de tempo relativo), `clsx` & `tailwind-merge`.

## 🏗️ Arquitetura

O projeto segue uma arquitetura de camadas inspirada em **Clean Architecture**, garantindo separação de responsabilidades e facilidade de manutenção:

*   **`/src/app`**: Roteamento, layouts assíncronos e API Route Handlers.
*   **`/src/app/actions`**: **Server Actions** para mutações de dados seguras e otimizadas.
*   **`/src/components`**: Componentes de UI atômicos, priorizando **Server Components**.
*   **`/src/hooks`**: Abstração de estados reativos (ex: `useUsername` para persistência no `sessionStorage`).
*   **`/src/repositories`**: Camada de acesso a dados (Prisma).
*   **`/src/services`**: Lógica de negócio e orquestração de paginação.

## ✨ Principais Funcionalidades & Boas Práticas

1.  **React 19 Patterns**: Uso de `useSyncExternalStore` para evitar *Hydration Mismatch* e `useActionState` para gestão de formulários com Server Actions.
2.  **Next.js 15 Async Routing**: Preparado para a natureza assíncrona de `params` e `searchParams`.
3.  **API Real com Prisma**: Sistema de paginação robusto seguindo o formato `{ count, next, previous, results }`.
4.  **Performance First**: Uso estratégico de Server Components e carregamento direto de dados via Service no servidor para evitar waterfalls de rede.
5.  **Acessibilidade (A11y)**: Formulários semânticos com suporte a teclado e feedbacks de erro claros.

## 🧪 Suíte de Testes

O projeto conta com uma infraestrutura de testes automatizados utilizando **Jest** e **React Testing Library**. Devido às exigências do Next.js 15, implementamos uma estratégia de **Global Mocking** para APIs de servidor (`next/cache`, `next/navigation`), garantindo testes rápidos e estáveis em ambiente JSDOM.

*   **Testes de Componentes**: Validação de renderização, estados de interação e lógica de formulário.
*   **Mocks de Hooks**: Isolamento total do comportamento do componente em relação a APIs externas.

Para rodar os testes:
```bash
npm test          # Executa todos os testes
npm run test:watch # Modo de observação para desenvolvimento
```

## 🏃 Como Executar

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/madruga665/desafio-codeleap-frontend.git
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz:
    ```env
    DATABASE_URL="postgresql://user:pass@host:5432/db"
    ```

4.  **Sincronize o Banco de Dados:**
    ```bash
    npx prisma db push
    ```

5.  **Inicie o ambiente de desenvolvimento:**
    ```bash
    npm run dev
    ```

## 🧪 Scripts Disponíveis

*   `npm run dev`: Inicia o Next.js em modo de desenvolvimento.
*   `npm run build`: Gera o build de produção (incluindo `prisma generate`).
*   `npm test`: Executa a suíte de testes.
*   `npm run lint`: Executa o ESLint.

---
Desenvolvido por [madruga665](https://github.com/madruga665)
