# 常用的 cli 命令

## 磁盘

### ls

显示当前目录下的文件夹

```bash
ls
ls s*
ls -a
ls -l
```

- `s*`：s 开头的所有文件
- `-a`：显示所有文件，包括.开头的文件（默认不可见）
- `-l` ：额外显示文件形态、权限、拥有者、文件大小、修改时间等

### cd

切换当前工作目录

```bash
cd xxx
cd .. # 返回上一级
```

### pwd

打印当前工作目录的**绝对路径**

```bash
pwd
```

### mkdir

创建一个空目录

```bash
mkdir vue-demo
```

### rmdir

删除指定目录

```bash
rmdir vue-demo
```

### df

磁盘的使用情况

```bash
df
df -h
df --total
```

- `-h`：增加可读性，有一些单位自动转换
- `--total`：增加一行显示全部磁盘情况

### du

查看指定目录或文件的所占的磁盘空间

```bash
du
```

## 文件操作

### touch

创建文件

```bash
touch index.html
```

### rm

删除文件或目录

```bash
rm index.html
rm -rf node_module
```

- `-r`：recursive 递归删除所有层级内容
- `-f`：无需逐一询问确认，强制删除

### find

对指定目录查找文件，参数前为指定目录

```bash
find . -name "*.vue"
```

### cp

复制文件或目录

```bash
cp sourcefile targetfile
cp -t sourcefile targetfile
```

- `-r`：如果是目录，可以递归所有的内容一并复制

### mv

移动文件或目录

```bash
mv sourcefile targetfile
```

## 查看文档

### cat

用于打印指定文件内容到标准输出

```bash
cat index.txt
```

### tail

把文件最尾部的内容显示出来

```bash
tail index.log
tail -fn 100 index.log
```

- 第一个是默认显示 10 条尾部日志
- `-f`：实时查看内容
- `-n`：指定总行数

## 进程

### ps

显示当前进程的状态

```bash
ps
ps -ef -aux
```

- `-ef`：显示所有命令的全格式
- `-aux`：显示所有命令的详细信息（包括其他用户的）

### top

实时显示所有进程的动态，内容还是比较全的

```bash
top
top -d 3
```

`-d`：更新周期，秒为单位

### kill

删除工作中的文件或进程

```bash
kill -1 2222
kill -9 2222
kill -15 2222
```

- 1：重启进程
- 9：杀死进程
- 15：正常停止进程

## 网络

### ping

用于检测主机连接

```bash
ping baidu.com
```

### ssh

登录远程主机

```bash
bash user@xx.xx.xx.xx
```

拼接用户名和ip
