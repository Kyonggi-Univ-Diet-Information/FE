import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/index.ts', // 진입 파일
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    postcss({
      // ✅ CSS를 JS 번들에 주입
      inject: true,

      // 혹은 별도 파일로 추출하고 싶다면:
      // extract: path.resolve('dist/styles.css'),

      // CSS 모듈을 사용할 경우
      modules: false, // 글로벌 CSS면 false
      minimize: true,
      sourceMap: true,
      plugins: [autoprefixer],
    }),
  ],
  external: [
    // 외부 라이브러리 지정 (React 등)
    'react',
    'react-dom',
  ],
};
