"use client";

import { useRef } from "react";
import Image from "next/image";
import image1 from "@/public/Savetik-Net_7624210792434519317_1_v2.jpeg";
import image2 from "@/public/Savetik-Net_7624210792434519317_2_v2.jpeg";
import image3 from "@/public/Savetik-Net_7624210792434519317_3_v2.jpeg";
import image4 from "@/public/Savetik-Net_7624210792434519317_4_v2.jpeg";
import image5 from "@/public/Savetik-Net_7624210792434519317_5_v2.jpeg";

export default function Content() {
  
  
  const videoRef = useRef<HTMLVideoElement>(null);




  return (
    <>
      
      <section className="relative w-full min-h-[70vh] md:min-h-screen overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/kako.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[#0D0010]/60" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-6 h-full">
          <p className="text-white/60 mt-3 md:mt-4 md:text-2xl font-bold max-w-md ">
            შეიგრძენი DOPAMINE, გამოიყენე მომენტი.
          </p>
        </div>

     
      </section>
      <section className="w-full bg-[#0D0010] px-4 md:px-6 py-12">
        {/* heading */}
        <div className="text-center leading-none mb-10">
          <h1 className="text-4xl md:text-7xl font-black text-blue-600 tracking-tight">
            DARE
          </h1>

          <div className="relative inline-block">
            <span className="text-xl md:text-3xl font-bold text-[#F5E642] tracking-[0.3em]">
              TO BE
            </span>
            <div className="absolute inset-0 blur-xl bg-[#F5E642]/30 -z-10" />
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#F5E642] to-white drop-shadow-[0_0_25px_#F5E64280]">
            STUPID
          </h1>
        </div>

        
        <div
          className="grid gap-3 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          auto-rows-[200px] md:auto-rows-[250px]"
        >
          
          <div className="sm:col-span-2 md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group">
            <Image
              src={image1}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
          </div>

          {[image2, image3, image4, image5].map((img, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden group">
              <Image
                src={img}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
