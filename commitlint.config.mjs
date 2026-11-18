/** Conventional Commits: https://www.conventionalcommits.org */
const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Permite descripciones en español con mayúsculas iniciales o nombres propios.
    "subject-case": [0],
    "body-max-line-length": [1, "always", 100],
  },
};

export default commitlintConfig;
