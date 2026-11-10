import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  HACKATHONS_DATA,
  PROFILE_DATA,
  PROJECTS_DATA,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResumeViewMode = 'original-sheet' | 'interactive-text';

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<ResumeViewMode>('original-sheet');
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [customUploadedImageUrl, setCustomUploadedImageUrl] = useState<string | null>(
    null
  );
  const [uploadedFileName, setUploadedFileName] = useState<string>(
    'Jeevan_AI_Developer_Resume.pdf'
  );
  const [customBlobUrl, setCustomBlobUrl] = useState<string | null>(null);
  const [downloadFeedback, setDownloadFeedback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setUploadedFileName(file.name);
    setCustomBlobUrl(objectUrl);

    if (file.type.startsWith('image/')) {
      setCustomUploadedImageUrl(objectUrl);
      setViewMode('original-sheet');
    } else {
      // If user uploads a new PDF, switch to interactive text sheet or keep rendered sheet visible
      setViewMode('original-sheet');
    }
  };

  const handleDownloadResume = async () => {
    try {
      const targetUrl = customBlobUrl || PROFILE_DATA.resumePdfPath;
      const response = await fetch(targetUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = uploadedFileName || 'Jeevan_KB_AI_Developer_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
      setDownloadFeedback(true);
      setTimeout(() => setDownloadFeedback(false), 2500);
    } catch {
      const link = document.createElement('a');
      link.href = PROFILE_DATA.resumePdfPath;
      link.download = 'Jeevan_KB_AI_Developer_Resume.pdf';
      link.click();
    }
  };

  const activeSheetImage =
    customUploadedImageUrl || PROFILE_DATA.resumeRenderedImagePath;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-col h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 border-b border-zinc-200 bg-[#FAF9F6]">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2
                id="resume-modal-title"
                className="font-display text-base sm:text-lg font-bold text-zinc-900 truncate"
              >
                {PROFILE_DATA.name} — Curriculum Vitae
              </h2>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Uploaded &amp; Verified</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 truncate">
              Active File: {uploadedFileName} · {PROFILE_DATA.shortLocation}
            </p>
          </div>

          {/* View Mode & Zoom / Upload / Download Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Switcher */}
            <div
              role="group"
              aria-label="Resume view mode"
              className="flex items-center gap-1 p-1 bg-zinc-200/80 rounded-lg"
            >
              <button
                type="button"
                onClick={() => setViewMode('original-sheet')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'original-sheet'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Original Resume Sheet
              </button>
              <button
                type="button"
                onClick={() => setViewMode('interactive-text')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'interactive-text'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Interactive Links View
              </button>
            </div>

            {viewMode === 'original-sheet' && (
              <div className="hidden sm:flex items-center gap-1 bg-zinc-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setZoomPercent((z) => Math.max(75, z - 25))}
                  aria-label="Zoom out resume"
                  className="p-1.5 text-zinc-700 hover:text-zinc-900 rounded cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="font-mono text-xs text-zinc-700 px-1.5 tabular-nums">
                  {zoomPercent}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomPercent((z) => Math.min(150, z + 25))}
                  aria-label="Zoom in resume"
                  className="p-1.5 text-zinc-700 hover:text-zinc-900 rounded cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* Hidden File Input so user can also upload a new Resume file */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileUpload}
              className="hidden"
              aria-label="Upload new resume file"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-700 bg-zinc-200/80 rounded-lg hover:bg-zinc-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Replace File</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{downloadFeedback ? 'Downloaded!' : 'Download PDF'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview modal"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Main Scrollable Document Area */}
        <div className="flex-1 overflow-y-auto bg-zinc-200/70 p-4 sm:p-8 flex justify-center">
          {viewMode === 'original-sheet' ? (
            <div
              style={{ width: `${Math.round((850 * zoomPercent) / 100)}px` }}
              className="bg-white shadow-xl border border-zinc-300 rounded-lg overflow-hidden transition-all duration-150 h-fit"
            >
              <img
                src={activeSheetImage}
                alt="Jeevan K B Official Uploaded Resume Document"
                referrerPolicy="no-referrer"
                className="w-full h-auto block select-none"
              />
            </div>
          ) : (
            /* Interactive Selectable & Clickable Resume Sheet */
            <div className="w-full max-w-[850px] bg-white shadow-xl border border-zinc-300 rounded-lg p-6 sm:p-10 text-zinc-900 h-fit space-y-6">
              {/* Header */}
              <div className="text-center border-b border-zinc-300 pb-5">
                <h3 className="font-serif text-3xl font-bold tracking-wide uppercase text-zinc-900">
                  {PROFILE_DATA.name}
                </h3>
                <p className="text-xs text-zinc-600 mt-1">
                  {PROFILE_DATA.location}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-blue-700 mt-2.5">
                  <a
                    href={PROFILE_DATA.phoneHref}
                    className="inline-flex items-center gap-1 hover:underline font-mono tabular-nums"
                  >
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{PROFILE_DATA.phone}</span>
                  </a>
                  <a
                    href={PROFILE_DATA.emailHref}
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{PROFILE_DATA.email}</span>
                  </a>
                  <a
                    href={PROFILE_DATA.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PROFILE_DATA.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Career Objective */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-800 pb-1 mb-2">
                  Career Objective
                </h4>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {PROFILE_DATA.careerObjective}
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-800 pb-1 mb-2.5">
                  Education
                </h4>
                <div className="space-y-2.5">
                  {EDUCATION_DATA.map((edu) => (
                    <div
                      key={edu.id}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-zinc-900">
                          {edu.institution}
                        </span>
                        <p className="italic text-zinc-700">
                          {edu.degree} [{edu.scoreLabel}: {edu.scoreValue}]
                        </p>
                      </div>
                      <div className="sm:text-right font-mono tabular-nums text-zinc-600">
                        <div className="font-semibold text-zinc-900">
                          {edu.period}
                        </div>
                        <div className="italic font-sans">{edu.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-800 pb-1 mb-2.5">
                  Experience
                </h4>
                {EXPERIENCE_DATA.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-zinc-900">{exp.role}</span>
                      <span className="font-mono font-semibold tabular-nums">
                        {exp.duration}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between italic text-zinc-700 mb-1.5">
                      <span>{exp.organization}</span>
                      <span>{exp.location}</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-zinc-700">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-800 pb-1 mb-2.5">
                  Projects
                </h4>
                <div className="space-y-3">
                  {PROJECTS_DATA.map((proj) => (
                    <div key={proj.id} className="text-xs">
                      <div className="flex flex-wrap items-center gap-2 font-bold text-zinc-900 mb-1">
                        <span>
                          {proj.title} – {proj.subtitle}
                        </span>
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-700 hover:underline font-semibold"
                        >
                          <span>(Source Code)</span>
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </a>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-zinc-700">
                        {proj.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider border-b border-zinc-800 pb-1 mb-2.5">
                  Additional Information
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-zinc-700">
                  <li>
                    <span className="font-bold">Hackathons/Competitions: </span>
                    {HACKATHONS_DATA.map((h) => h.title).join('; ')}.
                  </li>
                  <li>
                    <span className="font-bold">Certifications: </span>
                    {CERTIFICATIONS_DATA.map((cert, idx) => (
                      <React.Fragment key={cert.id}>
                        {idx > 0 && <span> — </span>}
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline font-medium"
                        >
                          {cert.title}
                        </a>
                      </React.Fragment>
                    ))}
                  </li>
                  <li>
                    <span className="font-bold">Languages: </span>
                    {PROFILE_DATA.languages.join(', ')}
                  </li>
                  <li>
                    <span className="font-bold">Interests: </span>
                    {PROFILE_DATA.interests.join(', ')}.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
