## CSS的BFC

　BFC 即块级格式上下文（Block Formatting Context），它是指一个独立的块级渲染区域，只有block-level的box参与，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。

### BFC的生成
　CSS2.1规定满足一下条件之一就会生成BFC：
1. 根元素
2. float的值不为none
3. overflow的值不为visible
4. position的值为fixed或absolute
5. display的值为table-cell / table-caption / inline-block / flex / inline-flex

### BFC的布局规则
　上面说了，生成BFC的区域会有一套渲染规则来约束块级盒子内的布局；这些约束规则如下：
1. 内部的块级元素会在垂直方向，一个接一个地放置
2. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）
3. 块级元素垂直方向的距离由margin决定。属于同一个BFC的两个相邻的块级元素会发生margin合并，不属于同一个BFC的两个相邻的块级元素不会发生margin合并；
4. BFC的区域不会与float的元素区域重叠
5. 计算BFC的高度时，浮动子元素也参与计算
6. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素；外面的元素也不会影响到容器里面的子元素

<br/>

**说了一通BFC的触发条件和布局规则，初次接触的可能很不容易理解；下面用这些BFC布局规则来举例几个常见的css规则和技巧就很容易明白了~**

---

<br/>
- 第一点与第二点很好理解，就不举例子细述了。
<br/>

---

- 外边距合并是个很常见的问题，即 在垂直方向上的两个相邻块级元素，它们的相邻一侧的外边距会发生合并（重叠），最终它们俩的间距等于较大的那个外边距：

```html
<head>
  <style>
    .bro1{
      width:300px;
      height:200px;
      background:#ddd;

      margin-bottom:30px;
    }
    .bro2{
      width:200px;
      height:100px;
      background:pink;

      margin-top:20px;
    }
  </style>
</head>
<body>
  <div class='bro1'></div>
  <div class='bro2'> </div>
</body>

```
![外边距合并.png](https://i.loli.net/2018/12/23/5c1f57f4e4557.png)

　依据第三点规则：位于同一BFC内的块级元素会发生外边距合并；那么，要解决这个问题，让原先这两个相邻的两个元素不在同一BFC内就可以了。 为其中一个块创建新的BFC：
```html
<head>
  <style>
    .bro1{
      width:300px;
      height:200px;
      background:#ddd;

      margin-bottom:30px;
    }
    .bro2{
      width:200px;
      height:100px;
      background:pink;

      margin-top:20px;
    }
    .special{
      overflow:auto;
    }
  </style>
</head>
<body>
  <div class='special'>
    <div class='bro1'></div>
  </div>
  <div class='bro2'> </div>
</body>
```
效果：
![解决外边距合并.png](https://i.loli.net/2018/12/23/5c1f595cad7f5.png)

<br/>
---
<br/>

- 第四点：BFC的区域不会与float的元素区域重叠。 就算是初学浮动 应该也知道当元素浮动时会脱离文档流，向一边流动直到它的边缘碰到包含框的边缘；因为不在文档流中所以不占空间，在浮动时可以覆盖住别的元素：
![浮动0.png](https://i.loli.net/2018/12/23/5c1f5bd1452c2.png) ![浮动1.png](https://i.loli.net/2018/12/23/5c1f5bd15a128.png)
　利用第四点的约束规则，可以让没有浮动但又不想被覆盖的元素触发BFC，就不会给float的元素覆盖住了。
<br/>

这个规则还可以作为多栏布局的一种实现方式。
```html
<body>
  <div id="main">
		<div class="left"></div>
		<div class="right"></div>
		<div class="center"></div>
	</div>
</body>
```
左右两栏宽度固定，中间栏可以根据浏览器宽度自适应:
![多栏布局.png](https://i.loli.net/2018/12/23/5c1f5d91934b0.png)
<br/>

---
<br/>

- 包含浮动子元素：因为浮动元素脱离文档流，所以父元素的高度是只会由包含的非浮动元素决定。特别是如果父元素中所有的子元素都进行了浮动，那么这个父元素的高度将会为0。
　而要想让父元素包含住浮动元素，就只要让父元素触发BFC就能利用到上面的第六条规则：计算BFC的高度时，浮动子元素也参与计算。　这就是时常用的一个技巧“用overflow:hidden/auto清除包含块内子元素的浮动”的原理。
