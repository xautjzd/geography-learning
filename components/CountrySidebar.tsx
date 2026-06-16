"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CountryData } from "@/lib/types";

interface CountrySidebarProps {
  country: CountryData | null;
  onClose: () => void;
}

export default function CountrySidebar({ country, onClose }: CountrySidebarProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className={`
        fixed right-0 top-0 h-full w-full sm:w-[420px] bg-[#0d1a2d] z-40
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        border-l border-[#1e3a5c] shadow-2xl
        ${country ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {country && (
        <>
          {/* Header image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={country.coverImage}
              alt={country.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1a2d]" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="关闭"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-5">
              <span className="text-xs text-amber-400 uppercase tracking-widest font-medium">
                {country.region}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-8">
            <h2 className="text-3xl font-bold text-white mt-2">{country.name}</h2>
            <p className="text-sm text-[#6b8cba] mt-1">{country.nameEn} · {country.capital}</p>

            <p className="mt-5 text-[#b8c9e0] text-sm leading-relaxed">{country.summary}</p>

            {/* Key facts */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "面积", value: country.keyFacts.area },
                { label: "人口", value: country.keyFacts.population },
                { label: "主要地形", value: country.keyFacts.terrain },
                { label: "气候类型", value: country.keyFacts.climate },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#0a1526] rounded-lg p-3 border border-[#1e3a5c]">
                  <p className="text-xs text-[#4a6fa5] uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-[#d0e0f0] mt-1 font-medium leading-snug">{value}</p>
                </div>
              ))}
            </div>

            {/* Impact chain preview */}
            {country.hasContent && (
              <div className="mt-6">
                <h3 className="text-xs text-amber-400 uppercase tracking-widest font-medium mb-3">
                  地理影响链
                </h3>
                <div className="space-y-2">
                  {[
                    { key: "terrain", label: "地形" },
                    { key: "climate", label: "气候" },
                    { key: "history", label: "历史" },
                    { key: "economy", label: "经济" },
                    { key: "population", label: "人口" },
                  ].map(({ key, label }) => {
                    const section = country.impactChain[key as keyof typeof country.impactChain];
                    if (!section.title) return null;
                    return (
                      <div
                        key={key}
                        className="flex items-center gap-3 py-2 border-b border-[#1e3a5c]/50"
                      >
                        <span className="text-xs text-[#4a6fa5] w-10 shrink-0">{label}</span>
                        <span className="text-sm text-[#8aaed4] line-clamp-1">{section.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8">
              {country.hasContent ? (
                <Link
                  href={`/country/${country.slug}`}
                  className="block w-full text-center py-3 bg-amber-500 hover:bg-amber-400 text-[#0a0f1a] font-semibold rounded-lg transition-colors text-sm"
                >
                  深入了解 →
                </Link>
              ) : (
                <div className="text-center py-3 border border-[#1e3a5c] rounded-lg text-[#4a6fa5] text-sm">
                  内容正在准备中
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
