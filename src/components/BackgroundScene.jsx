import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import {
  EffectComposer,
  Noise,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import * as THREE from "three";

const Flower3D = ({
  position,
  color,
  centerColor,
  baseScale = 0.9,
  initialRotation = [0, 0, 0],
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const currentBaseScale = useRef(0);

  const distanceFromCenter = useMemo(() => {
    return Math.sqrt(position[0] ** 2 + position[1] ** 2);
  }, [position]);

  const [randomData] = useState(() => ({
    speed: 0.6 + Math.random() * 0.7,
    offset: Math.random() * 100,
    baseRotation: (Math.random() - 0.5) * 0.004,
    floatSpeed: 1.0 + Math.random() * 0.6,
    floatOffset: Math.random() * 100,
  }));

  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.set(...initialRotation);
  }, [initialRotation]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    const staggerDelay = distanceFromCenter * 0.08;
    const hasStarted = t > staggerDelay;

    let targetScale = 0;
    if (hasStarted) {
      targetScale = hovered ? baseScale * 1.18 : baseScale;
    }

    currentBaseScale.current = THREE.MathUtils.lerp(
      currentBaseScale.current,
      targetScale,
      hasStarted ? 0.08 : 0.1
    );

    const breathing = hasStarted
      ? Math.sin(t * randomData.speed + randomData.offset) * 0.02
      : 0;

    const finalScale = currentBaseScale.current + breathing;
    const safeScale = Math.max(0, finalScale);
    meshRef.current.scale.set(safeScale, safeScale, safeScale);

    meshRef.current.rotation.z += randomData.baseRotation;
    const floatY =
      Math.sin(t * randomData.floatSpeed + randomData.floatOffset) * 0.08;
    meshRef.current.position.y = position[1] + (hasStarted ? floatY : 0);
  });

  return (
    <group
      position={[position[0], position[1], position[2]]}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.33, 9, 9]} />
        <meshLambertMaterial color={centerColor ?? "#F6EFE6"} />
      </mesh>

      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.6;
        const y = Math.sin(rad) * 0.6;
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, rad]}>
            <sphereGeometry args={[0.46, 9, 9]} />
            <meshLambertMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
};

