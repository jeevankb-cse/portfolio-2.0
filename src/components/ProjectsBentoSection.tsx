import React, { useState } from 'react';
import { ArrowUpRight, Github, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import {
  PROJECTS_DATA,
  PortfolioProject,
  ProjectCategory,
} from '../data/portfolioData';
import { filterProjects } from '../utils/portfolioLogic';

interface ProjectsBentoSectionProps {
  onSelectProject: (project: PortfolioProject) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All Works',
  'NLP & Cybersecurity',
  'Conversational AI',
  'Audio Forensics',
  'Computer Vision',
];

export const ProjectsBentoSection: React.FC<ProjectsBentoSectionProps> = ({
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Works');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = filterProjects(
    PROJECTS_DATA,
    activeCategory,
    searchQuery
  );

  const renderProjectSchematic = (project: PortfolioProject) => {
    switch (project.id) {
      case 'scamshield-ai':
        return (
          <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
              <span>Multi-Modal Threat Detection Pipeline</span>
              <span className="font-mono tabular-nums text-blue-400">
                Flask · OpenCV · Tesseract · Scikit-learn
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.architectureNodes.map((node) => (
                <div
                  key={node.step}
                  className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-3"
                >
                  <div className="font-mono text-xs text-blue-400 tabular-nums mb-1">
                    {node.step}
                  </div>
                  <div className="text-xs font-semibold text-zinc-100 leading-snug">
                    {node.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'weathergpt':
        return (
          <div className="bg-zinc-900 text-white rounded-xl p-5 border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
              <span>Conversational Meteorology Engine</span>
              <span className="font-mono tabular-nums text-amber-400">
                SIH 2026 · PS 26068
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-300">
                Query: &ldquo;Rain advisory for Basavanagudi commute?&rdquo;
              </div>
              <div className="bg-blue-950/60 border border-blue-800/60 rounded-lg p-2.5 text-blue-200 tabular-nums">
                NLP Forecast → 82% Precip (17:30 IST) · Advises Green Line Metro
              </div>
            </div>
          </div>
        );

      case 'voxveritas':
        return (
          <div className="bg-zinc-900 text-white rounded-xl p-5 border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
              <span>Acoustic Spectral &amp; MFCC Forensics</span>
              <span className="font-mono tabular-nums text-emerald-400">
                Python + TypeScript
              </span>
            </div>
            {/* SVG Acoustic Harmonic Bars */}
            <svg
              viewBox="0 0 320 64"
              className="w-full h-16 bg-zinc-950 rounded-lg p-2 border border-zinc-800"
              aria-label="Acoustic frequency spectrum schematic"
            >
              {[
                18, 34, 48, 28, 52, 42, 19, 38, 54, 46, 22, 30, 49, 36, 16, 44,
                50, 26, 32, 40, 20, 35, 47, 29,
              ].map((h, i) => (
                <rect
                  key={i}
                  x={8 + i * 12.8}
                  y={58 - h}
                  width="7"
                  height={h}
                  rx="2"
                  fill={i > 15 ? '#3B82F6' : '#E4E4E7'}
                />
              ))}
            </svg>
          </div>
        );

      case 'smart-voting-system':
      default:
        return (
          <div className="bg-zinc-950 text-white rounded-xl p-5 border border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
              <span>Biometric Facial KNN + Blink Liveness Architecture</span>
              <span className="font-mono tabular-nums text-blue-400">
                OpenCV · KNN · SHA-256 Ledger
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.architectureNodes.map((node) => (
                <div
                  key={node.step}
                  className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-3"
                >
                  <div className="font-mono text-xs text-blue-400 tabular-nums mb-1">
                    {node.step}
                  </div>
                  <div className="text-xs font-semibold text-zinc-100 leading-snug">
                    {node.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-20 border-b border-zinc-200/80">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono font-semibold text-blue-700 mb-2">
              01. Selected Engineering Works
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
              Applied AI, Computer Vision &amp; NLP Systems
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md">
            Click any project card to open its interactive system architecture
            and inspect real-world test payloads.
          </p>
        </div>

        {/* Interactive Filter Bar & Search Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-white border border-zinc-200/80 rounded-2xl p-4">
          {/* Functional Category Filter Buttons */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input & Count */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack (e.g. OpenCV, OCR)..."
                aria-label="Search projects by technology or keyword"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF9F6] border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
              />
            </div>
            <span className="font-mono text-xs text-zinc-500 tabular-nums whitespace-nowrap shrink-0">
              Showing {filteredProjects.length} of {PROJECTS_DATA.length}
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const isWide =
                project.featuredSpan === 'wide' &&
                activeCategory === 'All Works' &&
                !searchQuery.trim();

              return (
                <article
                  key={project.id}
                  className={`bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 ${
                    isWide ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                >
                  <div>
                    {/* Unboxed Metadata Line (Zero Static Pills) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-semibold text-blue-700 tabular-nums">
                          {project.index}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-zinc-700">
                          {project.category}
                        </span>
                        {project.recognition && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-zinc-600">{project.recognition}</span>
                          </>
                        )}
                      </div>
                      <span className="font-mono tabular-nums text-zinc-400">
                        {project.year}
                      </span>
                    </div>

                    {/* Project Title & Subtitle */}
                    <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-900 mb-2">
                      {project.title}{' '}
                      <span className="font-normal text-zinc-500">
                        — {project.subtitle}
                      </span>
                    </h3>

                    <p className="text-sm text-zinc-600 leading-relaxed mb-5 max-w-[70ch]">
                      {project.summary}
                    </p>

                    {/* Architectural Schematic Media Frame */}
                    <div className="mb-5">{renderProjectSchematic(project)}</div>

                    {/* Resume Engineering Highlights */}
                    <ul className="space-y-2 mb-6 text-sm text-zinc-700">
                      {project.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span
                            className="font-mono text-xs text-blue-700 mt-1 shrink-0"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Footer: Unboxed Stack Metadata + Interactive Actions */}
                  <div className="pt-5 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <span className="font-medium text-zinc-700">{tech}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Inspect Architecture</span>
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Github className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-zinc-200/80 rounded-2xl p-12 text-center">
            <p className="font-display text-lg font-semibold text-zinc-900 mb-1">
              No projects match &ldquo;{searchQuery}&rdquo; in {activeCategory}
            </p>
            <p className="text-sm text-zinc-500 mb-5">
              Try clearing the search filter or switching back to All Works.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All Works');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Project Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
