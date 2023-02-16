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

## 着色器
 
### Vertex shader 顶点着色器
顶点着色器是用来描述顶点特性（如位置 颜色等）的程序。顶点（vertex）是指二维或三维空间中的一个点，比如二维或三维图形的端点与交点。  
```js
void main() {
    // Set the vertex coordinates of the point
    // 设置顶点坐标三维 [0， 0，0]
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0); 
    // Set the point size
    // 尺寸是1opx
    gl_PointSize = 10.0;            
}
变量释意： gl_position: 点的位置必须赋值否则程序报错； gl_PointSize：点的尺寸如果不赋值默认是1.0。
```
### Fragment shader 片元着色器
进行逐片元处理过程如光照，片元fragment是webgl中的术语，你可以理解为像素（图像的单元）。
```js
void main() {
    // Set the point color
    // 设置点的颜色
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```
上述的语句是GLSL ES语言，着色器运行在WebGL中而不是javascript中