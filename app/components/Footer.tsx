import Link from "next/link";
import Image from "next/image";

const imgLogo = "/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] dark:bg-[#0a0a0a] text-white py-12 md:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="flex items-center gap-4">
            <Image src={imgLogo} alt="マクセラス" width={120} height={40} className="h-10 w-auto brightness-0 invert" />
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/toshiki_dx/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors group"
                aria-label="Instagram"
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-[10px] leading-tight font-medium text-center whitespace-nowrap">Instagram</span>
              </a>
              <a
                href="https://www.threads.com/@toshiki_dx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-200 transition-colors group"
                aria-label="Threads"
              >
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Image
                    src="/cases/threads.png"
                    alt="Threads"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain brightness-0 invert opacity-70 group-hover:opacity-100 dark:opacity-60 dark:group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <span className="text-[10px] leading-tight font-medium text-center whitespace-nowrap">Threads</span>
              </a>
            </div>
          </div>
          <nav className="flex flex-wrap gap-6 text-sm text-gray-400 dark:text-gray-500">
            <Link href="/" prefetch={true} className="hover:text-white dark:hover:text-gray-200 transition-colors">ホーム</Link>
            <Link href="/cases" prefetch={true} className="hover:text-white dark:hover:text-gray-200 transition-colors">事例</Link>
            <Link href="/contact" prefetch={true} className="hover:text-white dark:hover:text-gray-200 transition-colors">お問い合わせ</Link>
            <Link href="/contact" prefetch={true} className="hover:text-white dark:hover:text-gray-200 transition-colors">無料相談</Link>
          </nav>
        </div>
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-600">© 2024 MAXELUS All rights reserved.</p>
          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-600">
            <Link href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">プライバシーポリシー</Link>
            <Link href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">利用規約</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
