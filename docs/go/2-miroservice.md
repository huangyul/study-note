# 微服务

## 开发环境搭建

1. 安装虚拟机，安装 centos7 系统
2. 安装 xshell，用来 ssh 链接
3. 安装 git
4. linux 安装 git`yum install git`
5. 配置：就是配置用户名和邮箱
6. 安装 docker 和 docker-compose
   1. 安装 docker
      1. 安装`curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun`
      2. 设置开机自动启动 docker`systemctl enable docker`；启动 docker`systemctl start docker`
      3. 配置阿里云镜像（非常重要）https://cr.console.aliyun.com/cn-shenzhen/instances/mirrors
   2. 安装 docker-compose
      1. 安装安装网上的教程会失败，使用以下这个https://blog.csdn.net/hrd535523596/article/details/129785651
7. 使用 docker 安装 mysql
   1. 拉取镜像 docker pull mysql:5.7
   2. 启动 docker run -p 3306:3306 --name mymysal -v $PWD/conf:/etc/mysql/conf.d -v$PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7

## rpc 核心理念

### 什么是 rpc

1. RPC（remote procedure call）远程过程调用，简单理解就是一个节点请求另一个节点提供的服务
2. 对应 rpc 的是本地过程调用，函数调用是最常见的本地过程调用
3. 将本地过程调用变成远程过程调用会面临各种问题

远程过程调用：将一个函数传到另外一个服务器，执行完后再将结果传回来，会面临以下问题

1. call 的 id 映射
2. 序列化和反序列化
3. 网络传输

简单解释：

1. 比如有两台服务器，A 和 B，B 上有 Add1 和 Add2 方法，现在 A 想要调用 Add1，那它们是如何约定的呢？此时就需要使用唯一标识符了
2. 转成 json 格式
3. 使用 tcp 比 http 好，后面会使用 http2.0，主要是为了保持长连接
