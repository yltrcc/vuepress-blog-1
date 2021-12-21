---
title: padding
author: 熊滔
category: CSS
---

我们使用 `padding` 来设置内边距的大小，主要有如下四个属性：

| 属性             | 含义     |
| ---------------- | -------- |
| `padding-top`    | 上内边距 |
| `padding-bottom` | 下内边距 |
| `padding-left`   | 左内边距 |
| `padding-right`  | 右内边距 |

<ImageView src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting2/20210526184931.png" alt="内边距" style="zoom:50%;" />

<CodeGroup>
<CodeGroupItem title="html" active>

```html
<div id="box">
    To be both a speaker of words and a doer of deeds
</div>
```

</CodeGroupItem>

<CodeGroupItem title="css">

```css
#box {
    width: 300px;
    border: 1px solid black;
    padding-top: 20px;
    padding-bottom: 40px;
    padding-left: 20px;
    padding-right: 40px;
}
```

</CodeGroupItem>
</CodeGroup>

<DisplayBox>
<CSS-Demo-19></CSS-Demo-19>
</DisplayBox>

上面我们设置上边距以及左边距为 `20px`，下边距以及右边距为 `40px`。

对于内边距的设置还有简写形式，例如对于上面的内边距的设置可以采用下面的方法进行设置

```css
padding: 20px 40px 40px 20px;
```

上面我们为 `padding` 设置了四个值，分别对应上边距、右边距、下边距与左边距(顺时针的顺序)。

`padding` 还可以设置为三个值，例如

```css
padding: 10px 20px 30px;
```

上面第一个值表示上边距的大小，第二值表示左右边距的大小，第三个值表示下边距的大小。

`padding` 还可以设置为两个值

```css
padding: 10px 20px;
```

第一个值表示上下边距，第二个值表示左右边距。

`padding` 还可以设置为一个值

```css
padding: 10px;
```

当 `padding` 设置为一个值时，表示将上下左右四个方向的内边距都设置为该大小。

<CodeGroup>
<CodeGroupItem title="html" active>

```html
<div>
    <div class="box1">To be both a speaker of words and a doer of deeds</div>
    <div class="box2">To be both a speaker of words and a doer of deeds</div>
    <div class="box3">To be both a speaker of words and a doer of deeds</div>
    <div class="box4">To be both a speaker of words and a doer of deeds</div>
</div>
```

</CodeGroupItem>

<CodeGroupItem title="css">

```css
[class^="box"] {
    box-sizing: border-box;
    width: 300px;
    border: 1px solid black;
}

.box1 {
    padding: 20px 40px 20px 40px;
}
.box2 {
    padding: 20px 40px 20px;
}
.box3 {
    padding: 20px 40px;
}
.box4 {
    padding: 40px;
}
```

</CodeGroupItem>
</CodeGroup>

<DisplayBox>
<CSS-Demo-20></CSS-Demo-20>
</DisplayBox>

