/* eslint-disable import-x/no-named-as-default-member */
import js from '@eslint/js';
import ts from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import next from '@next/eslint-plugin-next';
import tailwind from 'eslint-plugin-readable-tailwind';
import importX from 'eslint-plugin-import-x';

export default ts.config(
  {
    ignores: [
      'eslint.config.mjs',
      "src/components/ui/**",
      "src/hooks/**"
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  stylistic.configs.customize({
    arrowParens: true,
    semi: true,
    jsx: true,
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
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
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
    files: ["electron/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "no-undef": "off",

      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "indent": ["error", 2],

      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { "max": 1 }],

      "no-unused-vars": "warn",
      "no-var": "error",
      "prefer-const": "error",

      "arrow-spacing": "error",
    }
  }
);