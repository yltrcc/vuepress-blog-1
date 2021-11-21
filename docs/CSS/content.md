---
title: 盒子模型
author: 熊滔、
category: CSS
---

`CSS` 一个非常重要的作用就是布局，所谓布局就是将标签进行摆放。所有的标签都可以看做是一个矩形的盒子，盒子由三部分组成

- `border`：边框
- `padding`：内边距，内容区到边框的距离
- `content`：内容区

## width、height

通过设置 `width` 和 `height` 的大小我们可以设置盒子的大小，默认情况下 `width` 与 `height` 设置的是内容区的大小，通过设置 `box-sizing: border-box` 属性可以使得 `width` 与 `height` 设置的是整个盒子的大小。

<CodeGroup>
<CodeGroupItem title="html" active>
```html
<div id="box">
    Hello World!
</div>
```
</CodeGroupItem>

<CodeGroupItem title="css">
```css
#box {
    width: 100px;
    height: 100px;
    border: 10px solid red; /* 设置边框为 10px 宽，形状为实线，颜色为红色 */
    padding: 10px; /* 设置四个方向的内边距为 10px */
    background-color: gray; /* 设置背景颜色为灰色 */
    color: white;
}
```
</CodeGroupItem>
</CodeGroup>


<DisplayBox>
<CSS-Demo-14></CSS-Demo-14>
</DisplayBox>

在上述盒子中，红色区域为边框，灰色区域为内边距与内容区，白色文字与边框之间就是内边距。上面我们设置了 `width` 和 `height` 的大小为 `100px`，此时设置的是内容区的大小，而不是盒子的大小，盒子的实际大小为 `100 + 2*10 + 2*10 = 140px`，其中第一个 `2*10` 为两个内边距大小，第二个 `2*10` 为两个边框宽度。我们可以设置 `box-sizing` 为 `border-box`，这时我们设置的 `width` 和 `height` 就是盒子的大小

<CodeGroup>
<CodeGroupItem title="html" active>
```html
<div id="box">
    Hello World!
</div>
```
</CodeGroupItem>

<CodeGroupItem title="css">
```css {8}
#box {
    width: 100px;
    height: 100px;
    border: 10px solid red;
    padding: 10px;
    background-color: gray;
    color: white;
    box-sizing: border-box;
}
```
</CodeGroupItem>
</CodeGroup>

<DisplayBox>
<CSS-Demo-15></CSS-Demo-15>
</DisplayBox>

可以看到整个盒子的大小为 `100 * 100`，而内容区的大小为 `100-2*10-2*10 = 60`，即内容区的大小为 `60 * 60`。

## min-width、max-width、min-height、max-height



## overflow



## object-fit






