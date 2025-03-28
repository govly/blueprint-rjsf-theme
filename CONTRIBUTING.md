# Contributing to @anikitenko/bp5-rjsf-theme

🎉 First of all, thank you for your interest in contributing to the project!

This project is focused on delivering a clean, fully typed, BlueprintJS v5-compatible theme for [react-jsonschema-form (RJSF)](https://github.com/rjsf-team/react-jsonschema-form).

---

## 🛠️ Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/anikitenko/bp5-rjsf-theme.git
   cd bp5-rjsf-theme
    ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the build**
   ```bash
   npm run build:all
   ```

4. **(Soon)** Run storybook or examples to preview components (WIP)

## 🧪 Types & Compatibility

This theme is strictly typed and must be compatible with RJSF's `ThemeProps`.
Please do **not bypass** type errors or loosen typing unless absolutely necessary.

## ✅ Before Submitting a PR

* Make sure your code builds with `npm run build:all`
* Ensure type declarations are correct (`tsc --project tsconfig.build.json`)
* Format code using Prettier / project style
* Add/update documentation if relevant

## 📮 Reporting Issues

Open a GitHub Issue with:

* A minimal JSON schema
* A brief description of the bug or unexpected behavior
* Screenshots or expected vs. actual outputs (if UI-related)

## 💙 Thank you!

Every contribution — whether it's a bug report, code improvement, or docs fix — is deeply appreciated.
