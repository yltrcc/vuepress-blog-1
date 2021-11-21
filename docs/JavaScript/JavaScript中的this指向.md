---
title: JavaScript中的this指向
author: 熊滔
commentid: javascript:this
---

在 `JavaScript` 中，每一个函数都会默认有一个 `this` 的变量，我们在使用 `this` 往往有许多的陷阱与困惑，所以在这篇文章中就讲讲 `JavaScript` 中的 `this`。如果想要知道 `JavaScript` 函数里面的 `this` 是什么，就要知道函数调用的 `4` 种方式：

## 全局调用

如果函数是直接调用的，根据是否是严格模式下，`this` 的取值也不同，如果是在严格模式下，里面的 `this` 是 `undefined` ，如果是在非严格模式下，里面的 `this` 是 `window`

```javascript
"use strict"
function test() {
    console.log(this); 
}
test(); // undefined
```

```javascript
function test() {
    console.log(this); 
}
test(); // window
```

## 对象调用

如果是对象 `.` 的形式调用函数，那么此时函数中的 `this` 就是该对象

```javascript
let obj = {
    test: function() {
        console.log(this);
    }
}
obj.test(); // obj
```

如果以某种角度看的话，第一种情况的非严格模式下是第二种情况的特例，我们知道在全局作用域下声明的变量和函数都会成为 `window` 对象的属性，当我们在全局作用域下声明一个 `test` 函数，就相当于在 `window` 对象中添加了一个 `test` 方法(在对象中的函数我们一般称为方法)，而调用 `test()` 方法就相当于 `window.test()`，按照第二种情况，`test` 中的 `this` 就是应该指向 `window`。

## 构造函数调用

当我们 `new` 一个函数的时候，就是将这个函数当做是构造函数，那么此时里面的 `this` 是一个空对象

```javascript
function Dog() {
    console.log(this)
}
new Dog(); // {}
```

不过虽然 `this` 是一个空对象，不过它的原型 `prototype` 所指向的对象中有一个 `contructor` 属性指向该构造函数。

## 改变上下文指向

我们使用 `call, apply, bind` 可以改变函数中 `this` 的指向，下面来看一个例子

```javascript
funtion printName(firstName, lastName) {
    console.log(this.fullName)
    console.log(`${firstName} ${lastName}`)
}
```

如果直接执行这个函数的话，那么 `this.fullName` 的结果就是 `undefined`，因为 `window` 对象没有这个属性，但是如果有以下对象

```javascript
let obj = {
    fullName: "David"
}
```

下面我们将 `printName` 函数内部的 `this` 指向 `obj`

```javascript
let firstName = "firstName"
let lastName = "lastName"
// 将printName内部this指向obj， 后面是printName需要的参数
printName.apply(obj, firstName, lastName) 
// 将printName内部this指向obj， 后面是printName需要的参数
printName.call(obj, [firstName, lastName])
```

在上面我们使用 `apply, call` 来改变函数 `printName` 中的 `this`，这两个方法接收的第一个参数就是需要改变的 `this` 值，所以这时 `this.fullName` 就是 `obj` 中的 `fullName` 了，因为 `apply` 和 `call` 方法改变了 `printName` 内的 `this` 指向。这里我们发现 `apply` 和 `call` 方法是极其的相似，除了传递参数时格式不一样；`apply` 方法接收一个个的参数，而 `call` 接收的是一个数组作为参数，但是 `apply` 和 `call` 的功能是一模一样的。

说完 `apply` 和 `call`，接下来讲一讲 `bind`，`bind` 与上面两者不同，上面在改变函数内部的 `this` 指向的同时还会立即执行这个函数，而使用 `bind` 改变函数内部的 `this` 指向时，这个函数不会立即的执行，如

```javascript
printName = printName.bind(obj)
```

`printName` 函数内部的 `this` 指向已经改变，但是并没有立即指向 `printName`，当我们再次执行 `printName` 时，打印出的 `this.fullName` 就是 `obj` 里面的 `David`

```javascript
printName(firstName, lastName); // 其中的 this 已经变为了 obj 对象
```

## 箭头函数

在 `ES6` 中推出了箭头函数，箭头函数一个重要的特点就是它没有 `this` 变量，在文章的开头我们就提到每一个函数都是有一个 `this` 变量的，就如同 `arguments` 变量一样，是每个函数都有的。但是箭头函数却没有 `this` 变量，所以如果你在箭头函数里面使用 `this` 变量，那么它会去作用域链中寻找，如下

```javascript
let obj = {
    str: "hello",
    print: function() {
        return () => {
            console.log(this.str);
        }
    }
}
```

上面我们在 `obj` 对象中定义了一个 `print` 函数，该函数返回一个箭头函数，因为箭头函数内部没有 `this` 变量，所以它会在它的作用链中寻找 `this`，在此例中，箭头函数中的 `this` 就是 `obj` 对象中 `print` 中的 `this` 对象

```javascript
let print = obj.print();
```

接着我们使用 `obj.print()` 的方式调用了 `print` 函数，根据上面的介绍，此时 `print()` 函数中的 `this` 就是 `obj` 对象，所以返回的箭头函数中的 `this` 就是 `obj` 对象，我们使用 `print` 来接收这个箭头函数，接着执行

```javascript
print(); // hello
```

输出为 `hello`，因为箭头函数中的 `this` 为 `obj`，所以这时我们打印出的是 `hello`。

这时如果我们改变一下 `print` 的调用方式，如下

```javascript
var str = 'world';

let func = obj.print;
let print = func();
```

我们使用临时变量 `func` 来接收对象 `obj` 的 `print` 方法，接着直接调用 `func`，这种调用方式意味着 `func` 内部的 `this` 就是 `window`，而 `func()` 函数返回的箭头函数中的 `this` 就是 `window`，这时我们调用 `print` 方法

```javascript
print(); // world
```

此时它打印出的就是 `world`。



