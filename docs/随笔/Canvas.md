---
title: Canvas
author: 熊滔
---

`<canvas>` 是一个元素，它的意思为画布的意思，我们可以通过 `JavaScript` 脚本在其中绘制内容，包括形状，文字，图片，视频等等内容。

## 起步

创建一个画布

```html
<canvas id="canvas"></canvas>
```

画布的大小可以通过 `width` 和 `height` 属性规定，默认为 $300\times 150$，当浏览器不支持 `canvas` 时，我们可以在 `<canvas></canvas>` 中放置**后备内容**，这样当浏览器不支持时就会显示后备内容。

```html
<canvas>
	您的浏览器不支持canvas，请升级到最新版本！
</canvas>
```

准备好画布以后，我们可以通过画布的绘制上下文`(context)`在画布中绘制内容，我们通过 `getContext()` 方法来获得绘制上下文，该方法接受一个参数，取值如下

- `2d`
- `webgl`

分别表示获得 2D 上下文和 WebGL(用来绘制3D图案) 上下文，这里我们主要介绍使用 2D 上下文来进行绘制

```jsx
// 获得 DOM 元素
const canvas = document.getElementById('canvas')
// 获得 2d 绘制上下文
const ctx = canvas.getContext('2d')
```

绘制上下文为我们提供了很多的 API 让我们能够绘制形状，文字，图片等等，以及能够设定颜色，字体等等功能

```jsx
// 设置填充颜色
ctx.fillStyle = 'rgb(207, 85, 119)'
// 绘制一个左上角在 (0, 0)，长宽为 150 * 100 的矩形
ctx.fillRect(0, 0, 150, 100)
```

 <iframe src="https://lastknightcoder.github.io/canvas-demos/01.html" height="170"></iframe>

## 坐标系统

***Canvas*** 中的坐标系统与数学中的坐标系统，起坐标原点为元素的左上角，`x` 轴的方向从左至右，`y` 轴方向从上至下

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/坐标系统.55ak3s2eokc0.svg" />

对于极坐标系，角度的增长沿顺时针方向，这是因为 `y` 轴向下导致的

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/Canvas-极坐标系.6rpqzhey4340.svg" alt="Canvas-极坐标系.svg"  />

## 绘制路径

### API介绍

与绘制路径有关的方法如下：

| 方法        | 作用                 |
| ----------- | -------------------- |
| `beginPath` | 开始绘制一个新的路径 |
| `moveTo`    | 下笔的位置           |
| `lineTo`    | 移动笔到当前位置     |
| `closePath` | 将路径闭合           |
| `stroke`    | 绘制路径             |

看一个绘制线条的例子

```jsx
ctx.beginPath()
ctx.moveTo(100, 100)
ctx.lineTo(100, 200)
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/02.html" height="200"/>

我们可以将绘制想象为用笔在画布上绘制，当我们调用 `ctx.beginPath()` 的时候，表示我们要开始绘制一个路径，现在你只需知道每次我们要绘制一个新的路径时都要调用这个方法，接着我们调用 `ctx.moveTo(100, 100)` ，表示我们**提笔**到 `(100, 100)` 这个坐标，接着我们调用 `ctx.lineTo(100, 200)` ，表示将笔**移动**到 `(100, 200)` 这个坐标，至此为止画布上还没有线条出现的，我们必须调用 `ctx.stroke()` 方法，才能路径绘制出来。

这里还没有介绍 `closePath()` 方法，它表示将路径闭合，例如

```jsx
ctx.beginPath()
ctx.moveTo(100, 100)
ctx.lineTo(100, 200)
ctx.lineTo(200, 200)
ctx.closePath()
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/03.html" height="350" >

### lineWidth

通过 `lineWidth` 来规定线的长度，默认值为 `1.0` ，该值的大小必须大于 `0` ，如果希望设置线的宽度，务必在调用 `ctx.stroke()` 之前设置

```jsx
const lineWidths = [1, 3, 5, 7, 9]
for (let i = 0; i < lineWidths.length; i++) {
  ctx.beginPath()
  ctx.moveTo(100, 50 + i * 50)
  ctx.lineTo(400, 50 + i * 50)
  ctx.lineWidth = lineWidths[i]
  ctx.stroke()
}
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/04.html" height="320"></iframe>

### lineCap

我们还可以通过 `lineCap`  来规定线两端线帽的形状，它有三种取值

- `butt`：默认值，表示没有线帽，线的长度和宽度与设置的相同
- `round`：半圆形线帽，圆的直径与线的宽度相同
- `square`：矩形线帽，两边各扩展一个矩形，矩形的长度为线宽大小的一半

```jsx
const lineCaps = ['butt', 'round', 'square']
ctx.lineWidth = 10
for (let i = 0; i < lineCaps.length; i++) {
  ctx.beginPath()
  ctx.lineCap = lineCaps[i]
  ctx.moveTo(100, 50 + 50 * i)
  ctx.lineTo(200, 50 + 50 * i)
  ctx.stroke()
}
```

同理，`lineCap` 的设置必须在调用 `stroke` 之前。

<iframe src="https://lastknightcoder.github.io/canvas-demos/05.html" height="220"></iframe>

### lineJoin

`lineJoin` 用来设置线条交接处外角的形状，有如下三种取值：

- `miter` ：默认值，折线交接处为尖角
- `round` ：折线交接处为圆角
- `bevel`：折线交接处为斜角

```jsx
const lineJoins = ['miter', 'round', 'bevel']
ctx.lineWidth = 15
for (let i = 0; i < lineJoins.length; i++) {
    ctx.beginPath()
    ctx.lineJoin = lineJoins[i]
    ctx.moveTo(50 + 150* i, 50)
    ctx.lineTo(150 + 150 * i, 50)
    ctx.lineTo(150 + 150 * i, 150)
    ctx.stroke()
}
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/06.html" height="220"></iframe>

通过 `miterLimit` 来设置折线交接处线延长的长度，当线延长的长度超过 `miterLimit` 时，折线交接处的外角就会变平

```jsx
ctx.miterLimit = 2
ctx.lineWidth = 10

ctx.beginPath()
ctx.moveTo(50, 50)
ctx.lineTo(150, 50)
ctx.lineTo(150, 150)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(200, 50)
ctx.lineTo(300, 50)
ctx.lineTo(250, 150)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(350, 50)
ctx.lineTo(450, 50)
ctx.lineTo(350, 150)
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/07.html" height="220"></iframe>

### strokeStyle

可以通过 `strokeStyle` 来规定线条的样式，包括如下取值

- 颜色
- 渐变色
- 图案

颜色是任意符合 CSS3 规则的颜色，如 `#F6F7F8` `rgb(255, 255, 255)` `rgba(0, 0, 0, .4)` 

```jsx
ctx.lineWidth = 10

ctx.beginPath()
ctx.strokeStyle = '#e77c8e'
ctx.moveTo(0, 20)
ctx.lineTo(100, 20)
ctx.stroke()

ctx.beginPath()
ctx.strokeStyle = 'blue'
ctx.moveTo(150, 20)
ctx.lineTo(250, 20)
ctx.stroke()

ctx.beginPath()
ctx.strokeStyle = 'rgba(0, 0, 0, .3)'
ctx.moveTo(300, 20)
ctx.lineTo(400, 20)
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/08.html" height="120"></iframe>

渐变色则是通过上下文提供的创建渐变色的 API 来创建的，渐变色分为两种，线性渐变和径向渐变，创建的语法分别如下：

- `createLinearGradient(x1, y1, x2, y2)`：创建一个从 ($x_1$, $y_1$) 到 ($x_2$, $y_2$) 的线性渐变
- `createRadialGradient(x1, y1, r1, x2, y2, r2)` ：创建一个圆心为 ($x_1$, $y_1$)，半径为 $r_1$到圆心为 ($x_2$, $y_2$)，半径为 $r_2$ 的径向渐变。

接着我们可以通过 `addColorStop(position, color)` 来添加颜色

```jsx
const linearGradient = ctx.createLinearGradient(10, 10, 200, 100)
linearGradient.addColorStop(0, '#12c2e9')
linearGradient.addColorStop(0.5, '#c471ed')
linearGradient.addColorStop(1, '#f64f59')
ctx.strokeStyle = linearGradient

ctx.lineWidth = 10
ctx.lineCap = 'round'

ctx.beginPath()
ctx.moveTo(10, 10)
ctx.lineTo(200, 100)
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/09.html" height="130"></iframe>

