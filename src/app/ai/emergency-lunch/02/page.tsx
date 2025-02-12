"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FireMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime:   { value: 0 },
    uMouse:  { value: new THREE.Vector2(0, 0) },
    uSource: { value: null }        // texture for previous frame (feedback)
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec2  uMouse;
    uniform sampler2D uSource;
    varying vec2 vUv;
    // (Additional uniform fields like velocity, temperature can be added as needed)
    void main() {
      // Sample previous frame (source texture) for fluid advection
      vec4 prev = texture2D(uSource, vUv);
      // Basic smoke advection: shift coordinates upward to simulate buoyancy
      vec2 advectCoord = vUv - vec2(0.0, 0.002); // move sample upward each frame
      vec4 advected = texture2D(uSource, advectCoord);
      // Inject fire at mouse position: if pixel is near current mouse, add heat/density
      float dist = distance(vUv, uMouse);
      float injection = smoothstep(0.1, 0.0, dist); // radial gradient from mouse
      vec4 fireColor = vec4(1.0, 0.2, 0.0, 1.0) * injection; // red-orange fire
      // Simple combustion cooling: fade out previous smoke over time
      vec4 cooled = advected * 0.99;
      // Combine: new frame = cooled advected smoke + newly injected fire
      vec4 color = max(cooled, fireColor);
      // Output the color (red-based smoke on black background)
      gl_FragColor = color;
    }`
});

export default function FireR3FPage() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { size, gl } = useThree();
  // Prepare two offscreen buffers for ping-pong (previous/next frame)
  const [renderTargetA, renderTargetB] = useMemo(() => {
    const options = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
    return [new THREE.WebGLRenderTarget(size.width, size.height, options),
            new THREE.WebGLRenderTarget(size.width, size.height, options)];
  }, [size]);
  let flip = true; // toggle for ping-pong

  useFrame(({ gl, clock }) => {
    const material = shaderRef.current;
    if (!material) return;
    // Update time uniform
    material.uniforms.uTime.value = clock.getElapsedTime();
    // Swap render targets: previous frame becomes source texture
    const prevTarget = flip ? renderTargetA : renderTargetB;
    const nextTarget = flip ? renderTargetB : renderTargetA;
    material.uniforms.uSource.value = prevTarget.texture;
    // Render the scene (plane with shader) into nextTarget
    gl.setRenderTarget(nextTarget);
    gl.render(gl.scene, gl.camera);
    gl.setRenderTarget(null); // back to default (canvas)
    flip = !flip;
  });

  // Handle pointer drag to inject fire at cursor
  const injectFire = (event: THREE.PointerEvent) => {
    // Normalize pointer coordinates to [0,1] UV
    const x = (event.point.x + 0.5);
    const y = (event.point.y + 0.5);
    shaderRef.current.uniforms.uMouse.value.set(x, y);
  };

  return (
    <Canvas onPointerMove={injectFire} onPointerDown={injectFire} camera={{ position: [0, 0, 5] }} style={{ background: "#000" }}>
      {/* Fullscreen plane to draw the shader */}
      <mesh>
        <planeGeometry args={[5, 5]} /> 
        <shaderMaterial ref={shaderRef} args={[FireMaterial]} />
      </mesh>
    </Canvas>
  );
}
