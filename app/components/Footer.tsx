import Link from "next/link";
import Image from "next/image";

const imgLogo = "/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] text-white py-12 md:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="flex items-center gap-6">
            <Image src={imgLogo} alt="マクセラス" width={120} height={40} className="h-10 w-auto brightness-0 invert" />
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
          <nav className="flex flex-wrap gap-6 text-sm text-gray-400">
            <Link href="/" prefetch={true} className="hover:text-white transition-colors">ホーム</Link>
            <Link href="/contact" prefetch={true} className="hover:text-white transition-colors">お問い合わせ</Link>
            <Link href="/contact" prefetch={true} className="hover:text-white transition-colors">無料相談</Link>
          </nav>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2024 MAXELUS All rights reserved.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <Link href="#" className="hover:text-white transition-colors">利用規約</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
