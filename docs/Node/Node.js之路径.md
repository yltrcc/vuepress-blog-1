---
title: Node.js之路径
time: 2021-02-20
category: Node
tags:
  - path
author: 熊滔
commentid: node:path
---


Node.js 的模块分为三种：

- 核心模块
- 第三方模块
- 本地模块

本篇重点介绍 Node.js 中的核心模块，包括

| 核心模块    | 作用                 |
| ----------- | -------------------- |
| path        | 路径相关             |
| fs          | 操作文件             |
| os          | 提供相关操作系统信息 |
| http        | 搭建 http 服务器     |
| querystring | 解析请求参数         |

path 是我们介绍的第一个核心模块，所以有必要介绍如何引入核心模块。引入核心模块很简单，直接 `require('xxx')` 即可，例如我们引入 path 模块

```javascript
const path = require("path");
```

path 是与路径有关的模块，再介绍 path 之前，介绍两个与路径有关的变量， `__dirname` 与 `__filename`：

- \_\_dirname：表示当前模块所在的目录，是一个表示绝对路径的字符串
- \_\_filename：表示当前模块(文件)所在的路径，也是一个表示绝对路径的字符串

这两个变量都是全局变量 global 的属性，所以可以直接在模块中访问

```javascript
// D:\Desktop\Node\2 核心模块\1. path.js
console.log(__dirname);   // D:\Desktop\Node\2 核心模块
console.log(__filename);  // D:\Desktop\Node\2 核心模块\1. path.js
```

将讲解 path 模块提供的 API 之前，首先我们明确一下路径的组成

```
┌─────────────────────┬────────────┐
│          dir        │    base    │
├──────┬              ├──────┬─────┤
│ root │              │ name │ ext │
" C:\    目录1\目录2   \ 文件   .txt "
└──────┴──────────────┴──────┴─────┘
（"" 行中的所有空格均可忽略。它们纯粹是用于格式化。）
```

可见路径可以被划分为两部分：

- dir：文件所在目录
- base：文件名称(包含扩展名)

而 base 也可以被划分为两部分：

- name：文件名称
- ext：扩展名

## dirname

`path.dirname(path)` 返回的是给定路径的目录

```javascript
const path = require("path");
let filepath = "C:\\Users\\index.html";
console.log(path.dirname(filepath)); // C:\Users
```

## basename

`path.basename(path, [ext])` 返回路径的最后一个部分，它会忽略最后的目录分隔符(如果有的话)

```javascript
const path = require("path");

let filepath = "C:\\Users\\index.html";
console.log(path.basename(filepath)); // index.html

filepath = "C:\\Users\\index.html\\";
console.log(path.basename(filepath)); // index.html
```

`basename()` 还接收一个可选参数，表示文件的扩展名，如果传入的扩展名与路径最后一部分的扩展名相同，则返回没有扩展名的文件名称

```javascript
const path = require("path");
let filepath = "C:\\Users\\index.html";
console.log(path.basename(filepath, ".html")); // index
```

需要注意的是，扩展名是区分大小写的

```javascript
const path = require("path");
let filepath = "C:\\Users\\index.HTML";
console.log(path.basename(filepath, ".html")); // index.HTML
```

如果传入的 path 与 ext 都不是字符串，则会抛出 TypeError。

## extname

`path.extname(path)` 返回路径的扩展名，即路径中最后一个 `.` 之后的字符串(包括 `.`)，如果路径中没有 `.`，那么返回一个空字符串

```javascript
const path = require("path");

let filepath = "C:\\Users\\index.html";
console.log(path.extname(filepath)); // ".html"

filepath = "C:\\Users\\index.";
console.log(path.extname(filepath)); // "."

filepath = "C:\\Users\\index.html.md";
console.log(path.extname(filepath)); // ".md"

filepath = "C:\\Users\\index";
console.log(path.extname(filepath)); // ""
```

## format

`path.format(pathOject)` 方法根据一个 pathObject 得到一个绝对路径，pathObject 对象包含下面几个属性：

- dir
- root
- base
- name
- ext

可见这些属性都是上面介绍的路径组成部分，它会根据这些属性构建出一个绝对路径。

