export default {
  "!(*.{js,jsx,ts,tsx})": ["prettier --write"],
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
};
