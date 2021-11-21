---
title: 远程访问 jupyter
author: 熊滔
commentid: essay:remote-jupyter
---

最近又开始折腾了 `jupyter` 了，因为实验室的网络环境太差，每次我使用 `conda` 开启一个新的环境，然后下载一些新的包时会非常的慢，慢我还能忍，问题是经常下载失败，浪费我的时间:sob:，接着我想到我有一台腾讯云的服务器，我就想在服务器上下载 `jupyter`，然后远程访问。

## 下载 Miniconda

首先需要下载 `Miniconda`，我没有下载 `Anaconda`，因为我不需要那么多的包，按需下载即可

```bash
wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

>如果没有 `wget` 命令，可以通过 `yum -y install wget` 进行下载。

这里下载了一个 `shell` 脚本，运行该脚本即可自动完成 `Miniconda` 的下载

```bash
chmod +x Miniconda3-latest-Linux-x86_64.sh # 添加可执行权限
./Miniconda3-latest-Linux-x86_64.sh        # 执行脚本
```

在下载的期间会问一些问题，回答 `yes` 即可。

安装完毕之后，**重新**进入命令行，输入

```bash
conda -V
```

如果正确输出了版本号就说明下载成功了。

## 下载 jupyter

下面我们新建一个环境，环境名就叫做 `jupyter` 好了

```bash
conda create -n jupyter
```

然后激活环境

```bash
conda activate jupyter
```

接着下载 `jupyter`

```bash
conda install jupyter
```

## 配置密码

我们要远程访问 `jupyter`，就需要配置密码来进行登录，在命令行输入 `ipython` (下载 `jupyter` 的时候就已经下载好了 `ipython`) 便可以进入一个 `python` 交互式 `shell`

```bash
ipython
```

依次输入下面的命令

```python
from notebook.auth import passwd
passwd()
```

接着便会提示你输入密码，输入密码后会给你一个密文字符串，如

```python
'sha1:43b95b731276:5d330ee6f6054613b3ab4cc59c5048ff7c70f549'
```

这个密文字符串在 `jupyter` 的配置文件中会用到，先保存/复制下来。

##  jupyter 配置文件

接着我们便要配置 `jupyter` 的配置文件，在命令行运行

```bash
jupyter notebook --generate-config
```

会生成 `~/.jupyter/jupyter_notebook_config.py` 这个文件，我们打开编辑

```bash
vi ~/.jupyter/jupyter_notebook_config.py
```

在其中添加如下配置

```python
c.NotebookApp.ip='*' #设置远程访问 jupyter 的ip，*表示所有 ip 都可以访问
c.NotebookApp.allow_remote_access = True # 允许远程访问
c.NotebookApp.password = 'sha1:5df252f58b7f:bf65d53125bb36c085162b3780377f66d73972d1' #填写刚刚生成的密文  
c.NotebookApp.open_browser = False # 禁止notebook启动时自动打开浏览器(在 linux 服务器一般都是 ssh 命令行访问，没有图形界面的。所以，启动也没啥用)  
c.NotebookApp.port =8888 #指定访问的端口，默认是8888
```

## 启动 jupyter

下面我们就可以在命令行输入如下命令启动 `jupyter`

```bash
jupyter notebook --allow-root
```

这个命令启动后会在前台运行，如果我们希望 `jupyter` 在后台运行，我们可以运行下面的命令

```bash
nohup jupyter notebook --allow-root > jupyter.log 2>&1 &
```

因为我们便可以在本机通过服务器的公网 `ip:8888` 的方式来访问该 `jupyter notebook`。

> PS：如果你想在服务器停止  `juputer`，首先运行
>
> ```bash
> ps
> ```
>
>  该命令可以显示正在运行的进程，我们找到 `jupyter` 进程的 `pid`，然后通过
>
> ```bash
> kill -9 pid
> ```
>
> 来杀死 `jupyter` 服务，即可停止 `jupyter`。

## 参考链接

- [linux 中安装miniconda](https://www.jianshu.com/p/47ed480daccc)
- [Linux上配置Jupyter Notebook远程访问](https://fuhailin.github.io/remote-jupyter-notebook/)
- [云服务器中让jupyter后台运行的方法(三)](https://blog.csdn.net/weixin_42561002/article/details/85382922)