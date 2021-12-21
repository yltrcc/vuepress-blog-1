---
title: Node.js之模块系统
time: 2021-02-07
category: Node
tags:
  - 模块
author: 熊滔
commentid: node:module
---

## Node.js 提出的背景

### 背景

Node.js 于 2009 年由 Ryan Dahl 提出，它提出 Node.js 是为了解决当时的并发连接问题。以往的编程语言对于请求的处理方式是，来一个请求就新建一个线程来处理这个请求，假设一个线程需要消耗 2MB 的内存资源，那么对于一个 8GB 的内存系统，它最多同时处理 4000 个请求。如果需要处理更多的请求的话，就需要增加更多的服务器，另外由于用户的每个请求可能访问不同的服务器，所以所有的资源都需要在服务器之间共享。这种 Web 架构下瓶颈就在于服务器能够处理的并发连接的最大数量。

Node.js 提出另一种方法来解决这种问题，那就是事件绑定。每次来到一个请求，并不是为该请求新建一个线程，而是为该请求绑定一个事件，并且添加到**事件队列**，而最终达到的效果是，使用 Node.js 的服务器能够同时处理数万个并发连接。

如果将服务器比作是一个饭店，而一个请求就是一个客人。对于使用多线程的方式的服务器，来一个客人就派一个服务生去服务客人，直至客人离开。而 Node.js 则是只有一位服务员，这位服务员不会从头到尾都服务客人，每来一个客人，在了解完客人的需求后，并记录下来，就请客人去座位上等待，会有专门的人员去处理记录的需求。

所以 Node.js 也有其适应的场景，它适合于 IO 密集型的任务，而不适合 CPU 密集型的任务。所谓的 IO 密集型任务指的就是像上面所提及的大量的并发请求，而 CPU 密集型任务指的是需要做复杂耗时长的计算的任务。

### 应用

Node.js 自 2009 年提出发展至今已有十余年的时间，虽然 Node.js 当初的想法是为了解决大并发的问题，但是随着十几年的发展，Node.js 也催生出了其他的应用：

- Web 服务器：自 Node.js 诞生，提出了很多得 Web 框架，我们可以使用它方便的写出 Web 程序
  - Express
  - Koa2
  - Egg
- 前端工程化：Node.js 的提出，使得前端也产生一次质的飞跃，使用 Node.js 编写的前端工具使得开发前端项目变得简单
  - Babel
  - Webpack
  - Eslint
  - Jest
- 桌面项目：Node.js 提供了具有访问操作系统 API 的能力，使得使用 Node.js 也可以开发出桌面项目
  - Electron
- 脚手架工具：使用 Node.js 编写的脚手架工具，让我们可以很快的开始一个前端项目
  - creat-react-app
  - vue-cli
- 服务端渲染：
  - next.js
  - nuxt.js
- Serverless
- ...

## 模块

### 概念

现在的程序越来越复杂，已经不可能将所有的程序写在一个文件里面了，一个是难以阅读，二个是不利于多人协作，所以有必要将代码分割在不同的部分，这些部分就叫做模块。

将代码分割为不同的模块以后，可以有如下好处：

- 不同的模块负责不同的功能，使得代码阅读起来更加清晰，并且维护起来也会比较简单
- 不同的模块有各自的作用域，可以避免全局变量发生冲突
- 利于多人协作，每个人开发属于自己的模块，最后组合为一个大的程序
- 代码复用，可以将一些与业务无关的工具函数抽离出来，在别的项目中进行复用

将代码进行分割以后，还需要将代码组合起来，让它们协作得以工作。

要使得模块能够互相协作，就需要模块能够暴露给其他模块访问该模块内部的一些变量，将这些变量暴露给其他函数的行为就是导出；而导入与导出相对，将其他模块暴露出的变量引入到本模块，使得本模块能够访问其他模块暴露出的变量，这个行为就是导入。

### 导出

