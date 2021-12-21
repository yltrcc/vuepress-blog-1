---
title: JavaScript闭包
author: 熊滔
commentid: javascript:closure
---

## JavaScript的作用域

`JavaScript` 的作用域有两种

- 全局作用域
- 函数作用域

与其他语言不同的是，`JavaScript` 没有块级作用域，参考以下程序

```javascript
if (true) {
    var x = 1;
}
console.log(x); // 1
```

上面的变量 `x` 定义在 `if` 的语句块中，在其他的语言中，`x` 在语句块外是访问不到的，但是由于 `JavaScript` 没有块级作用域，所以变量 `x` 是全局变量，所以在语句块外也可以被访问到。

> 注意：
>
> 上面的讨论是基于 `ES5` 的，在 `ES6` 中，通过关键字 `let` 或 `const` 声明的变量，可以实现块级作用域的效果
>
> ```javascript
> if (true) {
>     let x = 1;
> }
> console.log(x); // not defined
> ```

## JavaScript 作用域链

`JavaScript` 作用域链指的是查找变量的顺序，比如下面的程序

```javascript
var i = 1;

function foo() {
    var i = 2;
    function bar() {
        var i = 3;
        console.log(i);
    }

    bar();
}

foo(); // 3
```

在上面的程序中，我们在 `bar()` 函数中访问了变量 `i`，这时 `bar()` 会先在 `bar()` 函数内部查找是否有变量 `i`，如果没有，则会去 `bar()` 函数的上一级作用域即 `foo()` 函数中寻找，如果还没有，则会去全局作用域寻找，如果没有找到，则会报错变量未定义，所以上述 `bar()` 函数的作用域链为

```plain
bar --> foo --> 全局作用域
```

编译器会根据作用域链去寻找变量，如果没有找到则会报错。

## 闭包介绍

什么是闭包，简单的说就是允许函数访问并操作函数外部的变量，只要该变量处于该函数的作用域链中，比如

```javascript
function foo() {
    var x = 1;
    return function() {
        console.log(x);
    }
}

var func = foo();
func(); // 1
```

函数 `foo()` 返回了一个函数，返回的这个函数中访问了变量 `x`，根据我们的讲解，会根据这个函数的作用域链去寻找这个变量 `x`，该匿名函数定义时的作用域链

```plain
返回的匿名函数 --> foo --> 全局作用域
```

所以当执行该匿名函数时，会根据上述的作用域链去寻找变量 `x`，会在 `foo` 中找到变量 `x`，所以输出的结果是 `1`。

你可能会有这样的疑惑，当执行完函数 `foo()` 后，变量 `x` 不是应该已经被销毁了吗，为什么还能够被访问。之所以会有这样的想法，可能是受其他编程语言的影响，如 `C`，`Java` 等，但是要明白 `JavaScript` 与这些编程语言不同，至少 `Java` 不能够返回函数，因为返回的函数还保存着对变量 `x` 的引用，所以变量 `x` 在执行完 `foo()` 之后是不会被清除的，这就是还能够访问 `x` 的原因。

那接下来看一个例子，看看你是否明白了闭包

```javascript
for (var i = 0; i < 10; i++) {
    setTimeout(function(){
        console.log(i);
    }, i * 100)
}
```

上面的程序的效果是延时 `i * 100 ms` 打印输出 `i`，你可能希望得到下面这样的输出

```javascript
0
1
2
3
4
5
6
7
8
9
```

但是真正的结果是

```javascript
10
10
10
10
10
10
10
10
10
10
```

这是因为 `setTimeout` 是一个异步函数，当执行 `setTimeout` 时，并不会立即执行传入的回调函数，这些回调函数等到延迟时间到了以后，会将这些回调函数放入事件队列中，简单来说，当执行到 `setTimeout` 函数时，不会有任何的阻碍直接进入下一轮循环，等到循环执行完毕，编译器会取出事件队列中的函数执行(这些回调函数并不是执行到 `setTimeout` 方法时立即被添加到事件队列中的，而是等到设定的延迟时间后再添加到事件队列中的)，所以当执行这些回调函数时，循环已经执行完毕，变量 `i` 的值已经变为了 `10`，这些回调函数根据它的作用域链找到的变量 `i` 的值就全部是 `10` 了。

## 闭包实现私有变量

在 `JavaScript` 中是没有关键字去声明私有变量的，但是我们可以通过闭包来实现这样的效果，如下

```javascript
function Person () {
    var name = 'ninja';

    this.setName = function (value) {
        name = value;
    }

    this.getName = function () {
        return name;
    }
}

var person = new Person();

console.log(person.name); // 访问不到 undefined

console.log(person.getName()); // ninja
person.setName('dummy');
console.log(person.getName()); // dummy
```

通过闭包，`setName` 和 `getName` 可以对 `name` 进行访问和操作，但是却不能够被实例变量 `person` 访问到，因为 `name` 并不是 `person` 的属性，这样我们就实现了私有变量。

## 闭包处理回调函数

假设有这么一个动画函数

```javascript
var tick = 0;
function animateIt(id) {
    var element = document.getElementById(id);
    var timer = setInterval(function () {
        if (tick < 100) {
            element.style.left = element.style.top = tick + "px";
            tick++;
        } else {
            clearInterval(timer);
        }
    }, 10);
}
```

该函数实现在 `1s` 将元素向下和向右平移 `100px`，如下

```javascript
document.getElementById("box1").addEventListener('click', function () {
    animateIt("box1");
})
```

<ImageView src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/202004172341.gif"/>


但是当我们同时对两个元素使用动画时，由于二者共享变量 `tick`，则会导致二者的动画状态发生冲突，所以我们改动如下

```javascript
function animateIt(id) {
    var tick = 0;
    var element = document.getElementById(id);
    var timer = setInterval(function () {
        if (tick < 100) {
            element.style.left = element.style.top = tick + "px";
            tick++;
        } else {
            clearInterval(timer);
        }
    }, 10);
}
document.getElementById("box1").addEventListener('click', function () {
    animateIt("box1");
})
document.getElementById("box2").addEventListener('click', function () {
    animateIt("box2");
})
```

我们将 `tick` 定义在函数内，由于闭包，`setInteval` 中的回调函数可以访问到tick，并且两个不同`id` 元素的`tick`是不同的，不会相互干扰

<ImageView src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/202004080010.gif"/>






