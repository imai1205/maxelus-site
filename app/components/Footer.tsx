import Link from "next/link";
import Image from "next/image";

const imgLogo = "/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] text-white py-12 md:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10">
          <Image
            src={imgLogo}
            alt="株式会社MAXELUS"
            width={120}
            height={40}
            className="h-10 w-auto brightness-0 invert mb-4"
          />
          <p className="text-sm text-gray-400 tracking-wide">
            Connected Paths, Accelerated Future
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
          <nav className="flex flex-wrap gap-6 text-sm text-gray-400">
            <Link href="/about" prefetch={true} className="hover:text-white transition-colors">会社情報</Link>
            <Link href="/works" prefetch={true} className="hover:text-white transition-colors">実績</Link>
            <Link href="/services" prefetch={true} className="hover:text-white transition-colors">サービス</Link>
            <Link href="/contact" prefetch={true} className="hover:text-white transition-colors">お問い合わせ</Link>
          </nav>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a
              href="https://www.instagram.com/toshiki_dx/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.threads.com/@toshiki_dx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Threads
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} 株式会社MAXELUS（Maxelus Inc.）All
            rights reserved.
          </p>
          <p className="text-sm text-gray-500 tracking-widest">
            EST. 2025 / KYOTO
          </p>
        </div>
      </div>
    </footer>
  );
}
