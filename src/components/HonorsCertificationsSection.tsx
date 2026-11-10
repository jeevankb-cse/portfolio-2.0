import React from 'react';
import { ArrowUpRight, Award, Trophy } from 'lucide-react';
import {
  CERTIFICATIONS_DATA,
  HACKATHONS_DATA,
  PROFILE_DATA,
} from '../data/portfolioData';

export const HonorsCertificationsSection: React.FC = () => {
  return (
    <section id="honors" className="py-20 border-b border-zinc-200/80">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-mono font-semibold text-blue-700 mb-2">
            04. Hackathons, Certifications &amp; Beyond Code
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
            National Competitions &amp; Verified Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hackathons & Competitions */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mb-2">
              <Trophy className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <h3>Hackathons &amp; National Competitions</h3>
            </div>

            {HACKATHONS_DATA.map((hack) => (
              <article
                key={hack.id}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-2">
                  <span className="font-semibold text-blue-700">{hack.status}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{hack.year}</span>
                  {hack.problemStatementCode && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-zinc-700">
                        {hack.problemStatementCode}
                      </span>
                    </>
                  )}
                </div>
                <h4 className="font-display text-lg font-bold text-zinc-900 mb-1.5">
                  {hack.title}
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {hack.description}
                </p>
              </article>
            ))}
          </div>

          {/* Verified Certifications with Real Google Drive Links */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 mb-2">
              <Award className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <h3>Verified Certifications (Click to Inspect Credential)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS_DATA.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white border border-zinc-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                      <span className="font-mono tabular-nums">{cert.year}</span>
                      <ArrowUpRight
                        className="w-4 h-4 text-zinc-400 group-hover:text-blue-700 transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className="font-display text-base font-bold text-zinc-900 group-hover:text-blue-700 transition-colors mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-zinc-600 mb-3">{cert.issuer}</p>
                  </div>
                  <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-500">
                    {cert.focusArea}
                  </div>
                </a>
              ))}
            </div>

            {/* Spoken Languages & Personal Interests Card */}
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 mb-2">
                    Spoken Languages
                  </h4>
                  <p className="text-sm font-medium text-zinc-900">
                    {PROFILE_DATA.languages.join(' · ')}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-500 mb-2">
                    Interests &amp; Pursuits
                  </h4>
                  <p className="text-sm font-medium text-zinc-900">
                    {PROFILE_DATA.interests.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