在 Node.js 中，一个 .js 文件就是一个模块，在每个模块中，都有一个 `module` 对象，`module` 对象有一个 `exports` 属性，该属性会被作为该模块的导出内容

```javascript
// alice.js

module.exports = {
    name: "Alice",
    age: 18,
    gender: "female"
}
```

例如在上面，我们设置 `module.exports` 为一个对象，这个对象就是对外暴露的内容，可以在其他模块中导入这个对象并使用。

在每一个模块中，还有一个名为 `exports` 的变量，它是 `module.exports` 的引用，你可以看做在每个模块的开头都有这么一行代码

```javascript
let exports = module.exports;
```

它的提出是为了简写方便

```javascript
// bob.js

const name = "Bob";
const age = 20;
const gender = "male";

module.exports.name = name;
module.exports.age = age;
module.exports.gender = gender;
```

上面我们通过为 `module.exports` 的属性赋值，从而将本模块内的几个变量暴露出来给其他模块访问，上面的 `module.exports` 通通可以替换为 `exports`

```javascript
// bob.js

const name = "Bob";
const age = 20;
const gender = "male";

exports.name = name;
exports.age = age;
exports.gender = gender;
```

但是经常有新手有如下错误的写法

```javascript
// bob.js

const name = "Bob";
const age = 20;
const gender = "male";

exports = {
    name: name,
    age: age,
    gender: gender
}
```

上面通过给 `exports` 变量赋值为一个对象，希望将本模块的一些变量导出，但是在其他模块中导入该模块时，发现导入的只是一个空对象，这往往让新手百思不得其解，其实稍加分析就可以知道为什么。

要明白上面的写法为什么是错误的，我先再次强调，**模块导出的是 `module.exports` 这个变量**，而 `exports` 只是一个引用，指向 `module.exports`。所以当我们通过 `exports.xxx` 的方式添加属性时，也就是相当于为 `module.exports` 这个对象添加属性，所以被添加的属性可以被导出；但是当我们为 `exports` 赋予一个新的值的时候，`exports` 不在是 `module.exports` 的引用，并且 `module.exports` 并不会发生任何的改变，导出的内容也不会如预期那般。

<img src="https://user-images.githubusercontent.com/29890094/106893281-493cb480-6728-11eb-9746-bf2438cce57c.gif" style="zoom: 25%;" />

如果想直接导出一个对象，请直接使用 `module.exports`，或者通过 `exports.xxx` 的方式一个个的添加属性。

> 如果实在搞不懂 `exports`，那么请忘了它，影响不大。

### 导入

我们使用 require 这个函数来导入其他模块暴露出来的变量

```javascript
// index.js

const alice = require('./alice.js');
console.log(alice.name); // Alice
```

上面我们通过 require 导入了 alice.js 这个模块，其实导入的内容就是 alice.js 中的 module.exports，我们使用变量 alice 进行接收。如果我们并不需要导入模块的所有内容，只是需要其中的某个属性，例如上面我们只是需要 name 这个属性，我们可以使使用 ES6 的解构语法获得需要的属性

```javascript
// index.js

const { name } = require('./alice.js');
console.log(name); // Alice
```

当我们导入一个模块的时候，首先会先执行这个模块

```javascript
// a.js
console.log("a.js");

//b.js
require('./a');
console.log("b.js");
```

输出为

```javascript
a.js
b.js
```

注意到，我们可以省略后缀名，当我们省略后缀名时，它将根据下面的顺序查找文件

1. 是否有 a.js 文件，是否有 a.json 文件，是否有 a.node 文件
2. 是否有一个名字为 a 的文件夹，下面有一个 package.json 文件并且有 main 字段，如果有则根据 main 字段指明的路径去加载文件
3. 是否有一个名字为 a 的文件夹，下面有一个 index.js

如果按照以上顺序都没有找到文件，那么会抛出一个错误。

## npm

