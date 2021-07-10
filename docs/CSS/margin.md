---
title: margin
author: 熊滔
category: CSS
---

## 属性介绍

外边距指的是盒子与盒子之间的距离，我们使用 `margin` 来设置外边距的大小，同 `padding` 一样，`margin` 也有四个属性以及简写：

- `margin-top`
- `margin-bottom`
- `margin-left`
- `margin-right`

以及我们也可以使用 `margin` 简写的方式，`margin` 简写的取值同 `padding`，可以去四个值、三个值、两个值以及一个值。

<CodeGroup>
<CodeGroupItem title="html" active>

```html
<div>
    <div class="box1"></div>
    <div class="box2"></div>
</div>
```

</CodeGroupItem>

<CodeGroupItem title="css">

```css
[class^='box'] {
    width: 200px;
    height: 50px;
    border: 1px solid black;
    display: inline-block;
}
.box1 {
    margin-right: 50px;
}
.box2 {
    margin-left: 50px;
}
```

</CodeGroupItem>
</CodeGroup>

<DisplayBox>
<CSS-Demo-23></CSS-Demo-23>
</DisplayBox>

上面我们设置 `box1` 的右外边距为 `50px`，`box2` 的左外边距为 `50px`，所以两个盒子之间的横向距离为 `50px + 50px = 100px`。

## 外边距合并

对于横向的外边距来说，两个盒子的横向外边距为两个盒子外边距的和，但是对于纵向的外边距来说，盒子之间的距离并不是相加，而是取最大值

<CodeGroup>
<CodeGroupItem title="html" active>

```html
<div class="box1"></div>
<div class="box2"></div>
```

</CodeGroupItem>

<CodeGroupItem title="css">

```css
[class^='box'] {
    width: 200px;
    height: 50px;
    border: 1px solid black;
}
.box1 {
    margin-bottom: 50px;
}
.box2 {
    margin-top: 100px;
}
```

</CodeGroupItem>
</CodeGroup>

<DisplayBox>
<CSS-Demo-24></CSS-Demo-24>
</DisplayBox>

上面我们设置了 `box1` 的下外边距为 `50px`，`box2` 的上外边距为 `100px`，但是上述两个盒子纵向之间的距离不是 `50px + 100px = 150px`，而是两个盒子外边距的最大值 `100px`。

## 外边距塌陷

