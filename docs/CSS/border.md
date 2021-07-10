---
title: border
author: 熊滔
category: CSS
---

## 属性介绍

有关设置边框的属性有下面三个

| 属性           | 含义           |
| -------------- | -------------- |
| `border-style` | 设置边框的样式 |
| `border-width` | 设置边框的宽度 |
| `border-color` | 设置边框的颜色 |

`border-style` 有如下取值

| `border-style` | 含义 |
| -------------- | ---- |
| `solid`        | 实线 |
| `dashed`       | 虚线 |
| `dotted`       | 点状 |
| `double`       | 双层 |

具体更多的 `border-style ` 可以参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style)。

<CodeGroup>
<CodeGroupItem title="html" active>

```html
<div>
    <div class="box1">Box1</div>
    <div class="box2">Box2</div>
    <div class="box3">Box3</div>
    <div class="box4">Box4</div>
</div>
```

</CodeGroupItem>

<CodeGroupItem title="css">

```css
[class^='box'] {
    width: 200px;
    height: 50px;
}
.box1 {
    border-style: solid;
}
.box2 {
    border-style: dashed;
}
.box3 {
    border-style: dotted;
}
.box4 {
    border-style: double;
}
```

</CodeGroupItem>
</CodeGroup>

<DisplayBox>
<CSS-Demo-21></CSS-Demo-21>
</DisplayBox>

`border-width` 用来设置边框粗细

<CodeGroup>
<CodeGroupItem title="html" active>

```html
<div>
    <div class="box1">Box1</div>
    <div class="box2">Box2</div>
    <div class="box3">Box3</div>
</div>
```

</CodeGroupItem>

<CodeGroupItem title="css">

```css
[class^='box'] {
    width: 200px;
    height: 50px;
    margin-bottom: 5px;
    border-style: solid;
}
.box1 {
    border-width: 1px;
}
.box2 {
    border-width: 5px;
}
.box3 {
    border-width: 10px;
}
```

</CodeGroupItem>
</CodeGroup>

<DisplayBox>
<CSS-Demo-22></CSS-Demo-22>
</DisplayBox>

`border-color` 是用来设置边框颜色的，这没有什么说的。

上面三个属性可以使用简写

```css
border: 1px solid red;
```

上述样式表示设置边框为粗细为 `1px`，边框样式为实线，边框颜色为红色。

我们可以通过 `border-left-style`、`border-left-width`、`border-left-color` 来设置某一条边框的样式，我们也可以使用 `border-left` 简写的方式来设置某条边框的样式

```css
border-left-style: solid;
border-left-width: 1px;
border-left-color: red;
/* 等效于 */
border-left: 1px solid red;
```

## 应用

