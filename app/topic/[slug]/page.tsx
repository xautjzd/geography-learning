import { notFound } from "next/navigation";
import Link from "next/link";
import { topics, getTopicBySlug } from "@/data/topics";
import { getCountryBySlug } from "@/data/countries";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} — 寰宇志`,
    description: topic.summary,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) notFound();

  const affectedCountries = topic.affectedCountries
    .map((s) => getCountryBySlug(s))
    .filter(Boolean);

  const contentParagraphs = topic.content.split("\n\n");

  return (
    <article className="min-h-screen pt-[60px]">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={topic.coverImage}
          alt={topic.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0f1a]" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
          <div className="max-w-4xl mx-auto">
            {topic.period && (
              <span className="text-xs text-amber-400 uppercase tracking-widest font-medium">
                {topic.period}
              </span>
            )}
            <h1 className="text-5xl font-bold text-white mt-2">{topic.title}</h1>
            <p className="text-lg text-[#8aaed4] mt-2">{topic.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Summary */}
        <div className="mt-10 border-l-4 border-amber-400/60 pl-6">
          <p className="text-xl text-[#b8c9e0] leading-relaxed italic">{topic.summary}</p>
        </div>

        {/* Meta */}
        <div className="mt-8 flex flex-wrap gap-4">
          <div className="bg-[#0d1a2d] border border-[#1e3a5c] rounded-lg px-4 py-3">
            <p className="text-xs text-[#4a6fa5] uppercase tracking-wide">地理范围</p>
            <p className="text-sm text-[#d0e0f0] mt-1">{topic.geographicScope}</p>
          </div>
          {topic.period && (
            <div className="bg-[#0d1a2d] border border-[#1e3a5c] rounded-lg px-4 py-3">
              <p className="text-xs text-[#4a6fa5] uppercase tracking-wide">时间跨度</p>
              <p className="text-sm text-[#d0e0f0] mt-1">{topic.period}</p>
            </div>
          )}
        </div>

        {/* Geographic factors */}
        {topic.geographicFactors.length > 0 && (
          <div className="mt-8">
            <p className="text-xs text-[#4a6fa5] uppercase tracking-widest mb-3">核心地理要素</p>
            <div className="flex flex-wrap gap-2">
              {topic.geographicFactors.map((f) => (
                <span
                  key={f}
                  className="text-xs px-3 py-1 bg-[#0d1a2d] border border-[#1e3a5c] rounded-full text-[#6b8cba]"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="mt-12 prose prose-invert max-w-none">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-[#1e3a5c]" />
            <span className="text-xs text-amber-400 uppercase tracking-widest font-medium whitespace-nowrap">
              深度解析
            </span>
            <div className="h-px flex-1 bg-[#1e3a5c]" />
          </div>
          <div className="space-y-6 text-[#8aaed4] leading-8">
            {contentParagraphs.map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-xl font-bold text-white mt-10 mb-4">
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-base leading-8">
                  {para}
                </p>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        {topic.keyEvents && topic.keyEvents.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-[#1e3a5c]" />
              <span className="text-xs text-amber-400 uppercase tracking-widest font-medium whitespace-nowrap">
                关键事件
              </span>
              <div className="h-px flex-1 bg-[#1e3a5c]" />
            </div>
            <div className="relative pl-6 border-l border-[#1e3a5c]">
              {topic.keyEvents.map((event, i) => (
                <div key={i} className="mb-6 relative">
                  <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-amber-400/60 border-2 border-[#0a0f1a] top-1" />
                  <p className="text-xs text-amber-400 font-medium">{event.year}</p>
                  <p className="text-sm text-[#8aaed4] mt-1">{event.event}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affected countries */}
        {affectedCountries.length > 0 && (
          <div className="mt-14">
            <p className="text-xs text-amber-400 uppercase tracking-widest mb-4">涉及国家</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {affectedCountries.map((country) => {
                if (!country) return null;
                return (
                  <Link
                    key={country.slug}
                    href={country.hasContent ? `/country/${country.slug}` : "#"}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      country.hasContent
                        ? "border-[#1e3a5c] hover:border-amber-400/40 hover:bg-[#0d1a2d]"
                        : "border-[#1a2a40] opacity-50 cursor-default"
                    }`}
                  >
                    <span className="text-sm text-white">{country.name}</span>
                    {country.hasContent && (
                      <span className="ml-auto text-xs text-amber-400">→</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex gap-4">
          <Link href="/" className="text-sm text-[#4a6fa5] hover:text-amber-400 transition-colors">
            ← 返回地图
          </Link>
          <Link href="/topics" className="text-sm text-[#4a6fa5] hover:text-amber-400 transition-colors">
            所有专题 →
          </Link>
        </div>
      </div>
    </article>
  );
}