```jsx
// 此处代码涉及到绘制圆以及填充路径，可学完绘制圆之后回过头来看
const radialGradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 150)
radialGradient.addColorStop(0, '#12c2e9')
radialGradient.addColorStop(0.5, '#c471ed')
radialGradient.addColorStop(1, '#f64f59')
ctx.fillStyle = radialGradient

ctx.arc(150, 150, 150, 0, Math.PI * 2)
ctx.fill()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/10.html" height="320"></iframe>

`strokeStyle` 的取值还可以是纹理，所谓纹理就是图片，我们可以使用纹理来填充线段。可以通过 `createPattern(image, repetition)`

- `image`：图片，它可以是
    - `HTMLImageElement`
    - `SVGImageElement`
    - `HTMLVideoElemet`
    - `HTMLCanvasElement`
    - `ImageBitmap`
    - `OffscreenCanvas`
- `repetition`：重复方式，有如下四种取值，同 CSS 中背景的 `background-repeat` 一样
    - `repeat`
    - `repeat-x`
    - `repeat-y`
    - `no-repeat`

下面介绍几个案例。

```jsx
const img = new Image()
img.src = 'https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/canvas_pattern.7hyt20ocepc0.png'
img.onload = () => {
  const pattern = ctx.createPattern(img, 'repeat');
  ctx.strokeStyle = pattern

  ctx.moveTo(100, 50)
  ctx.lineTo(100, 250)
  ctx.lineWidth = 100
  ctx.stroke()
}
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/11.html" height="300"></iframe>

使用 ***Canvas*** 作为纹理图案

```jsx
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const patternCanvas = document.createElement('canvas')
const patternCtx = patternCanvas.getContext('2d')
patternCanvas.width = 50
patternCanvas.height = 50
patternCtx.fillStyle = '#0eb0c9'
patternCtx.fillRect(0, 0, 50, 50)
patternCtx.arc(0, 0, 50, 0, Math.PI / 2)
patternCtx.stroke()

const pattern = ctx.createPattern(patternCanvas, 'repeat')
ctx.fillStyle = pattern
ctx.fillRect(0, 0, canvas.width, canvas.height)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/12.html" height="320"></iframe>

```jsx
const patternCanvas = document.createElement('canvas')
const patternCtx = patternCanvas.getContext('2d')

patternCanvas.width = 100
patternCanvas.height = 100

patternCtx.fillStyle = 'black'
patternCtx.fillRect(0, 0, 50, 50)
patternCtx.fillRect(50, 50, 50, 50)

patternCtx.fillStyle = 'white'
patternCtx.fillRect(50, 0, 50, 50)
patternCtx.fillRect(0, 50, 50, 50)

const pattern = ctx.createPattern(patternCanvas, 'repeat')
ctx.fillStyle = pattern
ctx.fillRect(0, 0, canvas.width, canvas.height)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/13.html" height="320"></iframe>

### setLineDash

通过 `setLineDash(pattern)` 可以设置虚线样式，虚线一般由一段实现，一段空白组成。`pattern` 是一个数组，表示虚线的模式，例如 `[10, 5]` 表示实线长度为 10，空白长度为 5，依次重复，又如 `[10, 5, 20, 5]` 表示第一段实线长度为 20，空白为 5，第二段实线长度为 10，空白为 5，依次重复。如果数组的长度为奇数，则会进行自我复制一份，例如 `[12, 3, 3]` 会被复制为 `[12, 3, 3, 12, 3, 3]`

```jsx
ctx.strokeStyle = '#66c18c'
ctx.lineWidth = 2

let y = 40
const drawDashLine = (pattern) => {
  ctx.beginPath()
  ctx.setLineDash(pattern)
  ctx.moveTo(100, y)
  ctx.lineTo(400, y)
  ctx.stroke()
  y += 40
}

drawDashLine([])
drawDashLine([1, 1])
drawDashLine([10, 5])
drawDashLine([20, 5, 10, 5])
drawDashLine([12, 3, 3])
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/14.html" height="320"></iframe>

### Path2D 对象

我们可以通过 `moveTo`，`lineTo` 方法创建路径，这些路径保存在绘图上下文中。除此之外我们可以通过 `Path2D` 来创建一个路径对象，该对象也可以保存路径信息，将其作为参数传递给 `stroke()` 方法即可绘制出对应的路径

```jsx
const path = new Path2D()
path.moveTo(50, 50)
path.lineTo(150, 50)
path.lineTo(150, 150)
path.closePath()

ctx.strokeStyle = '#1ba784'
ctx.stroke(path)
```

上面我们创建一个 `Path2D` 的对象，并且通过 `moveTo` `lineTo` 等等方法向其中添加了路径信息，接着我们将 `Path2D` 对象作为参数传递给 `stroke` 方法进行绘制。

<iframe src="https://lastknightcoder.github.io/canvas-demos/15.html" height="220"></iframe>

当创建 `Path2D` 对象时，还可以接受一个 `Path2D` 对象作为参数

```jsx
const path = new Path2D()
path.moveTo(100, 100)
path.lineTo(200, 100)
path.lineTo(200, 200)
path.closePath()

const newPath = new Path2D(path)
newPath.rect(50, 50, 100, 100)

ctx.lineWidth = 3
ctx.strokeStyle = '#1ba784'
ctx.stroke(newPath)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/16.html" height="250"></iframe>

`Path2D` 的构造方法还可以接收一个 `svg` 路径，如下

```jsx
const path = new Path2D('M10 10 h 80 v 80 h -80 Z')
ctx.stroke(path)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/17.html" height="120"></iframe>

## 绘图机制

### 基于状态

在讲解更多的 API 之前，我需要先**强调**一下 ***Canvas*** 的绘图机制，它是基于**状态**来绘制图案的，每次当我们调用方法绘制路径以及设置样式信息的时候，例如 `lineTo(100, 100)` 、`strokeStyle = 'red'` ，***Canvas*** 上下文只是将这些路径状态和样式保存了下来，并没有进行绘制，只有当我们调用 `stroke()` 或者 `fill()` 的时候，***Canvas*** 此时会读取我们的**路径信息**和**样式信息**，然后进行绘制。

所以当我们需要绘制两条不同样式的路径时，一定要在绘制新的路径前调用 `beginPath()` 方法来开始一个新的路径，调用该方法会清除之前保存的路径信息，否则的话会以之后设置的样式再次绘制之前的路径

```jsx
ctx.strokeStyle = 'black'
ctx.lineWidth = 20
ctx.moveTo(100, 100)
ctx.lineTo(100, 200)
ctx.stroke()

// 开始绘制一个新的路径，但是没有调用 beginPath 方法，之前的路径会以新的样式再次绘制
ctx.strokeStyle = 'green'
ctx.lineWidth = 3
ctx.moveTo(200, 100)
ctx.lineTo(200, 200)
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/18.html" height="200"></iframe>

```jsx
ctx.strokeStyle = 'black'
ctx.lineWidth = 20
ctx.moveTo(100, 100)
ctx.lineTo(100, 200)
ctx.stroke()

ctx.strokeStyle = 'green'
ctx.lineWidth = 3
// 调用 beginPath 方法，清除之前保存的所有路径信息
ctx.beginPath()
ctx.moveTo(200, 100)
ctx.lineTo(200, 200)
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/19.html" height="200"></iframe>

### 保存状态和恢复状态

***Canvas*** 上下文使用一个栈来保存绘图状态信息，绘图状态信息包括

- 当前的 `transform` 数组 `(transform matrix)`
- 当前的裁剪区域 `(clip region)`
- 当前的下列属性值：`strokeStyle`, `fillStyle`, `globalAlpha`, `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`, `globalCompositeOperation`, `font`, `textAlign`, `textBaseline`.

为了全面我将所有的有关状态都列出来了，但是目前还有很多没有接触过就可以忽略了，需要注意的是当前路径信息不在绘图状态中。

```jsx
ctx.fillStyle = '#29b7cb'
ctx.beginPath()
ctx.fillRect(100, 100, 100, 100)

// 保存当前的绘图状态
ctx.save()

// 设置新的填充颜色
ctx.fillStyle = '#1ba784'
ctx.beginPath()
ctx.moveTo(250, 100)
ctx.lineTo(350, 100)
ctx.lineTo(350, 200)
ctx.closePath()
ctx.fill()

// 恢复之前的绘图状态
ctx.restore()

