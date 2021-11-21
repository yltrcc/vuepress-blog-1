---
title: Node.js之操作系统
time: 2021-02-20
category: Node
tags:
  - os
author: 熊滔
commentid: node:os
---

os 模块包含有关操作系统有关的信息，例如操作系统架构，CPU 的相关信息

## arch

`os.arch()` 返回的是操作系统的架构，常见的架构包括

- arm
- arm64
- x32
- x64
- mips
- ... ...

```javascript
const os = require("os");
console.log(os.arch()); // x64
```

## cpus

`os.cpus()` 是与 CPU 信息有关的方法，它返回一个数组，数组中的是一个个的对象，对象的格式如下

- model: CPU 的 model 信息
- speed: CPU 的速度(MHz)
- times: 包含如下属性的对象
  - user: CPU 在用户 user 状态下花费的时间
  - nice: CPU 在用户 nice 状态下花费的时间，在 Windows 操作系统中该属性始终为 0
  - sys: CPU 在用户 sys 状态下花费的时间
  - idle: CPU 在用户 idle 状态下花费的时间
  - irq: CPU 在用户 irq 状态下花费的时间

```javascript
const os = require("os");
console.log(os.cpus());
```

输出

```javascript
[
  {
    model: 'Intel(R) Core(TM) i5-10210U CPU @ 1.60GHz',
    speed: 2112,
    times: {
      user: 4533328,
      nice: 0,
      sys: 5867843,
      idle: 85751843,
      irq: 1135437
    }
  },
  ... ...
]
```

## totalmem、freemem

`os.totlemen()` 获得系统的总内存，`os.freemen` 获得系统的目前可用内存，二者单位皆为 Byte

```javascript
const os = require("os");

console.log(os.totalmem()); // 17001648128
console.log(os.freemem()); // 7865696256
```

## hostname

`os.hostname()` 返回主机名

```javascript
const os = require("os");
console.log(os.hostname());
```

## platform

`os.platform()` 返回操作系统平台，常见有

- win32
- linux
- freebsd
- darwin
- openbsd

```javascript
const os = require("os");
console.log(os.platform()); // win32
```

