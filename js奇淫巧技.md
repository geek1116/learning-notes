### JS中函数是（主要）基于词法作用域的顶级对象。 词法作用域指 用于搜索标识符的作用域链是由函数声明时所处的位置决定的；如下代码：

```javascript
var a = 2;
function foo() {
	console.log(a);
}
function bar() {
	var a = 3;
	foo();
}
bar();
```

结果是2。 而所谓的动态作用域则是指搜索标识符的过程由调用栈决定。


### 函数的四种调用模式及对应this的值（优先级依次升高）：

- 函数调用：最常见的 仅直接使用函数名执行，this被绑定到全局对象
- 方法调用：作为对象上的方法调用，this值为该对象
- apply/call/binid 调用方式
- 构造器调用：在函数前面使用new关键字，会隐式地创建个连接到该函数的prototype的新对象，并绑定this到该新对象上


### arguments参数列表转数组

```javascript
let args = Array.prototype.slice.apply(arguments);

//ES6语法：
let args = [...arguments];
```


### JS常见的4中内存泄漏：
1. 意外的全局变量
2. 被遗忘的计时器
3. 脱离引用的DOM（dom结点都有parentNode属性）
4. 闭包