ctx.fillRect(400, 100, 100, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/20.html" height="200"></iframe>

绘图状态是使用栈这种数据结构来进行保存的，每次当我们调用 `save()` 就是向栈中压入当前绘图状态，当我们调用 `restore()` 就是将栈顶的状态弹出作为当前的绘图状态

```jsx
ctx.fillStyle = '#1ba784'
ctx.fillRect(100, 100, 50, 50)

ctx.save()
ctx.fillStyle = '#c4d7d6'
ctx.fillRect(160, 100, 50, 50)

ctx.save()
ctx.fillStyle = '#2486b9'
ctx.fillRect(220, 100, 50, 50)

ctx.restore()
ctx.fillRect(280, 100, 50, 50)

ctx.restore()
ctx.fillRect(340, 100, 50, 50)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/21.html" height="250"></iframe>

## 绘制曲线

### 圆

比较常见的曲线就是圆弧，我们可以使用直线来模拟圆弧，根据圆满足的方程

$$
\begin{cases}
x = r\cos\theta \\
y = r \sin \theta 
\end{cases}
$$

使用角度作为自变量来绘制一段直线，当角度变化很小时，可以认为曲线是光滑的。根据方程我们可以得到如下绘制圆弧的方法

```jsx
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const { cos, sin } = Math

const arc = (x, y, r, startAngle, endAngle, ctx) => {
  ctx.beginPath()
  ctx.moveTo(x + r * cos(startAngle), y + r * sin(startAngle))
  for(let angle = startAngle; angle <= endAngle; angle += 0.1) {
    ctx.lineTo(x + r * cos(angle), y + r * sin(angle))
  }
  ctx.stroke()
}

arc(100, 100, 50, 0, Math.PI, ctx)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/22.html" height="200"></iframe>

当然 ***Canvas*** 有提供 API 来绘制圆弧，通过 `arc(x, y, r, startAngle, endAngle, anticlockwise = false)` 方法可以绘制一个圆弧，其中

- `(x, y)`：圆心的坐标
- `r`：圆的半径
- `startAngle`：圆弧的起始角度
- `endAngle`：圆弧的终止角度
- `anticlockwise`：是否逆时针绘制，默认为 `false`，即默认为顺时针绘制

需要注意两点：

1. 角度的单位为弧度，即角度的范围为 $[0, 2\pi]$
2. 角度为 $0$ 的方向为 $x$ 的正方向

```jsx
for (let  i = 0; i < 8; i++) {
  ctx.beginPath()
  ctx.arc(i * 100 + 50, 50, 40, 0, (i + 1) * 0.25 * Math.PI, false)
  ctx.stroke()
}
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/23.html" width="1000" height="200"></iframe>

掌握画矩形与圆弧的方法后，我们便可以绘制圆角矩形了

```jsx
const { PI } = Math

const roundedRect = (x, y, w, h, r, ctx) => {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arc(x + w - r, y + r, r, -PI / 2, 0)
  ctx.lineTo(x + w, y + h - r)
  ctx.arc(x + w - r, y + h - r, r, 0, PI / 2)
  ctx.lineTo(x + r, y + h)
  ctx.arc(x + r, y + h - r, r, PI / 2, PI)
  ctx.lineTo(x, y + r)
  ctx.arc(x + r, y + r, r, PI, 3 * PI / 2)
  ctx.stroke()
}

roundedRect(50, 50, 200, 100, 10, ctx)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/24.html" height="200"></iframe>

`arcTo(x1, y1, x2, y2, r)` 是另一种绘制圆弧的方法，它使用两条切线以及半径来确定一个圆弧，两条切线由两个控制点确定，圆弧的起点由 `moveTo` 或者 `lineTo` 的终止点给定，也是圆弧与第一条切线的交点，`(x1, y1)` 是两条切线的交点，`(x2, y2)` 是第二条切线上的点，与 `(x1, y1)` 确定第二条切线，`r` 指定圆弧的半径

```jsx
ctx.beginPath()
ctx.moveTo(100, 100)
ctx.lineTo(200, 100)
ctx.arcTo(300, 100, 350, 250, 100)
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/25.html" height="350"></iframe>

### 椭圆

同样的，我们也可以使用直线来画椭圆，根据椭圆的方程

$$
\begin{cases}
x = a * \cos\theta \\
y = b * \sin\theta 
\end{cases}
$$

```jsx
const { cos, sin, PI } = Math
const ellipse = (x, y, a, b, startAngle, endAngle, ctx) => {
    ctx.beginPath()
    ctx.moveTo(x + a * cos(startAngle), y + b * sin(startAngle))
    for (let angle = startAngle; angle <= endAngle; angle += PI / 100) {
        ctx.lineTo(x + a * cos(angle), y + b * sin(angle))
    }
    ctx.stroke()
}

ellipse(150, 100, 100, 50, 0, 2 * PI, ctx)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/26.html" height="220"></iframe>

另一种绘制椭圆的方式是对圆进行拉伸，假设取短轴 $b$ 为圆的半径 $r$，绘制一个圆，然后在长轴的方向上拉伸 $a/r$ 倍

```jsx
const ellipse = (x, y, a, b, startAngle, endAngle, ctx) => {
  const r = (a > b) ? b : a
  const scaleX = a / r
  const scaleY = b / r

  ctx.save()
  ctx.beginPath()
  ctx.scale(scaleX, scaleY)
  ctx.arc(x / scaleX, y / scaleY, r, startAngle, endAngle)
  ctx.stroke()
  ctx.restore()
}

ellipse(150, 100, 100, 50, 0, 2 * PI, ctx)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/27.html" height="220"></iframe>

我们调用了 `scale()` 方法来对接下来的绘制进行缩放，它接收两个参数，分别表示对横向与纵向的缩放。因为我们只有在绘制椭圆时才对画布进行缩放，而之后的绘制是不需要对画布进行缩放的，所以我们在绘制椭圆前调用 `save()` 方法来保存之前画布的绘图状态，在绘制完椭圆后调用 `restore()` 来绘制椭圆的状态。

***Canvas*** 也为我们提供了绘制椭圆的方法 `ellipse(x, y, a, b, rotation, startAngle, endAngle, anticlockwise = false)` ，除了 `rotation` 这个参数之前没有见过，其它参数都已经见过了，`rotation` 表示对椭圆进行旋转多少度，单位也是弧度

```jsx
const { PI } = Math
ctx.ellipse(150, 150, 100, 50, PI / 2, 0, 2 * PI)
ctx.stroke()
```

### 贝塞尔曲线

对于一般的曲线的绘制，如果你知道曲线的参数方程的话，那么可以使用直线来模拟曲线，当间隔取的比较小的时候，曲线可以认为是光滑的。

在 ***Canvas*** 中我们一般使用贝塞尔曲线来绘制一条曲线，通过起点，终点和多个控制点即可控制一条贝塞尔曲线的生成，根据控制点的多少可分为一阶贝塞尔曲线，二阶贝塞尔曲线，三阶贝塞尔曲线等等。一阶贝塞尔曲线没有控制点，它是连接起点和终点的一条直线；二阶贝塞尔有一个控制点，三阶贝塞尔曲线有两个控制点，依次类推，$n$ 阶贝塞尔曲线有 $n - 1$ 个控制点。

在实际中最常用的是二阶贝塞尔函数与三阶贝塞尔函数，它们的曲线方程为：

- 二阶贝塞尔曲线：$P = (1 - t)^2P_1 + 2 (1 - t)tP_2 + t^2P_3$
- 三阶贝塞尔曲线：$P = (1 - t)^3 P_1 + 3(1 - t)^2tP_2 + 3(1 - t)t^2P_3 + t^3P_4$

其中第一个点和最后一个点分别为起点和终点，参数 $t$ 的取值区间为 $[0, 1]$。

因为知道贝塞尔曲线的方程，因此可以使用直线来模拟曲线

```jsx
const quadraticCurveTo = (x1, y1, x2, y2, x3, y3, ctx) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  for (let t = 0; t <= 1; t += 0.01) {
      const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * x2 + t * t * x3
      const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * y2 + t * t * y3
      ctx.lineTo(x, y)
  }
  ctx.stroke()
}
quadraticCurveTo(100, 100, 150, 50, 200, 100, ctx)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/28.html" height="160"></iframe>

