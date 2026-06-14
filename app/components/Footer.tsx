import Link from "next/link";
import Image from "next/image";

const imgLogo = "/logo.png";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/strengths", label: "Strengths" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1220] text-white py-14 md:py-20 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-8">
          {/* 左: ロゴ・タグライン・会社名 */}
          <div className="space-y-4">
            <Image
              src={imgLogo}
              alt="マクセラス"
              width={140}
              height={44}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="text-sm text-gray-300 tracking-wide">Connected Paths, Accelerated Future</p>
            <p className="text-xs text-gray-500">株式会社マクセラス（Maxelus Inc.）</p>
          </div>

          {/* 右: ナビ・SNS */}
          <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
            <nav className="flex flex-col gap-3 text-sm text-gray-400">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
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
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-gray-500">
          <p className="tracking-wide">EST. 2025 / KYOTO</p>
          <p>© {year} Maxelus Inc.</p>
        </div>
      </div>
    </footer>
  );
}
