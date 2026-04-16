import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Environment, Html } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import * as THREE from "three";

const useSVGTexture = (url) => {
  const [texture, setTexture] = useState(null);
  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((r) => r.text())
      .then((svgText) => {
        const sized = svgText.replace(/(<svg[^>]*?)(\s*\/?>)/, (_, attrs, close) => {
          const cleaned = attrs
            .replace(/\s*width="[^"]*"/, "")
            .replace(/\s*height="[^"]*"/, "");
          return cleaned + ' width="512" height="512"' + close;
        });
        const dataUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(sized);
        new THREE.TextureLoader().load(dataUrl, (tex) => {
          // CRITICAL MOBILE FIX
          tex.generateMipmaps = false;
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          setTexture(tex);
        });
      });
  }, [url]);
  return texture;
};

const ICON_LABELS = {
  code: "Frontend Dev",
  computer: "Web Apps",
  design_services: "UI/UX Design",
  mobile_code: "Mobile Dev",
  controller: "Creative Coding",
};

const DECAL_CONFIG = {
  box: { position: [0, 0, 0.46], scale: 0.6 },
  sphere: { position: [0, 0, 0.56], scale: 0.55 },
  torus: { position: [0, 0, 0.19], scale: 0.4 },
  dodecahedron: { position: [0, 0, 0.56], scale: 0.55 },
  octahedron: { position: [0, 0, 0.61], scale: 0.5 },
  icosahedron: { position: [0, 0, 0.56], scale: 0.55 },
  cone: { position: [0, 0.1, 0.35], scale: 0.45 },
  heart: { position: [0, 0, 0.26], scale: 0.45 },
  star: { position: [0, 0, 0.2], scale: 0.4 },
};