```jsx
const bezierCurveTo = (x1, y1, x2, y2, x3, y3, x4, y4, ctx) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  for (let t = 0; t <= 1; t += 0.01) {
      const x = Math.pow(1 - t, 3) * x1 +
                3 * Math.pow(1 - t, 2) * t * x2 +
                3 *  (1 - t) * Math.pow(t, 2) * x3 +
	              Math.pow(t, 3) * x4
      const y = Math.pow(1 - t, 3) * y1 +
                3 * Math.pow(1 - t, 2) * t * y2 +
                3 * (1 - t) * Math.pow(t, 2) * y3 +
                Math.pow(t, 3) * y4
      ctx.lineTo(x, y)
  }
  ctx.stroke()
}
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/29.html" height="220"></iframe>

***Canvas*** 也有提供 API 来绘制二阶贝塞尔曲线与三阶贝塞尔曲线，方法签名如下

- `quadraticCurveTo(cx, cy, x, y)`
    - `(cx, cy)`：控制点
    - `(x, y)`：终点
- `bezierCurveTo(cx1, cy1, cx2, cy2, x, y)`
    - `(cx1, cy1), (cx2, cy2)`：控制点
    - `(x, y)`：终点

上面的两个贝塞尔函数都不需要传入起点坐标，默认将当前笔所在的位置作为起点

```jsx
ctx.beginPath()
ctx.moveTo(100, 100)
ctx.strokeStyle = 'red'
ctx.quadraticCurveTo(150, 50, 200, 100)
ctx.stroke()
```

```jsx
ctx.beginPath()
ctx.moveTo(50, 200)
ctx.strokeStyle = 'green'
ctx.bezierCurveTo(100, 250, 150, 200, 200, 250)
ctx.stroke()
```

贝塞尔曲线有一个特点，起点与第一个控制点形成的直线与曲线相切，终点与最后一个控制点形成的直接与曲线相切。

下面我们考虑使用三阶贝塞尔函数来模拟一段角度为 $\theta$ 的圆弧

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/circle.6rxj0mekx1o0.svg" alt="circle.svg"  />

三阶贝塞尔函数有两个控制点，由于贝塞尔函数的性质，控制点与起点、终点的连线与曲线相切，所以可以确定两个控制点所在的直线，由于圆弧的对称性，两个控制点与起点和终点之间的距离应该相等，我们记为 $h$，所以此时贝塞尔曲线有一个参数 $h$ 来确定，我们现在需要计算出 h 为多少时，贝塞尔曲线模拟出的圆弧与实际的圆弧误差最小。这里直接给出结果，当

$$
h = \frac{4(1 - \cos\dfrac{\theta}{2})}{3 \sin \dfrac{\theta}{2}} r
$$

此时绘制出的贝塞尔曲线与实际的圆弧误差最小，假设圆心坐标为 $(0, 0)$，圆的半径为 $r$，相应的我们可以得出两个控制点的坐标为

$$
\begin{cases}
x_1 = r \\
y_1 = r - h \\
x_2 = \sqrt{h^2 + r^2}\cos (\theta - \arctan\dfrac{h}{r}) \\
y_2 = \sqrt{h^2 + r^2}\sin (\theta - \arctan\dfrac{h}{r})
\end{cases}
$$


```jsx
const { cos, sin, atan: arctan, sqrt, PI } = Math

const x = 100, y = 100, r = 50
const theta = PI / 3
const h = 4 * (1 - cos(theta / 2)) / (3 * sin(theta / 2)) * r
const phi = arctan(h / r)

const x1 = x + r, y1 = y - h
const x2 = x + sqrt(r * r + h * h) * cos(theta - phi), y2 = y - sqrt(r * r + h * h) * sin(theta - phi)

// 绘制贝塞尔曲线上的点
ctx.fillStyle = '#45b787'
ctx.fillRect(x + r, y, 5, 5)
ctx.fillRect(x1, y1, 5, 5)
ctx.fillRect(x2, y2, 5, 5)
ctx.fillRect(x + r * cos(theta), y - r * sin(theta), 5, 5)

// 绘制贝塞尔曲线
ctx.beginPath()
ctx.moveTo(x + r, y)
ctx.bezierCurveTo(x1, y1, x2, y2, x + r * cos(theta), y - r * sin(theta))
ctx.strokeStyle = '#e16723'
ctx.lineWidth = 3
ctx.stroke()

// 绘制一个真正的圆
ctx.beginPath()
ctx.strokeStyle = '#2b312c'
ctx.lineWidth = 1
ctx.arc(100, 100, 50, 0, 2 * Math.PI)
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/30.html" height="200"></iframe>

可见模拟出的圆弧与真正的圆弧十分的接近。

## 绘制形状

形状可以看做是首尾连接的路径，例如三角形，矩形，圆，我们可以通过将线条依次连接来绘制出形状。

### 三角形

只要知道三角形的三个顶点的坐标我们就可以通过直线将它们连接起来

```jsx
ctx.beginPath();
ctx.moveTo(50, 50)
ctx.lineTo(150, 50)
ctx.lineTo(150, 150)
ctx.closePath();
ctx.stroke()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/31.html" height="210"></iframe>

通过 `fill()` 方法我们可以填充形状，通过 `fillStyle` 可以设置填充的样式，其取值同 `strokeStyle`

```jsx
ctx.beginPath();
ctx.moveTo(50, 50)
ctx.lineTo(150, 50)
ctx.closePath();
ctx.fillStyle = '#1a66ff'
ctx.fill()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/32.html" height="210"></iframe>

当我们调用 `fill()` 方法时，如果路径没有闭合，那么会自动的调用 `closePath()` 方法将其闭合。

### 矩形

同理在知道矩形四个顶点的情况下我们也可以通过直线将四个顶点连接起来从而绘制一个矩形

```jsx
ctx.beginPath();
ctx.moveTo(100, 100)
ctx.lineTo(200, 100)
ctx.lineTo(200, 200)
ctx.lineTo(100, 200)
ctx.closePath();
ctx.fillStyle = '#a7535a'
ctx.fill()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/33.html" height="210"></iframe>

通过 ***Canvas*** 提供的 `rect(x, y, width, height)` 方法也可以绘制一个矩形，其中 `(x, y)` 表示矩形左上角的坐标，`width` 和 `height` 分别表示矩形的宽度和长度

```jsx
ctx.rect(100, 100, 200, 100)

ctx.strokeStyle = '#69a794'
ctx.lineWidth = 5
ctx.stroke()

ctx.fillStyle = '#126bae'
ctx.fill()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/34.html" height="210"></iframe>

调用 `rect()` 方法后只是将路径信息保存在上下文中，并不会将画布上绘制出矩形，必须调用 `stroke()` 或者 `fill()` 才会绘制。

通过 `strokeRect(x, y, width, height)` 可以在画布上绘制出一个矩形，其参数意义同上，矩形的边的样式由 `strokeStyle`，`lineWidth` 等等决定，同样这些样式的设置要放在调用 `strokeRect()` 方法之前

```jsx
ctx.strokeStyle = '#126bae'
ctx.lineWidth = 5
ctx.strokeRect(50, 50, 100, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/35.html" height="210"></iframe>

通过 `fillRect(x, y, width, height)` 可以填充一个矩形，方法接受的参数意义同上，填充的样式由 `fillStyle` 决定

```jsx
const rg = ctx.createRadialGradient(50, 50, 0, 50, 50, Math.sqrt(2) * 200);
rg.addColorStop(0, '#12c2e9')
rg.addColorStop(0.5,  '#c471ed')
rg.addColorStop(1, '#f64f59')

ctx.fillStyle = rg

ctx.fillRect(50, 50, 200, 200)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/36.html" height="310"></iframe>

通过 `clearRect(x, y, width, height)` 可以清除画布上的一块矩形区域

```jsx
ctx.rect(50, 50, 150, 150)
ctx.fill()
ctx.clearRect(100, 100, 50, 50)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/37.html" height="250"></iframe>

### 绘制星星

星星可以看做是按照如下顺序依次连接起来的

<iframe src="https://lastknightcoder.github.io/canvas-demos/38.html" height="300"></iframe>

```jsx
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const { cos, sin, PI } = Math

const angleToRad = angle => angle * PI / 180

const x = 150
const y = 150

const r = 35
const R = 100

ctx.beginPath()
ctx.moveTo(x + r * cos(angleToRad(18)), y + r * sin(angleToRad(18)))

for (let i = 0; i< 5; i++) {
  ctx.lineTo(x + r * cos(angleToRad(18 + i * 72)), y + r * sin(angleToRad(18 + i * 72)))
  ctx.lineTo(x + R * cos(angleToRad(54 + i * 72)), y + R * sin(angleToRad(54 + i * 72)))
}

ctx.closePath();
ctx.stroke()
```

## 绘制文字

***Canvas*** 提供两种绘制文字的方法

- `strokeText(text, x, y[, maxLength])` ：绘制文字的边框
- `fillText(text, x, y[, maxLength])` ：填充文字

上面两个方法都接收四个参数，第一个参数 `text` 表示绘制的文字，第二个参数与第三个参数 `(x, y)` 表示文字的坐标，默认设置的是文字左下角的坐标(不准确，后面会解释)，第四个可选参数表示文本的最大长度，如果文本长度超过该长度，则文本会被压缩。我们可以通过 `font` 属性来设置文本的样式，起取值同 `CSS` 中 `font` 的取值

```jsx
const text = 'Hello World'

ctx.strokeStyle = '#66c18c'
ctx.fillStyle = '#29b7cb'
ctx.font = '50px "Merriweather"'

ctx.strokeText(text, 100, 100)
ctx.fillText(text, 100, 200)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/39.html" height="260"></iframe>

