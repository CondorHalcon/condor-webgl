import { getCanvas, getWebglContext, createShader, createProgram } from "./webgl.js";

// WebGL
const canvas_id = "webgl-canvas";
const canvas = getCanvas(canvas_id);
const gl = getWebglContext(canvas);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0.9, 0.9, 0.9, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// shader sources
var vertShaderSource = document.getElementById("vert-shader").value;
var fragShaderSource = document.getElementById("frag-shader").value;
// shaders
var vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
var fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);
// program
var program = createProgram(gl, vertShader, fragShader);
gl.useProgram(program);
var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

// Create a buffer for the position attribute
var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
var positions = [
  -1, -1,
  -1, 1,
  1, -1,

  -1, 1,
  1, 1,
  1, -1
];
// Bind the position buffer.
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
gl.enableVertexAttribArray(positionAttributeLocation);
// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 2;          // 2 components per iteration
var type = gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

// Draw call
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 6;
gl.drawArrays(primitiveType, offset, count);