const Shape3D = ({
  position,
  color,
  shapeType,
  baseScale = 1,
  icon,
  bobOffset = 0,
  entranceDelay = 0,
  depthFadeRef,
  shapeIndex = 0,
  shapeCount = 1,
  visibleStartIndex = 0,
  isMobile = false,
}) => {
  const meshRef = useRef();
  const matRef = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useSVGTexture(icon ? `/icons/${icon}.svg` : null);
  const decal = DECAL_CONFIG[shapeType] || DECAL_CONFIG.sphere;

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
    if (shapeType === "box") {
      const s = new THREE.Shape();
      const hw = 0.39, hh = 0.39, r = 0.12;
      s.moveTo(-hw + r, -hh);
      s.lineTo(hw - r, -hh);
      s.quadraticCurveTo(hw, -hh, hw, -hh + r);
      s.lineTo(hw, hh - r);
      s.quadraticCurveTo(hw, hh, hw - r, hh);
      s.lineTo(-hw + r, hh);
      s.quadraticCurveTo(-hw, hh, -hw, hh - r);
      s.lineTo(-hw, -hh + r);
      s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
      const geo = new THREE.ExtrudeGeometry(s, {
        depth: 0.78,
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
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
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

  const targetScale = useRef(baseScale);
  const currentScale = useRef(baseScale);
  const targetEmissiveIntensity = useRef(0);
  const currentEmissiveIntensity = useRef(0);
  const baseRotation = shapeType === "heart" ? Math.PI : 0;
  const rotationDir = shapeIndex % 2 === 0 ? 1 : -1;

  const applyBouncyLift = (p) => {
    if (p === 0 || p === 1) return p;
    const amp = 0.22;
    const c4 = (2 * Math.PI) / 3;
    return 1 + Math.pow(2, -10 * p) * Math.sin((p * 10 - 0.75) * c4) * amp;
  };

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const depthFade = depthFadeRef?.current ?? 0;
    const effectiveCount = shapeCount - 2 * visibleStartIndex;
    const clampedIndex =
      Math.min(shapeCount - 1 - visibleStartIndex, Math.max(visibleStartIndex, shapeIndex)) -
      visibleStartIndex;
    const order = effectiveCount > 1 ? clampedIndex / (effectiveCount - 1) : 0;
    const liftStart = order * 0.75;
    const liftWindow = 0.5;
    const liftProgress = Math.min(1, Math.max(0, (depthFade - liftStart) / liftWindow));
    const liftBouncy = applyBouncyLift(liftProgress);

    const t = clock.getElapsedTime();
    const bob = Math.sin(t * 0.8 + bobOffset) * 0.15;
    const targetY = position[1] + bob + liftBouncy * 2.4;
    const targetRotZ = baseRotation + liftBouncy * 0.35 * rotationDir;
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 18, delta);
    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, targetRotZ, 18, delta);

    const entranceT = Math.min(1, Math.max(0, (t - entranceDelay) / 2.0));
    const c1 = 1.7;
    const entrance =
      entranceT === 1
        ? 1
        : 1 + (c1 + 1) * Math.pow(entranceT - 1, 3) + c1 * Math.pow(entranceT - 1, 2);

    const effectiveBase = baseScale * entrance;
    targetScale.current = hovered ? effectiveBase * 1.18 : effectiveBase;
    currentScale.current += (targetScale.current - currentScale.current) * 0.08;
    const s = currentScale.current;
    meshRef.current.scale.set(s, s, s);

    if (matRef.current) {
      targetEmissiveIntensity.current = hovered ? 0.4 : 0;
      currentEmissiveIntensity.current +=
        (targetEmissiveIntensity.current - currentEmissiveIntensity.current) * 0.08;
      matRef.current.emissiveIntensity = currentEmissiveIntensity.current;
    }
  });

  const renderGeometry = () => {
    if (geometry) return null;
    switch (shapeType) {
      case "sphere": return <sphereGeometry args={[0.55, 16, 16]} />;
      case "torus": return <torusGeometry args={[0.4, 0.18, 16, 32]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[0.55]} />;
      case "octahedron": return <octahedronGeometry args={[0.6]} />;
      case "icosahedron": return <icosahedronGeometry args={[0.55]} />;
      case "cone": return <coneGeometry args={[0.5, 0.9, 6]} />;
      default: return <sphereGeometry args={[0.55, 16, 16]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      rotation={shapeType === "heart" ? [0, 0, Math.PI] : [0, 0, 0]}
      geometry={geometry || undefined}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
    >
      {renderGeometry()}
      {isMobile ? (
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.4}
        />
      ) : (
        <meshPhysicalMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0}
          roughness={0.3}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          sheen={0.5}
          sheenRoughness={0.5}
          sheenColor="#8C52FD"
          ior={1.5}
          reflectivity={0.5}
          polygonOffset
          polygonOffsetFactor={-5}
        />
      )}
      {hovered && icon && ICON_LABELS[icon] && (
        <Html
          position={[0, shapeType === "heart" ? -0.75 : 0.75, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: "none" }}
        >
          <div style={{
            background: "rgba(0,0,0,0.75)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "11px",
            fontFamily: "monospace",
            fontWeight: "700",
            whiteSpace: "nowrap",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
            userSelect: "none",
          }}>
            {ICON_LABELS[icon]}
          </div>
        </Html>
      )}
{texture && (
  <Decal
    position={decal.position}
    rotation={shapeType === "heart" ? [0, 0, Math.PI] : [0, 0, 0]}
    scale={decal.scale}
  >
     <meshStandardMaterial 
        map={texture} 
        transparent={true} 
        depthWrite={false} 
        polygonOffset 
        polygonOffsetFactor={-10} 
        alphaTest={0.1}
     />
  </Decal>
)}
    </mesh>
  );
};

