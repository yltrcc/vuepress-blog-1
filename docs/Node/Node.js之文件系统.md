---
title: Node.js之文件系统
time: 2021-02-20
category: Node
tags:
  - fs
author: 熊滔
commentid: node:fs
---

fs 模块是与文件系统有关的模块，可以使用它来进行文件相关的操作。

## readFile

我们可以使用 `fs.readFile(path, [options], callback)` 读取一个文件的内容，该方法接收一个路径(相对路径与绝对路径均可)，当读取完文件内容之后，会将读取到的数据作为参数传递给传入的回调函数(callback)，该方法还接受一个 options 参数，它可以是一个包含如下属性的对象：

- encoding：指定读取内容的编码，默认为 null
- flag：指定读写模式，默认为 r，表示只读

当没有指定 encoding 时，返回一个 Buffer。options 还可以是一个字符串，当 options 为一个字符串时，表示编码

```javascript
const fs = require("fs");

fs.readFile("./file/hello.txt", "utf-8", (err, data) => {
  if (err) {
    throw new Error(err.toString());
  }
  console.log(data); // Hello World!
});
```

上述代码读取了当前目录下的 file 文件夹下的 `hello.txt` 文件，读取完文件后会将内容使用 `utf-8` 进行解码为字符串，然后将该字符串传递给回调函数。向回调函数传递参数时，第一个参数为错误对象，第二个参数才为实际的内容，之所以将第一个参数设置为错误对象，是为了提醒用户记得处理错误。

如果是第一次接触 Node.js 的话，可能不适合上面回调函数的写法，这种写法是异步写法，之所以这么写是因为 Node.js 是单线程的，为了提高程序执行的效率，所以使用异步的写法(如果无法领会上面这段话，就先放一放，我第一次接触回调函数的写法也是没有反应过来)。

`readFile` 还有一个对应的同步方法 `readFileSync(path, [options])`，参数的意义同上，不过这时不需要一个回调函数了，它会将读取到的内容返回

```javascript
const fs = require("fs");
const data = fs.readFileSync("./file/hello.txt", "utf-8");
console.log(data); // Hello World!
```

这时你可能会问怎么处理错误，那就是将代码放在 `try ... catch` 代码块中

```javascript
const fs = require("fs");
try {
  const data = fs.readFileSync("./file/hello.txt", "utf-8");
  console.log(data); // Hello World!
} catch (e) {
  console.log(e);
}
```

同步的方式虽然比较好理解，但是以同步的方式读取文件，会阻塞程序的执行，降低代码的执行效率，所以推荐使用 `readFile` 读取文件。

这种回调函数式的写法有一个问题就是会产生回调地狱，使得代码难以阅读。有下面三个文件在 file 文件夹下

```json
// a.json
{
  "next": "b.json",
  "content": "this is a.json"
}

// b.json
{
  "next": "c.json",
  "content": "this is b.json"
}

// c.json
{
  "next": null,
  "content": "this is c.json"
}
```

下面这段代码是依次读取 `a.json, b.json, c.json` 的内容，并打印出来

```javascript
const fs = require("fs");
const path = require("path");
fs.readFile("./file/a.json", "utf-8", (err, data) => {
  const a = JSON.parse(data);
  console.log(a.content);
  fs.readFile(path.resolve("file", a.next), "utf-8", (err, data) => {
    const b = JSON.parse(data);
    console.log(b.content);
    fs.readFile(path.resolve("file", b.next), "utf-8", (err, data) => {
      const c = JSON.parse(data);
      console.log(c.content);
    });
  });
});
```

为了代码的简洁，已经省略了对错误的处理，可见上面嵌套的代码真的很难阅读，需要花费一番功夫去理解上面的代码做了什么事情。并且如果有更多的嵌套的话，代码的逻辑

正是为了解决这样的问题，在 ES6 中提出了 Promise，写出同样目的的代码，但是嵌套最多只有两三层，代码简单易读。同样，Node.js 也提出了 Promise 的文件系统 API，在 `fs/promises` 模块下

