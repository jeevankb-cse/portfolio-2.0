import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenShareSeoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShareSeoModal }) => {
  return (
    <footer className="bg-white py-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          <span className="font-semibold text-zinc-900">{PROFILE_DATA.name}</span>
          <span aria-hidden="true"> · </span>
          <span>{PROFILE_DATA.role}</span>
          <span aria-hidden="true"> · </span>
          <span>Bengaluru, Karnataka</span>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={onOpenShareSeoModal}
            className="font-semibold text-blue-700 hover:underline cursor-pointer"
          >
            Google Indexing &amp; Share Link
          </button>
          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href={PROFILE_DATA.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE_DATA.emailHref}
            className="hover:text-zinc-900 transition-colors"
          >
            Email
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 transition-colors"
          >
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};
