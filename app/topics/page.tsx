import Link from "next/link";
import { topics } from "@/data/topics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "跨国专题 — 寰宇志",
  description: "探索跨越国界的地理事件与文明专题",
};

export default function TopicsPage() {
  return (
    <main className="min-h-screen pt-[80px] pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">跨国专题</h1>
          <p className="mt-3 text-[#6b8cba]">
            地理影响往往跨越国界。这些专题聚焦于塑造多个文明的地理事件与现象。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topic/${topic.slug}`}
              className="group block rounded-2xl overflow-hidden border border-[#1e3a5c] hover:border-amber-400/40 transition-all hover:shadow-lg hover:shadow-amber-400/5"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-b from-[#0d1a2d] to-[#0a0f1a]">
                <img
                  src={topic.coverImage}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-black/30 to-transparent" />
                {topic.period && (
                  <div className="absolute top-4 left-4">
                    <span className="text-xs text-amber-400 bg-[#0a0f1a]/80 px-2 py-1 rounded">
                      {topic.period}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 bg-[#0d1a2d]">
                <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {topic.title}
                </h2>
                <p className="text-xs text-[#4a6fa5] mt-1">{topic.subtitle}</p>
                <p className="text-sm text-[#6b8cba] mt-3 line-clamp-2 leading-relaxed">
                  {topic.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.geographicFactors.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2 py-0.5 bg-[#0a1526] border border-[#1e3a5c] rounded-full text-[#4a6fa5]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
