/**
 * Get a canvas element given its unique id
 *
 * @param {string} canvas_id The HTML id of the canvas to render to.
 * @return the matching canvas element
 */
export function getCanvas(canvas_id) {
  var canvas = document.getElementById(canvas_id);
  if (!canvas || canvas.nodeName !== "CANVAS") {
    console.log('Fatal error: Canvas "' + canvas_id + '" could not be found');
    return null;
  }
  return canvas;
};

/**
 * Get a WebGL context from a canvas
 *
 * @param {HTMLElement} canvas The DOM element that represents the canvas.
 * @return {WebGLRenderingContext|null} The WebGL context for the canvas.
 */
export function getWebglContext(canvas) {
  var context = canvas.getContext('webgl');
  if (!context) {
    console.log("No WebGL context could be found.");
    return null;
  }
  return context;
};

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {GLenum} type 
 * @param {string} source 
 * @returns 
 */
export function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLShader} vertexShader 
 * @param {WebGLShader} fragmentShader 
 */
export function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program)
  return program;
};

