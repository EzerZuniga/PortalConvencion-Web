/** Se ejecuta en el hook pre-commit sobre los archivos en stage. */
const lintStagedConfig = {
  "*.{ts,tsx,js,mjs,cjs}": ["eslint --fix --max-warnings=0", "prettier --write"],
  "*.{json,md,css,yml,yaml}": ["prettier --write"],
};

export default lintStagedConfig;
