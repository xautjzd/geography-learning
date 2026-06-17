import Link from "next/link";
import { countries } from "@/data/countries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "国家列表 — 寰宇志",
  description: "探索38个重点国家的地理影响链",
};

const regions = ["亚洲", "欧洲", "非洲", "美洲", "中东", "大洋洲"];

export default function CountriesPage() {
  const byRegion = Object.fromEntries(
    regions.map((r) => [r, countries.filter((c) => c.region === r)])
  );

  return (
    <main className="min-h-screen pt-[80px] pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">国家地理志</h1>
          <p className="mt-3 text-[#6b8cba]">
            {countries.length} 个重点国家，以地理影响链视角解析文明塑造逻辑。
            <span className="ml-2 text-amber-400">
              {countries.filter((c) => c.hasContent).length} 个已收录深度内容
            </span>
          </p>
        </div>

        {regions.map((region) => {
          const list = byRegion[region];
          if (!list || list.length === 0) return null;
          return (
            <div key={region} className="mb-12">
              <h2 className="text-xs text-amber-400 uppercase tracking-widest font-medium mb-5">
                {region}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {list.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/country/${country.slug}`}
                    className={`group relative overflow-hidden rounded-xl border transition-all ${
                      country.hasContent
                        ? "border-[#1e3a5c] hover:border-amber-400/50 hover:shadow-md hover:shadow-amber-400/10"
                        : "border-[#1a2a40] opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="h-24 overflow-hidden bg-gradient-to-b from-[#0d1a2d] to-[#0a0f1a]">
                      <img
                        src={country.coverImage}
                        alt={country.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <p className="text-sm font-bold text-white">{country.name}</p>
                      <p className="text-xs text-[#4a6fa5]">{country.capital}</p>
                    </div>
                    {country.hasContent && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
