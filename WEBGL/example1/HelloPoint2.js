// HelloPoint1.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_position;\n' +
  'attribute float a_positionSize;\n' +
  'void main() {\n' +
  '  gl_Position = a_position;\n' + // Set the vertex coordinates of the point
  '  gl_PointSize = a_positionSize;\n' +                    // Set the point size
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
  var a_positionSize = gl.getAttribLocation(gl.program, 'a_positionSize')

  if (a_position < 0) {
    console.log('failed to get the storage location of a_position')
    return
  }

  gl.vertexAttrib3f(a_position, 0.0,0.0,0.0)
  gl.vertexAttrib1f(a_positionSize, 20.0)

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  gl.drawArrays(gl.POINTS, 0, 1);
}