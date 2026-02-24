import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      // '@typescript-eslint/no-unused-vars': 'warn',
      // '@typescript-eslint/consistent-type-imports': 'warn',
      // 'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