```javascript
const fs = require("fs").promises;
const path = require("path");

fs.readFile(path.resolve("file", "a.json"), "utf-8")
  .then((data) => {
    data = JSON.parse(data);
    console.log(data.content);
    return fs.readFile(path.resolve("file", data.next), "utf-8");
  })
  .then((data) => {
    data = JSON.parse(data);
    console.log(data.content);
    return fs.readFile(path.resolve("file", data.next), "utf-8");
  })
  .then((data) => {
    data = JSON.parse(data);
    console.log(data.content);
  });
```

使用回调函数的写法无论有多少层嵌套，改为使用 Promise 的写法，代码的嵌套就只有两层。

## writeFile

`fs.writeFile(path, data, [options], callback)` 的作用是向文件写入内容，path 表示文件路径，data 表示向文件写入的内容，options 是一个可选参数，是一个包含如下属性的对象：

- encoding：将 data 表示的字符串使用该编码写入文件，默认为 `utf-8`，当 data 为 Buffer 类型的对象时，将忽略该属性
- flag：默认为 `w`，表示只写
- mode：默认为 `0o666`

当写入文件完毕时，会执行 callback 函数，callback 函数接收一个错误对象，根据错误对象我们可以判断是否写入文件成功

```javascript
const fs = require("fs");

fs.writeFile("./file/world.txt", "World", (err) => {
  if (!err) {
    console.log("写入成功！");
  }
});
```

上面我们向 `./file/world.txt` 写入了一个 World 字符串，当写入成功后，打印出`写入成功！`。

## appendFile

上面 `writeFile` 表示的是向文件写入内容，之前文件的内容全部清除，如果我们希望只是想文件中添加内容，那就要使用 `appendFile(path, data, [options], callback)`，这些参数的意义同 `writeFile` 相同

```javascript
const fs = require("fs");

// world.txt 中没有任何内容
for (let i = 0; i < 3; i++) {
  fs.appendFile("./file/world.txt", "Hello World\n", (err) => {
    if (err) {
      throw new Error(err);
    }
  });
}
```

执行完上述代码后，world.txt 中的内容为

```plain
Hello World
Hello World
Hello World

```

## open

我们可以使用 `fs.open(path, [flags], [mode], callback)` 打开一个文件，打开文件后便可对文件进行**多项**操作，例如读取文件，向文件写入内容等等。

操作系统维护着一个打开的文件和资源的表格，每个打开的文件都分配了一个文件描述符，操作系统根据文件描述符去描述和追踪特定的文件。

使用 `fs.open` 打开一个文件之后，会得到一个文件描述符(file descriptor)，一旦分配一个文件描述符，我们便可以使用该文件描述符对文件进行读写。

`fs.open` 方法接收四个参数：

- path：文件路径
- flags：默认为 r，表示只读
- mode，默认为 `0o666`，表示拥有可读写的权限
- callback：打开文件成功后会调用该函数，该回调函数接收两个参数
  - err：错误对象
  - fd：文件描述符

flags 可取如下值

| flag  | 意义                                                         |
| ----- | ------------------------------------------------------------ |
| `r`   | 只读，如果文件不存在，抛出异常                               |
| `r+`  | 可读可写，如果文件不存在，抛出异常                           |
| `rs+` | 可读可写，以同步的方式打开文件                               |
| `w`   | 只写，如果文件不存在，则创建文件                             |
| `wx`  | 同 `w`，不过文件不存在时则失败                               |
| `w+`  | 可读可写，文件不存在时创建文件                               |
| `wx+` | 同 `w+`，不过文件不存在时失败                                |
| `a`   | 向文件追加内容，文件不存在则创建文件                         |
| `a+`  | 可向文件追加内容，也可以读取文件内容，文件不存在时则创建文件 |
| `ax`  | 向文件追加内容，如果文件不存在则失败                         |
| `ax+` | 同 `a+`，不过文件不存在时则失败                              |