const ShapesRow = ({ isMobile, depthFadeRef }) => {
  const groupRef = useRef();

  const { shapes, totalWidth } = useMemo(() => {
    const desktopItems = [
      { type: "heart", color: "#8C52FD", scale: 2, icon: "code" },
      { type: "box", color: "#FED814", scale: 2.2, icon: "computer" },
      { type: "sphere", color: "#F087FE", scale: 2.2, icon: "design_services" },
      { type: "box", color: "#25E995", scale: 2.2, icon: "mobile_code" },
      { type: "star", color: "#8C52FD", scale: 2.4, icon: "controller" },
      { type: "torus", color: "#01D6FB", scale: 2.2, icon: "code" },
      { type: "heart", color: "#25E995", scale: 2, icon: "computer" },
      { type: "sphere", color: "#8C52FD", scale: 2.2, icon: "design_services" },
      { type: "box", color: "#01D6FB", scale: 2.2, icon: "mobile_code" },
      { type: "heart", color: "#FED814", scale: 2, icon: "controller" },
      { type: "star", color: "#F087FE", scale: 2.2, icon: "code" },
      { type: "sphere", color: "#01D6FB", scale: 2.2, icon: "computer" },
    ];

    const mobileItems = [
      { type: "heart", color: "#25E995", scale: 2, icon: "code" },
      { type: "box", color: "#FED814", scale: 2.2, icon: "computer" },
      { type: "sphere", color: "#F087FE", scale: 2.2, icon: "design_services" },
      { type: "star", color: "#8C52FD", scale: 2.4, icon: "controller" },
      { type: "heart", color: "#25E995", scale: 2, icon: "code" },
      { type: "box", color: "#FED814", scale: 2.2, icon: "computer" },
      { type: "sphere", color: "#F087FE", scale: 2.2, icon: "design_services" },
      { type: "star", color: "#8C52FD", scale: 2.4, icon: "controller" },
    ];

    const items = isMobile ? mobileItems : desktopItems;
    const sp = isMobile ? 1.7 : 2.65;
    const mobileScale = isMobile ? 0.7 : 1;
    const total = items.length * sp;
    const shapesData = items.map((item, i) => ({
      ...item,
      scale: item.scale * mobileScale,
      x: i * sp,
    }));
    return { shapes: shapesData, totalWidth: total };
  }, [isMobile]);

  const yPos = isMobile ? -3 : -2.5;
  const visibleStartIndex = isMobile ? 2 : 3;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const speed = 0.7;
    const offset = (clock.getElapsedTime() * speed) % totalWidth;
    groupRef.current.position.x = -totalWidth / 2 - offset;
    groupRef.current.position.z = 1;
    groupRef.current.position.y = yPos;
    groupRef.current.scale.set(1, 1, 1);
  });

  return (
    <group ref={groupRef} position={[0, yPos, 1]}>
      {[0, 1].map((set) =>
        shapes.map((shape, i) => {
          const baseDelay = Math.max(0, (i - visibleStartIndex) * 0.1);
          const finalDelay = set === 0 ? baseDelay : baseDelay + 1.0;
          return (
            <Shape3D
              key={`${set}-${i}`}
              position={[shape.x + set * totalWidth, 0, 0]}
              color={shape.color}
              shapeType={shape.type}
              baseScale={shape.scale}
              icon={shape.icon}
              bobOffset={i * 0.6}
              entranceDelay={finalDelay}
              depthFadeRef={depthFadeRef}
              shapeIndex={i + set * shapes.length}
              shapeCount={shapes.length * 2}
              visibleStartIndex={visibleStartIndex}
              isMobile={isMobile}
            />
          );
        }),
      )}
    </group>
  );
};

const HeroSceneReady = ({ onReady }) => {
  useEffect(() => { onReady(); }, []);
  return null;
};

const HeroCanvas = ({ isMobile, depthFadeRef, onReady }) => (
  <Canvas
    dpr={[1, isMobile ? 1.5 : 2]}
    gl={{ alpha: true, antialias: false }}
    onCreated={({ gl }) => gl.setClearColor("#000000", 0)}
    camera={{ position: [0, 0, 18], fov: isMobile ? 48 : 36 }}
  >
    <ambientLight intensity={0.5} />
    {isMobile ? (
      <directionalLight position={[10, 10, 5]} intensity={1} />
    ) : (
      <>
        <directionalLight position={[6, 10, 6]} intensity={0.8} color="#fff5e6" />
        <directionalLight position={[-6, 4, 4]} intensity={0.8} color="#c8d8ff" />
      </>
    )}

    <Suspense fallback={null}>
      <Environment preset={isMobile ? "city" : "warehouse"} />
      <ShapesRow isMobile={isMobile} depthFadeRef={depthFadeRef} />
      {!isMobile && (
        <EffectComposer disableNormalPass>
          <Noise opacity={0.003} />
        </EffectComposer>
      )}
      <HeroSceneReady onReady={onReady} />
    </Suspense>
  </Canvas>
);

export default HeroCanvas;
