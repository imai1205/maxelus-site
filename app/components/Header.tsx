"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const imgLogo = "https://www.figma.com/api/mcp/asset/bab5858e-9bd6-4cc7-9783-62ba4339b159";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // #region agent log
  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      const computedStyle = window.getComputedStyle(header);
      const parentStyle = header.parentElement ? window.getComputedStyle(header.parentElement) : null;
      fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.tsx:mount',message:'Header computed styles',data:{position:computedStyle.position,top:computedStyle.top,zIndex:computedStyle.zIndex,transform:computedStyle.transform,parentTransform:parentStyle?.transform,parentPosition:parentStyle?.position,parentClass:header.parentElement?.className},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A,B,C'})}).catch(()=>{});
    }
  }, []);
  // #endregion

  // スクロール検知でヘッダーのスタイルを変更
  useEffect(() => {
    const handleScroll = () => {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.tsx:handleScroll',message:'Scroll event fired',data:{scrollY:window.scrollY,isScrolled:window.scrollY>10},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初期状態をチェック
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/24768147-434f-4056-aa68-04126791c72c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.tsx:useEffect',message:'Scroll listener attached',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-black/5 border-b border-[#e5e7eb]" 
        : "bg-white/80 backdrop-blur-md border-b border-transparent"
    }`}>
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center" prefetch={true}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgLogo} alt="マクセラス" className="h-8 md:h-10 w-auto" />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link 
            href="/" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-all duration-200 ${
              isActive("/") ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
            }`}
          >
            ホーム
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
              isActive("/") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
          <Link 
            href="/services" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-all duration-200 ${
              pathname.startsWith("/services") ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
            }`}
          >
            サービス
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
              pathname.startsWith("/services") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
          <Link 
            href="/strengths" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-all duration-200 ${
              isActive("/strengths") ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
            }`}
          >
            強み
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
              isActive("/strengths") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
          <Link 
            href="/works" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-all duration-200 ${
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
            className={`text-sm nav-link relative group transition-all duration-200 ${
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
            className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] px-5 lg:px-6 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 active:scale-95"
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
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-3">
          <Link 
            href="/" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${isActive("/") ? "text-[#0b1220] font-medium" : "text-[#666]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            ホーム
          </Link>
          <Link 
            href="/services" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${pathname.startsWith("/services") ? "text-[#0b1220] font-medium" : "text-[#666]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            サービス
          </Link>
          <Link 
            href="/strengths" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${isActive("/strengths") ? "text-[#0b1220] font-medium" : "text-[#666]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            強み
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
            className="bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] px-6 py-3 rounded-lg text-base font-medium text-center transition-colors mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            無料相談する
          </Link>
        </nav>
      </div>
    </header>
  );
}
