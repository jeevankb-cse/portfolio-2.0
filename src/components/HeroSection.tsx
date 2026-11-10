import React, { useState } from 'react';
import {
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
  onOpenShareSeoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResumeModal,
  onOpenShareSeoModal,
}) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <section id="top" className="pt-10 pb-16 border-b border-zinc-200/80">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Typographic Hierarchy & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-zinc-200/80 rounded-2xl p-8 md:p-10">
            <div>
              {/* Unboxed Editorial Kicker (Zero Static Pills) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 mb-5">
                <span>{PROFILE_DATA.role}</span>
                <span aria-hidden="true">·</span>
                <span>{PROFILE_DATA.shortLocation}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums text-blue-700">B.E. CSE (CGPA 8.48)</span>
              </div>

              {/* Oversized Geometric Display Headline */}
              <h1 className="font-display font-bold tracking-tight text-zinc-900 text-[clamp(2.25rem,3.8vw,3.5rem)] leading-[1.08] text-balance mb-6">
                Building Practical{' '}
                <span className="font-serif italic font-normal text-blue-700">
                  Machine Intelligence
                </span>{' '}
                Across Vision, Speech &amp; Language.
              </h1>

              {/* Career Objective Lead Copy */}
              <p className="text-base text-zinc-600 leading-relaxed max-w-[64ch] mb-8">
                {PROFILE_DATA.careerObjective}
              </p>
            </div>

            <div className="pt-6 border-t border-zinc-100">
              {/* Primary CTA Row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-zinc-900 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Explore Selected Works</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-800 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-700" aria-hidden="true" />
                  <span>Inspect Resume PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenShareSeoModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-blue-700" aria-hidden="true" />
                  <span>Portfolio Link &amp; Google SEO</span>
                </button>
              </div>

              {/* Direct Verified Contact & Profile Links (Unboxed Typography) */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-zinc-600">
                <button
                  type="button"
                  onClick={onOpenShareSeoModal}
                  className="inline-flex items-center gap-1.5 font-mono text-blue-700 font-semibold hover:underline cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>portfolio.jeevankb</span>
                </button>
                <span className="text-zinc-300" aria-hidden="true">
                  /
                </span>
                <a
                  href={PROFILE_DATA.portfolioRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Portfolio-2.0 Repo</span>
                </a>
                <span className="text-zinc-300" aria-hidden="true">
                  /
                </span>
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>@jeevankb-cse</span>
                </a>
                <span className="text-zinc-300" aria-hidden="true">
                  /
                </span>
                <a
                  href={PROFILE_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <span className="text-zinc-300" aria-hidden="true">
                  /
                </span>
                <a
                  href={PROFILE_DATA.emailHref}
                  className="inline-flex items-center gap-1.5 hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{PROFILE_DATA.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Rounded Circular Portrait Showcase at Matching Height */}
          <div className="lg:col-span-5 flex flex-col items-center justify-between bg-white border border-zinc-200/80 rounded-2xl p-8 text-center">
            <div className="text-xs font-mono text-zinc-500">
              Bengaluru, Karnataka · India
            </div>

            <div className="my-6 relative flex items-center justify-center">
              <div className="w-60 h-60 sm:w-68 sm:h-68 rounded-full p-2 bg-gradient-to-tr from-blue-700 via-blue-500 to-zinc-200 shadow-md">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-100 border-4 border-white">
                  {!imageLoadError ? (
                    <img
                      src={PROFILE_DATA.portraitPath}
                      alt="Portrait of Jeevan K B, Computer Science and AI/ML Engineer"
                      referrerPolicy="no-referrer"
                      onError={() => setImageLoadError(true)}
                      className="w-full h-full rounded-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 to-blue-950 text-white text-center">
                      <span className="font-display text-4xl font-bold tracking-tight mb-1">
                        JKB
                      </span>
                      <span className="text-xs text-zinc-300">{PROFILE_DATA.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full pt-5 border-t border-zinc-100">
              <p className="font-display text-xl font-bold tracking-tight text-zinc-900">
                {PROFILE_DATA.name}
              </p>
              <p className="text-xs font-medium text-blue-700 mt-1">
                {PROFILE_DATA.degreeTagline}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {PROFILE_DATA.location}
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Key Metrics Row Below Hero Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {PROFILE_DATA.keyMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-mono font-bold text-2xl md:text-3xl text-zinc-900 tabular-nums tracking-tight">
                  {metric.value}
                </span>
                <span className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                  {metric.unit}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">{metric.label}</p>
                <p className="text-xs text-zinc-500 mt-1">{metric.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Editorial Marquee Divider */}
      <div
        aria-hidden="true"
        className="mt-12 border-y border-zinc-200/80 bg-white py-3 overflow-hidden select-none"
      >
        <div className="animate-marquee flex items-center gap-8 text-xs font-mono text-zinc-500">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 shrink-0">
              <span>selected works · case studies &amp; system architectures</span>
              <span>·</span>
              <span>scamshield ai — multi-modal fraud detection</span>
              <span>·</span>
              <span>weathergpt — sih 2026 selected conversational meteorology</span>
              <span>·</span>
              <span>voxveritas — acoustic synthetic voice forensics</span>
              <span>·</span>
              <span>smart voting system — knn facial biometrics &amp; blink liveness</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
