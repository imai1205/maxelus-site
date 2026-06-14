"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import Footer from "../components/Footer";
import { AnimatedSection } from "../components/AnimationProvider";
import { PageHero, SectionHeader, ContactCTA } from "../../components/ui";
import ScrollFrameSequence from "../components/ScrollFrameSequence";
import { usePrefersReducedMotion } from "../components/usePrefersReducedMotion";

const values = [
  { title: "整える", body: "複雑な業務や情報を整理し、迷いを減らす。" },
  { title: "つくる", body: "必要な仕組みを、現実的で使われ続ける形にする。" },
  { title: "改善する", body: "小さな改善を積み重ね、より良い状態へ近づける。" },
];

const companyRows: { label: string; value: string; href?: string }[] = [
  { label: "会社名", value: "株式会社マクセラス（Maxelus Inc.）" },
  { label: "設立", value: "2025年8月14日" },
  { label: "所在地", value: "〒614-8121 京都府八幡市下奈良小宮1" },
  { label: "代表者", value: "代表取締役 CEO 今井 俊喜" },
  {
    label: "事業内容",
    value:
      "Web制作・LP制作、Webアプリ開発、業務効率化支援、自社プロダクト、AI活用支援、リフォーム関連事業",
  },
  { label: "法人番号", value: "1130001080399" },
  { label: "インボイス登録番号", value: "T1130001080399" },
  { label: "公式サイト", value: "https://www.maxelustech.com/", href: "https://www.maxelustech.com/" },
];

const nameStory = `Maxelusは、「Max」と「Eras」のニュアンスを掛け合わせた造語です。

「Max」は、限られた時間やリソースの中で、最大限の成果を生み出すという想いを込めています。

「Eras」には、流れや変化に合わせて、しなやかに進化していくという意味合いを重ねています。

固定されたやり方にとらわれず、状況に合わせてより効率的な仕組みへ近づいていく。

より柔軟に、より効率的に、より大きな成果へ。その考え方を、Maxelusという社名に込めています。`;

const ceoMessage = `大学卒業後、メーカー営業として現場を回るなかで、多くの企業が「人の努力」で業務を回していることを実感しました。

本当の課題は、技術や努力が足りないことではなく、情報の流れや業務の仕組みが整っていないことにある。

そう感じたことが、マクセラスの原点です。

私たちは、Web・アプリ・AI・自動化などの技術を使って、ただ便利なものを作るのではなく、業務が自然に回り、人が本当に大切なことに時間を使える状態をつくりたいと考えています。

構想から整理、開発、運用改善まで。お客様の事業に合わせて、現実的で使われ続ける仕組みづくりを伴走します。`;

export default function AboutPage() {
  // reduced-motion のユーザーには Lenis（慣性スクロール）を適用しない
  const reduceMotion = usePrefersReducedMotion();

  const content = (
    <div className="min-h-screen bg-white font-sans">
      <main>
        <PageHero
          kicker="About"
          title={
            <>
              仕組みを整え、<br className="md:hidden" />時間を生み出す。
            </>
          }
          lead={
            <>
              マクセラスは、業務効率化を通じて、人や会社が本当に大切なことに<br className="hidden md:block" />時間を使える状態をつくる会社です。目の前の作業をこなすだけでなく、<br className="hidden md:block" />将来の効率につながる方法を選び、業務の無駄を減らし、<br className="hidden md:block" />事業が自然に前へ進む仕組みを整えることを大切にしています。
            </>
          }
        />

        {/* Mission / Vision / Value */}
        <section className="bg-white py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Mission / Vision / Value" title="私たちの考え方" bgText="MVV" align="left" className="mb-12 md:mb-16" />
            <div className="space-y-12 md:space-y-16">
              <AnimatedSection animation="fade-up">
                <p className="mb-3 text-xs font-medium tracking-[0.25em] text-[#fdc700]">MISSION</p>
                <p className="text-xl md:text-3xl font-bold text-[#1a1a1a] leading-snug">
                  業務を効率化し、本当に大切なことに時間を使える世界をつくる。
                </p>
              </AnimatedSection>
              <AnimatedSection animation="fade-up">
                <p className="mb-3 text-xs font-medium tracking-[0.25em] text-[#fdc700]">VISION</p>
                <p className="text-xl md:text-3xl font-bold text-[#1a1a1a] leading-snug">
                  人と事業が、より大切なことに時間を使える社会をつくる。
                </p>
              </AnimatedSection>
              <div>
                <p className="mb-6 text-xs font-medium tracking-[0.25em] text-[#fdc700]">VALUE</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                  {values.map((v, i) => (
                    <AnimatedSection key={v.title} animation="fade-up" delay={i * 100}>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2">{v.title}</h3>
                        <div className="mb-3 h-px w-8 bg-[#fdc700]" />
                        <p className="text-sm text-[#1a1a1a] leading-relaxed">{v.body}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 会社概要〜代表挨拶: 背景でブランドロゴが組み上がり、末尾で完成する */}
        <ScrollFrameSequence
          frameCount={96}
          fit="contain"
          blendMode="multiply"
          canvasOpacity={0.2}
          startRatio={0.6}
          className="bg-white"
        >
        {/* 会社概要 */}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[900px] mx-auto">
            <SectionHeader kicker="Company" title="会社概要" bgText="COMPANY" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <dl className="border-t border-[#e5e7eb]">
                {companyRows.map((row) => (
                  <div key={row.label} className="flex flex-col sm:flex-row gap-1 sm:gap-6 border-b border-[#e5e7eb] py-4 md:py-5">
                    <dt className="sm:w-44 shrink-0 text-sm font-medium text-[#1a1a1a]">{row.label}</dt>
                    <dd className="text-sm text-[#1a1a1a] leading-relaxed">
                      {row.href ? (
                        <a href={row.href} target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a] underline underline-offset-2 hover:text-[#fdc700] transition-colors">
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </AnimatedSection>
          </div>
        </section>

        {/* 社名の由来 */}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[760px] mx-auto">
            <SectionHeader kicker="Name" title="Maxelusに込めた想い" bgText="NAME" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <p className="text-sm md:text-base text-[#1a1a1a] leading-loose whitespace-pre-line">{nameStory}</p>
            </AnimatedSection>
          </div>
        </section>

        {/* 代表挨拶 */}
        <section className="py-20 md:py-32 px-4 md:px-8">
          <div className="max-w-[760px] mx-auto">
            <SectionHeader kicker="Message" title="代表挨拶" bgText="MESSAGE" align="left" className="mb-10 md:mb-14" />
            <AnimatedSection animation="fade-up">
              <p className="text-sm md:text-base text-[#1a1a1a] leading-loose whitespace-pre-line">{ceoMessage}</p>
              <p className="mt-8 text-sm text-[#1a1a1a]">
                代表取締役 CEO
                <span className="ml-3 text-base font-bold">今井 俊喜</span>
              </p>
            </AnimatedSection>
          </div>
        </section>
        </ScrollFrameSequence>

        <ContactCTA />
      </main>
      <Footer />
    </div>
  );

  // Lenis は About ページにいる間だけマウント（他ページは現状のネイティブスクロールを維持）
  return reduceMotion ? (
    content
  ) : (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
}
