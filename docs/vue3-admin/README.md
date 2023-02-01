# vue 后台管理系统

## 项目搭建

### 使用 vite 搭建项目

`npm create vite@latest vue-ts-admin -- --template vue-ts`

注意点：

1. vite 对 node 版本要要求，要 16 或 18
2. 命令行中的`vue-ts-admin`是文件名，`-- --template`是 npm7.++的要求，`vue-ts`是模板

### 配置 git 仓库

- 在 github 或者其他代码管理平台上新建一个仓库
- 在刚刚新建的文件夹中初始化一个 git 仓库，`git init`
- 将当前仓库指向刚刚新建的远程仓库`git remote add origin git@xxx.git`，其中`origin`就是在本地使用该远程仓库的名（代号？），后续可以继续添加其他仓库，使用不同的名即可
- 三步走：`git add . && git commit -m "init" && git push -u origin master`

### git 提交规范

#### 使用 huksy

huksy 可以方便我们使用 git hook 钩子

##### 安装

`npm i huksy -D`

##### 配置

> 适合 husky 6.0 以上的版本，旧版本不适用

1. 在`package.json`添加脚本`"prepare": "husky install"`，该脚本会在 npm install 后执行，会在项目中生成.huksy 文件
2. 配置钩子: `husky add <file> [cmd]`  
   2.1 例如 `husky add .husky/pre-commit npm run test `，配置好后以后每次 commit 前，都会执行`npm run test`这个脚本（前提是 package.json 中有配置 test 脚本的执行内容）

#### 使用 commitlint 规范提交内容

安装`yarn add @commitlint/cli @commitlint/config-conventional -D`

新建 commitlint.config.js

```js
module.exports = {
  extentds: ['@commitlint/config-conventional'],
}
```

使用 husky 的 commit-msg 钩子调用 commitlint  
`npx husky add .huksy/commit-msg npx --no-install commitlint --edit "$1"`

### 使用 czg 快速创建提交模板

`npx i czg -D`

在 package.json 中配置脚本 `"commit": "git add . && npx czg"`

### 使用 lint-staged

可以只 lint 每次提交的代码，不需要全部 lint，节省时间，减少不必要的代码冲突

`yarn add lint-staged -D`

在 package.json 中配置规则

```json
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "prettier --write"
    ],
    "*.vue": [
      "prettier --write"
    ]
  }
```
