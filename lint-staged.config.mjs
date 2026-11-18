import path from "node:path";

/**
 * Convierte rutas absolutas en relativas y entrecomilladas.
 * En Windows la línea de comandos tiene un límite de ~8 KB; con rutas
 * absolutas largas (y con espacios) un commit grande lo supera.
 */
const toArgs = (files) =>
  files.map((file) => JSON.stringify(path.relative(process.cwd(), file))).join(" ");

/** Se ejecuta en el hook pre-commit sobre los archivos en stage. */
const lintStagedConfig = {
  "*.{ts,tsx,js,mjs,cjs}": (files) => [
    `eslint --fix --max-warnings=0 ${toArgs(files)}`,
    `prettier --write ${toArgs(files)}`,
  ],
  "*.{json,md,mdx,css,yml,yaml}": (files) => `prettier --write ${toArgs(files)}`,
};

export default lintStagedConfig;
