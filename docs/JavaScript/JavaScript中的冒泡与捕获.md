---
title: JavaScript中的冒泡与捕获
---

## JavaScript中的冒泡与捕获

首先来看一个例子来明白什么是冒泡和捕获，来看下面的一个html结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .outer {
            width: 200px;
            height: 200px;
            background-color: black;
            margin: 100px auto;
        }

        .inner {
            width: 100px;
            height: 100px;
            background-color: greenyellow;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner"></div>
    </div>
</body>
</html>
```

就是一个大盒子里面套着一个小盒子，为两个盒子设置了背景颜色以作区分，如下

<center>
    <ImageView src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/2020-03-17_150014.png"/>
</center>

现在为二者都添加一个点击方法

```javascript
<script>
    let outer = document.querySelector('.outer');
    let inner = document.querySelector('.inner');
    outer.addEventListener('click', (e) => {
        console.log('outer被点击了');
    });
    inner.addEventListener('click', (e) => {
        console.log('inner被点击了');
    });
</script>
```

现在如果点击里面的盒子`inner`，那么`outer`的点击事件会不会触发，因为按道理也算是点击了`outer`的区域，所以`outer`的点击事件应该被触发。现在问题又来了，是先触发`inner`还是先触发`outer`的点击事件呢? 按照二者触发顺序的不同分为捕获和冒泡。



现在点击绿色的小盒子，看看输出是什么

<center>
    <ImageView src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/2020-03-17-15-09.gif"/>
</center>

当我们点击里面的盒子即`inner`时，触发了它的点击事件，随后触发了`outer`的点击事件，这样触发子元素事件之后触发父元素事件的行为就叫做冒泡；捕获就是随之相反了，先处理`outer`，然后处理`inner`的事件。



要实现捕获的效果，首先我们为addEventListener方法的第三个参数设置为true，如下

```javascript
outer.addEventListener('click', (e) => {
    console.log('outer被点击了');
}, true);
inner.addEventListener('click', (e) => {
    console.log('inner被点击了');
}, true);
```

这时我们在点击里面的盒子

<center>
    <ImageView src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/2020-03-17-15-17.gif"/>
</center>

这时是`outer`的点击事件先被执行，然后是`inner`的点击事件被执行。



冒泡和捕获的出现是因为以前的两大浏览器厂商Netscape和Microsoft对事件模型处理方法，Microsoft采取的从目标元素(比如点击`inner`，`inner`就是目标元素)开始，按DOM树向上冒泡；而Netscape采取的是相反的原则，即从顶部元素开始，直到事件目标元素。通过上面的例子可以知道，可以通过设置addEventListener方法的第三个参数可以设置是冒泡还是捕获，当设置为true时，是捕获，当设置为false时，是冒泡，默认是false。



现在考虑一个比较复杂的DOM结构，如下

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .one {
            width: 200px;
            height: 200px;
            background-color: black;
            margin: 100px auto;
        }
        .two {
            width: 150px;
            height: 150px;
            background-color: aliceblue;
        }
        .three {
            width: 100px;
            height: 100px;
            background-color: greenyellow;
        }
        .four {
            width: 50px;
            height: 50px;
            background-color: blueviolet;
        }
    </style>
</head>
<body>
    <div class="one">
        <div class="two">
            <div class="three">
                <div class="four"></div>
            </div>
        </div>
    </div>
    <script>
        let one = document.querySelector('.one');
        let two = document.querySelector('.two');
        let three = document.querySelector('.three');
        let four = document.querySelector('.four');

        one.addEventListener('click', (e) => {
            console.log('one被点击了');
        }, true);
        two.addEventListener('click', (e) => {
            console.log('two被点击了');
        }, false);
        three.addEventListener('click', (e) => {
            console.log('three被点击了');
        }, true);
        four.addEventListener('click', (e) => {
            console.log('four被点击了');
        }, false);
    </script>
</body>
</html>
```

上面四个盒子套在一起，我们为`one`和`three`设定为捕获模式，为`two`和`four`设定为冒泡模式，如果我们点击`four`，这时的输出会是什么呢?

<center>
    <ImageView src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/2020-03-17-15-50.gif"/>
</center>

我们观察到输出的顺序为`one -> three -> four -> two`，代码是怎么执行的呢? 首先事件处理器会从顶部开始即`one`(严格的说是从`window`)，一直到目标元素，在这个路径中，如果遇到设置为捕获模式的则执行，碰到冒泡模式的则跳过，达到目标元素后，开始转换为冒泡模式，向上冒泡到`one`，在这个路径中，如果碰到设置为冒泡模式的则执行，否则跳过。



现在我们来看看上面的执行流程：

- 首先从`one`开始向下捕获，`one`设置为捕获模式，执行
- 遇到`two`，`two`设置为冒泡模式，不执行跳过
- 遇到`three`，`three`设置为捕获模式，执行
- 遇到`four`，到达目标元素，执行(此时不管four是冒泡还是捕获都没有关系，都会执行的)
- 接着转变为冒泡模式，遇到`three`，`three`为捕获模式，跳过
- 遇到`two`，`two`为冒泡模式，执行
- 遇到`one`，`one`为捕获模式，不执行，此时已经到达顶部，结束

通过上面的流程，不难知道输出的顺序为什么是`one -> three -> four -> two`。

## 在父元素上代理事件

我们来看一个运用冒泡的小例子，假设有这个一个DOM结构

```html
<ul>
    <li>元素</li>
    <li>元素</li>
    <li>元素</li>
    <li>元素</li>
    <li>元素</li>
    <li>元素</li>
    <li>元素</li>
    <li>元素</li>
    <li>元素</li>
    <li>元素</li>
</ul>
```

我们希望当点击li标签时，将li标签里面的文字变为红色，所以很有可能你会写出这样的代码

```javascript
document.querySelectorAll("ul li").forEach(item => {
    item.addEventListener('click', (e) => {
        e.target.style.color = 'red';
    })
})
```

这样写当然能达到效果，但是如果ul下面有成千上万个li，这样写未免性能太低，我们可以利用冒泡的特性，为ul绑定点击事件，如下

```javascript
document.querySelector('ul').addEventListener('click', (e) => {
    e.target.style.color = 'red';
});
```

这样不管ul下面有多少个li都没有关系。

> 解释：
>
> 这里可能有人不太懂e.target是什么，e.target是指触发点击事件的元素，而不是ul，因为我们点击的是li标签，所以这里的e.target是被点击的li元素。如果想在addEventListener里面访问ul元素，可以使用this。

## 阻止事件冒泡

有的时候我们不希望事件有冒泡操作，我们可以通过event对象的stopPropagation方法来阻止事件冒泡，以文章开头的`inner`和`outer`为例(`outer`和`inner`都设置为冒泡模式)，我们给`inner`的addEventListener修改为

```javascript
inner.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('inner被点击了');
});
```

这时我们点击`inner`，这时只有`inner`的点击事件被执行了

<center>
    <ImageView src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/2020-03-17-16-22.gif"/>
</center>