```jsx
ctx.fillStyle = '#66c18c'
ctx.font = '40px Merriweather'

const text = 'Hello World!'
// 未规定最大长度
ctx.fillText(text, 50, 50)
// 规定最大长度为 150
ctx.fillText(text, 50, 100, 150)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/40.html" height="160"></iframe>

其实 `(x, y)` 其具体坐标的含义与 `textAlign` 与 `textBaseline` 有关。

`textAlign` 表示文本对齐方式，其取值有

- `start`：默认值，起点对齐，对于 `ltr` 模式的文字就是左对齐，对于 `rtl` 模式的文字就是右对齐
- `end`：终点对齐，同上
- `center`：居中对齐
- `left`：左对齐
- `right`：右对齐

`textBaseline` 用来设置文本的基线，其取值包括：

- `alphabetic`：默认值，文本的基线就是字母的基线
- `top`
- `bottom`
- `middle`
- `hanging`
- `ideographic`

例如 `textAlign` 设置为 `center`，`x` 就表示文字中心的坐标，如果设置为 `start`，`x` 就表示文字起点的坐标；同理 `y` 的含义与 `textBaseline` 的值有关，例如 `textBasline` 设置为 `top`，`y` 就表示文字顶部的坐标。

```jsx
// 画一条垂直的线，表示文字的 align
ctx.beginPath()
ctx.lineWidth = 1
ctx.strokeStyle = '#74787a'
ctx.moveTo(400, 0)
ctx.lineTo(400, 400)
ctx.stroke()

const text = 'Hello World'
ctx.font = '40px "Merriweather"'
ctx.fillStyle = '#66c18c'

ctx.textAlign = 'start'
ctx.fillText(text, 400, 100)

ctx.textAlign = 'end'
ctx.fillText(text, 400, 150)

ctx.textAlign = 'center'
ctx.fillText(text, 400, 200)

ctx.textAlign = 'left'
ctx.fillText(text, 400, 250)

ctx.textAlign = 'right'
ctx.fillText(text, 400, 300)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/41.html" height="400"></iframe>

```jsx
// 画一条水平的线，表示文字的 baseline
ctx.beginPath()
ctx.lineWidth = 1
ctx.strokeStyle = '#74787a'
ctx.moveTo(0, 100)
ctx.lineTo(1000, 100)
ctx.stroke()

const text = 'Hello World'
ctx.font = '20px "Merriweather"'
ctx.fillStyle = '#66c18c'

ctx.textBaseline = 'top'
ctx.fillText(text, 100, 100)

ctx.textBaseline = 'middle'
ctx.fillText(text, 250, 100)

ctx.textBaseline = 'bottom'
ctx.fillText(text, 400, 100)

ctx.textBaseline = 'alphabetic'
ctx.fillText(text, 550, 100)

ctx.textBaseline = 'ideographic'
ctx.fillText(text, 700, 100)

ctx.textBaseline = 'hanging'
ctx.fillText(text, 850, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/42.html" height="220"></iframe>

通过 `measureText(text)` 可以测出文本大小，该方法返回的是一个 [TextMetrics](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) 对象，该对象包含一个 `width` 属性，表示文本的长度

```jsx
const text = 'Hello World!'
ctx.font = '40px "Merriweather"'

const textMetrics = ctx.measureText(text)
console.log(textMetrics.width); // 236.11993408203125
```

通过 `direction` 可以改变文本的方向，其取值如下

- `inherit`：默认值，继承至 ***Canvas*** 元素或者 ***Document*** 文档
- `ltr`：从左至右
- `rtl`：从右至左

```jsx
ctx.fillStyle = '#66c18c'
ctx.font = '40px Merriweather'

const text = 'I Love You!'

ctx.direction = 'ltr'
ctx.fillText(text, 250, 100)

ctx.direction = 'rtl'
ctx.fillText(text, 250, 200)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/43.html" height="250"></iframe>

## 图像

### drawImage

通过 `drawImage()` 方法可以在 ***Canvas*** 上绘制图像， `drawImage()` 有三种用法

- `drawImage(img, x, y)`
- `drawImage(img, x, y, w, h)`
- `drawImage(img, sx, sy, sw, sh, x, y, w, h)`

先介绍 `drawImage(img, x, y)` ，其中 `img` 为 `HTMLImageElement` 对象或者 ***Canvas*** 对象，`(x, y)` 表示图像**左上角**在 ***Canvas*** 中的坐标

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/car.i5wyhci5g6w.jpeg" alt="car.jpeg" style="zoom:50%;" />

```jsx
const img = new Image()
img.addEventListener('load', () => {
  ctx.drawImage(img, 0, 0)
})
img.src = './car.jpeg'
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/44.html" height="510"></iframe>

上面我们将一个 $2800 \times 1574$  的图片放在了 $700 \times 500$ 的 ***Canvas*** 中，图像的起点为 `(0, 0)`，图片只显示了一部分，如果我们希望全部显示图片就得指定图片的大小，这个时候就得使用 `drawImage(img, x, y, w, h)` ，其中新增的 `w` 和 `h` 表示放置在 ***Canvas*** 中图片的大小

```jsx
const img = new Image()
img.addEventListener('load', () => {
  const width = img.width
  const height = img.height
  const ratio = width / height;

  ctx.drawImage(img, 0, 0, 700, 700 / ratio)
})
img.src = './car.jpeg'
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/45.html" height="410"></iframe>

`drawImage(img, sx, sy, sw, sh, x, y, w, h)` 的最后一种用法与裁剪有关，其中 `(sx, sy)` 表示裁剪的起点，`sw` 与 `sh` 表示裁剪的区域，接着将裁剪后的图片放置在起点为 `(x, y)` 处，并设置其大小 `w` 和 `h` ，举个🌰

```jsx
drawImage(img, 100, 100, 100, 100, 0, 0, 200, 200)
```

首先裁剪图片 `img` 起点为 `(100, 100)`，大小为 $100 \times 100$ 的区域，接着将裁剪得到的图像放在起点为 `(0, 0)`，大小为 $200 \times 200$ 的区域中。

对于上面那副  $2800 \times 1574$  的图像，我想裁剪它右上角那四分之一的区域，然后将其放在 ***Canvas*** 的上部分区域，代码如下编写

```jsx
const img = new Image()
img.addEventListener('load', () => {
  const width = img.width
  const height = img.height
  const ratio = width / height;

  // 源图像右上角的起点为 (1400, 0)，大小为 (1400, 1400 / ratio)
  // Canvas上部分的起点为 (0, 0)，要等比放下图片，则其大小设置为 (500, 500 / ratio)
  ctx.drawImage(img, 1400, 0, 1400, 1400 / ratio, 0, 0, 700, 700 / ratio)
})
img.src = './car.jpeg'
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/46.html" height="420"></iframe>

`drawImage` 还可以接受 `canvas`对象作为参数，我们可以通过绘制 `canvas` 对象在画布上为图片添加水印

```jsx
const watermark = document.createElement('canvas')
const watermarkCtx = watermark.getContext('2d')
watermark.width = 120
watermark.height = 60

const text = '== 熊滔 =='
watermarkCtx.fillStyle = 'rgba(204, 204, 214, 0.8)'
watermarkCtx.font = 'bold 20px 楷体-简'
watermarkCtx.fillText(text, 0, 40)

const img = new Image()
img.addEventListener('load', () => {
  const width = img.width
  const height = img.height
  const ratio = width / height
  ctx.drawImage(img, 0, 0, canvas.width, canvas.width / ratio)
  ctx.drawImage(watermark, canvas.width - watermark.width, canvas.width / ratio - watermark.height, watermark.width, watermark.height)
})
img.src = './car.jpeg'
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/47.html" height="420"></iframe>

### getImageData、putImageData

通过 `getImageData(x, y, w, h)` 方法可以获得画布某一区域的像素数据，返回的对象中的 `data` 属性保存着所有的像素信息，它是一个一维数组。因为对于画布上的每一像素点都有四个通道，分别代表 `rgba`，`data` 数组使用连续的四个元素表示四个通道的值，例如 `data[0]` 表示第一个像素 `r` 通道的值，`data[1]` 表示 `g` 通道的值，`data[2]` 表示 `b` 通道的值，`data[3]` 表示 `alpha` 通道的值，`data[4]` 表示第二个像素 `r` 通道的值 ... ...

