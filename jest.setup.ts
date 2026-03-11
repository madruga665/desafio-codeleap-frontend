import '@testing-library/jest-dom'

// Mock global do Next.js para evitar que o Jest tente carregar APIs de servidor (Next.js 15)
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}))

// Polyfills básicos necessários
if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// Mock do React 19 useActionState caso não seja detectado automaticamente
if (typeof (require('react') as any).useActionState === 'undefined') {
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useActionState: (action: any) => [null, action, false],
  }))
}
