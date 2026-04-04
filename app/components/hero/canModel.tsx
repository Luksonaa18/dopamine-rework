"use client";
import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

export default function CanModel() {
  const { scene } = useGLTF("/models/can.glb");
  const canRef = useRef<THREE.Group>(null);
  useEffect(() => {
    if (!canRef.current) return;

    canRef.current.position.set(-1.5, -5, 0);

    gsap.to(canRef.current.position, {
      y: -1.08,
      duration: 1.8,
      ease: "power3.out",
    });
    gsap.fromTo(
      canRef.current.rotation,
      { y: -Math.PI },
      { y: 0, duration: 1.8, ease: "power3.out" },
    );
  }, []);

  useFrame(({ clock }) => {
    if (!canRef.current) return;
    canRef.current.position.y =
      -1.08 + Math.sin(clock.elapsedTime * 0.8) * 0.08;
    canRef.current.rotation.y += 0.004;
  });

  return (
    <primitive
      ref={canRef}
      object={scene}
      scale={0.15}
      position={[-3.5, -1.08, 0]}
      rotation={[0, 0, 0]}
    />
  );
}
