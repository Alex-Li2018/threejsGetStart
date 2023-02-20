// HelloPoint1.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_position;\n' +
  'void main() {\n' +
  '  gl_Position = a_position;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' +                    // Set the point size
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // 获取attribute变量的存储位置
  var a_position = gl.getAttribLocation(gl.program, 'a_position')

  if (a_position < 0) {
    console.log('failed to get the storage location of a_position')
    return
  }

  // 注册事件
  canvas.onmousedown = function(ev) {
    click(ev, gl, canvas, a_position)
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_point = []
function click(ev, gl, canvas, a_position)  {
    var x = ev.clientX
    var y = ev.clientY
    var rect = ev.target.getBoundingClientRect()
    // 坐标转换
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
    
    g_point.push(x)
    g_point.push(y)

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_point.length;
    for(var i = 0; i < len; i += 2) {
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_position, g_point[i], g_point[i+1], 0.0);

        // Draw
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}