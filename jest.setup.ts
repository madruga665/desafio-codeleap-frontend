/* eslint-disable @typescript-eslint/no-require-imports */
import '@testing-library/jest-dom';

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

if (typeof TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

if (typeof require('react').useActionState === 'undefined') {
  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useActionState: (action: unknown) => [null, action, false],
  }));
}
