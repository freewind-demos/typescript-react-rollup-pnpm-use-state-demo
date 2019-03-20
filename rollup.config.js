import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import fs from 'fs';
import nodeEval from 'node-eval';

export function getModuleExports(moduleId) {
  const path = require.resolve(moduleId);
  console.log('> path: ', path)
  const moduleOut = nodeEval(fs.readFileSync(path).toString(), path);
  let exportList = [];
  const excludeExports = /^(default|__)/;
  if (moduleOut && typeof moduleOut === 'object') {
    exportList = Object.keys(moduleOut).filter((name) => !excludeExports.test(name));
  }
  return [path, exportList];
}

export function getNamedExports(moduleIds) {
  const result = {};
  moduleIds.forEach((id) => {
    const [path, exportList] = getModuleExports(id);
    result[path] = exportList;
  });
  return result;
}

export default {
  input: 'index.ts',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs',
    }
  ],
  plugins: [
    resolve(),
    commonjs({
      namedExports: getNamedExports(['react'])
    }),
    typescript(),
  ]
};
