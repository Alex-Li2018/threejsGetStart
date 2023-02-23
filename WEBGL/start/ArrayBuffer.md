# ArrayBuffer

## 前言 

### 储存单位

- bit(比特)电脑是以二进制存储以及发送接收数据的。二进制的一位，就叫做 1 bit。也就是说 bit 的含义就是二进制数中的一个数位，即 “0” 或者 "1"。
- Byte 是字节的英文写法。它的简写为大写字母 “B"。英文字符通常是一个字节，也就是 1B，中文字符通常是两个字节，也就是 2B。字节 Byte 和比特 bit 的换算关系是 1 Byte = 8 bit 。


## 设计目的

这个接口的原始设计目的，与 WebGL 项目有关。所谓 WebGL，就是指浏览器与显卡之间的通信接口，为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本格式传递一个 32 位整数，两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像 C 语言那样，直接操作字节，将 4 个字节的 32 位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。

## 组成对象

- ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

- TypedArray视图：共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图, Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。

- DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，此外还可以自定义字节序。

简单说，ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。

### TypedArray数据类型

TypedArray视图支持的数据类型一共有 9 种（DataView视图支持除Uint8C以外的其他 8 种）。

|数据类型|	字节长度|	含义|	对应的 C 语言类型|数据范围|
|---|---|---|---|---|
|Int8|	1	|8 位带符号整数|	signed char|-128 ~ 127|
|Uint8|	1	|8 位不带符号整数|	unsigned char|0 ~ 256|
|Uint8C|	1	|8 位不带符号整数（自动过滤溢出）|	unsigned char||
|Int16|	2	|16 位带符号整数|	short|0 to 65,536|
|Uint16|	2	|16 位不带符号整数|	unsigned short|-32,768 to 32,767|
|Int32|	4	|32 位带符号整数|	int| -2,147,483,648 to 2,147,483,647 |
|Uint32|	4	|32 位不带符号的整数|	unsigned int|0 to 4,294,967,296|
|Float32|	4	|32 位浮点数|	float| -3.4 × 10^38 to +3.4 × 10^38 |
|Float64|	8	|64 位浮点数|	double|-1.8 × 10^308到+1.8 × 10^308|

## ArrayBuffer 对象

ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。
ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。

```js
// 上面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 0。可以看到，ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。
const buf = new ArrayBuffer(32);
```

### 属性

#### ArrayBuffer.prototype.byteLength
ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度。
```js
const buffer = new ArrayBuffer(32);
buffer.byteLength // 32
```

#### ArrayBuffer.prototype.slice()
ArrayBuffer实例有一个slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。

```js
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);
```
上面代码拷贝buffer对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的ArrayBuffer对象。slice方法其实包含两步，第一步是先分配一段新内存，第二步是将原来那个ArrayBuffer对象拷贝过去。

slice方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。

#### ArrayBuffer.isView()
ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。

```js
const buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer) // false

const v = new Int32Array(buffer);
ArrayBuffer.isView(v) // true
```

## TypedArray 视图

### 构造函数

TypedArray 数组提供 9 种构造函数，用来生成相应类型的数组实例。

构造函数有多种用法。

（1）TypedArray(buffer, byteOffset=0, length?)

同一个ArrayBuffer对象之上，可以根据不同的数据类型，建立多个视图。

```js
// 创建一个8字节的ArrayBuffer
const b = new ArrayBuffer(8);

// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
const v1 = new Int32Array(b);

// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
const v2 = new Uint8Array(b, 2);

// 创建一个指向b的Int16视图，开始于字节2，长度为2
const v3 = new Int16Array(b, 2, 2);
```
上面代码在一段长度为 8 个字节的内存（b）之上，生成了三个视图：v1、v2和v3。

视图的构造函数可以接受三个参数：

第一个参数（必需）：视图对应的底层ArrayBuffer对象。
第二个参数（可选）：视图开始的字节序号，默认从 0 开始。
第三个参数（可选）：视图包含的数据个数，默认直到本段内存区域结束。
因此，v1、v2和v3是重叠的：v1[0]是一个 32 位整数，指向字节 0 ～字节 3；v2[0]是一个 8 位无符号整数，指向字节 2；v3[0]是一个 16 位整数，指向字节 2 ～字节 3。只要任何一个视图对内存有所修改，就会在另外两个视图上反应出来。

注意，byteOffset必须与所要建立的数据类型一致，否则会报错。

```js
const buffer = new ArrayBuffer(8);
const i16 = new Int16Array(buffer, 1);
// Uncaught RangeError: start offset of Int16Array should be a multiple of 2
```
上面代码中，新生成一个 8 个字节的ArrayBuffer对象，然后在这个对象的第一个字节，建立带符号的 16 位整数视图，结果报错。因为，带符号的 16 位整数需要两个字节，所以byteOffset参数必须能够被 2 整除。

如果想从任意字节开始解读ArrayBuffer对象，必须使用DataView视图，因为TypedArray视图只提供 9 种固定的解读格式。

（2）TypedArray(length)

视图还可以不通过ArrayBuffer对象，直接分配内存而生成。
```js
const f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];
```
上面代码生成一个 8 个成员的Float64Array数组（共 64 字节），然后依次对每个成员赋值。这时，视图构造函数的参数就是成员的个数。可以看到，视图数组的赋值操作与普通数组的操作毫无两样。

（3）TypedArray(typedArray)

TypedArray 数组的构造函数，可以接受另一个TypedArray实例作为参数。

```js
const typedArray = new Int8Array(new Uint8Array(4));
```
上面代码中，Int8Array构造函数接受一个Uint8Array实例作为参数。

注意，此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的。新数组会开辟一段新的内存储存数据，不会在原数组的内存之上建立视图。

```js
const x = new Int8Array([1, 1]);
const y = new Int8Array(x);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 1
```
上面代码中，数组y是以数组x为模板而生成的，当x变动的时候，y并没有变动。

如果想基于同一段内存，构造不同的视图，可以采用下面的写法。

```js
const x = new Int8Array([1, 1]);
const y = new Int8Array(x.buffer);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 2
```
（4）TypedArray(arrayLikeObject)

构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。

const typedArray = new Uint8Array([1, 2, 3, 4]);
注意，这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图。

上面代码从一个普通的数组，生成一个 8 位无符号整数的TypedArray实例。

TypedArray 数组也可以转换回普通数组。

```js
const normalArray = [...typedArray];
// or
const normalArray = Array.from(typedArray);
// or
const normalArray = Array.prototype.slice.call(typedArray);
```
