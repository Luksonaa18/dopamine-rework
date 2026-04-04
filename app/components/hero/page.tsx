"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import CanModel from "./canModel";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // false = don't render until in view

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Pause canvas when scrolled off screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (canvasWrapRef.current) observer.observe(canvasWrapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!textRef.current || !badgeRef.current || !btnRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", force3D: true },
      );
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, force3D: true },
      );
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, force3D: true },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#0D0010] overflow-hidden flex items-center p-2">
      {/* BACKGROUND GLOW - no blur on mobile */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-125 h-125 md:blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: "rgba(107,47,217,0.2)" }}
        />
        <div
          className="absolute w-75 h-75 md:blur-[80px] rounded-full top-1/4 right-1/4"
          style={{ backgroundColor: "rgba(245,230,66,0.1)" }}
        />
      </div>

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage:
            "linear-gradient(#6B2FD9 1px, transparent 1px), linear-gradient(90deg, #6B2FD9 1px, transparent 1px)",
          backgroundSize: isMobile ? "100px 100px" : "60px 60px",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* LEFT */}
        <div
          ref={textRef}
          className="flex-1 flex flex-col gap-6 opacity-0 will-change-transform"
        >
          <div
            ref={badgeRef}
            className="opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border w-fit will-change-transform"
            style={{
              borderColor: "rgba(245,230,66,0.3)",
              backgroundColor: "rgba(245,230,66,0.1)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "#F5E642" }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#F5E642" }}
            >
              New Formula
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight will-change-transform">
            შეიგრძენი{" "}
            <span
              className="mt-2 px-4 font-bold"
              style={{
                color: "#F5E642",
                textShadow:
                  "0 0 20px #F5E642, 0 0 40px rgba(245,230,66,0.5), 0 0 80px rgba(245,230,66,0.25)",
              }}
            >
              DOPAMINE
            </span>
          </h1>

          <p
            className="text-lg max-w-md"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            გამოცადე ახალი ენერგიის დონე ჩვენი უახლესი ფორმულით...
          </p>

          <div
            ref={btnRef}
            className="opacity-0 flex gap-4 flex-wrap will-change-transform"
          >
            <button
              className="px-6 py-3 font-bold rounded-full transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "#F5E642", color: "#000000" }}
            >
              შეიძინე ახლავე
            </button>
            <a
              href="/about"
              className="px-6 py-3 rounded-full transition-all duration-200 border"
              style={{ borderColor: "#6B2FD9", color: "white" }}
            >
              მეტი ინფორმაცია
            </a>
          </div>

          <div className="flex gap-8 pt-4">
            {[
              { value: "250ml", label: "ენერგია" },
              { value: "100%", label: "ფოკუსი" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-black text-xl"
                  style={{ color: "#F5E642" }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.875rem",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - 3D CAN */}
        <div
          ref={canvasWrapRef}
          className="flex-1 w-full h-75 sm:h-100 md:h-150 flex items-center justify-center relative z-0"
        >
          <Canvas
            frameloop={isVisible ? "always" : "demand"}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            camera={{
              position: isMobile ? [0, 0.5, 6] : [0, 1.5, 8],
              fov: 45,
            }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 3, 3]} intensity={1} />

            <Suspense fallback={null}>
              <group
                position={[0, isMobile ? -1.5 : -1, 0]}
                scale={isMobile ? 0.99 : 1}
              >
                <CanModel />
              </group>
              <Environment preset="studio" />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
