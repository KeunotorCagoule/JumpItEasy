import eslintPluginJs from '@eslint/js';

export default [
  // Base recommended rules
  eslintPluginJs.configs.recommended,

  // Global language options for all files
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },

  // Overrides for test files (to fix 'describe', 'it', 'expect' errors)
  {
    files: ['tests/**/*.js', 'tests/**/*.ts', '**/*.test.js', '**/*.test.ts'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
    },
  },
];

