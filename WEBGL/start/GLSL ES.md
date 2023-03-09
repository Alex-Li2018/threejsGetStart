# GLSL ES

## 数据类型

|类型|说明|
|---|---|
|float|浮点数|
|mat[n]|nxn的矩阵类型, 例如：mat4|
|vec[n]|由n个浮点数组成的矢量, 例如 vec4|

## web GL存放这些数据

- 矩阵类型
  javascript没有专门表示矩阵的类型，所以我们用类型化数组Float32Array来存放矩阵的每个元素，问题是矩阵是二维的，数组是一位的我们有两种存储方式：按行主序，按列主序。webGL和Open GL一样是按列主序存储的。例如：
  4x4矩阵
  $
  \begin{bmatrix}
 a, b, c, d \\
 e, f, g, h \\
 i, j, k, l \\
 m, n, o, p \\
 \end{bmatrix}
  $
  Float32Array表示：
  [a,e,i,m, b,f,j,n, c,g,k,o, d,h,l,p]