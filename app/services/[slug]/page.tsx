"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getServiceBySlug, getSortedServices } from "../../data/services";
import { AnimatedSection, TiltCard } from "../../components/AnimationProvider";

// 機能アイコンコンポーネント
function FeatureIcon({ icon }: { icon?: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    link: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    eye: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    mobile: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    puzzle: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    ),
    rocket: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    sparkles: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    edit: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
    lightning: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    check: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    cpu: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    )
  };

  return iconMap[icon || "check"] || iconMap.check;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = getServiceBySlug(slug);

  // 外部URLがある場合はリダイレクト（SSRでは notFound）
  if (!service || service.externalUrl) {
    notFound();
  }

  const detailContent = service.detailContent;
  const otherServices = getSortedServices().filter(s => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#0b1220] via-[#1e293b] to-[#0b1220] py-20 md:py-32 overflow-hidden">
          {/* Background Image */}
          {detailContent?.heroImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url('${detailContent.heroImage}')` }}
            />
          )}
          
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#fff100]/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#fdc700]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
            <AnimatedSection animation="fade-up">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
                <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
                <span>/</span>
                <Link href="/services" className="hover:text-white transition-colors">サービス</Link>
                <span>/</span>
                <span className="text-white">{service.title}</span>
              </nav>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-6">
                {service.tags.map((tag, i) => (
                  <span key={i} className="text-xs md:text-sm px-3 py-1 bg-white/10 text-white/80 rounded-full border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-[#fff100] font-medium mb-6">
                {service.catch}
              </p>
              <p className="text-base md:text-lg text-white/70 max-w-3xl leading-relaxed mb-8">
                {service.summary}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
              >
                無料相談する
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Features Section */}
        {detailContent?.features && (
          <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fade-up">
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] text-center mb-4">
                  特長
                </h2>
                <p className="text-[#6b7280] text-center mb-12 md:mb-16">
                  このサービスの主な機能と特長
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {detailContent.features.map((feature, index) => (
                  <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                    <TiltCard maxTilt={5} className="h-full">
                      <div className="bg-white rounded-2xl p-6 md:p-8 h-full shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-14 h-14 bg-[#fffef0] rounded-xl flex items-center justify-center text-[#fdc700] mb-6">
                          <FeatureIcon icon={feature.icon} />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-sm md:text-base text-[#6b7280] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </TiltCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {detailContent?.benefits && (
          <section className="py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection animation="fade-up">
                <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] text-center mb-4">
                  導入メリット
                </h2>
                <p className="text-[#6b7280] text-center mb-12 md:mb-16">
                  このサービスを導入することで得られるメリット
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {detailContent.benefits.map((benefit, index) => (
                  <AnimatedSection key={index} animation="fade-up" delay={index * 50}>
                    <div className="flex items-start gap-4 p-4 md:p-6 bg-[#fafafa] rounded-xl">
                      <div className="w-8 h-8 bg-[#fff100] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-base md:text-lg text-[#1a1a1a] font-medium">
                        {benefit}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Target Industries */}
        {detailContent?.targetIndustries && detailContent.targetIndustries.length > 0 && (
          <section className="py-12 md:py-16 px-4 md:px-8 bg-[#0b1220]">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-lg md:text-xl text-white/60 mb-4">対象業種</h3>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {detailContent.targetIndustries.map((industry, index) => (
                  <span 
                    key={index}
                    className="px-4 md:px-6 py-2 md:py-3 bg-white/10 text-white rounded-full border border-white/20 text-sm md:text-base"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-white to-[#fafafa]">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-up">
              <h2 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-6">
                まずは無料相談から
              </h2>
              <p className="text-base md:text-lg text-[#6b7280] mb-8 max-w-2xl mx-auto">
                「こんなこと実現できる？」という段階からOK。<br />
                課題を整理するところから、一緒にスタートしましょう。
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-8 py-4 rounded-full transition-all hover:scale-105"
                >
                  無料相談する
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1a1a] font-medium px-8 py-4 rounded-full border border-[#e5e7eb] transition-all hover:bg-[#fafafa] hover:scale-105"
                >
                  サービス一覧に戻る
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Other Services */}
        {otherServices.length > 0 && (
          <section className="py-16 md:py-24 px-4 md:px-8 bg-[#fafafa]">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection animation="fade-up">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] text-center mb-12">
                  その他のサービス
                </h2>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherServices.map((s, index) => (
                  <AnimatedSection key={s.slug} animation="fade-up" delay={index * 100}>
                    <Link 
                      href={s.externalUrl || `/services/${s.slug}`}
                      target={s.externalUrl ? "_blank" : undefined}
                      className="block bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-[#6b7280] mb-4">
                        {s.catch}
                      </p>
                      <span className="text-sm text-[#fdc700] font-medium flex items-center gap-1">
                        {s.primaryCtaLabel}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
