"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { User, Menu, X, MapPin, Info, Mail, LogOut, UserCircle } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SITE_CONFIG } from "@/config/site";
import { useMessages } from "next-intl";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { useScrollPosition, useClickOutside } from "@/hooks";
import { ROUTES, routeHref } from "@/config/routes";

interface UserAvatarContentProps {
  name: string;
  picture?: string;
  size: number;
}

const UserAvatarContent: React.FC<UserAvatarContentProps> = ({ name, picture, size }) => {
  if (picture) {
    return (
      <Image
        src={picture}
        alt={name}
        width={size}
        height={size}
        className="h-full w-full object-cover"
        referrerPolicy="no-referrer"
        unoptimized
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-text">
      <span className="text-sm font-bold text-white">{name.trim().charAt(0)}</span>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // El menú móvil queda "anclado" a la ruta en la que se abrió: al navegar,
  // `pathname` cambia y el menú se cierra solo, sin efectos ni renders extra.
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null);
  const isOpen = menuOpenedAt === pathname;
  const setIsOpen = useCallback(
    (open: boolean) => setMenuOpenedAt(open ? pathname : null),
    [pathname],
  );

  const openLogin = useCallback(() => {
    router.push({ pathname: ROUTES.login, query: { callbackUrl: window.location.pathname } });
  }, [router]);
  const scrolled = useScrollPosition(50);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const content = useMessages();
  const { navbar } = content;

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  const isActive = (path: string) => pathname === path;

  const closeUserMenu = useCallback(() => setShowUserMenu(false), []);
  useClickOutside(userMenuRef, closeUserMenu);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleLogout = useCallback(async () => {
    setShowUserMenu(false);
    await signOut();
  }, [signOut]);

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Top bar */}
      <div
        className={`hidden w-full overflow-hidden bg-brand-dark transition-[max-height,opacity] duration-500 ease-smooth-out lg:block ${
          scrolled
            ? "pointer-events-none max-h-0 opacity-0"
            : "max-h-12 animate-topbar-in opacity-100"
        }`}
        aria-hidden={scrolled ? "true" : "false"}
      >
        <div
          className={`transition-transform duration-500 ease-smooth-out ${
            scrolled ? "-translate-y-2" : "translate-y-0"
          }`}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-2.5 sm:flex-row sm:gap-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 text-xs sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white">
                <MapPin size={14} className="flex-shrink-0 text-brand-primary" />
                <span className="hidden sm:inline">{SITE_CONFIG.contact.location}</span>
                <span className="sm:hidden">{navbar.locationShort}</span>
              </div>
              <div className="hidden items-center gap-2 text-slate-300 transition-colors hover:text-white md:flex">
                <Info size={14} className="flex-shrink-0 text-brand-primary" />
                <span>{navbar.purpose}</span>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.social.email}`}
                className="hidden items-center gap-2 font-medium text-slate-300 transition-colors hover:text-brand-primary lg:flex"
              >
                <Mail size={14} className="flex-shrink-0 text-brand-primary" />
                <span>{SITE_CONFIG.social.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden text-sm font-medium text-slate-400 sm:inline">
                {navbar.followUs}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition-all duration-300 hover:scale-110 hover:text-brand-primary hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
                  aria-label="Facebook"
                  title={navbar.socialLabels.facebook}
                >
                  <FaFacebookF className="text-lg" />
                </a>
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition-all duration-300 hover:scale-110 hover:text-brand-primary hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
                  aria-label="Instagram"
                  title={navbar.socialLabels.instagram}
                >
                  <FaInstagram className="text-lg" />
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition-all duration-300 hover:scale-110 hover:text-brand-primary hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
                  aria-label="YouTube"
                  title={navbar.socialLabels.youtube}
                >
                  <FaYoutube className="text-lg" />
                </a>
                <a
                  href={SITE_CONFIG.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition-all duration-300 hover:scale-110 hover:text-brand-primary hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.6)]"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <FaXTwitter className="text-lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`${
          isTransparent ? "bg-transparent" : "bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]"
        } transition-all duration-500 ease-smooth-out`}
        aria-label={navbar.mainNavLabel}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-1.5 sm:h-16 sm:gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex min-w-0 flex-shrink items-center"
              aria-label="Ir al inicio - Explorando La Convención"
            >
              <Image
                src="/images/brand/logo.png"
                alt="Explorando La Convención - Turismo en Quillabamba"
                width={1486}
                height={515}
                priority
                className="saturate-125 h-9 w-auto max-w-[8.5rem] object-contain brightness-110 contrast-125 drop-shadow-[0_2px_4px_rgba(255,255,255,0.35)] sm:h-12 sm:max-w-[12rem] lg:h-12 lg:max-w-none"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden items-center space-x-4 lg:flex">
              {content.navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={routeHref(item.route)}
                  className={`px-4 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(routeHref(item.route))
                      ? "text-brand-primary drop-shadow-sm"
                      : !isTransparent
                        ? "text-brand-text hover:text-brand-primary"
                        : "text-white hover:text-brand-primary"
                  }`}
                  aria-current={isActive(routeHref(item.route)) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}

              <div className="ml-4 flex items-center gap-3">
                <LanguageSelector scrolled={!isTransparent} />
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      type="button"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="border-brand-primary/25 h-10 w-10 overflow-hidden rounded-full border-2 transition-colors hover:border-brand-primary"
                      aria-label={navbar.profile}
                      aria-expanded={showUserMenu ? "true" : "false"}
                    >
                      <UserAvatarContent name={user.name} picture={user.picture} size={40} />
                    </button>

                    {showUserMenu && (
                      <div className="border-brand-primary/20 absolute right-0 z-50 mt-2 w-64 rounded-lg border bg-white py-2 shadow-2xl">
                        <Link
                          href={ROUTES.profile}
                          onClick={() => setShowUserMenu(false)}
                          className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-brand-background"
                        >
                          <UserCircle className="text-brand-text/75 h-5 w-5" />
                          <span className="text-sm font-medium text-brand-text">
                            {navbar.profile}
                          </span>
                        </Link>
                        <div className="border-brand-primary/20 my-2 border-t" />
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-5 w-5 text-red-600" />
                          <span className="text-sm font-medium text-red-600">{navbar.logout}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openLogin}
                    className={`rounded-full p-2 transition-colors duration-200 focus:outline-none ${
                      !isTransparent ? "text-brand-text" : "text-white"
                    }`}
                    aria-label={navbar.login}
                    title={navbar.login}
                  >
                    <User className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2 lg:hidden">
              <LanguageSelector scrolled={!isTransparent} compact />
              {user ? (
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="h-8 w-8 overflow-hidden rounded-full transition-colors duration-200"
                  aria-label={navbar.profile}
                  aria-expanded={showUserMenu ? "true" : "false"}
                >
                  <UserAvatarContent name={user.name} picture={user.picture} size={32} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openLogin}
                  className={`rounded-full p-2 transition-colors duration-200 focus:outline-none ${
                    !isTransparent ? "text-brand-text" : "text-white"
                  }`}
                  aria-label={navbar.login}
                  title={navbar.login}
                >
                  <User className="h-5 w-5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center rounded-lg p-2 transition-all duration-200 focus:outline-none ${
                  !isTransparent ? "text-brand-text" : "text-white"
                }`}
                aria-label={isOpen ? navbar.closeMenu : navbar.openMenu}
                aria-expanded={isOpen ? "true" : "false"}
              >
                {isOpen ? (
                  <X className="h-6 w-6" strokeWidth={2.5} />
                ) : (
                  <Menu className="h-6 w-6" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={navbar.mobileMenuLabel}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            aria-label={navbar.closeMenu}
            onClick={() => setIsOpen(false)}
          />

          <aside className="border-brand-primary/20 absolute right-0 top-0 h-full w-[min(20rem,86vw)] border-l bg-white shadow-2xl">
            <div className="border-brand-primary/20 flex h-16 items-center justify-between border-b px-5">
              <span className="text-sm font-bold uppercase tracking-wide text-brand-text">
                {navbar.menuTitle}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-brand-text/90 focus:ring-brand-primary/70 inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-brand-background focus:outline-none focus:ring-2"
                aria-label={navbar.closeMenu}
              >
                <X className="h-6 w-6" strokeWidth={2.5} />
              </button>
            </div>

            <nav className="px-3 py-4" aria-label={navbar.mobileMenuLabel}>
              <ul className="space-y-1">
                {content.navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={routeHref(item.route)}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${
                        isActive(routeHref(item.route))
                          ? "bg-brand-primary/10 text-brand-primary"
                          : "text-brand-text/90 hover:bg-brand-background hover:text-brand-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive(routeHref(item.route)) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Mobile user menu overlay */}
      {showUserMenu && user && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUserMenu(false)}
          />
          <div className="border-brand-primary/20 absolute left-4 right-4 top-20 rounded-lg border bg-white p-2 shadow-2xl sm:left-auto sm:w-80">
            <Link
              href={ROUTES.profile}
              onClick={() => setShowUserMenu(false)}
              className="text-brand-text/90 flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-brand-background"
            >
              <UserCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{navbar.profile}</span>
            </Link>
            <div className="border-brand-primary/20 my-2 border-t" />
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition-colors duration-200 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">{navbar.logout}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
