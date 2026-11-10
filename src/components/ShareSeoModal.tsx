import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FolderArchive,
  Github,
  Globe,
  Share2,
  Terminal,
  UploadCloud,
  X,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface ShareSeoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CopiedTarget = 'branded' | 'ghpages' | 'cloudrun' | 'gitcmd' | null;

export const ShareSeoModal: React.FC<ShareSeoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedTarget, setCopiedTarget] = useState<CopiedTarget>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  useEffect(() => {
    const resolvedUrl =
      typeof window !== 'undefined' &&
      !window.location.origin.includes('localhost')
        ? window.location.origin + window.location.pathname
        : PROFILE_DATA.publicPortfolioUrl;

    const canonicalEl = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonicalEl) {
      canonicalEl.href = resolvedUrl;
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async (text: string, target: CopiedTarget) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTarget(target);
      setTimeout(() => setCopiedTarget(null), 2500);
    } catch {
      setCopiedTarget(target);
      setTimeout(() => setCopiedTarget(null), 2500);
    }
  };

  const handleDownloadSourceZip = async () => {
    try {
      setIsDownloadingZip(true);
      const response = await fetch('/Portfolio-2.0-source.zip');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Portfolio-2.0-source.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 4000);
    } catch {
      const link = document.createElement('a');
      link.href = '/Portfolio-2.0-source.zip';
      link.download = 'Portfolio-2.0-source.zip';
      link.click();
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const gitCommands = `git init
git add .
git commit -m "Deploy Jeevan K B AI/ML Portfolio 2.0"
git branch -M main
git remote add origin ${PROFILE_DATA.portfolioGitRemote}
git push -u origin main`;

  const githubUploadUrl = `${PROFILE_DATA.portfolioRepoUrl}/upload`;

  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(
    `Check out Jeevan K B's AI & Machine Learning Engineer Portfolio (portfolio.jeevankb): ${PROFILE_DATA.publicPortfolioUrl}`
  )}`;
  const linkedinShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    PROFILE_DATA.publicPortfolioUrl
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-seo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl p-5 sm:p-7 my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-700 mb-1">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>portfolio.jeevankb · GitHub Portfolio-2.0 · Google SEO</span>
            </div>
            <h2
              id="share-seo-modal-title"
              className="font-display text-xl sm:text-2xl font-bold text-zinc-900"
            >
              Portfolio Links, GitHub Upload &amp; Google Visibility
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close share and SEO modal"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-900 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* 1. Get Files into Your Empty GitHub Repository (Step-by-Step) */}
        <div className="py-4 border-b border-zinc-200 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900">
              <FolderArchive className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
              <span>
                01. Put Your Project Files into github.com/jeevankb-cse/Portfolio-2.0
              </span>
            </div>
            <span className="text-[11px] font-mono text-blue-700 font-medium">
              Ready to Upload
            </span>
          </div>

          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-bold text-zinc-900">
                Step 1: Download Your Complete Portfolio-2.0 Source Code (.ZIP)
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Contains all React components, your high-res resume &amp; circular portrait,{' '}
                <code className="font-mono">README.md</code>, and auto-deploy GitHub Actions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDownloadSourceZip}
                disabled={isDownloadingZip}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer disabled:opacity-60"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {isDownloadingZip
                    ? 'Downloading ZIP...'
                    : 'Download Portfolio-2.0.zip'}
                </span>
              </button>
              <a
                href={githubUploadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-900 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                <span>Open GitHub Upload Page</span>
              </a>
            </div>
          </div>

          {/* Terminal Commands Option */}
          <div className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900">
                <Terminal className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                <span>
                  Step 2: Unzip the folder, open Terminal inside it, and run:
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(gitCommands, 'gitcmd')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                {copiedTarget === 'gitcmd' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-700" aria-hidden="true" />
                    <span>Copied Commands</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" aria-hidden="true" />
                    <span>Copy Git Commands</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-zinc-950 text-zinc-100 font-mono text-[11px] rounded-lg p-3 overflow-x-auto leading-relaxed">
              {gitCommands}
            </pre>
          </div>
        </div>

        {/* 2. Portfolio Links & Custom Domain */}
        <div className="py-4 border-b border-zinc-200 space-y-2.5">
          <div className="text-xs font-semibold text-zinc-900">
            02. Your Portfolio URLs (Live Now &amp; Custom Domain)
          </div>

          {/* Instant Live Hosted Cloud Run URL Row */}
          <div className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-emerald-700">
                Live Hosted App URL (Active Right Now — Share Immediately)
              </div>
              <div className="font-mono text-xs text-zinc-800 truncate">
                {PROFILE_DATA.publicPortfolioUrl}
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                handleCopy(PROFILE_DATA.publicPortfolioUrl, 'cloudrun')
              }
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedTarget === 'cloudrun' ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copied Live Link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Live Link</span>
                </>
              )}
            </button>
          </div>

          {/* Branded Domain & GitHub Pages Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-zinc-500">
                  Branded Custom Domain Alias
                </div>
                <div className="font-mono text-xs font-bold text-blue-700 truncate">
                  {PROFILE_DATA.brandedDomainDisplay}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopy(PROFILE_DATA.brandedDomainDisplay, 'branded')
                }
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors shrink-0 cursor-pointer"
              >
                {copiedTarget === 'branded' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                ) : (
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                <span>Copy</span>
              </button>
            </div>

            <div className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-zinc-500">
                  GitHub Pages URL (Portfolio-2.0)
                </div>
                <div className="font-mono text-xs font-semibold text-zinc-900 truncate">
                  {PROFILE_DATA.githubPagesUrl}
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopy(PROFILE_DATA.githubPagesUrl, 'ghpages')
                }
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors shrink-0 cursor-pointer"
              >
                {copiedTarget === 'ghpages' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                ) : (
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <a
              href={PROFILE_DATA.portfolioRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-zinc-800 hover:text-blue-700 transition-colors"
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              <span>github.com/jeevankb-cse/Portfolio-2.0</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <span className="text-zinc-300" aria-hidden="true">
              ·
            </span>
            <a
              href={whatsappShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-zinc-800 hover:text-blue-700 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Share on WhatsApp</span>
            </a>
            <span className="text-zinc-300" aria-hidden="true">
              ·
            </span>
            <a
              href={linkedinShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-zinc-800 hover:text-blue-700 transition-colors"
            >
              <span>Share on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 3. Google Search Snippet Preview */}
        <div className="pt-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xs font-semibold text-zinc-900">
              03. Google Search Snippet Preview
            </h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>JSON-LD + Sitemap Active</span>
            </span>
          </div>
          <div className="bg-[#FAF9F6] border border-zinc-200/90 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs text-zinc-600 mb-1">
              <div className="w-5 h-5 rounded-full bg-blue-700 text-white font-display font-bold flex items-center justify-center text-[10px]">
                J
              </div>
              <div className="truncate">
                <div className="font-medium text-zinc-900 leading-tight">
                  Jeevan K B Portfolio
                </div>
                <div className="text-[11px] text-zinc-500 truncate">
                  {PROFILE_DATA.brandedDomainDisplay} ·{' '}
                  {PROFILE_DATA.githubPagesUrl}
                </div>
              </div>
            </div>
            <p className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer mt-1">
              Jeevan K B – AI &amp; Machine Learning Engineer Portfolio
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">
              Explore Jeevan K B&apos;s AI &amp; ML engineering portfolio:
              ScamShield AI, WeatherGPT (SIH 2026), VoxVeritas, and Computer
              Vision projects in Bengaluru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
