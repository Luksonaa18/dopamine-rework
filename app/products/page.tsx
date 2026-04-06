"use client";

import Image from "next/image";
import photo from "@/public/UN.png";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Product = () => {
  const [isShown, setIsShown] = useState(false);

  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isShown ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShown]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.2",
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.35",
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.35 ,ease:"power3.inOut"},
       
      )
      .fromTo(
        imageCardRef.current,
        { opacity: 0, x: 60, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 0.5 },
        "-=0.6",
      );

    gsap.to(imageRef.current, {
      y: -12,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (isShown) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );

      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
      );
    }
  }, [isShown]);

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-hidden bg-[#0D0010] text-white">
        <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-20">
          <div className="pointer-events-none absolute left-1/2 top-20 h-44 w-44 -translate-x-1/2 rounded-full bg-[#6B2FD9]/25 blur-3xl sm:h-60 sm:w-60 md:top-24 md:h-72 md:w-72" />
          <div className="pointer-events-none absolute bottom-8 right-4 h-32 w-32 rounded-full bg-[#F5E642]/10 blur-3xl sm:bottom-10 sm:right-10 sm:h-44 sm:w-44 md:h-56 md:w-56" />

          <div className="relative z-10 grid w-full items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span
                ref={badgeRef}
                className="mb-4 rounded-full border border-[#6B2FD9]/40 bg-[#1A0B24]/80 px-4 py-1 text-xs font-medium text-[#C9A9FF] shadow-md sm:text-sm"
              >
                DOPAMINE ENERGY
              </span>

              <h1
                ref={titleRef}
                className="max-w-xl text-2xl font-extrabold leading-tight sm:text-3xl md:text-5xl"
              >
                რათქმაუნდა
                <span className="block text-[#F5E642]">
                  დაინტერესდები პროდუქტის ნუტრიციით
                </span>
              </h1>

              <p
                ref={textRef}
                className="mt-4 max-w-lg text-sm font-normal leading-6 text-white/70 sm:mt-5 sm:text-base sm:leading-7"
              >
                ნახე ინფორმაცია ჩვენს პროდუქტზე, მის შემადგენლობაზე და მთავარ
                მახასიათებლებზე. ყველაფერი ერთ ადგილას, მარტივად და ლამაზად.
              </p>

              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
                <button
                  ref={buttonRef}
                  onClick={() => setIsShown((prev) => !prev)}
                  className="w-full rounded-xl bg-[#F5E642] px-6 py-3 text-sm font-bold text-black transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(245,230,66,0.35)] sm:w-auto"
                >
                  დააჭირე ღილაკს
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute h-60 w-60 rounded-full bg-[#6B2FD9]/30 blur-3xl sm:h-72 sm:w-72 md:h-80 md:w-[320px]" />

              <div
                ref={imageCardRef}
                className="relative w-full max-w-90 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md sm:rounded-[28px] sm:p-6"
              >
                <div
                  ref={imageRef}
                  className="relative mx-auto aspect-4/5 w-full max-w-70 sm:max-w-[320px]"
                >
                  <Image
                    src={photo}
                    alt="Dopamine Can"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 380px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {isShown && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
        >
          <div
            ref={modalRef}
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg sm:p-6"
          >
            <h2 className="mb-4 text-lg font-bold text-black sm:text-xl">
              პროდუქტის ნუტრიცია
            </h2>

            <p className="text-sm leading-6 text-gray-700 sm:text-base">
              ჩვენი პროდუქტი შეიცავს ბუნებრივ ინგრედიენტებს, რომლებიც ხელს
              უწყობენ ენერგიის მომატებას და კონცენტრაციის გაუმჯობესებას.
              თითოეული ქილა შეიცავს 150 მლ ენერგეტიკულ სასმელს, რომელიც მდიდარია
              ვიტამინებით და მინერალებით.
            </p>

            <button
              onClick={() => setIsShown(false)}
              className="mt-5 w-full rounded-md bg-[#F5E642] px-4 py-2 text-sm font-bold text-black transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(245,230,66,0.35)] sm:w-auto"
            >
              დახურვა
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Product;
