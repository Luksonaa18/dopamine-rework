"use client";
import { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

useGLTF.preload("/models/can.glb");

const REST_Y = -1.08;

export default function CanModel() {
  const { scene } = useGLTF("/models/can.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const canRef = useRef<THREE.Group>(null);
  const introComplete = useRef(false);
  const introEndTime = useRef(0);

  useEffect(() => {
    if (!canRef.current) return;

    canRef.current.position.set(0, -3, 0);
    canRef.current.rotation.y = -Math.PI;

    gsap.to(canRef.current.position, {
      y: REST_Y,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        introComplete.current = true;
        introEndTime.current = performance.now() / 1000;
      },
    });

    gsap.to(canRef.current.rotation, {
      y: 0,
      duration: 1.8,
      ease: "power3.out",
    });
  }, []);

  useFrame(({ clock }) => {
    if (!canRef.current || !introComplete.current) return;
    const t = clock.elapsedTime - introEndTime.current;
    canRef.current.position.y = REST_Y + Math.sin(t * 0.8) * 0.08;
    canRef.current.rotation.y += 0.004;
  });

  return <primitive ref={canRef} object={clonedScene} scale={0.15} />;
}
