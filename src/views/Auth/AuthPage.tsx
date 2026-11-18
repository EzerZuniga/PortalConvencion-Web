"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth/client";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Compass, MapPin, Heart } from "lucide-react";
import { ROUTES } from "@/config/routes";

// ─── Benefits list ─────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    icon: MapPin,
    label: "Guarda tus destinos favoritos",
    iconColor: "text-emerald-300",
  },
  {
    icon: Heart,
    label: "Crea listas de lugares increíbles",
    iconColor: "text-rose-300",
  },
  {
    icon: Compass,
    label: "Planifica rutas personalizadas",
    iconColor: "text-amber-300",
  },
] as const;

// ─── OAuth provider config ─────────────────────────────────────────────────────
type OAuthProvider = {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  className: string;
};

const OAUTH_PROVIDERS: OAuthProvider[] = [
  {
    id: "google",
    label: "Continuar con Google",
    Icon: FcGoogle,
    className:
      "flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
  },
  {
    id: "apple",
    label: "Continuar con Apple",
    Icon: FaApple,
    className:
      "flex w-full items-center justify-center gap-3 rounded-xl border border-gray-900 bg-gray-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offset-gray-900",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSignIn = async (providerId: string) => {
    setLoadingProvider(providerId);
    try {
      await signIn(providerId, { callbackUrl });
    } catch {
      // El provider redirige — si hay error, restablecemos el estado
      setLoadingProvider(null);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* ── Panel izquierdo — branding ─────────────────────────────────────── */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-brand-primary p-12 lg:flex">
        {/* Fondo oscuro base */}
        <div className="absolute inset-0 bg-[#111B21]" />
        {/* Destellos decorativos en verde primario */}
        <div className="bg-brand-primary/10 absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full blur-3xl" />
        <div className="bg-brand-primary/8 absolute left-0 top-1/4 h-64 w-64 -translate-x-1/3 rounded-full blur-2xl" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <Image
            src="/images/brand/logo.png"
            alt="Explorando la Convención"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-heading text-lg font-bold text-white">
            Explorando la Convención
          </span>
        </div>

        {/* Benefits */}
        <div className="relative z-10 space-y-6">
          <h2 className="font-heading text-3xl font-bold leading-tight text-white">
            Descubre La Convención como nunca antes
          </h2>
          <ul className="space-y-4">
            {BENEFITS.map(({ icon: Icon, label, iconColor }) => (
              <li key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <span className="font-medium text-white/90">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer del panel */}
        <div className="relative z-10">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Explorando la Convención
          </p>
        </div>
      </div>

      {/* ── Panel derecho — formulario OAuth ──────────────────────────────── */}
      <div className="flex flex-col items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-16">
        <div className="w-full max-w-sm">
          {/* Logo móvil */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Image
              src="/images/brand/logo.png"
              alt="Explorando la Convención"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-heading font-bold text-brand-text">Explorando la Convención</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 font-heading text-2xl font-bold text-brand-text">
              Bienvenido de vuelta
            </h1>
            <p className="text-sm text-gray-500">
              Accede con tu cuenta para personalizar tu experiencia
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            {OAUTH_PROVIDERS.map(({ id, label, Icon, iconClassName, className }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSignIn(id)}
                disabled={loadingProvider !== null}
                aria-busy={loadingProvider === id}
                className={className}
              >
                {loadingProvider === id ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Icon className={`h-5 w-5 flex-shrink-0 ${iconClassName ?? ""}`} />
                )}
                <span>{loadingProvider === id ? "Redirigiendo..." : label}</span>
              </button>
            ))}
          </div>

          {/* Divider + back link */}
          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 transition-colors hover:text-brand-primary"
            >
              ← Volver al portal
            </Link>
          </div>

          {/* Legal */}
          <p className="mt-6 text-center text-xs leading-relaxed text-gray-400">
            Al continuar aceptas nuestros{" "}
            <Link href={ROUTES.terms} className="underline hover:text-gray-600">
              Términos de uso
            </Link>{" "}
            y{" "}
            <Link href={ROUTES.privacy} className="underline hover:text-gray-600">
              Política de privacidad
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
