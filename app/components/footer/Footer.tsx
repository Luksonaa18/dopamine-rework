"use client";
import { useState } from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const links = {
    Product: [{ name: "ყველა ინფორმაციისთვის ეწვიეთ ჩვენს სოციალურ ქსელებს" }],
    Company: [
      { name: "ჩვენ შესახებ", href: "https://www.tiktok.com/@dopamine.energy/video/7624523299577449749" },
      { name: "კონტაქტი", href: "https://www.instagram.com/dopamine.energy?igsh=MWY5aXhnZXphaHFkMg==" },
    ],
  };

  const socials = [
    {
      icon: <FaInstagram className="text-xl" />,
      href: "https://www.instagram.com/dopamine.energy?igsh=MWY5aXhnZXphaHFkMg==",
      label: "Instagram",
    },
    {
      icon: <FaTiktok className="text-xl" />,
      href: "https://www.tiktok.com/@dopamine.energy",
      label: "TikTok",
    },
    {
      icon: <FaYoutube className="text-xl" />,
      href: "https://www.youtube.com/@HumanKako",
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative w-full bg-[#0D0010] border-t border-[#6B2FD9]/30 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#6B2FD9] to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-[#6B2FD9]/10 blur-[40px]" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-[#6B2FD9]/20">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-black text-[#F5E642] tracking-wider">
                DOPAMINE
              </h2>
              <p className="text-white/40 text-sm mt-1 tracking-widest uppercase">
                by kako
              </p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              DOPAMINE არის ენერგეტიკული სასმელი, რომელიც შექმნილია მაქსიმალური
              ენერგიისა და გამძლეობისთვის, შეიგრძენი ის.
            </p>

            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#6B2FD9]/40 flex items-center justify-center text-white/60 hover:border-[#F5E642] hover:text-[#F5E642] hover:shadow-[0_0_12px_#F5E64240] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category} className="flex flex-col gap-4">
              <h3 className="text-white font-bold text-sm tracking-widest uppercase">
                {category}
              </h3>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.name}>
                    <a className="text-white/40 text-sm hover:text-[#F5E642] transition-colors duration-200 relative group">
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-widest">
            © {new Date().getFullYear()} DOPAMINE by Kako. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5E642] animate-pulse" />
            <span className="text-white/20 text-xs tracking-widest uppercase">
              Pure Energy. Zero Limits.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
