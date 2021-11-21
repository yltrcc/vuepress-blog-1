---
title: MySQL基本概念
time: 2019-10-20
category: MySQL
author: 熊滔
commentid: mysql:basic-concept
---

我们使用Java编写程序，一般数据都是存储在内存中的，一旦程序终止或断电，那么数据就会丢失，所以我们需要将数据存储到本地文件中，我们一般存储到数据库中，而 `MySQL` 正是这么一款数据库。

安装 `MySQL` 很简单，直接使用搜索引擎搜索 `MySQL`，进入官网进行安装，`MySQL` 是开源的软件。目前企业使用的是5.5-5.7的版本，选择进行下载即可。若要卸载 `MySQL`，在手动卸载 `MySQL` 后，还要删除 `C:\ProgramData\MySQL` 这个文件夹，否则重新安装时不能成功。

### 连接MySQL

在命令行中输入

```bash
mysql -uroot -p
```

然后会提示你输入密码

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/mysql01.png" />

输入的密码以密文的形式显示，以保证安全。当然你也可以直接在 `-p` 后面输入密码，不过这样并不安全。

### SQL语句分类

`SQL` 语句按功能分为

- `DDL`：操作数据库，表
- `DML`：增、删、改数据
- `DQL`：查询数据
- `DLL`：与授权有关

在 `MySQL` 中不区分大小写，不过关键字一般会大写，而数据库名和表名一般小写，`SQL`语句需要以`;`结尾，否则会一直等待输入。

### 注释

`MySQL` 的注释为 `--` 后面需要接一个空格，否则会报错，另一种注释为 `#`，这是 `MySQL` 独有的，后面不需要加空格

```sql
show databases; -- 显示所有的数据库
show databases; #显示所有的数据库
```