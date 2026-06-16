"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { CountryData } from "@/lib/types";
import { countries } from "@/data/countries";
import CountrySidebar from "@/components/CountrySidebar";
import Link from "next/link";

const WorldMap = lazy(() => import("@/components/WorldMap"));

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const handleCountryClick = useCallback((country: CountryData) => {
    setSelectedCountry(country);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCountry(null);
  }, []);

  return (
    <main className="flex flex-col h-screen pt-[60px]">
      {/* Hero text */}
      <div className="absolute top-[72px] left-6 z-10 max-w-xs pointer-events-none">
        <h1 className="text-2xl font-bold text-white leading-tight">
          地理，是历史的<br />
          <span className="text-amber-400">底层逻辑</span>
        </h1>
        <p className="mt-2 text-xs text-[#6b8cba] leading-relaxed">
          点击地图上的国家，探索地形与气候<br />如何塑造文明的走向
        </p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-6 z-10 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 text-xs text-[#6b8cba]">
          <span className="w-3 h-3 rounded-sm bg-[#1e4976] inline-block" />
          <span>已收录国家</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6b8cba]">
          <span className="w-3 h-3 rounded-sm bg-[#c9a84c] inline-block" />
          <span>当前选中</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6b8cba]">
          <span className="w-3 h-3 rounded-sm bg-[#1a2035] inline-block" />
          <span>暂未收录</span>
        </div>
      </div>

      {/* Topic shortcut */}
      <div className="absolute bottom-8 right-6 z-10 flex flex-col gap-2">
        <p className="text-xs text-[#4a6fa5] mb-1">精选专题</p>
        {[
          { slug: "silk-road", label: "丝绸之路" },
          { slug: "mongol-empire", label: "蒙古帝国" },
          { slug: "nile-basin", label: "尼罗河流域" },
        ].map((t) => (
          <Link
            key={t.slug}
            href={`/topic/${t.slug}`}
            className="text-xs px-3 py-1.5 bg-[#0d1a2d] border border-[#1e3a5c] rounded text-[#6b8cba] hover:text-amber-400 hover:border-amber-400/30 transition-colors"
          >
            {t.label} →
          </Link>
        ))}
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full text-[#4a6fa5] text-sm">
              加载地图中…
            </div>
          }
        >
          <WorldMap
            countries={countries}
            selectedSlug={selectedCountry?.slug ?? null}
            onCountryClick={handleCountryClick}
          />
        </Suspense>
      </div>

      {/* Sidebar overlay backdrop (mobile) */}
      {selectedCountry && (
        <div
          className="fixed inset-0 bg-black/40 z-30 sm:hidden"
          onClick={handleClose}
        />
      )}

      <CountrySidebar country={selectedCountry} onClose={handleClose} />
    </main>
  );
}