```javascript
fs.open("./file/hello.txt", "w", (err, fd) => {
  fs.writeFile(fd, "Hello World!", (err) => {
    if (!err) {
      console.log("写入成功");
      // 文件资源有限，需及时关闭资源
      fs.close(fd, (err) => {
        if (!err) {
          console.log("关闭成功");
        }
      });
    }
  });
});
```

## rename

`fs.rename(oldPath, newPath, callback)` 作用就是重命名，将 oldPath 重命名为 newPath，重命名完成以后会调用 callback 函数，会为该函数传入错误对象

```javascript
const fs = require("fs");

fs.rename("./file/hello.txt", "./file/world.txt", (err) => {
  if (!err) {
    console.log("重命名成功");
  }
});
```

## readdir

`fs.readdir(dir, callback)` 方法是读取一个目录，返回一个字符串数组，数组中的元素是该目录下的文件名和目录名

```javascript
const fs = require("fs");

fs.readdir("./file/", (err, files) => {
  if (err) {
    throw new Error(err);
  }
  console.log(files);
});
```

输出为

```javascript
["a.json", "b.json", "c.json", "hello.html", "index.html", "world.txt"];
```

如果传入的路径不是一个目录，那么会抛出错误。

## rm

`path.rm(path, [options], callback)`方法是用来删除文件或目录

- path：路径
- options：可选参数，包含如下属性：
  - force：如果 force 为 true 的话，如果文件不存在不会抛出错误
  - recursive：如果传入的路径为目录，如果 recursive 为 false，那么会报错，如果为 true，则会删除该目录
  - maxRetries：当读取文件出现错误时，会进行尝试，该属性设置最大尝试次数，如果 recursive 为 false 的话，会忽略该选项，默认为 0
  - retryDelay：重试之间的间隔，单位为毫秒
- callback：回调函数，删除完文件或目录后会调用该回调函数，该回调函数接收一个错误对象

```javascript
const fs = require("fs");

// 删除 demo 文件夹下面的所有东西
fs.rm(
  "./demo/",
  {
    force: true,
    recursive: true,
  },
  (err) => {
    if (!err) {
      console.log("删除成功");
    }
  }
);
```

> 该方法与 14.14.0 版本新增，所以如果要使用该方法需要升级 Node.js 到 14.14.0 版本以上。

## stat

fs.stat(path, callback) 方法可以获知文件或目录的相关信息，path 代表文件或目录的路径，callback 是回调函数，接收两个参数

- err：错误对象
- stats：fs.Stats 对象，该对象包含很多与文件信息相关的方法
  - `isDirectory()`：是否是一个目录
  - `isFile()`：是否是一个文件
  - `size`：文件的大小(单位为 Byte)
  - `atime`：最后访问 (access) 时间
  - `mtime`：文件最后更改 (modified) 时间，是指文件内容的修改
  - `ctime`：文件最后改变 (changed) 时间，是指文件元信息的更改，例如权限
  - `birthtime`：文件的创建时间

```javascript
const fs = require("fs");

fs.stat("./file/world.txt", (err, stats) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log(stats.isDirectory()); // false
  console.log(stats.isFile()); // true
  console.log(stats.size); // 12

  console.log(stats.atime); // 2021-02-19T10:31:40.744Z
  console.log(stats.mtime); // 2021-02-19T10:15:58.439Z
  console.log(stats.ctime); // 2021-02-19T10:31:39.845Z
  console.log(stats.birthtime); // 2021-02-16T10:44:33.194Z
});
```

## 参考文章

- [Node.js File System Module](https://www.w3schools.com/nodejs/nodejs_filesystem.asp)
- [Node.js | fs.open() Method](https://www.geeksforgeeks.org/node-js-fs-open-method/)
- [Linux File Timestamps Explained: atime, mtime, and ctime](https://www.howtogeek.com/517098/linux-file-timestamps-explained-atime-mtime-and-ctime/)
- [Node.js v15.9.0 Documentation](https://nodejs.org/api/fs.html)

