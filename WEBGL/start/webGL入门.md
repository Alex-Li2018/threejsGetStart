# webGL入门

## WebGLRenderingContext
WebGLRenderingContext 接口提供基于 OpenGL ES 2.0 的绘图上下文，用于在 HTML <canvas> 元素内绘图。
要获得这个接口的对象以用于 2D 和 3D 的图形渲染，可以通过在 <canvas> 元素上调用 getContext() 函数，调用时传入“webgl”参数：
```js
const canvas = document.getElementById('myCanvas');
const gl = canvas.getContext('webgl');
```
当你获取到 canvas 元素的 WebGL 绘图上下文，你便可以在里面绘图。

### 方法

#### WebGLRenderingContext.clearColor()
WebGL API 的 WebGLRenderingContext.clearColor() 方法用于设置清空颜色缓冲时的颜色值。
这指定调用 clear() 方法时使用的颜色值。这些值在 0 到 1 的范围间。

```js
/**
 * red 一个 GLclampf (en-US) 类型的值，指定清除缓冲时的红色值。默认值：0。
 * green 一个 GLclampf (en-US) 类型的值，指定清除缓冲时的绿色值。默认值：0。
 * blue 一个 GLclampf (en-US) 类型的值，指定清除缓冲时的蓝色值。默认值：0。
 * alpha 一个 GLclampf (en-US) 类型的值，指定清除缓冲时的不透明度。默认值：0。
 */
void gl.clearColor(red, green, blue, alpha);
```

一旦背景颜色被设置后，将会常驻WebGL系统中，在下一次调用gl.clearColor()之前都不会改变。

#### WebGLRenderingContext.clear()
WebGL API 的 WebGLRenderingContext.clear() 方法使用预设值来清空缓冲。
预设值可以使用 clearColor() 、 clearDepth() 或 clearStencil() (en-US) 设置。
裁剪、抖动处理和缓冲写入遮罩会影响 clear() 方法。

```js
/**
 * mask: 一个用于指定需要清除的缓冲区的 GLbitfield (en-US) 。可能的值有：

gl.COLOR_BUFFER_BIT //颜色缓冲区
gl.DEPTH_BUFFER_BIT //深度缓冲区
gl.STENCIL_BUFFER_BIT //模板缓冲区
 */
void gl.clear(mask);
```

#### WebGLRenderingContext.drawArrays()
方法用于从向量数组中绘制图元。

```js

/**
mode
GLenum (en-US) 类型，指定绘制图元的方式，可能值如下。
gl.POINTS: 绘制一系列点。
gl.LINE_STRIP: 绘制一个线条。即，绘制一系列线段，上一点连接下一点。
gl.LINE_LOOP: 绘制一个线圈。即，绘制一系列线段，上一点连接下一点，并且最后一点与第一个点相连。
gl.LINES: 绘制一系列单独线段。每两个点作为端点，线段之间不连接。
gl.TRIANGLE_STRIP：绘制一个三角带。
gl.TRIANGLE_FAN：绘制一个三角扇。
gl.TRIANGLES: 绘制一系列三角形。每三个点作为顶点。

first
GLint (en-US) 类型，指定从哪个点开始绘制。

count
GLsizei (en-US) 类型，指定绘制需要使用到多少个点。
 */
void gl.drawArrays(mode, first, count);
```

#### WebGLRenderingContext.getAttribLocation()
方法返回了给定WebGLProgram对象中某属性的下标指向位置。

```js
/**
 *
参数
program
一个包含了属性参数的WebGLProgram 对象。

name
需要获取下标指向位置的 DOMString 属性参数名

返回值
表明属性位置的下标 GLint (en-US) 数字，如果找不到该属性则返回 -1。
 */
GLint gl.getAttribLocation(program, name);
```

#### WebGLRenderingContext.vertexAttrib[1234]f[v]()
WebGLRenderingContext.vertexAttrib[1234]f[v]() 是 WebGL API 的方法，可以为顶点 attibute 变量赋值。

```js
/**
index
GLuint (en-US) 类型，指定了待修改顶点 attribute 变量的存储位置。

v0, v1, v2, v3  最后一个参数齐次坐标参数
浮点数类型Number，用于设置顶点 attibute 变量的各分量值。

value
Float32Array 类型，用于设置顶点 attibute 变量的向量值。

返回值
无。
 */
void gl.vertexAttrib1f(index, v0);
void gl.vertexAttrib2f(index, v0, v1);
void gl.vertexAttrib3f(index, v0, v1, v2);
void gl.vertexAttrib4f(index, v0, v1, v2, v3);

void gl.vertexAttrib1fv(index, value);
void gl.vertexAttrib2fv(index, value);
void gl.vertexAttrib3fv(index, value);
void gl.vertexAttrib4fv(index, value);

```

## 着色器
 
### Vertex shader 顶点着色器
顶点着色器是用来描述顶点特性（如位置 颜色等）的程序。顶点（vertex）是指二维或三维空间中的一个点，比如二维或三维图形的端点与交点。  
变量释意： gl_position: 点的位置必须赋值否则程序报错； gl_PointSize：点的尺寸如果不赋值默认是1.0。
```js
void main() {
    // Set the vertex coordinates of the point
    // 设置顶点坐标三维 x y z最后一个参数齐次坐标参数
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0); 
    // Set the point size
    // 尺寸是1opx float
    gl_PointSize = 10.0;            
}
```
### Fragment shader 片元着色器
进行逐片元处理过程如光照，片元fragment是webgl中的术语，你可以理解为像素（图像的单元）。片元包括这个像素的位置,颜色等其他信息。

vec4: 表示由4个浮点数组成的矢量

```js
void main() {
    // Set the point color
    // 设置点的颜色
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```
上述的语句是GLSL ES语言，着色器运行在WebGL中而不是javascript中

## webGL坐标系统

坐标系统是笛卡尔坐标系，当你面向屏幕时X轴是水平的（正方向为右），Y轴是垂直的（正方向为下），而Z轴垂直于屏幕（正方向为外）。一般观察者的视角位于原点处。canvas的坐标系统与webGL不同，需要将前者映射到后者。具体如下：

![坐标系](./imgs/%E5%9D%90%E6%A0%87%E7%B3%BB.png)

## WebGL相关函数命名规范

WebGL中的函数命名逻辑遵循OpenGL ES 2.0中的函数名，我们知道后者是前者的基础规范，OpenGL的韩函数名由三个部分组成<基础函数名><参数个数><参数类型>WebGL的函数名使用同样的结构。

```js
gl.vertexAttrib1f

// gl.vertexAttrib基础函数名
// 1 参数个数为1个
// f 表示浮点数 i 表示整数 v 表示数组前面的数字表示数组元素的个数 
```



