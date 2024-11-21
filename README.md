React + TypeScript + Vite Template

This template provides a minimal setup to get started with React using TypeScript and Vite. It supports Hot Module Replacement (HMR) and includes basic ESLint rules for linting.
Key Features

    React Integration: Includes official plugins for React:
        @vitejs/plugin-react (uses Babel for Fast Refresh).
        @vitejs/plugin-react-swc (uses SWC for Fast Refresh).
    TypeScript: Ensures strong typing for your React application.
    Customizable ESLint Configuration: Includes rules and recommendations to maintain code quality and style.

Expanding the ESLint Configuration

For production-grade applications, we recommend enabling type-aware linting rules. Follow these steps:
Update parserOptions

Configure the parserOptions to include your TypeScript configuration files:

export default tseslint.config({
  languageOptions: {
    // Other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});

Update ESLint Configurations

    Replace tseslint.configs.recommended with one of the following:
        tseslint.configs.recommendedTypeChecked (for type-checked recommendations).
        tseslint.configs.strictTypeChecked (for stricter type checks).
    Optionally, add stylistic linting rules:
        ...tseslint.configs.stylisticTypeChecked.

Add React-specific Linting

Install the eslint-plugin-react package and update your ESLint configuration as follows:

// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Specify the React version
  settings: {
    react: { version: '18.3' },
  },
  plugins: {
    // Add the React plugin
    react,
  },
  rules: {
    // Other custom rules...
    
    // Enable recommended React rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
