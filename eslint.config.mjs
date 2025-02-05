import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tailwindcss from "eslint-plugin-tailwindcss";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),
  {
    rules: {
      "no-undef": "off",
    },
  },
  {
    ignores: [
      "components/ui/**/*.js",
      "components/ui/**/*.ts",
      "components/ui/**/*.tsx",
    ],
  },

  {
    plugins: {
      tailwindcss,
    },
    settings: {
      tailwindcss: {
        recommended: true,
      },
    },
    rules: {
      "tailwindcss/enforces-shorthand": "warn",
    },
  },
];

export default eslintConfig;
