# OpenGL ES着色器语言（GLSL ES）

[GLSL_ES_Specification_3.20](https://registry.khronos.org/OpenGL/specs/es/3.2/GLSL_ES_Specification_3.20.pdf)

GLSL ES (OpenGL Shading Language for Embedded Systems)是OpenGL ES平台上使用的着色器语言。它是一种高级着色器语言，用于编写着色器程序，用于控制OpenGL ES渲染管线中的图形渲染和图像处理过程。

GLSL ES可以在移动设备和嵌入式设备等资源受限的环境中运行。它支持着色器的高度可编程性，允许开发人员自定义渲染管线，以实现更高质量的渲染效果和更好的图形性能。

## 注释

与javascript一致

## 数据值类型
GLSL支持两种数据值类型
- 数据值类型： 整形和浮点型
- 布尔值类型： true false
不支持字符串类型

## 变量
- 只包含a-z A-Z 0-9 和下划线_
- 变量名的首字母不能是数字
- 不是是关键字以及保留字段

## 强类型
<类型> <变量名>

## 基本类型
|类型|描述|
|---|---|
|float|单精度浮点型|
|int|整形|
|bool|布尔型|

### 类型转换
|转换|函数|描述|
|---|---|---|
|转换为整型|int(float) / int(bool)|浮点数的小数部分去掉转换为整形, ture 1 false 0|
|转换为浮点型|float(int) / float(bool)|浮点数的小数部分去掉转换为整形, true 1.0 false 0.0|
|转换为布尔值|bool(int) / bool(float)|0.0 false 其他true； 0 false 其他 true|

## 矢量与矩阵

|类别|GLSL ES 数据类型|描述|
|---|---|---|
|矢量|vec2 vec3 vec4</br> ivec2 ivec3 ivec4</br>bvec2 bvec3 bvec4|具有2，3，4个浮点数的元素矢量</br>具有2，3，4个整数的元素矢量</br>具有2，3，4个布尔值的元素矢量|
|矩阵|mat2 mat3 mat4|2 * 2， 3 * 3， 4 * 4的浮点数元素矩阵|

## 赋值与构造

赋值运算的=左右两边的类型必须一致。

### 矢量构造函数
```js
vec4 postion = vec4(1.0, 2.0, 3.0, 4.0)
vec3 v3 = vec3(1.0, 2.0, 3.0)
// 使用v3的前两个分量
vec2 v2 = vec2(v3) // （1.0， 2.0）
vec4 v4 = vec4(1.0) // (1.0, 1.0, 1.0, 1.0)
vec4 v4b = vec4(v2, v4) // (1.0, 2.0, 1.0, 1.0)
```

### 矩阵构造函数
矩阵中的元素按照列主序排列

```js
mat4 m4 = mat4(
    1.0, 2.0, 3.0, 4.0,
    5.0, 6.0, 7.0, 8.0,
    9.0, 10.0, 11.0, 12.0,
    13.0, 14.0, 15.0 16.0
)
```
矩阵如下：
$\begin{bmatrix}
 1.0, 5.0, 9.0, 13.0 \\
 2.0, 6.0, 10.0, 14.0 \\
 3.0, 7.0, 11.0, 15.0 \\
 4.0, 8.0, 12.0, 16.0 \\
 \end{bmatrix} $

 向矩阵中传入一个或多个矢量，按照列主序使用矢量里的元素值来构造矩阵

 ```js
 vec2 v2_1 = (1.0, 3.0)
 vec2 v2_2 = (2.0, 4.0)

 mat2 m2_1 = mat2(v2_1, v2_2)

 vec4 v4 = (1.0, 3.0, 2.0, 4.0)
 mat2 m2_2 = mat2(v4)
 ```
 上述形成的矩阵

 $\begin{bmatrix}
 1.0, 2.0, \\
 3.0, 4.0, \\
 \end{bmatrix} $

向矩阵构造函数中传入单个值，这样将生成一个对角线上元素都是该数值，其他元素为0的矩阵。

```js
mat4 m4 = mat4(1.0)
```
$\begin{bmatrix}
 1.0, 0.0, 0.0, 0.0 \\
 0.0, 1.0, 0.0, 0.0 \\
 0.0, 0.0, 1.0, 0.0 \\
 0.0, 0.0, 0.0, 1.0 \\
 \end{bmatrix} $

### 访问元素

访问运算符是 . 或者 []

#### 点运算符

|类别|描述|
|---|---|
|x,y,z,w|获取顶点坐标|
|r,g,b,a|获取颜色分量|
|s,t,p,q|获取纹理分量|

```js
vec3 v3 = (1.0, 2.0, 3.0)

float f 

f = v3.x // 1.0
f = v3.y // 2.0
f = v3.z // 3.0

f = v3.r // 1.0
f = v3.g // 2.0
f = v3.b // 3.0

f = v3.a 或 f = v3.w 报错
```

混合：从矢量中抽取多个分量的过程

```js
vec2 v2 
v2 = v3.xy
// 可以省略任意分量
v2 = v3.yw
v2 = v3.yy

vec3 v3
v3 = v3.zyx
```

也可以赋值

```js
vec4 position = vec4(1.0, 2.0, 3.0, 4.0)
position.xw = vec2(5.0, 6.0)
// position (5.0,2.0,3.0,6.0)
```

#### []运算符

和js一样0访问矩阵第一列，1可以访问矩阵第二列，2可以访问矩阵第三列

$\begin{bmatrix}
 1.0, 5.0, 9.0, 13.0 \\
 2.0, 6.0, 10.0, 14.0 \\
 3.0, 7.0, 11.0, 15.0 \\
 4.0, 8.0, 12.0, 16.0 \\
 \end{bmatrix} $

```js
mat4 m4 = mat4(
    1.0, 2.0, 3.0, 4.0,
    5.0, 6.0, 7.0, 8.0,
    9.0, 10.0, 11.0, 12.0,
    13.0, 14.0, 15.0 16.0
)

// 矩阵的第一列
vec4 v4 = m4[0] // (1.0, 2.0, 3.0, 4.0)
// 第二列的第三行
float m23 = m4[1][2] // 7.0
// 第三列的第二个元素
folat m32 = m4[2].y // 10.0
```
[]中必须是常量所索引值，定义如下：
- 整形字面量（0 或 1）
- 用const修饰全局变量或局部变量
- 循环索引

```js
const int index = 0
vec4 v4 = m4[index]
vec4 v4 = m4[index + 1]
```

### 运算

#### 矢量与浮点数的运算

- 加法
```js
vec3 v3a = vec2(1.0, 2.0, 3.0)
float f = 1.0
vec3 v3b = v3a + f // (2.0, 3.0, 4.0)
```

- 乘法
```js
vec3 v3a = vec2(1.0, 2.0, 3.0)
float f = 1.0
vec3 v3b = v3a * f // (1.0, 2.0, 3.0)
```

#### 矢量运算

```js
v3c = v3a + v3b

/**
v3a.x + v3b.x
v3a.y + v3b.y
v3a.z + v3b.z
 */
```

#### 矩阵与浮点数的运算

```js
// 相当于矩阵的每一个元素都乘以f
m3b = m3a * f
```

#### 矩阵右乘矢量

```js
mat3 m3a = mat3(
    1.0, 4.0, 7.0,
    2.0, 5.0, 8.0
    3.0, 6.0, 9.0
)
vec3 v3a = vec3(1.0, 2.0, 3.0)
vec3 v3b = m3a * v3a
```
$\begin{bmatrix}
 1.0, 2.0, 3.0 \\
 4.0, 5.0, 6.0 \\
 7.0, 8.0, 9.0 \\
 \end{bmatrix} * \begin{bmatrix}
  1.0 \\
 2.0 \\
 3.0 \\
 \end{bmatrix} = \begin{bmatrix}
 14.0 \\
 32.0 \\
 50.0 \\
 \end{bmatrix}$

#### 矩阵右乘矢量


```js
mat3 m3a = mat3(
    1.0, 4.0, 7.0,
    2.0, 5.0, 8.0
    3.0, 6.0, 9.0
)
vec3 v3a = vec3(1.0, 2.0, 3.0)
vec3 v3b = v3a * m3a
```
$\begin{bmatrix}
  1.0, 2.0, 3.0 \\
 \end{bmatrix} * \begin{bmatrix}
 1.0, 2.0, 3.0 \\
 4.0, 5.0, 6.0 \\
 7.0, 8.0, 9.0 \\
 \end{bmatrix}  = \begin{bmatrix}
 30.0 \\
 36.0 \\
 42.0 \\
 \end{bmatrix}$

 #### 矩阵与矩阵相乘

见矩阵乘法

## 结构体

struct关键字定义结构体

```js 
// 定义结构体与定义变量同时提升
struct light {
    // 光的颜色
    vec4 color
    // 位置
    veec3 position
    // 类型变量 ll
} ll;
```

赋值与构造
结构体有标准的构造函数 其名称与结构体名一致，构造函数的参数顺序必须与结构体定义的顺序一致。

```js
ll = light(vec4(0.0, 1.0, 2.0, 3.0), vec3(1.0, 2.0, 3.0))
```

访问成员

与js对象一致
```js
ll.color
ll.position
```

运算符

只支持赋值 = 和比较  **==** 或 **!=**

## 数组

只支持一维数组，数组对象不支持pop()和push()等操作

```js
// 声明含有4个浮点元素的数组
float floatArray[4]
// 声明含有2个vec4的对象数组
float vec4Array[2]
```

数组的元素不能在声明的时候一次性的初始化，而必须显式的对每个元素进行初始化。

```js
vec4Array[0] = vec4(1.0, 2.0, 3.0, 4.0)
vec4Array[1] = vec4(1.0, 2.0, 3.0, 4.0)
```

## 取样器（纹理）

GLSL ES内置类型。我们必须通过该类型变量访问纹理，有两种基本的取样器类型： sampler2D 和 samplerCube。取样器只能是uniform变量，或者需要访问的纹理函数 如texture2D()

```js
uniform sampler2D u_Sampler
```

mediump是一个精度限定字

|着色器|表示最大数量的内置常量|最小数量|
|---|---|---|
|顶点着色器|const mediump int gl_MaxVertexTextureImageUnits|0|
|片云着色器|const mediump int gl_MaxTextureImageUnits|8|

## 语句和声明

statements and declarations
• function definitions
• selection (if-else and switch-case-default)
• iteration (for, while, and do-while)
• jumps (discard, return, break, and continue)

### 程序流程控制：分支和循环

分支 if-else

```js
if (distance < 0.5) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0)
} else {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0)
}
```

循环语句

```js
for(int i = 0; i < 2; i++) {
    sum += i
}
```

- continue 中止当前循环 跳入下一次循环
- break 中止当前循环 并跳出整个循环
- dicard 放弃当前片元直接处理下一个片元

## 函数

返回类型 函数名(type0 arg0, type1 arg1, type2 arg2) {
    .....
    return 返回值
}

```js
float square(flaot value) {
    return value * value
}

square(2.0)
```

```c
void func1() { }
void func2() { return func1(); } // illegal return statement
```

- **注意递归函数不能出现**
- 规范声明：必须在调用之前声明该函数

### 参数限定词

可以为函数参数指定限定字，以控制参数的行为。可以定位为：1. 传递给函数的 2. 将要在函数中赋值的 3. 既要传递给函数的，也要在函数中被赋值的

|类别|规则|描述|
|---|---|---|
|in|向函数传入值|参数传入函数，可以被修改可以直接使用，修改之后不影响参数|
|const in|向函数传入值|参数传入函数，不能被修改传入变量的引用，可以直接使用|
|out|在函数内部被赋值，并被传出|参数传入函数，修改传入变量的引用，修改之后影响函数外部传入的变量|
|inout|传入函数，同时在函数内部被赋值，并被传出|传入变量的引用，函数会用到变量的初始值，然后修改变量的值。会影响外部传入的变量|
**默认是in**

## 全局变量与局部变量

- 全局变量：可以在程序中的任意位置使用
- 局部变量：只能在有限的某一部分代码中使用

### 存储限定字

- const变量：声明const变量时，需要将const写在类型前。声明的同时必须初始化，声明之后就不能在去更改它的值了
  
```js
const int lightspeed = 299792458
```
- attribute变量：只能出现在顶点着色器中，只能被声明为全局变量，别用来表示逐顶点的信息。attribute的类型只能是float vec2 vec3 vec4 mat2 mat3 mat4

```js
attribute vec4 a_color
attribute float a_color
```
顶点着色器中能容纳的attribute变量的最大数目与设备有关，你可以访问内置的全局变量来获取这个值（最大数目）。但是不管设备配置如何，支持webgl的环境都至少支持8个attribute变量。

- uniform变量：可以用在顶点着色器与片元着色器中，且必须是全局变量。是只读变量，可以是除了数组和结构体之外的任意类型。如果顶点着色器和片元着色器中声明了同名的uniform变量，那么他就会被两种着色器共享。

```js
uniform mat4 n
```

- varying变量：只能是全局变量，任务是从顶点着色器向片元着色器传输数据，我们必须在两种着色器中声明同名同类型的varing变量。类型只能是float vec2 vec3 vec4 mat2 mat3 mat4
  
```js
varying vec2 v 
```

### 精度限定字

目的是为了帮助着色器程序提高运行效率，消减内存开支。用来表示每种数据类型具有的精度。

|精度限定符|描述|默认数值范围和精度|
|---|---|---|---|
|highp|高精度|float （-2^62, 2^62）int (-2^16， 2^16)|
|mediump|中精度|float （-2^14, 2^14）int (-2^10， 2^10)|
|lowp|低精度|float （-2, 2）int (-2^8， 2^8)|

```js
mediump flaot size
```

数据类型的默认精度

## 预处理Preprocessor

```js
#
#define
#undef
#if
#ifdef
#ifndef
#else
#elif
#endif
#error
#pragma
#extension
#line
```
内置的宏

```c
__LINE__
__FILE__
__VERSION__
GL_ES
```

`__LINE__` 将被替换为一个10进制的常量，表示当前源码的行号.
`__FILE__` 将替换一个十进制整数常量，表示当前正在处理哪个源字符串号.
`__VERSION__` will substitute a decimal integer reflecting the version number of the OpenGL ES Shading Language. The version of the shading language described in this document will have `__VERSION__` substitute the decimal integer 320.
`GL_ES` will be defined and set to 1. 

### 常量定义
可以使用#define指令来定义常量。例如：
```c
#define PI 3.1415926
```
在程序中使用时，PI将被替换为3.1415926。

### 函数定义
可以使用#define指令定义一个带参数的宏函数。例如：
```c
#define SQUARE(x) (x * x)
```
在程序中使用时，SQUARE(5)将被替换为(5 * 5)，即25。

### 代码块定义
可以使用#define指令定义一个代码块宏。例如
```c
#define MY_FUNCTION(x) \
    if (x < 0.0) { \
        return 0.0; \
    } else { \
        return x; \
    }
```
在程序中使用时，MY_FUNCTION(-1.0)将被替换为：
```c
if (-1.0 < 0.0) {
    return 0.0;
} else {
    return -1.0;
}
```
注意，代码块宏需要使用反斜杠（\）来表示换行符，否则会出现语法错误。

除了#define指令外，还有一些其他的宏指令可以用来控制预处理器的行为，例如#ifdef、#ifndef、#if、#else和#endif等。这些指令通常用于条件编译和头文件的包含等。
