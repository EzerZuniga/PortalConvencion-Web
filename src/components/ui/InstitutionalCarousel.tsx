"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/images/institutional/muniConvencion.png", alt: "Muni Convención" },
  { src: "/images/institutional/quillaban.png", alt: "Quillabamba" },
  { src: "/images/institutional/Region.png", alt: "Región" },
  { src: "/images/institutional/Uac.png", alt: "UAC" },
  { src: "/images/institutional/UC.png", alt: "UC" },
  { src: "/images/institutional/UniT.png", alt: "UniT" },
  { src: "/images/institutional/UNIunsaac.png", alt: "UNSAAC" },
];

// We double the logos array so that the marquee can loop seamlessly
const doubledLogos = [...logos, ...logos, ...logos, ...logos];

export function InstitutionalCarousel() {
  return (
    <div className="w-full overflow-hidden bg-white py-8 sm:py-12">
      <div className="mx-auto mb-8 max-w-3xl px-4 text-center sm:mb-10">
        <h2 className="text-lg font-bold uppercase tracking-tight text-brand-text sm:text-xl lg:text-2xl">
          Ecosistema Institucional
        </h2>
        <div className="mx-auto mb-4 mt-3 h-1 w-14 bg-brand-primary" />
        <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
          Nuestra red de respaldo académico y regional. Un proyecto impulsado por el talento formado
          en las principales instituciones de nuestra región.
        </p>
      </div>

      <div className="group relative flex w-full flex-col items-center overflow-hidden">
        {/* Gradients to fade the edges smoothly */}
        <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {doubledLogos.map((logo, index) => (
            <div
              key={index}
              className="mx-10 flex w-[180px] flex-shrink-0 items-center justify-center transition-all duration-300 sm:mx-20 sm:w-[240px] md:w-[280px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={280}
                height={140}
                className="h-auto max-h-[120px] w-full object-contain opacity-70 grayscale filter transition-all duration-500 hover:scale-110 hover:opacity-100 hover:grayscale-0 sm:max-h-[140px]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