我们在手机上下载软件时，一般都是从应用商店下载软件，不会去某个软件的官网去下载，大家都把软件放在应用商店中，大家只要去商店里面下载即可了。同样，当我们需要用到其他人编写的第三方模块时，我们也希望有一个商店让我们去下载，我们不要去每个官网一个个的下载。

并且程序比软件下载更加的复杂，体现在包的依赖关系。本着不造轮子的原则，很多的程序都是直接使用别人已经写好的代码，所以代码之间可以说有非常复杂的依赖关系。我们可能需要一个 a 包帮我们做事情，但是 a 包又依赖于 b 这个包，b 包又依赖于 c 包，等等。所以为了使得我们的 a 包能够工作，我们还需要下载好 b 包、c 包等等这些被依赖的包。这就会带来问题，例如我们不知道 a 包依赖于什么包，以及即使我们知道 a 包依赖于这些包，一个个的下载这些包是否是一件极其无聊的工作。

基于以上几点，我们迫切需要一个包管理工具帮助我们。在 Node 中，Node Package Manager (npm) 正是用来做到这一点的，我们不仅可以通过它下载需要的包，并且它还会根据包的依赖关系，自动的帮我们下载好其他被依赖的包。

那么包是什么? 比较正式的定义：**包是一个由 `package.json` 定义的文件或目录**。假设有一天，你写了一个有用的工具，希望分享给大家，这个程序肯定不只是一个文件的代码，是多个模块的组合，即你分享的不是一个文件，而是一个文件夹，其中包括了这些模块。

那么 `package.json` 又是什么呢? 你可以把它看做是一个配置文件，其中记录了该工具的信息，例如版本，名称，作者等等内容，最重要的是，它记录了你写的工具依赖了哪些其他的第三方模块，这样当别人下载你的包时会根据 `package.json` 标注的依赖下载所依赖的包。

那么在 Node.js 中可以直接引入一个文件夹吗? 答案是可以的，Node.js 中的模块可以是如下三种：

- 一个文件(.js, .json, .node)
- 一个包含 `package.json` 文件并且定义了 `main` 字段的文件夹
- 一个包含 `index.js` 的文件夹

所以，我们可以直接使用 require 导入一个包，它会根据 main 字段指明的地址去加载 .js 文件。

### npm init

下载介绍 `npm` 在命令行中的使用，当我们下载好了 Node.js，一般都是会自动安装好 `npm` 的，我们可以在命令行通过 `npm --version` 查看 `npm` 的版本号

```bash
λ npm --version
6.14.8
```

我们写一个项目，就肯定需要准备一个 `package.json` 文件，你可以手动创建该文件，或者通过 `npm init` 命令创建一个模板，一般情况下我们都会使用 `npm init` 来创建一个 `package.json` 文件

<img src="https://user-images.githubusercontent.com/29890094/106990677-ad568b80-67af-11eb-94e6-df5030160cf1.png" style="zoom:50%;" />

