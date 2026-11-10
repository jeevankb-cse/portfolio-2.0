/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PortfolioProject } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsBentoSection } from './components/ProjectsBentoSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { SkillsMatrixSection } from './components/SkillsMatrixSection';
import { HonorsCertificationsSection } from './components/HonorsCertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';
import { ResumeModal } from './components/ResumeModal';
import { ShareSeoModal } from './components/ShareSeoModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null
  );
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isShareSeoModalOpen, setIsShareSeoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-zinc-900">
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      <main className="flex-1">
        <HeroSection
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenShareSeoModal={() => setIsShareSeoModalOpen(true)}
        />
        <ProjectsBentoSection
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <ExperienceEducationSection />
        <SkillsMatrixSection />
        <HonorsCertificationsSection />
        <ContactSection />
      </main>

      <Footer onOpenShareSeoModal={() => setIsShareSeoModalOpen(true)} />

      <ProjectLightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <ShareSeoModal
        isOpen={isShareSeoModalOpen}
        onClose={() => setIsShareSeoModalOpen(false)}
      />
    </div>
  );
}
