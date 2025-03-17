import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import importX from 'eslint-plugin-import-x';
import js from '@eslint/js';
import style from '@stylistic/eslint-plugin';
import tailwind from 'eslint-plugin-readable-tailwind';
import ts from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  style.configs.customize({
    arrowParens: true,
    semi: true,
    flat: true,
  }),
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    rules: {
      'import-x/no-named-as-default-member': ['off'],
      'import-x/order': [
        'warn',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown',
            'type',
          ],
          'newlines-between': 'always',
        },
      ],
      'sort-imports': [
        'warn',
        {
          allowSeparatedGroups: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'readable-tailwind': tailwind,
    },
    rules: {
      ...tailwind.configs.warning.rules,
      'readable-tailwind/multiline': [
        'warn',
        {
          group: 'newLine',
        },
      ],
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
);