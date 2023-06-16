# 部署 gitlab

> 因为公司的需求，需要在自己服务器上部署 gitlab 服务器，以保证代码的安全性，下面是部署**gitbal**的笔记以及遇到的坑

## 配置的环境参数

1. 操作系统：deepin20.2.4
2. gitlab 版本：12.3.5

!> 关于 gitlab 版本：在选则版本前，如果后续有汉化的需求，先在[gitlab 中文包](https://gitlab.com/xhang/gitlab)查看是否有对应的中文包

## 下载源文件并安装

因为官方的下载方式可能会很慢，所以推荐先手动下载 deb 包（deepin 属于 Debian 系），下载地址：[gitlab 仓库](https://packages.gitlab.com/gitlab/gitlab-ce/)，然后通过`dpkg`命令进行安装

```
sudo dpkg -i gitlab-ce_xx.x.x-ce.x_amd64.deb
```

## 配置 ip 地址和端口

使用 vim 打开`/etc/gitlab/gitlab.rb`，然后将`external_url`的值设置为本机的 ip 加端口，再把`unicorn['port']`的值设为 28080（不冲突即可），最后执行`sudo gitlab-ctl reconfigure`重新启动即可

## 汉化

先从[gitlab 中文包](https://gitlab.com/xhang/gitlab)下载与自己安装的`gitlab`版本一致的包（查看`gitlab`版本的方法：在 ip 地址后加`/help`）

覆盖旧版本：`sudo cp -rf gitlab-10-3-stable-zh/* /opt/gitlab/embedded/service/gitlab-rails/`
重新配置 gitlab：`sudo gitlab-ctl reconfigure`

## 头像显示不成功的问题

修改 gitlab 默认使用的头像引用 url：
`vi /var/opt/gitlab/gitlab-rails/etc/gtilab.yml`

修改

```
plain_url: http://sdn.geekzu.org/avatar/%{hash}?s=%{size}&d=identicon
ssl_url: https://sdn.geekzu.org/avatar/%{hash}?s=%{size}&d=identicon
```

重新执行：`sudo gitlab-ctl reconfigure`

## 管理员账号问题

新部署好的 gitlab 服务器，需要设置一下管理员的密码

```
sudo gitlab-rails console production // 进入gitlab的环境
u=User.where(id:1) // 找出id为1的用户（通常就是管理员），赋值给u
u.password="xxx" // 设置新密码
u.password_confirmation="xxx" // 确认新密码
u.save // 保存更改
```
