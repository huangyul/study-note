# vue 后台管理系统

## 项目搭建

### 使用 vite 搭建项目

`npm create vite@latest vue-ts-admin -- --template vue-ts`

注意点：

1. vite 对 node 版本要要求，要 16 或 18
2. 命令行中的`vue-ts-admin`是文件名，`-- --template`是 npm7.++的要求，`vue-ts`是模板

### 配置git仓库

- 在github或者其他代码管理平台上新建一个仓库
- 在刚刚新建的文件夹中初始化一个git仓库，`git init`
- 将当前仓库指向刚刚新建的远程仓库`git remote add origin git@xxx.git`，其中`origin`就是在本地使用该远程仓库的名（代号？），后续可以继续添加其他仓库，使用不同的名即可
- 三步走：`git add . && git commit -m "init" && git push -u origin master`