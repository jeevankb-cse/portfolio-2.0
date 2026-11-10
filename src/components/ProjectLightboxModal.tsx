import React, { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Github, ShieldAlert, TriangleAlert, X } from 'lucide-react';
import { PortfolioProject } from '../data/portfolioData';

interface ProjectLightboxModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({
  project,
  onClose,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');

  useEffect(() => {
    if (project && project.scenarios.length > 0) {
      setSelectedScenarioId(project.scenarios[0].id);
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const activeScenario =
    project.scenarios.find((s) => s.id === selectedScenarioId) ||
    project.scenarios[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-2xl p-5 sm:p-7 my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 mb-1.5">
              <span className="font-mono tabular-nums text-blue-700">
                {project.index}. Case Study
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{project.year}</span>
              {project.recognition && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-zinc-800 font-semibold">{project.recognition}</span>
                </>
              )}
            </div>
            <h2
              id="modal-project-title"
              className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900"
            >
              {project.title} — {project.subtitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project case study modal"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-900 hover:text-white transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Problem & System Architecture Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4 border-b border-zinc-200">
          <div>
            <h3 className="text-xs font-semibold text-zinc-900 mb-1">
              01. Engineering Problem Statement
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-900 mb-1">
              02. System Architecture &amp; Implementation
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {project.architectureOverview}
            </p>
          </div>
        </div>

        {/* 4-Step Pipeline Architecture Flow */}
        <div className="py-4 border-b border-zinc-200">
          <h3 className="text-xs font-semibold text-zinc-900 mb-2.5">
            03. Execution Pipeline Stages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {project.architectureNodes.map((node) => (
              <div
                key={node.step}
                className="bg-[#FAF9F6] border border-zinc-200/80 rounded-xl p-3"
              >
                <div className="font-mono text-xs font-semibold text-blue-700 tabular-nums mb-0.5">
                  Stage {node.step}
                </div>
                <div className="text-xs font-semibold text-zinc-900 mb-1">
                  {node.title}
                </div>
                <p className="text-xs text-zinc-600 leading-snug">{node.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Pipeline Walkthrough Simulator */}
        <div className="py-4 border-b border-zinc-200">
          <div className="flex flex-col gap-2.5 mb-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xs font-semibold text-zinc-900">
                04. Interactive Pipeline Inspection
              </h3>
              <p className="text-xs text-zinc-500">
                Select a test payload below to inspect how {project.title} processes real-world inputs.
              </p>
            </div>

            {/* Single-Row Functional Scenario Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-lg overflow-x-auto">
              {project.scenarios.map((scenario) => {
                const isSelected = scenario.id === activeScenario.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => setSelectedScenarioId(scenario.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {scenario.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#FAF9F6] border border-zinc-200/80 rounded-xl p-4">
            <div className="mb-3">
              <div className="text-xs font-medium text-zinc-500 mb-1">
                Sample Input Payload
              </div>
              <p className="font-mono text-xs text-zinc-800 bg-white border border-zinc-200/80 rounded-lg p-2.5">
                {activeScenario.inputSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
              {activeScenario.pipelineStageMetrics.map((item) => (
                <div
                  key={item.stage}
                  className="bg-white border border-zinc-200/80 rounded-lg p-2.5"
                >
                  <div className="text-xs text-zinc-500">{item.stage}</div>
                  <div className="font-mono text-xs font-semibold text-zinc-900 tabular-nums mt-0.5">
                    {item.metric}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-200/80">
              <div className="flex items-center gap-2">
                {activeScenario.verdictTone === 'safe' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                )}
                {activeScenario.verdictTone === 'warning' && (
                  <TriangleAlert className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
                )}
                {activeScenario.verdictTone === 'danger' && (
                  <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    activeScenario.verdictTone === 'safe'
                      ? 'text-emerald-800'
                      : activeScenario.verdictTone === 'warning'
                      ? 'text-amber-800'
                      : 'text-rose-800'
                  }`}
                >
                  Output Verdict: {activeScenario.verdictLabel}
                </span>
              </div>
              <p className="text-xs text-zinc-600">{activeScenario.explanation}</p>
            </div>
          </div>
        </div>

        {/* Key Resume Contributions & Source Code CTA */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-zinc-900">
              Technologies &amp; Stack
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600">
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <span>{tech}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>View Source Code on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
