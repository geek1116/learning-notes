使用max-width代替width可以使元素 不会在窗口变小时出现横向滚动条而是宽度变小以适应窗口大小

当使用inline-block，并使用百分比宽度使元素并排时；可能会由于标签之间的 换行/空格 原因使得块元素间产生间隙而使得不能容纳在同一行

行内元素可以设置水平方向上的margin和padding；但不能设置垂直方向上的。

设为绝对定位的元素是相对于“已定位”的祖先元素，如果该子元素的祖先元素都未设置position那么就是相对于根元素<html>进行定位；所以对于需要绝对定位的子元素一般会给其父元素设position:relative

子元素没有设置定位，其尺寸设置百分比时参照的对象是 该子元素的父级元素；
子元素绝对定位后，其尺寸设置为百分比参考的对象是该子元素设置了定位（这里的定位包括绝对定位，相对定位和固定定位）的祖先元素（一层一层往上找，直到找到定位的祖先元素停止）。若没有找到目标，则参照的是浏览器窗口。

<link>标签加载资源时是并行加载的

### 垂直居中方法：
- 父元素relative，垂直元素absolute;top:0;bottom:0;并设置margin:auto;后会自动计算外边距打到居中
- 垂直元素通过absolute定位并top:50%，然后使用负上外边距的值为自身高度的一半
- flex布局，align-items:center

### 清除浮动：
- 在浮动元素最后添加个空标签并设置clear:botn（这样父元素就可以包裹住所有浮动元素了）
- 给父元素添加clearfix类，即这样实现：
.clearfix:after {
	content: ".";
	display:block;
	clear:both;
	height:0;
	visibility:hidden;
}

### 三列布局

（圣杯布局）左右两列固定宽度，中间自适应的两种方法：
1. 使用绝对定位，左右两列定位到父元素左右边框，中间列根据左右列宽度设置margin
2. 将左右列向左右浮动，中间的块触发BFC。 **但注意中间列在html中要写在左右列之后**

### 轮播图

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        /*使图片自适应容器大小*/
        img {
            width: 100%;
            height: 100%;
        }
        #main {
            width: 730px;
            height: 454px;
            margin: 100px auto;
            position: relative;
        }
        #main .scrolling {
            width: 730px;
            height: 454px;
            position: relative;
            overflow: hidden;
        }
        #main .scrolling img {
            position: absolute;
            left: 0;
            top: 0;
        }
    </style>
</head>
<body>
    <div id="main">
        <div class="scrolling">
            <img src="images/1.jpg"/>
            <img src="images/2.jpg"/>
            <img src="images/3.jpg"/>
        </div>
    </div>
</body>
<script type="text/javascript">
    window.onload = function() {
        //初始化
        let imgs = document.getElementsByTagName("img");
        for(let i=0;i<imgs.length;i++) imgs[i].style.left = "100%";
        //imgs[0].style.left = 0;

        //图片位移函数
        function forward(head,tail) {
            let hl = 0, tl = 100, interval = 2; //interval为每帧的滑动百分比距离；则每秒的帧数即 (100/interval)
            let timer = setInterval(function(){
                hl -= interval;
                tl -= interval;
                imgs[head].style.left = hl + "%";
                imgs[tail].style.left = tl + "%";
                if(tl == 0) {
                    clearInterval(timer);
                }
            }, 1000/(100/interval));
        }

        //设置自动轮播
        function autoForward(head, tail){
            forward(head, tail);
            head = (head == imgs.length-1)?0:head+1;
            tail = (tail == imgs.length-1)?0:tail+1;
            setTimeout(autoForward, 3000, head, tail);
        }

        autoForward(0, 1);
    }
</script>
</html>
```



### 弹出层

```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style type="text/css">
        #prompt {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: gray;
            opacity: 0.7;
            display: none;
			z-index: 0;
        }
        #content {
            width: 400px;
            height: 350px;
            position: absolute;
            background-color: #fff;
            top: 50%;
            left: 50%;
            margin-top: -175px;
            margin-left: -200px;
        }
    </style>
</head>
<body>
    <button id="btn">显示弹出层</button>
    <div id="prompt">
        <div id="content">
            <p>这是弹出层的内容</p>
            <button id="cancel">显示弹出层</button>
        </div>
    </div>
</body>
<script type="text/javascript">
    window.onload = function() {
        document.querySelector("#btn").onclick = function() {
            document.querySelector("#prompt").style.display = "block";
        }
        document.querySelector("#cancel").onclick = function() {
            document.querySelector("#prompt").style.display = "none";
        }
    }
</script>
</html>
```
<br/>

---

**响应式布局等于流动网格布局，而自适应布局等于使用固定分割点来进行布局。**


### 页面自适应屏幕

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
```
首先，在``<head>``中加入上面这条meat让网页的宽度自动适应手机屏幕的宽度。
如下几种自适应方案：

1. 对页面元素使用百分比%来规定宽度。
2. 使用流式布局，即对元素进行浮动，宽度不够时，后面的元素会自动移至下方，不会在水平方向溢出，避免了滚动条的出现。
3. 使用@media媒体查询或者JS来得知屏幕宽度；然后仅需设置根元素html的font-size，页面元素的宽度单位使用rem即可。

*对于图片则应设置百分比宽度或最大百分比宽度来进行缩放处理。*