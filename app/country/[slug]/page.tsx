import { notFound } from "next/navigation";
import Link from "next/link";
import { countries, getCountryBySlug } from "@/data/countries";
import { topics } from "@/data/topics";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return {};
  return {
    title: `${country.name} — 寰宇志`,
    description: country.summary,
  };
}

const impactKeys = [
  { key: "terrain", label: "地形", icon: "⛰" },
  { key: "climate", label: "气候", icon: "🌦" },
  { key: "history", label: "历史", icon: "📜" },
  { key: "economy", label: "经济", icon: "⚖" },
  { key: "population", label: "人口", icon: "👥" },
] as const;

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) notFound();

  if (!country.hasContent) {
    return (
      <div className="min-h-screen pt-[60px] flex flex-col items-center justify-center text-center px-6">
        <div className="text-6xl mb-6">🌍</div>
        <h1 className="text-3xl font-bold text-white mb-3">{country.name}</h1>
        <p className="text-[#6b8cba] max-w-md">{country.summary}</p>
        <div className="mt-8 px-6 py-3 border border-[#1e3a5c] rounded-lg text-[#4a6fa5] text-sm">
          深度内容正在撰写中，敬请期待
        </div>
        <Link href="/" className="mt-6 text-sm text-amber-400 hover:text-amber-300 transition-colors">
          ← 返回地图
        </Link>
      </div>
    );
  }

  const relatedTopics = topics.filter((t) => country.relatedTopics.includes(t.slug));

  return (
    <article className="min-h-screen pt-[60px]">
      {/* Hero */}
      <div className="relative h-[55vh] overflow-hidden bg-gradient-to-b from-[#0d1a2d] to-[#0a0f1a]">
        <img
          src={country.coverImage}
          alt={country.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0a0f1a]" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs text-amber-400 uppercase tracking-widest font-medium">
              {country.region}
            </span>
            <h1 className="text-5xl font-bold text-white mt-2">{country.name}</h1>
            <p className="text-lg text-[#8aaed4] mt-1">{country.nameEn} · {country.capital}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Summary */}
        <div className="mt-10 border-l-4 border-amber-400/60 pl-6">
          <p className="text-xl text-[#b8c9e0] leading-relaxed italic">{country.summary}</p>
        </div>

        {/* Key facts */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "国土面积", value: country.keyFacts.area },
            { label: "人口规模", value: country.keyFacts.population },
            { label: "GDP总量", value: country.keyFacts.gdp },
            { label: "主要地形", value: country.keyFacts.terrain },
            { label: "气候类型", value: country.keyFacts.climate },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-[#0d1a2d] rounded-xl p-4 border border-[#1e3a5c]"
            >
              <p className="text-xs text-[#4a6fa5] uppercase tracking-wide">{label}</p>
              <p className="text-sm text-[#d0e0f0] mt-2 font-medium leading-snug">{value}</p>
            </div>
          ))}
        </div>

        {/* Impact chain */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-[#1e3a5c]" />
            <h2 className="text-xs text-amber-400 uppercase tracking-widest font-medium whitespace-nowrap">
              地理影响链
            </h2>
            <div className="h-px flex-1 bg-[#1e3a5c]" />
          </div>

          <div className="space-y-12">
            {impactKeys.map(({ key, label, icon }, index) => {
              const section = country.impactChain[key];
              if (!section.title) return null;
              return (
                <section key={key}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <span className="text-xs text-[#4a6fa5] uppercase tracking-widest">
                        {label}影响
                      </span>
                      <h3 className="text-lg font-bold text-white">{section.title}</h3>
                    </div>
                    {index < impactKeys.length - 1 && (
                      <div className="ml-auto text-[#1e3a5c] text-2xl">↓</div>
                    )}
                  </div>
                  <p className="text-[#8aaed4] leading-8 text-base pl-10">{section.content}</p>
                </section>
              );
            })}
          </div>
        </div>

        {/* Related topics */}
        {relatedTopics.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xs text-amber-400 uppercase tracking-widest font-medium mb-6">
              相关专题
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topic/${topic.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-[#1e3a5c] hover:border-amber-400/40 transition-colors"
                >
                  <div className="h-32 overflow-hidden bg-gradient-to-b from-[#0d1a2d] to-[#0a0f1a]">
                    <img
                      src={topic.coverImage}
                      alt={topic.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-black/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs text-amber-400 uppercase tracking-widest">{topic.period}</p>
                    <p className="text-sm font-bold text-white mt-1">{topic.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-12 flex gap-4">
          <Link
            href="/"
            className="text-sm text-[#4a6fa5] hover:text-amber-400 transition-colors"
          >
            ← 返回地图
          </Link>
          <Link
            href="/countries"
            className="text-sm text-[#4a6fa5] hover:text-amber-400 transition-colors"
          >
            浏览所有国家 →
          </Link>
        </div>
      </div>
    </article>
  );
}
