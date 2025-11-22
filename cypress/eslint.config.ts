import tseslint from 'typescript-eslint';
import cypress from 'eslint-plugin-cypress';


export default tseslint.config(
  cypress.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      cypress
    },
    rules: {
      "@typescript-eslint/prefer-nullish-coalescing": "off"
    }
  },
)