const HeroFlowers = ({ isMobile }) => {
  const activeLayout = 1;
  const activeColorPattern = 1;

  const flowers = useMemo(() => {
    const palette = ["#f9561b", "#ebff36", "#1328f0", "#fa99dc", "#9267f0"];

    if (isMobile) {
      const getMobileFlower = (id, x, y, scale, colorIdx, z = 0) => {
        const color = palette[colorIdx % palette.length];
        const centerOptions = palette.filter((c) => c !== color);
        const centerColor =
          centerOptions[(colorIdx + 2) % centerOptions.length];
        return {
          id: `mob-${id}`,
          position: [x, y, z],
          color,
          centerColor,
          baseScale: scale,
          initialRotation: [0, 0, 0],
        };
      };
      return [
        getMobileFlower(1, -2.2, 6.0, 0.7, 0),
        getMobileFlower(2, 2.5, 5.2, 0.65, 3),
        getMobileFlower(3, -2.8, 2.2, 0.5, 2),
        getMobileFlower(4, 3.0, -1.5, 0.55, 1),
        getMobileFlower(5, -2.5, -5.5, 0.8, 4),
        getMobileFlower(6, 2.2, -6.5, 0.7, 0),
        getMobileFlower(7, 0, 8.5, 0.45, 1),
        getMobileFlower(8, 0, -8.5, 0.5, 2),
        getMobileFlower(9, -1.5, 4.0, 0.4, 3),
        getMobileFlower(10, 1.5, -3.5, 0.4, 4),
      ];
    }

    const layouts = {
      1: [
        { x: -9, y: -5.5, z: 0.5, s: 1.6 },
        { x: 9, y: 5.5, z: 0.5, s: 1.5 },
        { x: -10.5, y: 5, z: 0, s: 1.4 },
        { x: 10.5, y: -5, z: 0, s: 1.4 },
        { x: -8, y: 1.5, z: 0, s: 1.2 },
        { x: 6.5, y: -1.5, z: 0, s: 1.2 },
        { x: -11, y: 0, z: 0, s: 0.85 },
        { x: 11, y: 0, z: 0, s: 0.85 },
        { x: -8, y: -2, z: 0, s: 0.9 },
        { x: 8, y: 2, z: 0, s: 0.9 },
        { x: -5, y: 6, z: 0, s: 0.75 },
        { x: 5, y: -5, z: 0, s: 0.75 },
        { x: 0, y: 5, z: 0, s: 0.75 },
        { x: 0, y: -6.2, z: 0, s: 0.6 },
        { x: -3.2, y: 4.2, z: 0, s: 0.6 },
        { x: 3.2, y: 3.8, z: 0, s: 0.6 },
        { x: -3.5, y: -4.2, z: 0, s: 0.65 },
        { x: 3.5, y: -3.8, z: 0, s: 0.65 },
        { x: 0, y: -3, z: 0, s: 0.85 },
      ],
      2: [
        { x: -10, y: -6.0, z: 0.5, s: 1.6 },
        { x: 10, y: 6.0, z: 0.5, s: 1.5 },
        { x: -11.5, y: 4, z: 0, s: 1.4 },
        { x: 11.5, y: -4, z: 0, s: 1.4 },
        { x: -7.5, y: 2.5, z: 0, s: 1.1 },
        { x: 7.5, y: -2.5, z: 0, s: 1.1 },
        { x: -12, y: 0, z: 0, s: 0.8 },
        { x: 12, y: 0, z: 0, s: 0.8 },
        { x: -9, y: -1, z: 0, s: 0.9 },
        { x: 9, y: 1, z: 0, s: 0.9 },
        { x: -5, y: 7.0, z: 0, s: 0.7 },
        { x: 5, y: -7.0, z: 0, s: 0.7 },
        { x: 0, y: 7.5, z: 0, s: 0.55 },
        { x: 0, y: -7.5, z: 0, s: 0.55 },
        { x: -4.0, y: 4.5, z: 0, s: 0.55 },
        { x: 4.0, y: 4.0, z: 0, s: 0.55 },
        { x: -4.0, y: -4.5, z: 0, s: 0.6 },
        { x: 4.0, y: -4.0, z: 0, s: 0.6 },
      ],
      3: [
        { x: -11, y: -5, z: 0.5, s: 1.7 },
        { x: -9, y: -3, z: 0, s: 1.2 },
        { x: -12, y: -2, z: 0, s: 0.9 },
        { x: -7, y: -6, z: 0, s: 1.0 },
        { x: -5, y: -2, z: 0, s: 0.8 },
        { x: 11, y: 5, z: 0.5, s: 1.6 },
        { x: 9, y: 3, z: 0, s: 1.2 },
        { x: 12, y: 2, z: 0, s: 0.9 },
        { x: 7, y: 6, z: 0, s: 1.0 },
        { x: 5, y: 2, z: 0, s: 0.8 },
        { x: -3.5, y: 4.5, z: 0, s: 0.55 },
        { x: 3.5, y: -4.5, z: 0, s: 0.55 },
        { x: 0, y: 7.5, z: 0, s: 0.6 },
        { x: 0, y: -7.5, z: 0, s: 0.6 },
        { x: -13.5, y: -4.5, z: 0, s: 0.8 },
        { x: 13.5, y: 4.5, z: 0, s: 0.8 },
        { x: -6.5, y: 1.5, z: 0, s: 0.75 },
        { x: 6.5, y: -1.5, z: 0, s: 0.75 },
        { x: -2.5, y: -6.8, z: 0, s: 0.6 },
        { x: 2.5, y: 6.8, z: 0, s: 0.6 },
        { x: -8.0, y: -4.2, z: -0.5, s: 0.7 },
        { x: 8.0, y: 4.2, z: -0.5, s: 0.7 },
        { x: -5.5, y: 3.5, z: 0.2, s: 0.6 },
        { x: 5.5, y: -3.5, z: 0.2, s: 0.6 },
        { x: -10.5, y: -0.5, z: -0.2, s: 0.75 },
        { x: 10.5, y: 0.5, z: -0.2, s: 0.75 },
        { x: -1.5, y: 8.2, z: 0, s: 0.5 },
        { x: 1.5, y: -8.2, z: 0, s: 0.5 },
      ],
    };

    const colorMaps = {
      1: [
        0, 1, 4, 2, 3, 0, 2, 3, 1, 4, 0, 1, 2, 4, 3, 0, 2, 3, 4, 1, 2, 0,
        3, 4, 1, 0, 2, 3, 4, 1,
      ],
      2: [0, 2, 0, 4, 1, 3, 1, 4, 3, 2, 0, 2, 1, 3, 1, 2, 0, 4],
      3: [2, 4, 1, 0, 4, 1, 0, 2, 3, 1, 2, 0, 3, 1, 2, 4, 1, 2],
    };

    const chosenPositions = layouts[activeLayout] || layouts[1];
    const chosenColors = colorMaps[activeColorPattern] || colorMaps[1];

    return chosenPositions.map((pos, i) => {
      const colorIdx = chosenColors[i];
      const color = palette[colorIdx];
      const centerOptions = palette.filter((c) => c !== color);
      const centerColor = centerOptions[(i * 3) % centerOptions.length];

      return {
        id: `flower-${i}`,
        position: [pos.x, pos.y, pos.z],
        baseScale: pos.s,
        color,
        centerColor,
        initialRotation: [0, 0, i * 0.5],
      };
    });
  }, [isMobile, activeLayout, activeColorPattern]);

  return (
    <group>
      {flowers.map((f) => (
        <Flower3D
          key={f.id}
          position={f.position}
          color={f.color}
          centerColor={f.centerColor}
          baseScale={f.baseScale}
          initialRotation={f.initialRotation}
        />
      ))}
    </group>
  );
};

const BackgroundScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);
    const handleMediaChange = (e) => setIsMobile(e.matches);
    media.addEventListener("change", handleMediaChange);
    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        flat
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: true, antialias: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 1);
        }}
        camera={{ position: [0, 0, 18], fov: isMobile ? 48 : 36 }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 10, 6]} intensity={2.0} />

        <HeroFlowers isMobile={isMobile} />

        <Sparkles
          count={12}
          scale={12}
          size={2}
          speed={0.15}
          opacity={0.05}
          color="#ffffff"
        />

        {!isMobile && (
          <EffectComposer disableNormalPass>
            <Noise opacity={0.003} />
            <Vignette eskil={false} offset={0.6} darkness={0.25} />
            <ChromaticAberration
              offset={[0.0015, 0.0015]}
              radialModulation={true}
              modulationOffset={0.3}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
