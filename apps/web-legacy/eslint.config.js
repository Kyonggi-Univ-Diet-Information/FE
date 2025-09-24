import tseslint from 'typescript-eslint';
import kiryongConfig from '@kiryong/config/eslint.config.js';

export default tseslint.config({ ignores: ['dist'] }, ...kiryongConfig);
