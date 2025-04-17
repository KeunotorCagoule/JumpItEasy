import eslintPluginJs from '@eslint/js';

export default [
  eslintPluginJs.configs.recommended,
  {
    languageOptions: {
      env: {
        node: true,
        es2022: true,
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      }
    }
  }
];
