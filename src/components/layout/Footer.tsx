"use client";

import { Facebook, Instagram, Youtube, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { useLanguage } from "@/features/i18n";

export default function Footer() {
  const { content } = useLanguage();
  const { footer } = content;

  return (
    <footer className="bg-[#111B21] text-sm text-brand-background">
      <div
        aria-hidden="true"
        className="h-5 w-full bg-[url('/images/ui/divider.png')] bg-[length:auto_20px] bg-top bg-repeat-x"
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:gap-12">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="mb-4 flex items-center justify-center">
            <Image
              src="/images/brand/logo-footer.png"
              alt={footer.logoAlt}
              width={1486}
              height={515}
              className="saturate-125 h-auto w-40 brightness-110 contrast-125 drop-shadow-[0_2px_5px_rgba(255,255,255,0.24)] sm:w-48 md:w-52"
            />
          </Link>
          <p className="max-w-[22rem] text-center text-sm leading-relaxed text-white/75 sm:text-[15px] md:text-left">
            {footer.description}
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label={content.navbar.mainNavLabel}>
          <h3 className="mb-4 text-[15px] font-bold uppercase tracking-wide text-white sm:text-base">
            {footer.navigationTitle}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {content.navigation.footerMain.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-3 py-1 text-sm font-medium text-white/80 transition-colors hover:text-brand-primary sm:text-[15px]"
                >
                  <span className="text-brand-primary transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Info */}
        <nav aria-label={footer.infoTitle}>
          <h3 className="mb-4 text-[15px] font-bold uppercase tracking-wide text-white sm:text-base">
            {footer.infoTitle}
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            {content.navigation.footerInfo.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-3 py-1 text-sm font-medium text-white/80 transition-colors hover:text-brand-primary sm:text-[15px]"
                >
                  <span className="text-brand-primary transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mb-4 text-[15px] font-bold uppercase tracking-wide text-white sm:text-base">
            {footer.followTitle}
          </h3>
          <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-4 md:justify-start">
            {[
              {
                icon: (props: { size?: number }) => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={props.size || 24}
                    height={props.size || 24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    {...props}
                  >
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                ),
                href: SITE_CONFIG.social.twitter,
                label: "X (Twitter)",
              },
              { icon: Youtube, href: SITE_CONFIG.social.youtube, label: "YouTube" },
              { icon: Instagram, href: SITE_CONFIG.social.instagram, label: "Instagram" },
              { icon: Facebook, href: SITE_CONFIG.social.facebook, label: "Facebook" },
              { icon: Github, href: SITE_CONFIG.social.github, label: "Github" },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="group relative flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-full border border-white/80 bg-transparent transition-all duration-500 hover:border-brand-primary hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute left-1/2 top-full aspect-square w-[250%] origin-center -translate-x-1/2 -translate-y-1/2 scale-0 transform-gpu rounded-[50%] bg-brand-primary transition-transform duration-700 ease-ripple group-hover:scale-100" />
                  <Icon
                    size={20}
                    className="relative z-10 text-white transition-all duration-500 group-hover:scale-110 group-hover:text-white"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-white/82 mx-5 flex flex-col items-center justify-between gap-1 border-t border-white/30 px-1 py-4 text-[13px] font-semibold sm:mx-6 sm:flex-row sm:text-sm lg:mx-8">
        <span className="w-full text-center sm:text-left">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. {footer.rights}
        </span>
        <span className="mt-1 w-full whitespace-nowrap text-center sm:mt-0 sm:w-auto sm:text-right">
          {footer.developedBy}{" "}
          <a
            href="https://www.instagram.com/ezerzuniga.oficial16/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary/80 hover:text-brand-primary/70 after:bg-brand-primary/80 relative transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform hover:after:scale-x-100"
          >
            Ezer Zuniga
          </a>
        </span>
      </div>
      <div
        aria-hidden="true"
        className="h-5 w-full bg-[url('/images/ui/divider.png')] bg-[length:auto_20px] bg-bottom bg-repeat-x"
      />
    </footer>
  );
}
