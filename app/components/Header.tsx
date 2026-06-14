"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems: { href: string; label: string; exact?: boolean }[] = [
  { href: "/", label: "Top", exact: true },
  { href: "/services", label: "Services" },
  { href: "/strengths", label: "Strengths" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const imgLogo = "/cases/logo(W).png";
  const pathname = usePathname();

  const isActive = (item: (typeof navItems)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  // スクロール検知でヘッダーのスタイルを変更
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 border-b border-[#e5e7eb]"
          : "bg-white/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center" prefetch={true}>
          <Image src={imgLogo} alt="マクセラス" width={120} height={40} className="h-8 md:h-10 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`text-sm nav-link relative group transition-all duration-200 ${
                isActive(item) ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
                  isActive(item) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch={true}
            className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] px-5 lg:px-6 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 active:scale-95"
          >
            お問い合わせ
          </Link>
        </nav>

        {/* Mobile Menu Button (テキスト・アイコン不使用) */}
        <button
          className="md:hidden p-2 -mr-2 rounded-lg text-[#1a1a1a] hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="メニュー"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-[#e5e7eb] overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className={`text-base py-2 transition-colors ${
                isActive(item) ? "text-[#0b1220] font-medium" : "text-[#666]"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch={true}
            className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] px-6 py-3 rounded-lg text-base font-medium text-center transition-colors mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
