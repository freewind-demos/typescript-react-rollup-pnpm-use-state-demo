JavaScript React Rollup Pnpm "useState" Demo
=======================================

在使用pnpm时，哪怕在`rollup-plugin-commonjs`插件中已经设置了namedExports，比如：

```
commonjs({
  namedExports: {
    react: ['useState']
  }
})
```

依然会报错，原因是由于pnpm使用了hard link，导致rollup-plugin-commonjs无法正确识别。
只能写成如下的奇怪形式：

```
namedExports: {
   'node_modules/.npm-registry.compass.com/react/16.8.4/node_modules/react/index.js': ['useState']
}
```

可以看到里面嵌入了缓存路径和版本号，不可接受。

不过可以使用`require.resolve`来得到`react`真正的路径，解决这个问题。

## 运行：

```
pnpm install
pnpm run demo
```
