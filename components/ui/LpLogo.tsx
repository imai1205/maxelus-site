import Link from "next/link";
import Image from "next/image";

/**
 * LP 共通の左上ロゴ + 「トップに戻る」導線。
 * トップページ(共通ヘッダー)と同じロゴ画像を使う。
 */
export function LpLogo() {
  return (
    <Link
      href="/"
      prefetch
      className="group flex items-center gap-2.5"
      style={{ display: "flex", alignItems: "center" }}
    >
      <Image
        src="/cases/logo(W).png"
        alt="マクセラス"
        width={120}
        height={40}
        className="h-7 md:h-8 w-auto shrink-0"
        priority
      />
      <span className="text-xs md:text-sm text-[#6b7280] group-hover:text-[#1a1a1a] transition-colors">
        トップに戻る
      </span>
    </Link>
  );
}
