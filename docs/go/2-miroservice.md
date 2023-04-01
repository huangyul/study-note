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
7. 使用docker安装mysql
   1. 拉取镜像 docker pull mysql:5.7
   2. 启动docker run -p 3306:3306 --name mymysal -v $PWD/conf:/etc/mysql/conf.d -v$PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
