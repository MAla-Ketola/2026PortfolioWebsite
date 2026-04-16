import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { technologies } from "../constants";

const useSVGTexture = (url) => {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    if (!url) return;

    // Helper function to apply the mobile fix to any loaded texture
    const handleTexture = (tex) => {
      // CRITICAL: Prevents mobile WebGL from crashing on NPOT (Non-Power-Of-Two) images
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
    };

    if (!url.endsWith(".svg")) {
      new THREE.TextureLoader().load(url, handleTexture);
      return;
    }
    fetch(url)
      .then((r) => r.text())
      .then((svgText) => {
        const sized = svgText.replace(
          /(<svg[^>]*?)(\s*\/?>)/,
          (_, attrs, close) => {
            const cleaned = attrs
              .replace(/\s*width="[^"]*"/, "")
              .replace(/\s*height="[^"]*"/, "");
            return cleaned + ' width="512" height="512"' + close;
          },
        );
        const dataUrl =
          "data:image/svg+xml;charset=utf-8," + encodeURIComponent(sized);
        new THREE.TextureLoader().load(dataUrl, handleTexture);
      });
  }, [url]);
  return texture;
};

const getCylinderPositions = (count, radius, isMobile) => {
  const positions = [];
  const verticalSpread = isMobile ? 2.5 : 2.0;
  for (let i = 0; i < count; i++) {
    const y = (i / (count - 1)) * verticalSpread * 2 - verticalSpread;
    const theta = i * 2.4;
    positions.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
  }
  return positions;
};

const DECAL_CONFIG = {
  box: { position: [0, 0, 0.46], scale: 0.6 },
  sphere: { position: [0, 0, 0.56], scale: 0.65 },
  torus: { position: [0, 0, 0.19], scale: 0.5 },
  heart: { position: [0, 0, 0.26], scale: 0.5 },
  star: { position: [0, 0, 0.2], scale: 0.4 },
};

const TechShape = ({ position, icon, color, shapeType, isMobile }) => {
  const texture = useSVGTexture(icon);
  const decal = DECAL_CONFIG[shapeType] || DECAL_CONFIG.sphere;
  const [hovered, setHover] = useState(false);
  const meshRef = useRef();

  useFrame(({ camera }) => {
    if (meshRef.current) {
      meshRef.current.lookAt(camera.position);
      if (shapeType === "heart") meshRef.current.rotation.z += Math.PI;
    }
  });

  const geometry = useMemo(() => {
    if (shapeType === "heart") {
      const s = new THREE.Shape();
      s.moveTo(0.25, 0.25);
      s.bezierCurveTo(0.25, 0.25, 0.2, 0, 0, 0);
      s.bezierCurveTo(-0.35, 0, -0.35, 0.35, -0.35, 0.35);
      s.bezierCurveTo(-0.35, 0.55, -0.15, 0.77, 0.25, 0.95);
      s.bezierCurveTo(0.6, 0.77, 0.8, 0.55, 0.8, 0.35);
      s.bezierCurveTo(0.8, 0.35, 0.8, 0, 0.5, 0);
      s.bezierCurveTo(0.35, 0, 0.25, 0.25, 0.25, 0.25);
      const geo = new THREE.ExtrudeGeometry(s, {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.06,
        bevelSize: 0.06,
        bevelSegments: 3,
      });
      geo.center();
      return geo;
    }
    if (shapeType === "star") {
      const s = new THREE.Shape();
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        const r = i % 2 === 0 ? 0.5 : 0.22;
        i === 0
          ? s.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
          : s.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      }
      s.closePath();
      const geo = new THREE.ExtrudeGeometry(s, {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 2,
      });
      geo.center();
      return geo;
    }
    return null;
  }, [shapeType]);

  const renderGeometry = () => {
    if (geometry) return <primitive object={geometry} />;
    switch (shapeType) {
      case "box":
        return <boxGeometry args={[0.85, 0.85, 0.85]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 32, 64]} />;
      default:
        return <sphereGeometry args={[0.65, 32, 32]} />;
    }
  };

  const baseScale = isMobile ? 0.8 : 1.2;
  const hoverScale = isMobile ? 1.2 : 1.4;

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
          }}
          onPointerOut={() => setHover(false)}
          scale={hovered ? hoverScale : baseScale}
          rotation={shapeType === "heart" ? [0, 0, Math.PI] : [0, 0, 0]}
          geometry={geometry || undefined}
        >
          {renderGeometry()}
          {isMobile ? (
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 0.8 : 0.15}
              roughness={0.2}
              metalness={0.4}
            />
          ) : (
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 0.8 : 0.15}
              roughness={0.2}
              metalness={0.4}
              reflectivity={0.5}
            />
          )}
          {texture && (
            <Decal
              position={decal.position}
              rotation={shapeType === "heart" ? [0, 0, Math.PI] : [0, 0, 0]}
              scale={decal.scale}
            >
              <meshBasicMaterial
                map={texture}
                toneMapped={false}
                transparent={true}
                alphaTest={0.05}
                depthWrite={false}
                polygonOffset
                polygonOffsetFactor={-10}
              />
            </Decal>
          )}
        </mesh>
      </Float>
    </group>
  );
};

const TechScene = ({ isMobile }) => {
  const radius = isMobile ? 2 : 4.5;
  const positions = useMemo(
    () => getCylinderPositions(technologies.length, radius, isMobile),
    [radius, isMobile],
  );
  const palette = ["#8C52FD", "#FED814", "#F087FE", "#25E995", "#01D6FB"];
  const shapeTypes = isMobile
    ? [
        "sphere",
        "star",
        "sphere",
        "sphere",
        "sphere",
        "heart",
        "heart",
        "star",
        "sphere",
        "sphere",
        "sphere",
      ]
    : [
        "sphere",
        "star",
        "torus",
        "sphere",
        "sphere",
        "heart",
        "heart",
        "star",
        "sphere",
        "sphere",
        "sphere",
      ];
  const yOffset = isMobile ? 0.5 : -1;

  return (
    <group position={[0, yOffset, 0]} rotation={[0, 0, 0.1]}>
      {technologies.map((tech, i) => (
        <TechShape
          key={tech.name}
          position={positions[i]}
          icon={tech.icon}
          color={palette[i % palette.length]}
          shapeType={shapeTypes[i] || "sphere"}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
};

const SceneReady = ({ onReady }) => {
  useEffect(() => {
    onReady();
  }, []);
  return null;
};

const AutoRotate = () => {
  useFrame(({ camera }, delta) => {
    camera.position.applyAxisAngle({ x: 0, y: 1, z: 0 }, delta * 0.15);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const TechCanvas = ({ isMobile, onReady }) => (
  <Canvas
    dpr={[1, 1.5]}
    camera={{ position: [0, 0, 14], fov: 50 }}
    onCreated={({ gl }) => {
      gl.domElement.style.touchAction = "none";
      gl.domElement.style.pointerEvents = "none";
    }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 5]} intensity={1} />
    <Environment preset="city" />
    <OrbitControls
      enabled={!isMobile}
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={1.5}
      minPolarAngle={Math.PI / 2 - 0.5}
      maxPolarAngle={Math.PI / 2 + 0.5}
    />
    {isMobile && <AutoRotate />}
    <Suspense fallback={null}>
      <TechScene isMobile={isMobile} />
      <SceneReady onReady={onReady} />
    </Suspense>
  </Canvas>
);

export default TechCanvas;
