import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },

  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
          pathGroups: [
            {
              pattern: '@/app/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/page/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/components/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/api/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/model/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/constants/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@/types/**',
              group: 'external',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
];

export default eslintConfig;