因为 dir 包括 root，base 包括 name 和 ext，所以当规定了 dir 属性时，则忽略 root 属性，当规定了 base 属性时，则忽略 name 和 ext 属性。

```javascript
const path = require("path");

const filepath = path.format({
  dir: "C:\\Users",
  // root 被忽略
  root: "D:\\",
  base: "index.html",
  // 下面两个属性被忽略
  name: "a",
  ext: ".md",
});

console.log(filepath); // C:\Users\index.html
```

```javascript
const path = require("path");

const filepath = path.format({
  root: "D:\\",
  name: "a",
  ext: ".md",
});

console.log(filepath); // D:\a.md
```

## parse

`path.parse(path)` 接收一个表示绝对路径的字符串，返回一个对象，它的作用与 path.format 正好相反，将一个绝对路径拆分为各个组成部分

```javascript
const path = require("path");

const filepath = "C:\\Users\\index.html";
console.log(path.parse(filepath));
```

打印一个对象如下

```javascript
{
  root: 'C:\\',
  dir: 'C:\\Users',
  base: 'index.html',
  ext: '.html',
  name: 'index'
}
```

## normalize

`path.normalize(path)` 是用来规范路径的，主要有下面几个作用：

- 将目录分隔符(`/`, `\\`) 转化为特定平台上的分隔符
- 解析 `..`，`.` 路径
- 将多个连续的目录分隔符合并为一个目录分隔符

```javascript
const path = require("path");

// 使用了两种目录分割符，并且一处连续使用了目录分割符
const filepath = "C:/Users\\\\\\index.html";
console.log(path.normalize(filepath)); // C:\Users\index.html
```

```javascript
const path = require("path");

// 路径中包含 ".." 和 "." 表示的相对路径
const filepath = "C:/Users/a/b/../.././index.html";
console.log(path.normalize(filepath)); // C:\Users\index.html
```

## resolve

`path.resove(...paths)` 接收多个路径，从右向左对路径进行拼接，**直至**拼接出绝对路径

```javascript
const path = require("path");

const filepath = path.resolve("D:\\", "C:\\Users", "index.html");
console.log(filepath); // C:\Users\index.html
```

上面我们对 `D:\\, C:\\Users, index.html` 从右向左进行拼接，`C:\\Users` 与 `index.html` 拼接得到 `C:\\Users\\index.html`，这已经是一个绝对路径了，所以就不在进行拼接了。

如果传入的路径不能拼接出一个绝对路径，那么就会使用当前文件所在的路径拼接一个绝对路径，就相当于 resolve 第一个参数默认为 `__dirname`

```javascript
const path = require("path");
const filepath = path.resolve("index.html");
console.log(filepath); // D:\Desktop\Node\2 核心模块\index.html
```

resolve 方法返回的路径是已经规范化(normalize)了的，并且尾部的分隔符会被删除(除非是根路径)。如果没有为 resolve 传入参数，那么会返回当前文件所在的路径

```javascript
const path = require("path");
console.log(path.resolve()); // D:\Desktop\Node\2 核心模块
```

## join

`path.join(...paths)` 方法接收一些路径，然后使用所在平台的分隔符(Windows 平台就是 `\`， Linux/Unix 平台就是 `/`)进行拼接，最后进行规范化然后返回。

与 `path.resolve` 方法不同的是，`path.resolve` 方法一旦拼接出绝对路径后就不在进行拼接，`path.resolve` 方法返回的是一定是一个绝对路径，但是 `path.join` 方法只是将多个路径使用分割符进行拼接而已

```javascript
const path = require("path");

const resolvePath = path.resolve("/a", "/b", "c");
const joinPath = path.join("/a", "/b", "c");

console.log(resolvePath); // D:\b\c
console.log(joinPath); // \a\b\c
```

如果不为 `path.join` 传入任何参数的话，那么会返回 `.`。

## sep 与 delimeter

`path.sep` 与 `path.delimeter` 是 path 模块的两个属性

- `path.sep`：所在平台的目录分隔符
  - Windows：`\`
  - Linux/Unix：`/`
- `path.delimeter`：所在平台的目录界定符
  - Windows：`;`
  - Linux/Unix：`:`

```javascript
const path = require("path");

console.log(path.sep); // \
console.log(path.delimiter); // ;
```

