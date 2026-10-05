import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeartOrbitScene() {
  const containerRef = useRef(null);
  const [activePartner, setActivePartner] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 22);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.7);
    scene.add(ambientLight);

    const heartLight = new THREE.PointLight(0xd94f70, 5, 30);
    heartLight.position.set(0, 0, 5);
    scene.add(heartLight);

    const goldKeyLight = new THREE.PointLight(0xf2c6a0, 4, 40);
    goldKeyLight.position.set(12, 8, 10);
    scene.add(goldKeyLight);

    // Group for Heart and orbits
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Build 3D Heart Geometry
    const heartShape = new THREE.Shape();
    // Heart parametric curve
    heartShape.moveTo(0, 1.8);
    heartShape.bezierCurveTo(0, 2.5, -0.6, 4.0, -2.5, 4.0);
    heartShape.bezierCurveTo(-5.0, 4.0, -5.0, 1.2, -5.0, 1.2);
    heartShape.bezierCurveTo(-5.0, -1.2, -3.2, -3.8, 0, -6.0);
    heartShape.bezierCurveTo(3.2, -3.8, 5.0, -1.2, 5.0, 1.2);
    heartShape.bezierCurveTo(5.0, 1.2, 5.0, 4.0, 2.5, 4.0);
    heartShape.bezierCurveTo(0.6, 4.0, 0, 2.5, 0, 1.8);

    const extrudeSettings = {
      depth: 1.8,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 4,
      bevelSize: 0.6,
      bevelThickness: 0.6,
    };

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center(); // Center rotation pivot

    const heartMat = new THREE.MeshPhysicalMaterial({
      color: 0x8f183d,
      emissive: 0x4a1022,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });

    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.scale.set(0.9, 0.9, 0.9);
    heartMesh.rotation.z = Math.PI; // Flip heart right side up
    universeGroup.add(heartMesh);

    // 2. Orbiting Spheres: Anubhav (Gold) & Ankita (Rose)
    // Anubhav Sphere
    const anubhavGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const anubhavMat = new THREE.MeshStandardMaterial({
      color: 0xf2c6a0,
      emissive: 0xf2c6a0,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.8,
    });
    const anubhavMesh = new THREE.Mesh(anubhavGeo, anubhavMat);
    const anubhavLight = new THREE.PointLight(0xf2c6a0, 3, 10);
    anubhavMesh.add(anubhavLight);
    scene.add(anubhavMesh);

    // Ankita Sphere
    const ankitaGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const ankitaMat = new THREE.MeshStandardMaterial({
      color: 0xd94f70,
      emissive: 0xd94f70,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.8,
    });
    const ankitaMesh = new THREE.Mesh(ankitaGeo, ankitaMat);
    const ankitaLight = new THREE.PointLight(0xd94f70, 3, 10);
    ankitaMesh.add(ankitaLight);
    scene.add(ankitaMesh);

    // 3. Orbit Rings (tilted cosmic paths)
    const orbitRing1Geo = new THREE.TorusGeometry(8.5, 0.04, 16, 120);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xf2c6a0,
      transparent: true,
      opacity: 0.2,
    });
    const orbitRing1 = new THREE.Mesh(orbitRing1Geo, orbitRingMat);
    orbitRing1.rotation.x = Math.PI / 3;
    orbitRing1.rotation.y = Math.PI / 6;
    universeGroup.add(orbitRing1);

    const orbitRing2Geo = new THREE.TorusGeometry(8.5, 0.04, 16, 120);
    const orbitRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xd94f70,
      transparent: true,
      opacity: 0.2,
    });
    const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat);
    orbitRing2.rotation.x = -Math.PI / 3;
    orbitRing2.rotation.y = -Math.PI / 6;
    universeGroup.add(orbitRing2);

    // 4. Orbiting Stardust Particles
    const dustCount = window.innerWidth < 768 ? 400 : 900;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustCols = new Float32Array(dustCount * 3);

    const dustColors = [
      new THREE.Color(0xf7e7ce),
      new THREE.Color(0xf2c6a0),
      new THREE.Color(0xd94f70),
    ];

    for (let i = 0; i < dustCount; i++) {
      const radius = 6 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 6;

      dustPos[i * 3] = Math.cos(angle) * radius;
      dustPos[i * 3 + 1] = height;
      dustPos[i * 3 + 2] = Math.sin(angle) * radius;

      const c = dustColors[Math.floor(Math.random() * dustColors.length)];
      dustCols[i * 3] = c.r;
      dustCols[i * 3 + 1] = c.g;
      dustCols[i * 3 + 2] = c.b;
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dustCols, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const dustPoints = new THREE.Points(dustGeo, dustMat);
    universeGroup.add(dustPoints);

    // Mouse and Touch Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientY < rect.top - 200 ||
        e.clientY > rect.bottom + 200
      ) return;

      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize
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
      const t = clock.getElapsedTime();

      // Mouse Parallax & Dynamic Light Movement
      targetX += (mouseX * 3 - targetX) * 0.05;
      targetY += (-mouseY * 2 - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Heart Gentle Float & Pulse
      const pulse = 1 + Math.sin(t * 2.2) * 0.04;
      heartMesh.scale.set(0.9 * pulse, 0.9 * pulse, 0.9 * pulse);
      heartMesh.rotation.y = Math.sin(t * 0.8) * 0.25;
      heartMesh.position.y = Math.sin(t * 1.5) * 0.4;

      // Anubhav celestial orbit (inclined ellipse)
      const aRadius = 8.5;
      const anubhavSpeed = t * 0.8;
      anubhavMesh.position.x = Math.cos(anubhavSpeed) * aRadius;
      anubhavMesh.position.y = Math.sin(anubhavSpeed) * aRadius * 0.4 + Math.sin(t * 0.5) * 0.5;
      anubhavMesh.position.z = Math.sin(anubhavSpeed) * aRadius * 0.8;

      // Ankita celestial orbit (opposite phase, counter-inclined)
      const ankitaSpeed = t * 0.8 + Math.PI; // Opposite side of heart
      ankitaMesh.position.x = Math.cos(ankitaSpeed) * aRadius;
      ankitaMesh.position.y = -Math.sin(ankitaSpeed) * aRadius * 0.4 + Math.cos(t * 0.5) * 0.5;
      ankitaMesh.position.z = Math.sin(ankitaSpeed) * aRadius * 0.8;

      // Rotate universe and dust
      dustPoints.rotation.y = t * 0.08;
      universeGroup.rotation.y = t * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      heartGeo.dispose();
      heartMat.dispose();
      anubhavGeo.dispose();
      anubhavMat.dispose();
      ankitaGeo.dispose();
      ankitaMat.dispose();
      orbitRing1Geo.dispose();
      orbitRing2Geo.dispose();
      orbitRingMat.dispose();
      orbitRing2Mat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden glass-panel border border-[#8F183D]/30 shadow-2xl flex items-center justify-center">
      {/* 3D Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Orbit Labels */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none z-10">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1A0710]/80 backdrop-blur-md border border-[#F2C6A0]/30 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F2C6A0] shadow-[0_0_10px_#F2C6A0] animate-ping" />
          <span className="text-xs uppercase tracking-widest font-semibold text-[#F2C6A0]">Anubhav</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#090508]/60 backdrop-blur-md border border-[#8F183D]/20 text-[11px] text-[#F7E7CE]/60">
          <span>Move cursor to guide light</span>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1A0710]/80 backdrop-blur-md border border-[#D94F70]/30 shadow-lg">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#D94F70]">Ankita</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#D94F70] shadow-[0_0_10px_#D94F70] animate-ping" />
        </div>
      </div>

      {/* Center Subtext */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10 px-4">
        <p className="font-serif-cormorant italic text-lg sm:text-xl text-[#F7E7CE]/80 tracking-wide">
          "Two souls revolving around one shared heartbeat."
        </p>
      </div>
    </div>
  );
}