在我们输入 `npm init` 后，它会引导我们创建一个 `package.json` 文件，填写一些常见的信息，例如包名、版本、作者等等，当这些都执行完毕后，在目录下回出现一个 `package.json` 文件，其内容如下

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "Node Demo",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "XT",
  "license": "MIT"
}
```

这些内容都是我们在命令行中填写的内容。如果希望快速创建一个 `package.json` 文件，所以配置项采用默认配置，我们可以使用 `npm init -y`，传入 `-y` 表示所有的配置项采用默认配置。

### npm install

使用 `npm install` 可以下载包，下载的包分为三种：

- 全局安装
- 本地安装
  - 本地依赖
  - 开发依赖

不同依赖的包在下载时需要传入不同的参数。

#### 全局安装

全局安装的包可以在命令行直接执行，对于需要全局依赖的包，我们要传入 `--global` 参数或者 `-g` 参数，例如我们下载一个 `nrm` 的包，这个包是用来设置镜像源的，因为 `npm` 的服务器在国外，下载速度很慢，所以我们需要设置 `npm` 下载的镜像源

```bash
npm install -g nrm
```

<img src="https://user-images.githubusercontent.com/29890094/107120136-cc940c80-68c6-11eb-8b0a-94c0a634df9d.png" style="zoom:50%;" />

它会将这个包下载到 `C:\Users\username\AppData\Roaming\npm\node_modules` 这个文件夹下面，并且会在 `C:\Users\username\AppData\Roaming\npm\` 生成对应的 .cmd 文件，例如当我们全局安装 nrm 之后就会在 npm 文件夹下生成 nrm.cmd 文件

<img src="https://user-images.githubusercontent.com/29890094/107135256-0b13e080-6934-11eb-9f41-ae7d18ce6097.png" style="zoom:50%;" />

因为 `C:\Users\username\AppData\Roaming\npm\` 这个文件夹在安装 `npm` 的时候就会被自动的添加到环境变量中，当我们在命令行输入 `nrm` 的时候，它就会在这个路径搜索 `nrm` 命令，然后执行，这就是全局安装的包能够在命令行直接执行的原因。

我们在命令行输入

```bash
nrm ls
```

它会显示出有哪些可用的镜像源

<img src="https://user-images.githubusercontent.com/29890094/107135518-63e47880-6936-11eb-9957-5923a11da34f.png" style="zoom:50%;" />

我们一般选择 taobao 或者 cnpm 镜像源，通过 `nrm use 镜像源 `的方式选择镜像源

```bash
nrm use taobao
```

<img src="https://user-images.githubusercontent.com/29890094/107135564-c0479800-6936-11eb-9d37-1423a1cb00de.png" style="zoom:50%;" />

> 这里讲述我遇到的一个坑，我之前是下载好 `nrm` 的，为了演示我把之前下载好的 `nrm` 卸载掉，然后重新装了一遍，装了一遍之后发现 `nrm` 不好使了，开始报错
>
> <img src="https://user-images.githubusercontent.com/29890094/107135659-83c86c00-6937-11eb-8939-a678f976a99d.png" style="zoom:50%;" />
>
> 咱也不知道为啥，错误提示也看不懂，就去上网搜，说要改变 cli.js(`C:\Users\username\AppData\Roaming\npm\node_modules\nrm\cli.js`) 的第 17 行
>
> <img src="https://user-images.githubusercontent.com/29890094/107135698-cc802500-6937-11eb-8bf4-1d12be1a1365.png" style="zoom:50%;" />
>
> 上面的一行是原来第 17 行的内容，后面一行是修改后的内容，贴在下面
>
> ```javascript
> const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
> ```
>
> 如果你也遇到了这个问题，按照上面的方法改吧，亲测有效。

#### 本地安装

通过上面的分类我们可以看到，本地安装也分为两类，一种是开发依赖，意思就是仅仅在开发的时候才依赖的包，上线之后这个包就不需要了。例如压缩文件，这个包在编译的时候需要，但是在生产环境下，我们就使用这个压缩好的文件，就不需要压缩文件了，所以这个压缩文件的包只在开发(编译)时需要。另一种本地依赖的包是只在本地开发时以及上线后都需要依赖的包，比如在程序中依赖的一些库。

当我们下载开发时依赖的包时，需要传入 `--save-dev` 或者 `-D` 参数，当我们下载本地依赖的包时，传入 `--save` 或者 `-S` 参数，也可以不传，不传的情况下默认是本地依赖。

我们随便下载两个包

<img src="https://user-images.githubusercontent.com/29890094/107135951-fcc8c300-6939-11eb-8bdf-a6d7c6311d43.png" style="zoom:50%;" />

我们再查看 `package.json` 文件

```javascript
{
  "name": "demo",
  "version": "1.0.0",
  "description": "Node Demo",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "XT",
  "license": "MIT",
  "dependencies": {
    "webpack": "^5.21.1"
  },
  "devDependencies": {
    "ora": "^5.3.0"
  }
}
```

发现多了 `dependencies` 以及 `devDependencies` 两个属性，`dependencies` 中的属性是本地依赖的包，以及对于的版本号，而 `devDependencies` 中的属性是开发时依赖的包，以及对应的版本号。

> 细心的话，还会发现多了一个 `package-lock.json` 文件，里面不仅给定了当前项目的依赖，例如上面安装的 webpack 以及 ora，还给定了依赖的依赖以及它们的版本号，就是 webpack 以及 ora 它们所依赖的包。
>
> 所以为什么需要 `package-lock.json` 文件? 要明白为什么需要这个文件，就需要明白它的作用是什么。它的作用是为了锁定版本号的，例如上面我们安装 webpack 对于的版本号为 `^5.21.1`，其中 `^` 表示向后兼容，所以如果没有 `package-lock.json`，实际安装的版本号可能是最新的版本，比 `5.21.1` 的版本要高，这就可能会因为版本的不一致导致各种问题(我遇到过很多次)，所以需要一个 `package-lock.json` 来记录具体的版本号。

这时我们甚至可以将 node_modules 这个文件夹给删掉，然后运行 `npm install` 即可将所依赖的包给安装回来，所以很多时候我们从 Github 上下载项目时，会发现没有 node_modules 文件夹，它要你在本地先运行 `npm install` 命令，将 `package.json` 中描述所依赖的包下载下来，然后在启动项目。

> `npm install` 是根据 `package.json` 文件还是 `package-lock.json` 文件进行安装包的呢? 这个问题你在网上搜可能会得到不同的结论，这是因为安装策略有过三次调整：
>
> 1. npm 5.0.x 版本，`npm install` 根据 `package-lock.json` 文件下载
>
>    - 然后被控诉为什么改了 `package.json` 文件，为啥不给我升级包
>
> 2. npm 5.1.0 版本后，忽略 `package-lock.json` 文件，只根据 `package.json` 文件下载
>
>    - 那 `package-lock.json` 文件有什么用
>
> 3. npm 5.4.2 版本后
>
>    - 如果 `package-lock.json` 与 `package.json` 描述的版本号不同(为什么会不同，因为手动改了 `package.json` 文件)，那么根据 `package.json` 版本进行下载，并且更新 `package-lock.json` 文件
>
>    - 如果相同，那么根据 `package-lock.json` 进行下载，不必理会 `package.json` 中依赖的包是否有更新

与 `npm install` 相对的是 `npm uninstall` 命令，是用来卸载包的，例如

```bash
npm uninstall webpack --save
```

### npm  scripts

在 package.json 中有一个 scripts 字段，它是一个对象，它的每一个属性都对应一个脚本

```json
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

