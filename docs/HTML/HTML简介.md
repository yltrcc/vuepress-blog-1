---
title: HTML简介
time: 2021-04-10
author: 熊滔
commentid: html:introduce
---

HTML (Hyper Text Markup Language)，翻译为超文本标记语言，我们使用它来描述网页。所谓的超文本指的是不仅仅能够表示文字，还能够表示图片，音视频，以及超链接等等内容。我们使用下面形式的文本来表示网页

```html
<h1>这是一个大标题</h1>
<ImageView src="..." alt="">
```

其中 `h1` 以及 `img` 称为标签，`h1` 表示一级标题，而 `img` 表示一张图片，具体更多的标签会在后文介绍。

## 开发工具

工欲善其事，必先利其器。在开始真正的编写一个网页之前，必须先准备好工具：

1. 浏览器
2. 编辑器

目前(2021-03)浏览器的使用占比

<ImageView src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting2/20210407235855.png" alt="image-20210407235855288" style="zoom:50%;" />

Chrome 浏览器的使用率名列前茅，第二名是 Safari，是苹果自家的浏览器，后面便是 Firefox 与 Edge。建议使用 Chrome 浏览器。

编辑器是编写代码的软件，写网页并没有要求一定要使用什么软件才能写，只要你的文件内容满足要求的格式，浏览器能够解析即可，所以使用记事本也是可以写出网页的。不过使用更好的软件可以让你写代码的更有效率，而且更少的出错率，这里推荐的编辑器是微软公式的软件 `Visual Studio Code`，简称 `VSCode`。

> 关于软件的使用可以自己摸索，或者直接上网搜索这是一个什么样的软件，以及如何使用。

## HTML 文档的结构

浏览器可以将一个以 `.html` 为后缀名的文件解析为一个页面，而浏览器要解析这个文件，这个文件必须要满足一定的格式才能被浏览器解析，所以我们就来讲 `html` 文件需满足什么格式。

新建一个以 `.html` 为后缀名的文件，例如 `index.html`，编写内容如下

```html
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <title>网页标题</title>
    </head>
    <body>
        Hello World!
    </body>
</html>
```

上面是一个最简单的 `html` 文件，他会在浏览器渲染出如下页面

<ImageView src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting2/20210409212558.png" alt="image-20210409212558071" style="zoom:50%;" />

代码的第一行

```html
<!DOCTYPE html>
```

是声明 `HTML` 文件的版本的，`HTML` 从提出到至今经历过很多的版本，对于不同的版本浏览器的解析规则也不尽相同，现在比较流行的版本是 `HTML5`，上面的这行代码表示的就是我们使用的是 `HTML5`，浏览器也会以对应的规则进行解析。

在文章的开头便有提及 `HTML` 是一门标记语言，我们使用标签来表示页面的内容，标签直接可以互相嵌套，表示包含关系。一个 `HTML` 文件有一个 `html` 标签，`html` 标签中包含两个标签 `head` 与 `body`

```html
<html>
    <head>
    </head>
    <body>
    </body>
</html>
```

`head` 标签用以描述网页的属性和信息，例如网页的标题、在 Web 中位置等等信息，在 `head` 标签中的内容一般都不会显示在网页中，`head` 标签中也可以包含标签，例如 `title` 标签，它定义了网页的标题。

`body` 标签中的内容会被显示在网页中，它也可以包含标签

- a：超链接
- p：段落
- table：表格
- ...

等等。

 ## 注释

注释的作用就是为了解释代码的作用，当代码比较复杂的时候，很难一眼能够看明白这段代码是干什么的，所以需要对代码进行解释。对于注释的内容，浏览器是不会解析的，因为注释是为了让写代码的人理解代码。在 `HTML` 文件中，在 `<!-- -->` 中的内容就是注释内容

```html {7}
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <title>网页标题</title>
    </head>
    <body>
        <!-- 这是注释，这里的内容不会被浏览器解析 -->
        Hello World!
    </body>
</html>
```





