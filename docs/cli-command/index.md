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
