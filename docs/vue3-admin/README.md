# VUE3-Admin

**技术栈**

- vue3
- typescript
- element-plus
- vite

## 项目初始化

先新建一个 vue3+typescript 的项目，要先安装`vue/cli`

```javascript
// 安装vue脚手架
npm install -g @vue/cli

// 判断是否安装成功
vue --version
```

### 创建一个项目

`vue create app-name`

```bash
// 要构建一个 Vite + Vue 项目，运行，使用 NPM:
npm init @vitejs/app 项目名
// 构建普通项目
vue create app-name
```

###### vue 小知识

在`vue2`中，我们使用`.vue`文件时，都要`export default{}`，其他文件才能导入并引用，但在`vue3`中，多了组合式 API，里面有`setup`函数返回组件内容，加上`vue3.2`新增的`<script setup></script>`语法糖，可以使用更简洁的代码编写程序

### 测试响应式数据

```vue
<script setup lang="ts">
  import { ref } from 'vue'

  defineProps<{ msg: string }>()
  // 会自动返回里面定义好的值，例如msg， count等
  const count = ref(0)

  let msg = 'HelloWord'
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
</template>
```

###### vue 小知识

什么是`<script setup>`?  
其实就是组合式 API 的语法糖，使用有几个注意点：

1. 顶层绑定会直接暴露给模板

```vue
<script setup>
  let count = 1 // 这里的变量不需要return，模板可直接使用
</script>
<template>
  {{ count }}
</template>
```

## 安装必要配置

### element-plus

[安装教程链接](https://element-plus.gitee.io/zh-CN/guide/installation.html)

```bash
npm i element-plus -s
```

### sass

```bash
npm install sass sass-loader -d
```

### 常用文件路径映射

```javascript
// vite.config.js
// 路径映射
alias: {
  '/@/': path.resolve(__dirname, './src'),
  '/@assets/': path.resolve(__dirname, './src/assets'),
  '/@views/': path.resolve(__dirname, './src/views'),
  '/@components/': path.resolve(__diranme, './src/components'),
  '/@utils/': path.resolve(__dirname, './src/utils'),
},
```
