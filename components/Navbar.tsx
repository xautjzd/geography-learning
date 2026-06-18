import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0f1a]/90 backdrop-blur-sm border-b border-[#1a2a40]">
      <Link href="/" className="flex items-center gap-3">
        <span className="text-amber-400 text-xl">◎</span>
        <span className="text-white font-bold text-lg tracking-wide">寰宇志</span>
      </Link>
      <div className="flex items-center gap-6 text-sm text-[#6b8cba]">
        <Link href="/" className="hover:text-amber-400 transition-colors">地图</Link>
        <Link href="/topics" className="hover:text-amber-400 transition-colors">专题</Link>
        <Link href="/countries" className="hover:text-amber-400 transition-colors">国家与地区</Link>
      </div>
    </nav>
  );
}
