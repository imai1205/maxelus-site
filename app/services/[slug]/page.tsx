import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { Reveal, StaggerGroup } from "@/components/ui";
import {
  servicesData,
  getServiceBySlug,
  getSortedServices,
  categoryNames,
} from "../../data/servicesData";
import { cases } from "../../data/casesData";

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const page = service.page;
  const relatedCases = (page.relatedCaseIds ?? [])
    .map((id) => cases.find((c) => c.id === id))
    .filter((c) => c !== undefined);
  const otherServices = getSortedServices()
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="pt-14 md:pt-16">
        {/* Hero */}
        <PageHero
          bgText="SERVICE"
          kicker={categoryNames[service.category]}
          title={service.title}
          description={service.catch}
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
            >
              無料相談する
            </Link>
            {service.lpHref && (
              <Link
                href={service.lpHref}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
              >
                紹介ページを見る
              </Link>
            )}
          </div>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              サービス
            </Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </nav>
        </PageHero>

        {/* リード文 */}
        <section className="py-12 md:py-16 px-4 md:px-8 border-b border-[#e5e7eb]">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-base md:text-lg text-[#6b7280] leading-relaxed">
                {page.lead}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 特長 */}
        {page.features && (
          <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10 md:mb-14">
                  特長
                </h2>
              </Reveal>
              <StaggerGroup className="space-y-8">
                {page.features.map((feature, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-l-[#e5e7eb] pl-6"
                  >
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-sm font-bold text-[#fdc700] tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-[#6b7280] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* Before/After (ズレ訴求) */}
        {page.beforeAfter && (
          <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-3">
                  課題は&quot;ズレ&quot;から起きる
                </h2>
                <p className="text-sm md:text-base text-[#6b7280] mb-10 md:mb-14">
                  開発の失敗の多くは、認識のズレから生まれます。
                </p>
              </Reveal>
              <StaggerGroup className="space-y-4">
                {page.beforeAfter.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 bg-white border border-[#e5e7eb] p-5 md:p-6"
                  >
                    <div className="border-l-2 border-l-[#e5e7eb] pl-4">
                      <p className="text-xs tracking-widest text-[#6b7280] mb-1">
                        BEFORE
                      </p>
                      <p className="text-sm md:text-base text-[#6b7280]">
                        {item.before}
                      </p>
                    </div>
                    <div className="border-l-2 border-l-[#fdc700] pl-4">
                      <p className="text-xs tracking-widest text-[#6b7280] mb-1">
                        AFTER
                      </p>
                      <p className="text-sm md:text-base font-medium text-[#1a1a1a]">
                        {item.after}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* 詳細プロセス */}
        {page.detailedProcess && (
          <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10 md:mb-14">
                  開発の進め方
                </h2>
              </Reveal>
              <StaggerGroup className="space-y-0">
                {page.detailedProcess.map((step) => (
                  <div
                    key={step.step}
                    className="flex gap-6 py-5 border-b border-[#e5e7eb] last:border-b-0"
                  >
                    <span className="text-sm font-bold text-[#fdc700] tabular-nums pt-1">
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-[#1a1a1a] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-[#6b7280] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* 画面イメージ */}
        {page.screens && (
          <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10 md:mb-14">
                  画面イメージ
                </h2>
              </Reveal>
              <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {page.screens.map((screen, index) => (
                  <figure key={index} className="border border-[#e5e7eb]">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      width={640}
                      height={400}
                      className="w-full h-auto"
                    />
                    <figcaption className="text-xs text-[#6b7280] p-3 border-t border-[#e5e7eb]">
                      {screen.alt}
                    </figcaption>
                  </figure>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* 導入効果 */}
        {page.benefits && (
          <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10 md:mb-14">
                  導入効果
                </h2>
              </Reveal>
              <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {page.benefits.map((benefit, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg text-[#1a1a1a] font-medium border-b border-[#e5e7eb] pb-4"
                  >
                    {benefit}
                  </p>
                ))}
              </StaggerGroup>
              {page.targetIndustries && (
                <Reveal className="mt-10">
                  <p className="text-sm text-[#6b7280]">
                    対象業種: {page.targetIndustries.join(" / ")}
                  </p>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* 料金目安 */}
        <section className="py-16 md:py-20 px-4 md:px-8 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6">
                料金目安
              </h2>
              <p className="text-base md:text-lg text-[#1a1a1a] border-l-2 border-l-[#fdc700] pl-4">
                {page.pricing ?? service.details.pricing}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 関連事例 */}
        {relatedCases.length > 0 && (
          <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10 md:mb-14">
                  関連事例
                </h2>
              </Reveal>
              <StaggerGroup className="space-y-8">
                {relatedCases.map((c) => (
                  <div key={c.id} className="border-l-2 border-l-[#e5e7eb] pl-6">
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed mb-2">
                      {c.problem}
                    </p>
                    <p className="text-sm text-[#1a1a1a] leading-relaxed">
                      {c.impact}
                    </p>
                  </div>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-[var(--bg-navy)]">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
                まずは無料相談から
              </h2>
              <p className="text-base md:text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                「こんなこと実現できる？」という段階からOK。
                <br />
                課題を整理するところから、一緒にスタートしましょう。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  無料相談する
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full border border-white/30 transition-all hover:scale-105"
                >
                  サービス一覧に戻る
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* その他のサービス */}
        {otherServices.length > 0 && (
          <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-10 md:mb-14">
                  その他のサービス
                </h2>
              </Reveal>
              <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block bg-white border border-[#e5e7eb] border-l-2 border-l-[#e5e7eb] hover:border-l-[#fdc700] p-6 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] mb-4">{s.catch}</p>
                    <span className="text-sm text-[#1a1a1a] font-medium">
                      詳細を見る →
                    </span>
                  </Link>
                ))}
              </StaggerGroup>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
