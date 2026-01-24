import Link from "next/link";

const imgLogo = "/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] text-white py-12 md:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgLogo} alt="マクセラス" className="h-10 w-auto brightness-0 invert" />
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-gray-400">
            <Link href="/" prefetch={true} className="hover:text-white transition-colors">ホーム</Link>
            <Link href="/cases" prefetch={true} className="hover:text-white transition-colors">事例</Link>
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
