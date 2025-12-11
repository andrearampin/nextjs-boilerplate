# Next.js Boilerplate

A modern Next.js boilerplate with TypeScript, Tailwind CSS, Prettier, and Vitest pre-configured.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint with Prettier integration
- **Testing**: Vitest with React Testing Library
- **Data Fetching**: TanStack React Query
- **Validation**: Zod
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `pnpm dev`           | Start development server                 |
| `pnpm build`         | Build for production                     |
| `pnpm start`         | Start production server                  |
| `pnpm lint`          | Run ESLint                               |
| `pnpm lint:fix`      | Run ESLint with auto-fix                 |
| `pnpm format`        | Format code with Prettier                |
| `pnpm format:check`  | Check code formatting                    |
| `pnpm test`          | Run tests in watch mode                  |
| `pnpm test:run`      | Run tests once                           |
| `pnpm test:coverage` | Run tests with coverage report           |

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   └── welcome/      # Example API endpoint
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── providers/        # React context providers
│   │   └── query-provider.tsx  # TanStack Query provider
│   └── ui/               # Reusable UI components
│       ├── button.tsx    # Button component
│       └── spinner.tsx   # Loading spinner
└── test/                 # Test setup and utilities
    ├── setup.ts          # Vitest setup
    └── utils.ts          # Test utilities
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev)
- [Vitest Documentation](https://vitest.dev)
