---
title: 在浏览器中调试CSS
author: 熊滔
category: CSS
commentid: css:debug-in-broswer
---

当我们写 `CSS` 样式的时候，大部分情况下我们不会(能)一次性写出想要的效果，而是写出一部分代码，然后在浏览器中预览效果，在浏览器中我们根据看到效果我们会一步步调试 `CSS` 代码，直至达到满意。但是因为有多种选择器作用在元素上，很多时候我们很难知道哪一个选择器的样式生效了，所以也就不知道改哪部分的代码。

目前的浏览器都为我们准备了调试工具，在调试页面中我们可以知道哪个选择器的样式生效了，以及可以看到每个 `CSS` 属性具体的值，甚至我们可以直接在调试面板改变值来观察效果，这就极大的方便了我们调试样式。

要在浏览器中调试样式，一般都是按下 `F12` 或者 `Fn + F12` 就可以打开调试界面

<ImageView src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting2/20210531212203.png" alt="image-20210531212203235" style="zoom:50%;" />

如果我们希望查看某个元素的样式，我们可以直接点击该元素对应的 `HTML` 标签

<ImageView src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting2/20210531212728.gif" alt="1" style="zoom:50%;" />

在上面我们选中了一个标签，之后便可以在右边侧栏中观察它应用的所有的样式，并且可以直接修改，修改的结果会直接的显示在页面上。

除了选中标签的方法，更多的时候我们希望直接选中页面上的某个元素，从而查看它的样式，这个时候我们需要先点击调试板左上角的小箭头，然后就可以选中页面中的一个元素去查看它的样式了

<ImageView src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting2/20210531213612.gif" alt="2" style="zoom:50%;" />

在上面我们直接选择了元素，然后修改了它的字体。

> 注意：上述在浏览器修改的样式只是为了调试方便，一旦我们刷新浏览器，样式便会变为原样。

除了可以查看样式之外，还可以在浏览器中查看盒子的大小，这对我们调整页面的布局很有帮助

<ImageView src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting2/20210531215204.gif" alt="3" style="zoom:50%;" />