```jsx
const img = new Image()
img.addEventListener('load', () => {
  const width = img.width
  const height = img.height
  const ratio = width / height

  ctx.drawImage(img, 0, 0, 500, 500 / ratio)

  const { data } = ctx.getImageData(0, 0, 500, 500 / ratio)

  const channel = {
    red: [],
    green: [],
    blue: [],
    alpha: []
  }
  for (let  i = 0; i < data.length; i += 4) {
    channel.red.push(data[i])
    channel.green.push(data[i + 1])
    channel.blue.push(data[i + 2])
    channel.alpha.push(data[i + 3])
  }

  console.log(channel);
})

img.src = './car.jpeg'
```

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/Untitled.112zoco5ob1s.png" alt="Untitled" style="zoom:50%;" />

`putImage(imageData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight)` 可以将 `imageData` 表示的图像重新绘制在 Canvas 中，其中 `(x, y)` 表示图像放置在画布中的坐标(左上角)， 接着将图像中 `(dirtyX, dirtyY, dirtyWidth, dirtyHeight)` 表示的矩形区域显示在画布中

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/imagedata.3i5kifc1n9u0.svg" alt="imagedata.svg"  />

```jsx
ctx.fillStyle='#E2C17C';
ctx.fillRect(0, 0, 300, 200)

ctx.fillStyle = '#FC7930'
ctx.fillRect(100, 100, 200, 100)

const imageData = ctx.getImageData(0, 0, 300, 200)

ctx.putImageData(imageData, 300, 200, 100, 100, 200, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/49.html" height="270"></iframe>

### 滤镜

有了读取像素数据的能力，我们便可以对图像进行像素级的操纵，例如为其添加滤镜，下面演示几个例子。

灰度滤镜：根据图像学的知识，将 `rgb` 三个通道的值同时设置为 `0.3r + 0.59g + 0.11b` 即可得到一幅灰度图像

```jsx
const img = new Image()
img.addEventListener('load', () => {
  const width = img.width
  const height = img.height
  const ratio = width / height
  ctx.drawImage(img, 0, 0, canvas.width, canvas.width / ratio)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.width / ratio)
  const { data } = imageData

  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]
    data[i] = gray
    data[i + 1] = gray
    data[i + 2] = gray
  }

  ctx.putImageData(imageData, 0, 0)
})
img.src = './car.jpeg'
```

你可以狠狠点击[这里](https://lastknightcoder.github.io/canvas-demos/50.html)进行查看。

黑白滤镜：在求得灰度值的基础上，灰度值大于指定阈值的像素值设置为 255，否则设置为 0

```jsx
	
for (let i = 0; i < data.length; i += 4) {
  const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]
  if (gray > 255 / 2) {
    data[i] = 255
    data[i + 1] = 255
    data[i + 2] = 255
  } else {
    data[i] = 0
    data[i + 1] = 0
    data[i + 2] = 0
  }
}
```

你可以狠狠点击[这里](https://lastknightcoder.github.io/canvas-demos/51.html)进行查看。

反转滤镜：对于 `rgb` 三个通道，其值设置为 255 减去当前通道值，可以得到底片风格的滤镜

```jsx
for (let i = 0; i < data.length; i += 4) {
  data[i] = 255 - data[i]
  data[i + 1] = 255 - data[i + 1]
  data[i + 2] = 255 - data[i + 2]  
}
```

你可以狠狠点击[这里](https://lastknightcoder.github.io/canvas-demos/52.html)进行查看。

模糊滤镜：当前点像素值为周围几个点像素值的平均值，例如周围 8 个点的平均值

```jsx
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.width / ratio)
const { data } = imageData
const originalData = [...data]

for (let i = 1; i < canvas.width / ratio - 1; i++) {
	for (let j = 1; j < canvas.width - 1; j++) {
	  let sr = 0
	  let sg = 0
	  let sb = 0
	  for (let m = i - 1; m <= i + 1; m++) {
	    for (let n = j - 1; n <= j + 1; n++) {
	      const p = m * canvas.width + n
	      sr += originalData[p * 4 + 0]
	      sg += originalData[p * 4 + 1]
	      sb += originalData[p * 4 + 2]
	    }
	  }
	  const p = i * canvas.width + j
	  data[p * 4 + 0] = sr / 9
	  data[p * 4 + 1] = sg / 9
	  data[p * 4 + 2] = sb / 9
	}
}
```

你可以狠狠点击[这里](https://lastknightcoder.github.io/canvas-demos/53.html)进行查看。

上面我们取了周围一层的点，取的点越多，模糊效果越强，我们可以定义模糊半径，表示取周围多少层的点，例如上面取周围一层的点，模糊半径就为 1

```jsx
const blurRadius = 3
const area = (2 * blurRadius + 1) * (2 * blurRadius + 1)
for (let i = blurRadius; i < canvas.width / ratio - blurRadius; i++) {
  for (let j = blurRadius; j < canvas.width - blurRadius; j++) {
    let sr = 0, sg = 0, sb = 0
    for (let m = i - blurRadius; m <= i + blurRadius; m++) {
      for (let n = j - blurRadius; n <= j + blurRadius; n++) {
        const p = m * canvas.width + n
        sr += originalData[p * 4 + 0]
        sg += originalData[p * 4 + 1]
        sb += originalData[p * 4 + 2]
      }
    }

    const p = i * canvas.width + j    
    data[p * 4 + 0] = sr / area
    data[p * 4 + 1] = sg / area
    data[p * 4 + 2] = sb / area
  }
}
```

你可以狠狠点击[这里](https://lastknightcoder.github.io/canvas-demos/54.html)进行查看。

马赛克：上面模糊滤镜是指当前像素取周围区域像素的平均值，而马赛克是某个区域的所有像素取该区域像素的平均值，同上区域的大小可以使用一个变量进行控制

```jsx
const size = 14
const area = size * size
for (let i = 0; i < canvas.width / ratio; i += size) {
  for (let j = 0; j < canvas.width; j += size) {
    let sr = 0, sg = 0, sb = 0
    for (let m = i; m < i + size; m++) {
      for (let n = j; n < j + size; n++) {
        const p = m * canvas.width + n
        sr += originalData[p * 4 + 0]
        sg += originalData[p * 4 + 1]
        sb += originalData[p * 4 + 2]
      }
    }
    sr = sr / area
    sg = sg / area
    sb = sb / area
    for (let m = i; m < i + size; m++) {
      for (let n = j; n < j + size; n++) {
        const p = m * canvas.width + n
        data[p * 4 + 0] = sr
        data[p * 4 + 1] = sg
        data[p * 4 + 2] = sb
      }
    }
  }
}
```

你可以狠狠点击[这里](https://lastknightcoder.github.io/canvas-demos/55.html)进行查看。

### createImageData

除了通过 `getImageData` 从画布中拿到数据，还可以通过 `createImageData(width, height)` 创建 `ImageData`，接受 `width` 和 `height` 分别代表创建的图像的宽和高，默认所有像素的四个通道的值都为 0

```jsx
const imageData = ctx.createImageData(100, 100)
const { data } = imageData

for (let i = 3; i < data.length; i += 4) {
  // 透明度通道
  data[i] = 127
}

ctx.putImageData(imageData, 0, 0, 0, 0, 100, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/56.html" height="150"></iframe>

### toDataURL

通过 `canvas` 对象的 `toDataURL(type)` 方法，可以将画布转化为图片，其中 `type` 指定图片的类型，默认为 `image/png`

```jsx
ctx.fillRect(0, 0, 200, 100)

const canvasToPNG = canvas => {
  return new Promise(resolve => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve(img)
    })
    img.src = canvas.toDataURL('image/png')
  })
}

canvasToImage(canvas).then(img => {
  document.body.appendChild(img)
})
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/57.html" height="150"></iframe>

当 `toDataURL` 的一个参数 `image/jpeg` `image/webp` 等可压缩的图片时，可以传入第二个数字参数表示压缩的质量，质量位于 `0-1` 之间，当不传入时，默认值为 **0.92**

```jsx
canvas.toDataURL('image/jpeg', 0.8)
```

下面给出将 Canvas 转化为图片并进行下载的代码

```jsx
const downLoadCanvas = (canvas, filename = 'download') => {
  const a = document.createElement('a')
  a.download = `${filename}.png`
  a.href = canvas.toDataURL('image/png')
  a.click()
}
```

### toBlob

通过`toBlob(callback, type, quality)` 方法可以将 `canvas` 对象转化为 ***Blob*** 对象，该方法接收三个参数，第一个参数为回调函数，***Blob*** 对象会作为参数传递给改函数，`type` 指定转换的图片类型，可以为 `image/png image/jpeg image.webp` ，可以通过第三个参数 `quality` 指定图片的质量，默认值为 **0.92**

```jsx
const canvasToBlob = (canvas) => {
  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(blob)
    }, 'image/png')
  })
}

