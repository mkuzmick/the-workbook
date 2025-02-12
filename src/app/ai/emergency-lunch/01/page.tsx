"use client";
import { useEffect, useRef } from "react";

export default function FireWebGLPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl")!;
    // --- 1. Compile Shaders (vertex and fragment) ---
    const vertexSrc = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = 0.5 * (aPosition + 1.0); // convert quad coords to [0,1] UV
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }`;
    const fragmentSrc = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uPrevFrame;
      uniform vec2 uInjectPos;
      uniform float uTime;
      // (Additional uniforms: velocity field, etc., could be added for a full solver)
      void main() {
        // Sample previous frame (smoke density/heat)
        vec4 prev = texture2D(uPrevFrame, vUv);
        // Advect: move sample upward (buoyancy) to get previous smoke from slightly lower position
        vec2 buoyantUv = vUv - vec2(0.0, 0.002);
        vec4 advected = texture2D(uPrevFrame, buoyantUv);
        // Basic combustion & cooling: fade the advected smoke
        advected.rgb *= 0.98;  // smoke cools/dissipates each frame
        // Inject fire at mouse position (if near the inject position, add red color)
        float dist = distance(vUv, uInjectPos);
        float influence = smoothstep(0.1, 0.0, dist);
        vec4 injectedFire = vec4(1.0, 0.3, 0.0, 1.0) * influence;
        // Combine advected smoke with new fire
        vec4 color = max(advected, injectedFire);
        gl_FragColor = color;  // output fire/smoke color (red/orange on black)
      }`;
    // Compile vertex shader
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vertexSrc);
    gl.compileShader(vs);
    // Compile fragment shader
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fragmentSrc);
    gl.compileShader(fs);
    // Link shaders into a program
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // --- 2. Setup Full-Screen Quad ---
    const quadVerts = new Float32Array([ -1, -1,  -1, 1,  1, -1,  1, 1 ]);
    const quadBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);
    const aPositionLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    // --- 3. Create Textures and Framebuffers for Ping-Pong ---
    const textureA = gl.createTexture()!;
    const textureB = gl.createTexture()!;
    [textureA, textureB].forEach((tex) => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    });
    const fbA = gl.createFramebuffer()!;
    const fbB = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbA);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureA, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbB);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureB, 0);

    // Uniform locations
    const uPrevFrameLoc = gl.getUniformLocation(program, "uPrevFrame");
    const uInjectPosLoc = gl.getUniformLocation(program, "uInjectPos");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    gl.uniform2f(uInjectPosLoc, -1.0, -1.0); // start with injection off-screen

    // --- 4. Rendering Loop (ping-pong between framebuffers) ---
    let useA = true;
    function render() {
      // Bind the destination framebuffer (next frame)
      gl.bindFramebuffer(gl.FRAMEBUFFER, useA ? fbA : fbB);
      // Set the source texture (previous frame) for the shader
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, useA ? textureB : textureA);
      gl.uniform1i(uPrevFrameLoc, 0);
      // Update time uniform (if needed for any time-based noise or cooling)
      gl.uniform1f(uTimeLoc, performance.now() * 0.001);
      // Render the full-screen quad (which runs the fragment shader)
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); // back to canvas (for display)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);   // draw the result to screen
      // Swap which texture is considered "previous"
      useA = !useA;
      requestAnimationFrame(render);
    }
    render();

    // --- 5. User Input: inject fire on mouse drag ---
    const updateInjectPos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Convert mouse (client) coords to normalized [0,1] UV
      const x = (e.clientX - rect.left) / canvas.width;
      const y = 1.0 - (e.clientY - rect.top) / canvas.height;
      // Set uniform to point near the mouse (convert to shader's -1..1 space for vUv)
      gl.uniform2f(uInjectPosLoc, x, y);
    };
    canvas.addEventListener("mousemove", updateInjectPos);
    canvas.addEventListener("mousedown", updateInjectPos);
  }, []);

  // Canvas covers full page
  return <canvas ref={canvasRef} width={800} height={600} style={{ width: "100%", height: "100%", background: "#000" }} />;
}
