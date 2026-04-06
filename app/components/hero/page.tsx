"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import CanModel from "./canModel";
import photo from "@/public/UN.png";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const canImageRef = useRef<HTMLDivElement>(null);
  const canGlowRef = useRef<HTMLDivElement>(null);
  const mobileExtrasRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, []);

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

  useEffect(() => {
    if (!isMobile || !canImageRef.current || !mobileExtrasRef.current) return;

    const floatTween = { current: null as gsap.core.Tween | null };
    const rotateTween = { current: null as gsap.core.Tween | null };
    const glowPulseTween = { current: null as gsap.core.Tween | null };

    const ctx = gsap.context(() => {
      gsap.set(canImageRef.current, { x: -300, opacity: 0, rotation: -25 });

      gsap.to(canImageRef.current, {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: canvasWrapRef.current,
          start: "top 70%",
          once: true,
        },
        onComplete: () => {
          floatTween.current = gsap.to(canImageRef.current, {
            y: "+=18",
            duration: 2.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            force3D: true,
          });

          rotateTween.current = gsap.to(canImageRef.current, {
            rotation: -8,
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            force3D: true,
          });
        },
      });

      gsap.to(canGlowRef.current, {
        opacity: 0.7,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: canvasWrapRef.current,
          start: "top 80%",
          once: true,
        },
        onComplete: () => {
          glowPulseTween.current = gsap.to(canGlowRef.current, {
            opacity: 0.4,
            scale: 1.3,
            duration: 2.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            force3D: true,
          });
        },
      });

      gsap.fromTo(
        ".mobile-feature-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          force3D: true,
          scrollTrigger: {
            trigger: mobileExtrasRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => {
      ctx.revert();
      floatTween.current?.kill();
      rotateTween.current?.kill();
      glowPulseTween.current?.kill();
    };
  }, [isMobile]);

  return (
    <section className="relative w-full bg-[#0D0010] overflow-hidden flex flex-col items-center p-2">
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

      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage:
            "linear-gradient(#6B2FD9 1px, transparent 1px), linear-gradient(90deg, #6B2FD9 1px, transparent 1px)",
          backgroundSize: isMobile ? "100px 100px" : "60px 60px",
        }}
      />

      <div className="relative z-20 w-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
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
              className="font-bold"
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
            გამოცადე ახალი ენერგიის დონე ჩვენი უახლესი ფორმულით, DOPAMINE
            Energy,{" "}
            <span
              style={{
                textShadow: "0 0 20px #F5E642, 0 0 40px rgba(245,230,66,0.5)",
              }}
              className="text-[#F5E642]"
            >
              რაც მთავარია ცივი დამლიე
            </span>
          </p>

          <div
            ref={btnRef}
            className="opacity-0 flex gap-4 flex-wrap will-change-transform"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#F5E642",
                color: "black",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 font-bold shadow-white rounded-full transition-all duration-200"
              style={{ backgroundColor: "#6B2FD9", color: "white" }}
            >
              <a href="/products">მეტი ინფორმაცია</a>
            </motion.button>
          </div>

          <div className="flex gap-8 pt-4">
            {[
              { value: "250ml", label: "ენერგია" },
              { value: "100%", label: "ფოკუსი" },
              { value: "80mg", label: "caffeine" },
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

        <div
          ref={canvasWrapRef}
          className="flex-1 w-full h-75 sm:h-100 md:h-150 flex items-center justify-center relative z-0 overflow-hidden"
        >
          {isMobile === null ? null : isMobile ? (
            <div className="relative flex items-center justify-center w-full h-full">
              <div
                ref={canGlowRef}
                className="absolute w-56 h-56 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(107,47,217,0.7) 0%, transparent 70%)",
                  filter: "blur(24px)",
                  opacity: 0,

                  willChange: "transform, opacity",
                }}
              />

              <div
                ref={canImageRef}
                className="relative"
                style={{
                  width: "380px",
                  height: "320px",
                  opacity: 0,
                  willChange: "transform, opacity",
                }}
              >
                <Image
                  src={photo}
                  alt="Dopamine Can"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>
          ) : (
            <Canvas
              frameloop={isVisible ? "always" : "demand"}
              dpr={[1, 1.5]}
              performance={{ min: 0.5 }}
              gl={{ antialias: false, powerPreference: "high-performance" }}
              camera={{ position: [0, 1.5, 8], fov: 45 }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[3, 3, 3]} intensity={1} />
              <Suspense fallback={null}>
                <group position={[0, -1, 0]}>
                  <CanModel />
                </group>
                <Environment preset="studio" />
              </Suspense>
            </Canvas>
          )}
        </div>
      </div>

      {isMobile && (
        <div
          ref={mobileExtrasRef}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 pb-20 flex flex-col gap-3 md:hidden"
        >
          <p
            className="text-xs tracking-widest uppercase text-center mb-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            რატომ DOPAMINE
          </p>

          {[
            {
              icon: "⚡",
              title: "სწრაფი ეფექტი",
              desc: "პირველი სასმელიდანვე იგრძნობ განსხვავებას",
            },
            {
              icon: "🧠",
              title: "ფოკუსი",
              desc: "80mg კოფეინი + B ვიტამინები ტვინის მუშაობისთვის",
            },
            { icon: "❄️", title: "ცივად დალიე", desc: "საუკეთესო გემო 4°C-ზე" },
          ].map((item) => (
            <div
              key={item.title}
              className="mobile-feature-card flex items-center gap-4 p-4 rounded-2xl opacity-0"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(107,47,217,0.15)",

                willChange: "transform, opacity",
              }}
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <p className="font-bold text-white text-sm">{item.title}</p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
