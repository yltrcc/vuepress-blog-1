---
title: display
author: 熊滔
category: CSS
---

盒子分为三种盒子：

- 块级
- 行内块
- 行内

所谓的块级盒子就是独占一行的盒子，而行内块盒子与行内都是与其他盒子共占一行，二者不同的是行内块盒子可以通过 `width` 与 `height` 设置盒子的大小，而行内元素的大小不能通过 `width` 和 `height` 属性进行设置，其实际大小由它内部的内容撑开。常见的块级、行内块、行内标签如下所示

| 块级                                                  | 行内块         | 行内                               |
| ----------------------------------------------------- | -------------- | ---------------------------------- |
| `div`、`h1-6`、`p`、`form`、`ol`、`ul`、`li`、`table` | `img`、`input` | `span`、`a`、`lable`、`em`、`code` |

## 块级盒子

```html
<div>div盒子</div>
<h1>一级标题</h1>
<h2>二级标题</h2>
<p>段落p</p>
<ul>
    <li>列表</li>
    <li>列表</li>
    <li>列表</li>
</ul>
<ol>
    <li>首先</li>
    <li>接着</li>
    <li>最终</li>
</ol>
```

<DisplayBox>
<CSS-Demo-16></CSS-Demo-16>
</DisplayBox>

可以观察到上面的每个标签都是独占一行。

## 行内盒子

```html
<span>span标签</span>
<a href="#">a标签</a>
<em>em标签</em>
<code>code标签</code>
<label for="#">lable标签</label>
```

<DisplayBox>
<CSS-Demo-17></CSS-Demo-17>
</DisplayBox>

我们可以观察到这些标签都在同一行。

## display

标签的盒子分类不是不可变的，我们可以通过 `display` 属性来更改盒子显示状态，`display` 可取如下三个值(实际可取的值不只三个，后续介绍)

- `blobk`：将盒子设置为块级盒子
- `inline-block`：将盒子设置为行内块盒子
- `inline`：将盒子设置为行内盒子

<CodeGroup>
<CodeGroupItem title="html" active>

```html
<div>
    <div>div标签</div>
    <h1>一级标题</h1>
    <h2>二级标题</h2>
    <p>段落p</p>
    <ul>
        <li>列表</li>
        <li>列表</li>
        <li>列表</li>
    </ul>
    <ol>
        <li>首先</li>
        <li>接着</li>
        <li>最终</li>
    </ol>

    <span>span标签</span>
    <a href="#">a标签</a>
    <code>code标签</code>
    <label for="#">label标签</label>
</div>
```

</CodeGroupItem>

<CodeGroupItem title="css">

```css
div, h1, h2, p, ul, ol, li {
    display: inline;
}
span, a, code, label {
    display: block;
}
```

</CodeGroupItem>
</CodeGroup>

<DisplayBox>
<CSS-Demo-18></CSS-Demo-18>
</DisplayBox>

上面我们将原先为块级的盒子设置为了行内盒子，将行内的盒子设置为了块级盒子。