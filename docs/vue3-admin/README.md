# VUE3-Admin

**技术栈**

- vue3
- typescript
- element-plus
- webpack

## 项目初始化

使用`@vue/cli`初始化一个`typescript`项目

```bash
vue create app-name
# 下面的操作选择vue3和typescript
```

## 安装element-plus 

需要同时安装`icon`库，[参考文档](https://element-plus.gitee.io/zh-CN/)

```javascript
// 安装包
npm i element-plus @element-plus/icon-vue

// main.ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElemntPlus)

// 如果要全局使用`element-icon`，需要全局注册
// help.ts
import type { App } from 'vue'
import * as icons from '@element-plus/icon-vue'
export function registerComponent(app: App) {
  const elIcons = icons as any
  for(const i in elIcons) {
    app.component(`element${elIcons[i].name}`, elIcons[i])
  }
}
```

###### vue3 小提示

?> 如何在`setup`中获取组件

```html
<!--要使用<script setup></script>-->
<template><div ref="divRef"></div></template>
<script setup>
const divRef = ref(null)  // 这样就能获取到自组件
</script>
```