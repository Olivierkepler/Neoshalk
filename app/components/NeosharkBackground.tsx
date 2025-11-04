"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Line } from "@react-three/drei";
import { useTheme } from "next-themes";

function GridLines({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);

  // Subtle, automatic rotation (ambient motion)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      group.current.rotation.y = Math.cos(t * 0.1) * 0.1;
    }
  });

  const gridSize = 10;
  const lines = [];

  for (let i = -gridSize; i <= gridSize; i++) {
    // Horizontal lines
    lines.push([
      [i, 0, -gridSize],
      [i, 0, gridSize],
    ]);
    // Vertical lines
    lines.push([
      [-gridSize, 0, i],
      [gridSize, 0, i],
    ]);
  }

  return (
    <group ref={group} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
      {lines.map((points, i) => (
        <Line
          key={i}
          points={points as any}
          color={color}
          lineWidth={0.6}
          opacity={0.4}
          transparent
        />
      ))}
    </group>
  );
}

export default function NeosharkBackground() {
  const { theme } = useTheme();

  // Theme-aware colors
  const bgColor = theme === "light" ? "#f9fafb" : "#020617";
  const lineColor = theme === "light" ? "#3b82f6" : "#00b3ff";
  const overlayGradient =
    theme === "light"
      ? "bg-gradient-to-b from-white/20 via-white/10 to-transparent"
      : "bg-gradient-to-b from-transparent via-black/40 to-black";

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={0.5} />
        <GridLines color={lineColor} />
      </Canvas>

      {/* Overlay gradient for subtle depth */}
      <div className={`absolute inset-0  transition-all`} />
    </div>
  );
}
