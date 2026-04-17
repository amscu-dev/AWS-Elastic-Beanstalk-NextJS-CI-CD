import { configs as perfectionistConfigs } from "eslint-plugin-perfectionist";
import { configs as jsoncConfigs } from "eslint-plugin-jsonc";
import nextVitals from "eslint-config-next/core-web-vitals";
import { globalIgnores, defineConfig } from "eslint/config";
import eslintComments from "eslint-plugin-eslint-comments";
import testingLibrary from "eslint-plugin-testing-library";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Docs: https://www.npmjs.com/package/eslint-config-prettier
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Docs: https://www.jsboundaries.dev/
  {
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          rules: [
            {
              allow: { to: { type: "shared" } },
              from: { type: "shared" },
            },
            {
              message:
                "[feature/{{from.captured.featureName}}] cannot import from [app]. Features must not depend on the app layer.",
              disallow: {
                to: { type: "app" },
              },
              from: { type: "feature" },
            },
            {
              disallow: {
                to: {
                  captured: {
                    featureName: "!{{from.captured.featureName}}",
                  },
                  type: "feature",
                },
              },
              message:
                "[feature/{{from.captured.featureName}}] cannot import from [feature/{{to.captured.featureName}}]. A feature may import only from itself or from shared.",
              from: { type: "feature" },
            },
            {
              allow: {
                to: [
                  { type: "shared" },
                  {
                    captured: {
                      featureName: "{{ from.captured.featureName }}",
                    },
                    type: "feature",
                  },
                ],
              },
              from: { type: "feature" },
            },
            {
              allow: {
                to: [
                  { type: "shared" },
                  { type: "feature" },
                  { captured: { fileName: "*.css" }, type: "app" },
                ],
              },
              from: { type: "app" },
            },
            {
              allow: {
                to: [{ type: "shared" }, { type: "feature" }],
              },
              from: { type: "neverImport" },
            },
          ],
          message:
            "[{{from.type}}/{{from.captured.featureName}}] cannot import [{{to.type}}/{{to.captured.featureName}}]",
          default: "disallow",
        },
      ],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/no-unknown": ["error"],
    },
    settings: {
      "boundaries/elements": [
        {
          pattern: [
            "src/components/**/*",
            "src/config/**/*",
            "src/contexts/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/providers/**/*",
            "src/schemas/**/*",
            "src/store/**/*",
            "src/styles/**/*",
            "src/types/**/*",
            "src/utils/**/*",
          ],
          type: "shared",
          mode: "full",
        },
        {
          pattern: ["src/features/*/**/*"],
          capture: ["featureName"],
          type: "feature",
          mode: "full",
        },
        {
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
          mode: "full",
          type: "app",
        },
        {
          pattern: [
            "src/proxy.ts",
            "src/instrumentation.ts",
            "src/instrumentation-client.ts",
          ],
          type: "neverImport",
          mode: "full",
        },
      ],
      "boundaries/include": ["src/**/*"],
    },
    plugins: { boundaries },
  },
  {
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              message:
                "Use typed hooks `useAppDispatch` and `useAppSelector` instead.",
              importNames: ["useSelector", "useDispatch"],
              name: "react-redux",
            },
          ],
        },
      ],
      "no-restricted-imports": "off",
    },
    files: ["**/*.{ts,tsx}"],
  },
  {
    rules: {
      "@typescript-eslint/no-restricted-imports": "off",
    },
    files: ["src/store/hooks.ts"],
  },
  // Docs: https://ota-meshi.github.io/eslint-plugin-jsonc/
  ...jsoncConfigs["recommended-with-json"],
  {
    files: [".vscode/**/*.json", ".devcontainer/**/*.json"],
    rules: {
      "jsonc/no-comments": "off",
    },
  },
  // Docs: https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
  {
    rules: {
      "eslint-comments/require-description": [
        "error",
        { ignore: ["eslint-enable"] },
      ],

      "eslint-comments/disable-enable-pair": [
        "error",
        { allowWholeFile: false },
      ],

      "eslint-comments/no-aggregating-enable": "error",

      "eslint-comments/no-duplicate-disable": "error",

      "eslint-comments/no-unlimited-disable": "error",

      "eslint-comments/no-unused-disable": "error",

      "eslint-comments/no-unused-enable": "error",
    },
    plugins: {
      "eslint-comments": eslintComments,
    },
  },
  // Docs: https://www.npmjs.com/package/eslint-plugin-testing-library
  {
    files: ["**/__tests__/**/*.{jsx,tsx}"],
    ...testingLibrary.configs["flat/react"],
  },
  // Docs: https://perfectionist.dev/
  perfectionistConfigs["recommended-line-length"],
  // Docs: https://www.npmjs.com/package/eslint-plugin-security
  {
    rules: {
      ...security.configs.recommended.rules,
    },
    plugins: {
      security,
    },
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
  // Docs: https://www.npmjs.com/package/eslint-plugin-unicorn
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      "unicorn/no-null": "off",
    },
  },
  // Docs: https://www.npmjs.com/package/eslint-plugin-sonarjs?activeTab=versions
  sonarjs.configs.recommended,
  {
    rules: {
      "sonarjs/no-nested-conditional": "off",
      "sonarjs/no-commented-code": "off",
      "sonarjs/todo-tag": "off",
    },
  },
  // Docs: https://www.npmjs.com/package/eslint-plugin-import?activeTab=readme
  {
    rules: {
      // Helpful warnings
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/__tests__/**",
            "**/*.test.*",
            "**/*.spec.*",
            "eslint.config.*",
            "next.config.*",
            "jest.config.*",
            "jest.setup.ts",
            "mocks/**/*",
            "playwright.config.ts",
          ],
        },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
      "import/no-named-as-default-member": "warn",
      "import/newline-after-import": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-as-default": "warn",
      "import/no-absolute-path": "error",
      "import/no-self-import": "error",

      "import/no-unresolved": "error",
      "import/no-duplicates": "error",

      "import/default": "error",

      "import/no-cycle": "warn",
      "import/export": "error",

      // Style guide
      "import/first": "error",
    },
    plugins: {
      import: importPlugin,
    },
  },
]);

export default eslintConfig;
