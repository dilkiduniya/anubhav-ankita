import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090508, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Subtle lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.6);
    scene.add(ambientLight);

    const winePoint = new THREE.PointLight(0x8f183d, 4, 60);
    winePoint.position.set(-15, 10, 10);
    scene.add(winePoint);

    const goldPoint = new THREE.PointLight(0xf2c6a0, 3, 60);
    goldPoint.position.set(15, -10, 15);
    scene.add(goldPoint);

    // Ethereal Abstract 3D Shapes (Floating Torus Knots & Spheres)
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Central elegant Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(6.5, 1.4, 120, 24, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x4a1022,
      emissive: 0x1a0710,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    shapesGroup.add(knotMesh);

    // Outer subtle orbital ring
    const ringGeo = new THREE.TorusGeometry(14, 0.12, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf2c6a0,
      emissive: 0xd94f70,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    shapesGroup.add(ringMesh);

    // Floating Stardust Particles
    const particleCount = window.innerWidth < 768 ? 600 : 1400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0xf7e7ce),
      new THREE.Color(0xf2c6a0),
      new THREE.Color(0xd94f70),
      new THREE.Color(0x8f183d),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom circular soft glow texture for particles
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.3, "rgba(255, 220, 200, 0.7)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX * 4 - targetX) * 0.05;
      targetY += (-mouseY * 3 - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate shapes slowly
      knotMesh.rotation.x = elapsedTime * 0.12;
      knotMesh.rotation.y = elapsedTime * 0.18;
      ringMesh.rotation.z = elapsedTime * 0.08;
      ringMesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.3;

      // Slow drift of stardust
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      knotGeo.dispose();
      knotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
