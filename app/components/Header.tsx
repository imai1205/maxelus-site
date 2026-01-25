"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [imgLogo, setImgLogo] = useState('/cases/logo(W).png');
  const pathname = usePathname();
  
  // テーマを取得（クライアントサイドのみ）
  useEffect(() => {
    const updateLogo = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const logo = isDark ? '/cases/logo(D).png' : '/cases/logo(W).png';
      setImgLogo(logo);
    };

    // 初期設定
    updateLogo();

    // システム設定の変更を監視
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateLogo);

    return () => {
      mediaQuery.removeEventListener("change", updateLogo);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  // スクロール検知でヘッダーのスタイルを変更
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // 初期状態をチェック
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 dark:bg-[#0b1220]/95 backdrop-blur-lg shadow-lg shadow-black/5 border-b border-[#e5e7eb] dark:border-[#374151]" 
        : "bg-white/80 dark:bg-[#0b1220]/80 backdrop-blur-md border-b border-transparent"
    }`}>
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8 max-w-[1200px] mx-auto">
        <Link href="/" className="flex items-center" prefetch={true}>
          <Image src={imgLogo} alt="マクセラス" width={120} height={40} className="h-8 md:h-10 w-auto" priority />
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link 
            href="/" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-all duration-200 ${
              isActive("/") ? "text-[#0b1220] dark:text-[#f9fafb] font-medium" : "text-[#666] dark:text-[#9ca3af] hover:text-[#0b1220] dark:hover:text-[#f9fafb]"
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
              pathname.startsWith("/services") ? "text-[#0b1220] dark:text-[#f9fafb] font-medium" : "text-[#666] dark:text-[#9ca3af] hover:text-[#0b1220] dark:hover:text-[#f9fafb]"
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
            href="/cases" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-all duration-200 ${
              isActive("/cases") || isActive("/works") ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
            }`}
          >
            事例
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
              isActive("/cases") || isActive("/works") ? "w-full" : "w-0 group-hover:w-full"
            }`} />
          </Link>
          <Link 
            href="/about" 
            prefetch={true}
            className={`text-sm nav-link relative group transition-all duration-200 ${
              isActive("/about") ? "text-[#0b1220] font-medium" : "text-[#666] hover:text-[#0b1220]"
            }`}
          >
            会社情報
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fff100] transition-all duration-300 ${
              isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1e293b] transition-colors text-[#1a1a1a] dark:text-[#f9fafb]"
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
        className={`md:hidden bg-white dark:bg-[#0b1220] border-t border-[#e5e7eb] dark:border-[#374151] overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-4 gap-3">
          <Link 
            href="/" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${isActive("/") ? "text-[#0b1220] dark:text-[#f9fafb] font-medium" : "text-[#666] dark:text-[#9ca3af]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            ホーム
          </Link>
          <Link 
            href="/services" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${pathname.startsWith("/services") ? "text-[#0b1220] dark:text-[#f9fafb] font-medium" : "text-[#666] dark:text-[#9ca3af]"}`}
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
            href="/cases" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${isActive("/cases") || isActive("/works") ? "text-[#0b1220] font-medium" : "text-[#666]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            事例
          </Link>
          <Link 
            href="/about" 
            prefetch={true}
            className={`text-base py-2 transition-colors ${isActive("/about") ? "text-[#0b1220] font-medium" : "text-[#666]"}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            会社情報
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