当我们在当前项目的下输入

```bash
npm run build
```

就相当于运行了

```bash
node build.js
```

这些定义在 package.json 里面的脚本，我们称之为 npm scripts。

使用 npm scripts 有如下优点：

- 项目中的脚本集中放置在一处
- 不同的项目可能有不同的构建命令，但是可以通过 npm scripts 向外提供统一的接口，如 `npm run build`

## 深入模块

### 导入路径

当我们导入其他模块时，可以指定模块的具体路径，例如 `./a.js`，通过相对路径或者绝对路径均可，但是如果我们没有指定路径，如 `require('a')`，会以何种方式去搜寻该包。

我们可以通过 module.paths 这个属性查看搜索的路径

```javascript
// D:\Desktop\node-demo\a.js
console.log(module.paths);
```

输出为

```javascript
[
  'd:\\Desktop\\node-demo\\node_modules',
  'd:\\Desktop\\node_modules',
  'd:\\node_modules'
]
```

可见它会先搜索文件所在目录下的 node_modules 文件夹，如果搜索不到则搜索上级目录的 node_modules 文件夹，直至根目录的 node_modules 文件夹，如果在这些路径都没有找到指定的包，那么就会抛出一个错误。

### 缓存

在导入部分我们说过，当我们导入一个模块时，首先会执行这个模块，在实际的项目中肯定会有多个模块依赖于一个模块的情形，这是不是说每次导入这个模块时，这个模块都会被执行一次? 明显这样不对，所以其实这个模块只会执行一次，然后它的 module.exports 属性就会被缓存，如果第二次、第三次导入这个模块时，直接将缓存的 module.exports 属性返回即可，不必再次执行一次这个模块。

