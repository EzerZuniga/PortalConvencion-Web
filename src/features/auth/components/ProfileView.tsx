"use client";

import React from "react";
import Image from "next/image";
import { ROUTES } from "@/config/routes";
import { useRouter } from "@/lib/i18n/navigation";
import { ArrowLeft, Mail, User as UserIcon, Shield } from "lucide-react";
import { useAuth } from "@/features/auth";

const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  apple: "Apple",
  github: "GitHub",
  microsoft: "Microsoft",
};

export function ProfileView() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-brand-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="to-brand-secondary/10 min-h-screen bg-gradient-to-br from-brand-background via-white py-8 sm:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Back button */}
        <button
          onClick={() => router.push(ROUTES.home)}
          className="group mb-8 flex items-center gap-2 text-brand-primary transition-all duration-200 hover:text-brand-text"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-semibold">Volver al inicio</span>
        </button>

        {/* Profile card */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
          {/* Header */}
          <div className="flex flex-col items-center gap-6 bg-gradient-to-r from-[#111B21] to-[#1a2c36] px-8 py-10 sm:flex-row sm:items-end">
            <div className="relative">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/20">
                  <UserIcon className="h-10 w-10 text-white" />
                </div>
              )}
            </div>
            <div className="pb-1 text-center sm:text-left">
              <h1 className="font-heading text-2xl font-bold leading-tight text-white">
                {user.name}
              </h1>
              <p className="mt-1 text-sm text-white/80">{user.email}</p>
            </div>
          </div>

          {/* Info fields */}
          <div className="space-y-4 px-8 py-8">
            <InfoRow icon={UserIcon} label="Nombre" value={user.name} />
            <InfoRow icon={Mail} label="Correo electrónico" value={user.email} />
            <InfoRow
              icon={Shield}
              label="Proveedor de acceso"
              value={PROVIDER_LABELS[user.provider ?? ""] ?? "OAuth"}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-gray-100 px-8 py-6">
            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-200 px-6 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component ────────────────────────────────────────────────────────────
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
      <div className="bg-brand-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
        <Icon className="h-5 w-5 text-brand-primary" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-brand-text">{value}</p>
      </div>
    </div>
  );
}
