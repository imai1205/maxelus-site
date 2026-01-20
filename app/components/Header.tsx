"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const imgLogo = "https://www.figma.com/api/mcp/asset/bab5858e-9bd6-4cc7-9783-62ba4339b159";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] sticky top-0 z-50">
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center" prefetch={true}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgLogo} alt="マクセラス" className="h-8 md:h-10 w-auto" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-colors ${
              isActive("/") ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
            }`}
          >
            ホーム
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
          <Link 
            href="/works" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-colors ${
              isActive("/works") ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
            }`}
          >
            実績
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
              isActive("/works") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
          <Link 
            href="/contact" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-colors ${
              isActive("/contact") ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
            }`}
          >
            お問い合わせ
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
              isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
          <Link 
            href="/contact" 
            prefetch={true}
            className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] px-6 py-2 rounded-lg text-base font-medium transition-all hover:scale-105"
          >
            無料相談する
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="メニュー"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white border-t border-[#e5e7eb] overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-4">
          <Link 
            href="/" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${isActive("/") ? "text-[#0b1220] font-medium" : "text-[#666]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            ホーム
          </Link>
          <Link 
            href="/works" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${isActive("/works") ? "text-[#0b1220] font-medium" : "text-[#666]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            実績
          </Link>
          <Link 
            href="/contact" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${isActive("/contact") ? "text-[#0b1220] font-medium" : "text-[#666]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            お問い合わせ
          </Link>
          <Link 
            href="/contact" 
            prefetch={true}
            className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] px-6 py-3 rounded-lg text-base font-medium text-center transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            無料相談する
          </Link>
        </nav>
      </div>
    </header>
  );
}
