"use client";

import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/app/data/servicesData";
import AppScreensGallery from "./AppScreensGallery";

interface ServiceDetailPanelProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceDetailPanel({
  service,
  isOpen,
  onClose,
}: ServiceDetailPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="mt-4 bg-white dark:bg-[#1e293b] rounded-2xl border border-[#e5e7eb] dark:border-[#374151] shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 md:p-8">
        {/* 閉じるボタン */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="text-[#6b7280] dark:text-[#9ca3af] hover:text-[#1a1a1a] dark:hover:text-[#f9fafb] transition-colors"
            aria-label="閉じる"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* デモ画面（完全オーダーメイドアプリ開発のみ） */}
        {service.id === 'full-order-app-development' && (
          <section className="mb-8">
            <AppScreensGallery />
          </section>
        )}

        {/* できること */}
        <section className="mb-8">
          <h4 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#fff100] rounded-full" />
            できること
          </h4>
          <ul className="space-y-2">
            {service.details.capabilities.map((capability, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[#6b7280] dark:text-[#9ca3af]"
              >
                <svg
                  className="w-5 h-5 text-[#fdc700] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* こんな人におすすめ */}
        <section className="mb-8">
          <h4 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#fff100] rounded-full" />
            こんな人におすすめ
          </h4>
          <ul className="space-y-2">
            {service.details.targetAudience.map((target, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[#6b7280] dark:text-[#9ca3af]"
              >
                <svg
                  className="w-5 h-5 text-[#fdc700] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{target}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 進め方（3ステップ） */}
        <section className="mb-8">
          <h4 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#fff100] rounded-full" />
            進め方
          </h4>
          <div className="space-y-4">
            {service.details.process.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 bg-[#fafafa] dark:bg-[#0b1220]/50 rounded-xl border border-[#e5e7eb] dark:border-[#374151]"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-[#fff100] rounded-full flex items-center justify-center text-[#1a1a1a] font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-1">
                    {step.title}
                  </h5>
                  <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 料金目安 */}
        <section className="mb-8">
          <h4 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#fff100] rounded-full" />
            料金目安
          </h4>
          <p className="text-lg font-medium text-[#1a1a1a] dark:text-[#f9fafb] bg-[#fffef0] dark:bg-[#0b1220]/50 px-4 py-3 rounded-lg border border-[#fff100] dark:border-[#fff100]/60">
            {service.details.pricing}
          </p>
        </section>

        {/* よくある質問 */}
        <section className="mb-8">
          <h4 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#fff100] rounded-full" />
            よくある質問
          </h4>
          <div className="space-y-4">
            {service.details.faq.map((faq, i) => (
              <div
                key={i}
                className="p-4 bg-[#fafafa] dark:bg-[#0b1220]/50 rounded-xl border border-[#e5e7eb] dark:border-[#374151]"
              >
                <h5 className="font-bold text-[#1a1a1a] dark:text-[#f9fafb] mb-2">
                  Q. {faq.question}
                </h5>
                <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">
                  A. {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pt-6 border-t border-[#e5e7eb] dark:border-[#374151]">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#fff100] hover:bg-[#fdc700] text-[#1a1a1a] font-medium px-6 py-3 rounded-full transition-all hover:scale-105"
            >
              無料相談する
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            {service.ctaType === "lp" && service.lpHref && (
              <Link
                href={service.lpHref}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white dark:bg-[#1e293b] hover:bg-[#fafafa] dark:hover:bg-[#374151] text-[#1a1a1a] dark:text-[#f9fafb] font-medium px-6 py-3 rounded-full border border-[#e5e7eb] dark:border-[#374151] transition-all hover:scale-105"
              >
                詳しく見る
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