(async () => {
  const blob = await canvasToBlob(canvas)
  const url = URL.createObjectURL(blob)
  const img = new Image()
  img.src = url
  document.body.appendChild(img)
})()
```

## 动画

首先动画本质是图像快速的变化，使得我们感觉动起来了，所以制作动画主要分为两步：

- 清除上一幅图像
- 绘制新的图像

另一个需要关注的问题就是什么时候绘制一个新的图像，一般来说我们要求 `1s` 内绘制 60 幅图像，这样我们才不会感觉到卡顿， 一般我们将绘制的时机交给 `requestAnimationFrame`，它会决定在什么时候来决定动画，相比于通过定时器 `setInterval` 或者 `setTimeout` 来进行绘制，`requestAnimationFrame` 能保证稳定的刷新频率。

在这里给出一个简单的小球运动的动画，来了解使用 ***Canvas*** 制作动画的基本流程。首先我们构建一个 `Ball` 类，其中保存了小球所在的位置，小球的半径，填充颜色，运动速度和加速度

```jsx
class Ball {
  constructor(ctx, x, y, r, vx = 0, vy = 0, ax = 0, ay = 0, color = '#1781b5') {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.r = r
    this.vx = vx
    this.vy = vy
    this.ax = ax
    this.ay = ay
    this.color = color
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.save()
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.restore()
  }

  move() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.vx = this.vx + this.ax
    this.vy = this.vy + this.ay
    this.x = this.x + this.vx
    this.y = this.y + this.vy
    this.draw()
		requestAnimationFrame(this.move.bind(this))
  }
}
```

其中 `(x, y)` 表示小球的圆心坐标，`r` 表示小球的直径，`vx` 和 `vy` 分别表示小球在 `x` 方向和 `y` 方向上的速度，而 `ax` 和 `ay` 分别表示小球在 `x` 方向和 `y` 方向上的加速度，`color` 表示小球的填充颜色。

接着写了两个方法，当调用 `draw` 方法时，会在画布上将小球绘制出来，为了不影响画布的绘图状态，在绘制小球之前需要将画布的绘图状态存储起来，然后绘制完小球后再将状态恢复。当调用 `move` 方法时，会根据小球的速度与加速度信息，更新小球的速度以及位置，然后将小球绘制出来，在绘制新的小球之前，需要调用 `clearRect` 将之前绘制的小球清除。为了使得小球不断的运动，在最后我们通过 `requestAnimationFrame(this.move.bind(this))` 不断的调用 `move` 方法。

下面我们创建一个小球对象，并且调用 `move()` 方法使它动起来

```jsx
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// 起始位置 (100, 100)，小球半径 10，初速度 vx=5, vy=0, ax=0, ay=0.5 (平抛运动)
const ball = new Ball(ctx, 100, 100, 10, 5, 0, 0, .5)
requestAnimationFrame(ball.move.bind(ball))
```

小球动起来了，但是小球很快就从画布中出去了，你可以狠狠点击[这里](https://lastknightcoder.github.io/canvas-demos/58.html)进行查看。我们希望当小球到达画布边缘时，有一个碰撞的行为，我们可以在 `move` 方法中进行碰撞检测

```jsx
move() {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height)
  this.vx = this.vx + this.ax
  this.vy = this.vy + this.ay
  this.x = this.x + this.vx
  this.y = this.y + this.vy

	// 当小球与画布下边缘碰撞时，vy 反向，并且速度变为之前的 0.8，vx 的速度也变为之前的 0.8
	// 并更新小球的底部与下边缘相切
  if (this.y + this.r > canvas.height) {
    this.y = canvas.height - this.r
    this.vy = -0.8 * this.vy
    this.vx = 0.8 * this.vx
  }
	// 当来到画布的左右两侧时，vx 的方向发生改变，并且更新小球与边缘相切
  if (this.x + this.r > canvas.width || (this.x - this.r) < 0) {
    this.x = this.x + this.r > canvas.width ? canvas.width - this.r : this.r
    this.vx = -this.vx
  }

  this.draw()
  requestAnimationFrame(this.move.bind(this))
}
```

这时便可以观察到小球的碰撞效果了，你可以狠狠点击[这里](https://lastknightcoder.github.io/canvas-demos/59.html)查看效果。

## 变换

在很多时候我们需要对绘制的对象进行拉伸，旋转，平移等操作，这些操作可以看做是对坐标进行了变换，在数学上的处理是对当前坐标乘以一个矩阵得到一个新的坐标，然后将新坐标表示的点绘制在画布上

$$
\begin{bmatrix}
a_{11} &a_{12} &a_{13} \\
a_{21} &a_{22} &a_{23} \\
a_{31} &a_{32} &a_{33} \\
\end{bmatrix}
\begin{bmatrix}
x \\
y \\
z \\
\end{bmatrix} =
\begin{bmatrix}
nx \\
ny \\
nz \\
\end{bmatrix}
$$

其中等式左边是变换矩阵与当前坐标，右边为变换后的坐标。

上式是对一般三维坐标的变换，但是对于 ***Canvas*** 画布来说它是二维的，也就是说使用一个二阶矩阵即可完成变换，但是对于二维矩阵来说，无法完成平移变换，于是使用三维矩阵，此时 `z` 坐标没有意义，在 ***Canvas*** 中默认的 `z` 坐标的值为默认为 `1` 。

在 ***Canvas*** 中通过 `transform(m11, m12, m21, m22, dx, dy)` 来构建一个如下的变换矩阵

$$
\begin{bmatrix}
m_{11} &m_{12} &dx \\
m_{21} &m_{22} &dy \\
0 &0 &1
\end{bmatrix}
$$

因为 ***Canvas*** 主要还是在二维上进行变换，我们并不对 `z` 坐标进行变换，所以变换矩阵的第三行固定是 $[0 \,\, 0 \,\,  1]$，在列上我们新增了一列来对坐标进行平移变换。

### 缩放

在矩阵中 $m_{11}, m_{22}$ 控制图形的缩放，其中 $m_{11}$表示水平方向上的缩放比率， $m_{22}$ 表示垂直方向上的缩放比率

```jsx
// 水平方向变为一半，垂直方向变为两倍
ctx.transform(0.5, 0, 0, 2, 0, 0)
ctx.fillRect(50, 50, 100, 50)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/60.html" height="320"></iframe>

***Canvas*** 为我们提供了 `scale(m11, m22)` 方法来对图形进行缩放，所以上述变换可以写为

```jsx
ctx.scale(0.5, 2)
```

`scale(m11, m22)` 就相当于 `transform(m11, 0, 0, m22, 0, 0)` 。

### 平移

我们一般是通过 `dx, dy` 来控制图形的平移，其中 `dx` 控制在水平方向上的平移，`dy` 控制在垂直方向上的平移

```jsx
// 水平方向向右移动 100，垂直方向向下平移 50
ctx.transform(1, 0, 0, 1, 100, 50)
ctx.fillRect(50, 50, 100, 50)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/61.html" height="150"></iframe>

不要将 $m_{11}$ 和 $m_{22}$ 设置为 $0$。

***Canvas*** 提供了 `translate(dx, dy)` 来做平移变换，上面的变换可以写为

```jsx
ctx.translate(100, 50)
```

### 旋转

在数学上，逆时针旋转 $\theta$ 角度的变换矩阵为

$$
\begin{bmatrix}
\cos\theta &-\sin\theta \\
\sin\theta &\cos\theta
\end{bmatrix}
$$

要进行顺时针旋转，只需要将上面的 $\theta$ 换为 $-\theta$ 即可得到顺时针旋转的变换矩阵

$$
\begin{bmatrix}
\cos\theta &\sin\theta \\
-\sin\theta &\cos\theta
\end{bmatrix}
$$

```jsx
const { PI, sin, cos } = Math
const theta = PI / 4

