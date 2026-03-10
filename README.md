# 🚀 CodeLeap Network - Frontend Challenge

Este projeto é uma plataforma de rede social moderna, construída com o estado da arte do ecossistema React. Focado em performance, acessibilidade e arquitetura escalável, utiliza as versões mais recentes do **Next.js 15/16** e **React 19**.

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
* **Biblioteca**: [React 19](https://react.dev/)
* **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/) (Configuração via `@theme inline`)
* **Data Fetching**: Custom Fetch Adapter com suporte a estratégias de cache do Next.js.
* **Mock Backend**: [JSON Server](https://github.com/typicode/json-server) (configurado para deploy na Vercel).
* **Utilidades**: `date-fns` (formatação de tempo relativo), `clsx` & `tailwind-merge` (gestão de classes dinâmicas).

## 🏗️ Arquitetura

O projeto segue uma arquitetura de camadas inspirada em **Clean Architecture**, garantindo que a lógica de negócio seja independente da interface:

* **`/src/app`**: Roteamento e layouts assíncronos (Next.js 15).
* **`/src/components`**: Componentes de UI atômicos e reutilizáveis, priorizando **Server Components** para redução de bundle.
* **`/src/hooks`**: Abstração de estados complexos (ex: `useUsername` para persistência reativa no `sessionStorage`).
* **`/src/lib`**: Utilitários de infraestrutura, como o `fetchAdapter` genérico.
* **`/src/repositories`**: Camada de acesso a dados (Data Access Layer).
* **`/src/services`**: Camada de aplicação para transformação de dados e lógica de negócio.

## ✨ Principais Funcionalidades & Boas Práticas

1. **React 19 Patterns**: Uso de `useSyncExternalStore` para evitar *Hydration Mismatch* ao acessar o `sessionStorage`, garantindo uma UI consistente entre servidor e cliente.
2. **Next.js 16 Async Routing**: Implementação preparada para a nova natureza assíncrona de `params` e `searchParams`.
3. **Performance First**:
    * Uso estratégico de **Server Components** para renderização estática e streaming.
    * Fetch Adapter configurado com `cache: 'no-store'` para garantir dados sempre atualizados no feed.
4. **Acessibilidade (A11y)**: Formulários semânticos com suporte nativo à tecla `Enter` e estados de erro claros.
5. **Design System**: Tipografia consistente (Roboto) e cores centralizadas via variáveis CSS integradas ao Tailwind.

## 🏃 Como Executar

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/madruga665/desafio-codeleap-frontend.git
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz (ou use as configurações padrão):

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

4. **Inicie o Mock Server (JSON Server):**

    ```bash
    npm run server
    ```

5. **Inicie o ambiente de desenvolvimento:**

    ```bash
    npm run dev
    ```

## 🧪 Scripts Disponíveis

* `npm run dev`: Inicia o Next.js em modo de desenvolvimento.
* `npm run build`: Gera o build de produção otimizado.
* `npm run server`: Inicia a API fake na porta 3001.
* `npm run lint`: Executa o ESLint para garantir a qualidade do código.

---
Desenvolvido por [madruga665](https://github.com/madruga665)
