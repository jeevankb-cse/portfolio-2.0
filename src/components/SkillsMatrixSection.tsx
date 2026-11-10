import React, { useState } from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { SKILLS_DATA, SkillDomain } from '../data/portfolioData';
import { filterSkills } from '../utils/portfolioLogic';

const SKILL_DOMAINS: SkillDomain[] = [
  'All Domains',
  'Languages',
  'AI & Machine Learning',
  'Frameworks & Web',
  'Developer Tools & Git',
  'Core CS Coursework',
];

export const SkillsMatrixSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<SkillDomain>('All Domains');
  const [skillQuery, setSkillQuery] = useState('');

  const visibleSkills = filterSkills(SKILLS_DATA, selectedDomain, skillQuery);

  return (
    <section id="skills" className="py-20 border-b border-zinc-200/80">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono font-semibold text-blue-700 mb-2">
              03. Technical Arsenal &amp; Coursework
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
              Languages, AI Frameworks &amp; Engineering Foundations
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md">
            Every technical capability is mapped directly to the production
            projects and academic coursework where it was applied.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-white border border-zinc-200/80 rounded-2xl p-4">
          <div
            role="group"
            aria-label="Filter skills by technical domain"
            className="flex flex-wrap items-center gap-1.5"
          >
            {SKILL_DOMAINS.map((domain) => {
              const active = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-60">
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
                placeholder="Filter skills (e.g. Python, NLP)..."
                aria-label="Filter technical skills"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
              />
            </div>
            <span className="font-mono text-xs text-zinc-500 tabular-nums whitespace-nowrap shrink-0">
              {visibleSkills.length} listed
            </span>
          </div>
        </div>

        {/* 3-Column Technical Grid */}
        {visibleSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleSkills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-blue-700 mb-1.5">
                    {skill.domain}
                  </div>
                  <h3 className="font-display text-lg font-bold text-zinc-900 mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                    {skill.proficiencyNote}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-500">
                  <span className="font-semibold text-zinc-700">Applied in: </span>
                  {skill.appliedIn.map((proj, idx) => (
                    <React.Fragment key={proj}>
                      {idx > 0 && <span aria-hidden="true"> · </span>}
                      <span>{proj}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-10 text-center">
            <p className="text-sm font-semibold text-zinc-900 mb-2">
              No skills matched &ldquo;{skillQuery}&rdquo; in {selectedDomain}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDomain('All Domains');
                setSkillQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Skill Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
