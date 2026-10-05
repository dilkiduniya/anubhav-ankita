import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MandapScene({ currentPhera = 0, isCompleted = false }) {
  const containerRef = useRef(null);
  const pheraRef = useRef(currentPhera);
  const completedRef = useRef(isCompleted);

  useEffect(() => {
    pheraRef.current = currentPhera;
    completedRef.current = isCompleted;
  }, [currentPhera, isCompleted]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090508, 0.018);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 7, 24);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.8);
    scene.add(ambientLight);

    // Sacred Havan Kund Center Fire Light (Flickering Agni)
    const fireLight = new THREE.PointLight(0xff8822, 6, 25);
    fireLight.position.set(0, 1.2, 0);
    scene.add(fireLight);

    // Golden Overhead Chandelier / Canopy Light
    const canopyLight = new THREE.PointLight(0xf2c6a0, 4, 30);
    canopyLight.position.set(0, 9, 0);
    scene.add(canopyLight);

    // Warm Rim Lights
    const rimLightLeft = new THREE.PointLight(0x8f183d, 3, 30);
    rimLightLeft.position.set(-15, 6, -10);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.PointLight(0xd94f70, 3, 30);
    rimLightRight.position.set(15, 6, -10);
    scene.add(rimLightRight);

    // MANDAP ROOT GROUP
    const mandapGroup = new THREE.Group();
    scene.add(mandapGroup);

    // 1. Velvet Stepped Platform / Circular Dais
    const platformBaseGeo = new THREE.CylinderGeometry(8.5, 9.2, 0.6, 48);
    const platformBaseMat = new THREE.MeshStandardMaterial({
      color: 0x240815,
      roughness: 0.6,
      metalness: 0.2,
    });
    const platformBase = new THREE.Mesh(platformBaseGeo, platformBaseMat);
    platformBase.position.y = -0.3;
    mandapGroup.add(platformBase);

    // Golden Ring Trim around dais
    const daisTrimGeo = new THREE.TorusGeometry(8.6, 0.1, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf2c6a0,
      emissive: 0x4a321a,
      roughness: 0.2,
      metalness: 0.8,
    });
    const daisTrim = new THREE.Mesh(daisTrimGeo, goldMat);
    daisTrim.rotation.x = Math.PI / 2;
    daisTrim.position.y = 0;
    mandapGroup.add(daisTrim);

    // Inner Velvet Sacred Ring
    const innerRingGeo = new THREE.CylinderGeometry(5.5, 5.8, 0.1, 48);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x4a1022,
      roughness: 0.5,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.y = 0.05;
    mandapGroup.add(innerRing);

    // 2. Sacred Havan Kund (Center Fire Altar)
    const kundBaseGeo = new THREE.BoxGeometry(2.4, 0.5, 2.4);
    const kundMat = new THREE.MeshStandardMaterial({
      color: 0xb87333, // Copper / brass
      roughness: 0.3,
      metalness: 0.7,
    });
    const kundBase = new THREE.Mesh(kundBaseGeo, kundMat);
    kundBase.position.y = 0.3;
    mandapGroup.add(kundBase);

    const kundTopGeo = new THREE.BoxGeometry(1.8, 0.3, 1.8);
    const kundTop = new THREE.Mesh(kundTopGeo, kundMat);
    kundTop.position.y = 0.6;
    mandapGroup.add(kundTop);

    // Agni Flame Mesh (Glow Core)
    const flameGeo = new THREE.ConeGeometry(0.5, 1.2, 16);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffaa22,
      transparent: true,
      opacity: 0.85,
    });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.y = 1.2;
    mandapGroup.add(flameMesh);

    // 3. Ornate Golden Pillars (4 Sacred Columns)
    const pillarPositions = [
      { x: -5, z: -5 },
      { x: 5, z: -5 },
      { x: 5, z: 5 },
      { x: -5, z: 5 },
    ];

    const pillarGeo = new THREE.CylinderGeometry(0.3, 0.35, 8.5, 24);
    const pillarBaseGeo = new THREE.BoxGeometry(1.0, 0.6, 1.0);
    const pillarCapitalGeo = new THREE.BoxGeometry(1.1, 0.5, 1.1);

    pillarPositions.forEach((pos) => {
      // Pillar Column
      const p = new THREE.Mesh(pillarGeo, goldMat);
      p.position.set(pos.x, 4.25, pos.z);
      mandapGroup.add(p);

      // Base
      const b = new THREE.Mesh(pillarBaseGeo, goldMat);
      b.position.set(pos.x, 0.3, pos.z);
      mandapGroup.add(b);

      // Capital
      const c = new THREE.Mesh(pillarCapitalGeo, goldMat);
      c.position.set(pos.x, 8.5, pos.z);
      mandapGroup.add(c);

      // Spiral Marigold Garland wrapping around pillar
      const garlandCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(pos.x + 0.45, 0.5, pos.z),
        new THREE.Vector3(pos.x, 2.5, pos.z + 0.45),
        new THREE.Vector3(pos.x - 0.45, 4.5, pos.z),
        new THREE.Vector3(pos.x, 6.5, pos.z - 0.45),
        new THREE.Vector3(pos.x + 0.45, 8.2, pos.z),
      ]);
      const garlandGeo = new THREE.TubeGeometry(garlandCurve, 32, 0.12, 8, false);
      const garlandMat = new THREE.MeshStandardMaterial({
        color: 0xff8c00, // Marigold orange
        roughness: 0.8,
        emissive: 0x552200,
      });
      const garland = new THREE.Mesh(garlandGeo, garlandMat);
      mandapGroup.add(garland);
    });

    // 4. Canopy Architrave / Top Roof Frame
    const beamGeoX = new THREE.BoxGeometry(10.8, 0.35, 0.4);
    const beamGeoZ = new THREE.BoxGeometry(0.4, 0.35, 10.8);

    const b1 = new THREE.Mesh(beamGeoX, goldMat);
    b1.position.set(0, 8.7, -5);
    mandapGroup.add(b1);

    const b2 = new THREE.Mesh(beamGeoX, goldMat);
    b2.position.set(0, 8.7, 5);
    mandapGroup.add(b2);

    const b3 = new THREE.Mesh(beamGeoZ, goldMat);
    b3.position.set(-5, 8.7, 0);
    mandapGroup.add(b3);

    const b4 = new THREE.Mesh(beamGeoZ, goldMat);
    b4.position.set(5, 8.7, 0);
    mandapGroup.add(b4);

    // Chhatri Dome / Crown Top
    const domeGeo = new THREE.ConeGeometry(3.5, 2.2, 32);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x4a1022,
      roughness: 0.4,
      metalness: 0.6,
      emissive: 0x1a0710,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.set(0, 9.8, 0);
    mandapGroup.add(dome);

    // Golden Kalash Finial on top
    const finialGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const finial = new THREE.Mesh(finialGeo, goldMat);
    finial.position.set(0, 11.2, 0);
    mandapGroup.add(finial);

    // 5. Eight Earthen Diyas around dais
    const diyaCount = 8;
    const diyaRadius = 7.6;
    const diyaGeo = new THREE.CylinderGeometry(0.3, 0.15, 0.15, 16);
    const diyaMat = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      roughness: 0.9,
    });

    for (let i = 0; i < diyaCount; i++) {
      const angle = (i / diyaCount) * Math.PI * 2;
      const dx = Math.cos(angle) * diyaRadius;
      const dz = Math.sin(angle) * diyaRadius;

      const diya = new THREE.Mesh(diyaGeo, diyaMat);
      diya.position.set(dx, 0.1, dz);
      mandapGroup.add(diya);

      // Diya small flame
      const diyaFlameGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const diyaFlameMat = new THREE.MeshBasicMaterial({ color: 0xffc04d });
      const diyaFlame = new THREE.Mesh(diyaFlameGeo, diyaFlameMat);
      diyaFlame.position.set(dx, 0.22, dz);
      mandapGroup.add(diyaFlame);
    }

    // 6. Falling Rose & Marigold Petal Particles
    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 300 : 700;
    const petalGeo = new THREE.BufferGeometry();
    const petalPos = new Float32Array(petalCount * 3);
    const petalRot = new Float32Array(petalCount * 3);
    const petalSpeed = new Float32Array(petalCount);
    const petalColors = new Float32Array(petalCount * 3);

    const roseColor = new THREE.Color(0xd94f70);
    const marigoldColor = new THREE.Color(0xffa500);
    const goldColor = new THREE.Color(0xf2c6a0);

    for (let i = 0; i < petalCount; i++) {
      petalPos[i * 3] = (Math.random() - 0.5) * 24;
      petalPos[i * 3 + 1] = Math.random() * 18;
      petalPos[i * 3 + 2] = (Math.random() - 0.5) * 24;

      petalRot[i * 3] = Math.random() * Math.PI;
      petalRot[i * 3 + 1] = Math.random() * Math.PI;
      petalRot[i * 3 + 2] = Math.random() * Math.PI;

      petalSpeed[i] = 0.02 + Math.random() * 0.04;

      // Color distribution (roses & marigolds)
      const r = Math.random();
      const col = r < 0.5 ? roseColor : r < 0.85 ? marigoldColor : goldColor;
      petalColors[i * 3] = col.r;
      petalColors[i * 3 + 1] = col.g;
      petalColors[i * 3 + 2] = col.b;
    }

    petalGeo.setAttribute("position", new THREE.BufferAttribute(petalPos, 3));
    petalGeo.setAttribute("color", new THREE.BufferAttribute(petalColors, 3));

    // Custom Petal Texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d");
    pCtx.fillStyle = "#ffffff";
    pCtx.beginPath();
    pCtx.ellipse(16, 16, 12, 6, Math.PI / 4, 0, Math.PI * 2);
    pCtx.fill();

    const petalTex = new THREE.CanvasTexture(pCanvas);
    const petalMat = new THREE.PointsMaterial({
      size: 0.75,
      map: petalTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const petalParticles = new THREE.Points(petalGeo, petalMat);
    scene.add(petalParticles);

    // Camera Orbit State
    let currentOrbitAngle = 0;
    const radius = 22;

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Phera-Driven Smooth Camera Orbit
      const pheraIdx = pheraRef.current;
      const isDone = completedRef.current;

      // Each phera moves camera (360 degrees / 7 pheras)
      const targetOrbitAngle = (pheraIdx / 7) * Math.PI * 2;
      currentOrbitAngle += (targetOrbitAngle - currentOrbitAngle) * 0.035;

      // Slight mouse parallax or gentle idle drift
      const idleFloat = Math.sin(t * 0.8) * 0.5;

      if (!isDone) {
        camera.position.x = Math.sin(currentOrbitAngle) * radius;
        camera.position.z = Math.cos(currentOrbitAngle) * radius;
        camera.position.y = 6.5 + idleFloat;
        camera.lookAt(0, 3.5, 0);
      } else {
        // Panoramic celebratory pull-back view
        camera.position.x = Math.sin(t * 0.15) * 28;
        camera.position.z = Math.cos(t * 0.15) * 28;
        camera.position.y = 9.5 + Math.sin(t * 0.5) * 0.8;
        camera.lookAt(0, 3.8, 0);
      }

      // Agni Sacred Fire Flicker
      const flicker = 1 + Math.sin(t * 15) * 0.18 + Math.cos(t * 23) * 0.12;
      fireLight.intensity = (isDone ? 8 : 5.5) * flicker;
      flameMesh.scale.set(flicker, 1 + Math.sin(t * 12) * 0.25, flicker);

      // Falling Petals Physics
      const positions = petalGeo.attributes.position.array;
      for (let i = 0; i < petalCount; i++) {
        // Fall downwards
        positions[i * 3 + 1] -= petalSpeed[i] * (isDone ? 1.6 : 1.0);
        // Swirl in wind
        positions[i * 3] += Math.sin(t * 1.5 + i) * 0.02;
        positions[i * 3 + 2] += Math.cos(t * 1.2 + i) * 0.02;

        // Reset if reached ground
        if (positions[i * 3 + 1] < -0.5) {
          positions[i * 3 + 1] = 16 + Math.random() * 4;
          positions[i * 3] = (Math.random() - 0.5) * 22;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
        }
      }
      petalGeo.attributes.position.needsUpdate = true;

      // Mandap gentle shimmer
      if (isDone) {
        canopyLight.intensity = 6 + Math.sin(t * 2) * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);

      // Dispose Three.js objects
      platformBaseGeo.dispose();
      platformBaseMat.dispose();
      daisTrimGeo.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      goldMat.dispose();
      kundBaseGeo.dispose();
      kundTopGeo.dispose();
      kundMat.dispose();
      flameGeo.dispose();
      flameMat.dispose();
      pillarGeo.dispose();
      pillarBaseGeo.dispose();
      pillarCapitalGeo.dispose();
      beamGeoX.dispose();
      beamGeoZ.dispose();
      domeGeo.dispose();
      domeMat.dispose();
      finialGeo.dispose();
      diyaGeo.dispose();
      diyaMat.dispose();
      petalGeo.dispose();
      petalMat.dispose();
      petalTex.dispose();
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