通过 require.cache 这个属性可以知道有哪些 module 对象被缓存起来了，require.cache 是一个对象，其键值是模块的绝对地址，值为 module 对象，在我们 require 模块的时候，如果在 require.cache 对象发现这个模块已经被加载过，那么直接返回这个模块即可，而不必再次执行这个模块。

### 主程序

一个模块被执行有两种情况：

- 通过 node 命令直接执行该模块
- 被其他模块导入

通过 node 命令执行的模块我们称之为主模块，有时候我们希望根据模块是否是主模块来表现不同的行为，所以我们需要一种方法来分辨该模块是不是主模块，我们可以通过 require.main 属性来判断一个模块是不是主模块，如果 require.main 的值与当前模块的 module 对象相同，就说明当前模块时主模块

```javascript
if (require.main === module) {
    console.log("主模块");
} else {
    console.log("非主模块");
}
```

### 循环引用

最后我们要探讨一下，Node.js 对模块的循环引用如何解决，所谓的循环引用就是指二者互相引用

```javascript
// a.js
require('./b.js')

//b.js
require("./a.js")
```

如上 `a.js` 与 `b.js` 互相引用，我们称之为循环引用，那这样会不会形成死循环，程序如何能执行下去。

解释这个问题很简单，只需要牢牢的抓住缓存即可，因为有缓存的存在，并不会无限的去执行文件导入，而是直接去缓存中的值。假设有如下的程序

```javascript
// a.js
exports.done = false;
const b = require('./b.js');
console.log("b.done: ", b.done); // true
exports.done = true;

// b.js
exports.done = false;
const a = require("./a.js");
console.log("a.done: ", a.done); // false
exports.done = true;

// index.js
const a = require("./a.js");
const b = require("./b.js");
console.log("a.done: ", a.done); // true
console.log("b.done: ", b.done); // true
```

我们执行 index.js，执行过程如下：

1. 执行 index.js，导入 a.js
   1. 执行 a.js，并缓存 a.js 的 module.exports
   2. 设置 exports.done 为 false
   3. 导入 b.js
      1. 执行 b.js，并缓存 b.js 模块
      2. 在 b.js 中导入 a.js，**此时因为 a.js 这个模块已经被缓存，所以取缓存即可**
      3. 因为 a.js 模块此时的 done 属性为 fasle，所以打印的结果为 false
   4. 回到 a.js，取到 b.js 模块导出的module.exports，这个对象的 done 属性为 true，因此打印结果为 true
2. 回到 index.js，导入 b.js 模块，该模块已经被缓存，直接取缓存结果
3. 此时 a.js 与 b.js 中的 exports.done 属性均为 true，打印结果均为true

## 参考链接

- [Node.js 究竟是什么](https://developer.ibm.com/zh/articles/os-nodejs/)
- [Node.js 的模块系统](https://loveky.github.io/2019/02/12/nodejs-module-system/)
- [Node.js 中的包和模块](https://itbilu.com/nodejs/npm/N1hHQ2xk-.html)
- [npm install 到底做了什么](https://ithelp.ithome.com.tw/articles/10191783)
- [通过 npm 制作命令行工具的原理](https://segmentfault.com/a/1190000015218126)
- [nrm 报错 [ERR_INVALID_ARG_TYPE] 解决方法](https://blog.csdn.net/S_aitama/article/details/113706339)
- [npm install 生成的 package-lock.json 是什么文件? 有什么用?](https://www.zhihu.com/question/62331583)
- [npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)