ctx.transform(cos(theta), -sin(theta), sin(theta), cos(theta), 0, 0)
ctx.fillRect(200, 200, 100, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/62.html" height="120"></iframe>

***Canvas*** 提供了 `rotate(theta)`  方法对图形进行**顺时针**旋转 `theta` 角度

```jsx
ctx.rotate(PI / 4)
```

**几点注意**：

1. 坐标的变换是相对于 ***Canvas*** 坐标系统的原点而言，而不是相对于图形的左上角，如果希望相对于图形左上角做变换，可以将图形左上角的坐标设置为 `(0, 0)`，然后通过平移变换移动到相应的位置，接着进行相应的变换，这时的变换就相当于是对于图形的左上角进行的

    ```jsx
    const theta = PI / 4
    ctx.transform(cos(theta), -sin(theta), sin(theta), cos(theta), 100, 100)
    ctx.fillRect(0, 0, 100, 100)
    ```

    <iframe src="https://lastknightcoder.github.io/canvas-demos/63.html" height="220"></iframe>

2. 当多次调用 `transform()` 或者 `translate()`，`scale()` ， `rotate()`  等方法时，会和之前的变换进行叠加，也就是说最终的变换矩阵为之前所有变换矩阵的乘积

    ```jsx
    ctx.translate(100, 100)
    // 在之前平移的基础上进行旋转
    ctx.rotate(PI / 4)
    ctx.fillRect(0, 0, 100, 100)
    ```

    <iframe src="https://lastknightcoder.github.io/canvas-demos/63.html" height="220"></iframe>

    并且根据矩阵相乘的性质 $AB \neq BA$，也就是说最后变换的结果与变换的顺序有关，先进行平移后进行旋转与先进行旋转后进行平移，其得到的结果是不同的

    ```jsx
    // 先进行旋转，后进行平移
    ctx.rotate(PI / 4)
    ctx.translate(100, 100)
    ```

    <iframe src="https://lastknightcoder.github.io/canvas-demos/64.html" height="320"></iframe>

### setTransform

当我们通过 `transform` 设置变换矩阵时，它会在之前的变换基础上进行变换，如果希望不在之前的变换基础上进行变换，我们可以使用 `setTransform()` ，它接受的参数同 `transform()`，`setTransform()` 做的事情就是将之前的变换矩阵设置为单位矩阵，然后调用 `transform()` 进行变换

```jsx
ctx.scale(1.5, 1.5)
ctx.fillStyle= '#0eb0c9'
ctx.fillRect(0, 0, 100, 100)

// 设置变换矩阵为单位矩阵，然后进行平移变换，不会受到之前变换的影响
ctx.setTransform(1, 0, 0, 1, 200, 100)
ctx.fillStyle = '#45b787'
ctx.fillRect(0, 0, 100, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/65.html" height="250"></iframe>

## Canvas 高级

### 阴影

***Canvas*** 中的阴影通过下面四个属性进行设置

- `shadowColor` ：阴影颜色
- `shadowOffsetX`：阴影横向偏移
- `shadowOffsetY`：阴影纵向偏移
- `shadowBlur`：阴影模糊

为图形添加阴影

```jsx
ctx.shadowColor = 'rgba(0, 0, 0, .5)'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowBlur = 5

ctx.fillStyle = '#0eb0c9'
ctx.fillRect(100, 100, 200, 200)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/66.html" height="420"></iframe>

为文字添加阴影

```jsx
ctx.shadowColor = 'rgba(0, 0, 0, .5)'
ctx.shadowOffsetX = 5
ctx.shadowOffsetY = 5
ctx.shadowBlur = 5

const text = 'Hello World'
ctx.fillStyle = '#0eb0c9'
ctx.textBaseline = 'middle'
ctx.font = 'bold 50px MerriWeather'
ctx.fillText(text, 100, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/67.html" height="200"></iframe>

### clip

当我们调用 `stroke()` 和 `fill()` 方法时，会根据当前的路径信息进行绘制图形，而当我们调用 `clip()` 方法时，则会根据路径信息形成一个裁剪区域，接下来绘制的图形只能出现在这个裁剪区域中

```jsx
ctx.beginPath()
ctx.arc(250, 250, 100, 0, 2 * Math.PI)
ctx.clip()

const loadImage = (src) => {
  const img = new Image()
  img.addEventListener('load', () => {
    const width = img.width
    const height = img.height
    const ratio = width / height
    ctx.drawImage(img, 0, 0, canvas.width, canvas.width / ratio)
  })
  img.src = src
}

loadImage('./car.jpeg')
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/68.html" height="420"></iframe>

### globalAlpha

 `globalAlpha` 用来设置全局的透明度

```jsx
ctx.globalAlpha = 0.3

ctx.fillStyle = '#12a182'
ctx.fillRect(50, 50, 100, 100)

ctx.fillStyle = 'black'
ctx.fillRect(100, 100, 100, 100)
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/69.html" height="250"></iframe>

### globalCompositeOperation

`globalCompositeOperation` 规定了当两个形状重合时，最终呈现出来的图像是什么样子。它的属性十分的多，默认值为 `source-over` ，表示后面绘制的图像会压住前面的图形，除此之外还有 `destination-over` 表先绘制的图案在上面。

```jsx
const draw = composite => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = composite
  ctx.fillStyle = '#12a182'
  ctx.fillRect(100, 100, 200, 200)
  ctx.fillStyle = '#fed71a'
  ctx.beginPath()
  ctx.arc(300, 200, 100, 0, Math.PI * 2)
  ctx.fill()
}

draw('desination-over')
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/70.html" height="400"></iframe>

> 我们把后绘制的图案称为 `source` ，先绘制的图案称为 `destination` 

通过设置 `globalCompositeOperation` 可以组合出一些奇特的形状，其取值多达 26 种，可以自己写代码体验一番。

### isPointInPath

`isPointInPath(x, y)` 可以判断某个点 `(x, y)` 是否在当前路径形成的区域中，这个 `(x, y)` 是指在 `canvas` 中的坐标。下面会随机绘制 10 个小球，当点击画布时，会检测是否点击的点在小球的路径中，如果在则会改变小球的填充颜色

```jsx
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

class Ball {
  constructor(x, y, r, color = '#29b7cb') {
    this.x = x
    this.y = y
    this.r = r
    this.color = color
  }

  draw(ctx) {
    ctx.save()
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

const balls = []
for (let i = 0; i < 10; i++) {
  balls.push(new Ball(Math.random() * 500, Math.random() * 500, Math.random() * 40 + 10))
  balls[i].draw(ctx)
}

canvas.addEventListener('click', event => {
  const x = event.x - canvas.getBoundingClientRect().left
  const y = event.y - canvas.getBoundingClientRect().top

  console.log(`x: ${x}, y: ${y}`);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i]
    ctx.save()
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
    if (ctx.isPointInPath(x, y)) {
      ctx.fillStyle = '#45b787'
      ctx.fill()
    }
    ctx.restore()
  }
})
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/72.html" height="520"></iframe>

### 非零环绕原则

当我们绘制的路径交叉在一起，形成了多个区域，这个时候应该填充哪些区域呢

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/Canvas-非零环绕.21db9l9zs8rk.svg" alt="Canvas-非零环绕.svg"  />

在一个路径中绘制了两个圆，其中一个圆是顺时针绘制的，一个圆是逆时针绘制的，形成了三个区域，那么当我们调用 `fill()` 方法时，哪些区域应该填充呢？

判断哪些区域应该填充需要使用非零环绕原则，从区域中引一条射线，该射线会与路径相交，如果该射线与路径的方向相同(夹角小于 90 度)，则进行加 1，如果相反则进行减 1，最后如果结果不为 0，则对该区域进行填充，否则不填充

<img src="https://cdn.jsdelivr.net/gh/LastKnightCoder/ImgHosting3@master/Canvas-Page-6.1mebk0fsp934.svg" alt="Canvas-Page-6.svg"  />

从上图看，区域 `1` 引出一条射线，与一条路径相交，该路径的方向与射线的方向相同，因此加 $1$，最终结果不为 $0$，因此区域 `1` 应该被填充。从区域 `2` 引出一条射线，与路径有两个交点，可以看出射线与相交时的路径一个方向相同一个方向相反，因此最终的结果为 $0$，所以区域 `2` 不会被填充；从区域 `3` 引出一条射线，与路径有三个交点，可以看出射线与这三条路径的方向都相反，因此结果为 $-3$，不为零，因此区域 3 会被填充

```jsx
ctx.beginPath()
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.arc(150, 100, 50, 0, Math.PI * 2, true);
ctx.fillStyle = '#894e54'
ctx.fill()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/73.html" height="200"></iframe>

利用非零环绕特性，我们可以实现剪纸效果

```jsx
const drawRectClockwise = (x, y, w, h) => {
  ctx.moveTo(x, y)
  ctx.lineTo(x + w, y)
  ctx.lineTo(x + w, y + h)
  ctx.lineTo(x, y + h)
  ctx.closePath()
}
// 顺时针绘制矩形
drawRectClockwise(50, 50, 320, 300)
// 逆时针绘制的圆
ctx.arc(140, 250, 60, 0, 2 * Math.PI, true)
// 逆时针绘制三角形
ctx.moveTo(280, 200)
ctx.lineTo(220, 300)
ctx.lineTo(340, 300)
ctx.closePath()

ctx.fillStyle = '#2486b9'
ctx.shadowColor = '#d0dfe6'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowBlur = 5
ctx.fill()
```

<iframe src="https://lastknightcoder.github.io/canvas-demos/74.html" height="420"></iframe>

## 参考链接

- [Canvas绘制时钟倒计时动画效果](https://www.imooc.com/learn/133)