import React, { useState } from 'react';
import {
  Check,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import {
  buildMailtoHref,
  ContactFormInput,
  validateContactForm,
} from '../utils/portfolioLogic';

interface SentInquiry extends ContactFormInput {
  id: string;
  timestamp: string;
  mailtoHref: string;
}

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormInput, string>>
  >({});
  const [sentInquiries, setSentInquiries] = useState<SentInquiry[]>([]);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const mailtoHref = buildMailtoHref(PROFILE_DATA.email, form);
    const newEntry: SentInquiry = {
      id: `inq-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      mailtoHref,
    };

    setSentInquiries((prev) => [newEntry, ...prev]);
    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-20 border-b border-zinc-200/80">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-mono font-semibold text-blue-700 mb-2">
            05. Direct Contact &amp; Recruitment Inquiries
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 text-balance">
            Initiate a Conversation with {PROFILE_DATA.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Verified Contact Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-zinc-900 mb-2">
                  Available for AI/ML &amp; Software Engineering Roles
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Based in Bengaluru and open to full-time AI Engineer, Machine
                  Learning Engineer, Python Backend, and Computer Vision
                  opportunities.
                </p>
              </div>

              {/* Email Row */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-zinc-500 mb-0.5">Direct Email</div>
                  <a
                    href={PROFILE_DATA.emailHref}
                    className="text-sm font-semibold text-zinc-900 hover:text-blue-700 truncate block"
                  >
                    {PROFILE_DATA.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Row */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-zinc-500 mb-0.5">Phone / WhatsApp</div>
                  <a
                    href={PROFILE_DATA.phoneHref}
                    className="font-mono text-sm font-semibold text-zinc-900 hover:text-blue-700 tabular-nums"
                  >
                    {PROFILE_DATA.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                  aria-label="Copy phone number"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors shrink-0 cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy Phone</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Row */}
              <div className="pt-4 border-t border-zinc-100 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-700 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-xs text-zinc-500 mb-0.5">Location</div>
                  <p className="text-sm font-medium text-zinc-900">
                    {PROFILE_DATA.location}
                  </p>
                </div>
              </div>

              {/* Direct External Profiles & Resume Download */}
              <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-3">
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
                >
                  <Github className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PROFILE_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0"
                >
                  <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE_DATA.resumePdfPath}
                  download="Jeevan_KB_AI_Developer_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0"
                >
                  <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Inquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-bold text-zinc-900 mb-1">
                Send an Inquiry or Interview Invitation
              </h3>
              <p className="text-xs text-zinc-500 mb-6">
                Fill out the details below to log your message and generate a
                direct dispatch to {PROFILE_DATA.email}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-zinc-800 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
                  />
                  {errors.name && (
                    <p role="alert" className="text-xs text-rose-700 font-medium mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-zinc-800 mb-1.5"
                  >
                    Your Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="e.g. priya@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs text-rose-700 font-medium mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-zinc-800 mb-1.5"
                >
                  Subject / Role Opportunity
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => {
                    setForm({ ...form, subject: e.target.value });
                    if (errors.subject)
                      setErrors({ ...errors, subject: undefined });
                  }}
                  placeholder="e.g. AI/ML Engineer Opportunity at Bengaluru Office"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
                />
                {errors.subject && (
                  <p role="alert" className="text-xs text-rose-700 font-medium mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-zinc-800 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message)
                      setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Share details about the role, project collaboration, or interview schedule..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F6] border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700"
                />
                {errors.message && (
                  <p role="alert" className="text-xs text-rose-700 font-medium mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-zinc-900 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Send Inquiry</span>
              </button>

              {/* Submitted Inquiries List */}
              {sentInquiries.length > 0 && (
                <div className="mt-8 pt-6 border-t border-zinc-200">
                  <div className="text-xs font-semibold text-emerald-800 mb-3">
                    Inquiry Prepared ({sentInquiries.length})
                  </div>
                  <div className="space-y-3">
                    {sentInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-[#FAF9F6] border border-zinc-200 rounded-xl p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 mb-1">
                          <span className="font-semibold text-zinc-900">
                            {inq.subject}
                          </span>
                          <span className="font-mono tabular-nums">
                            Logged at {inq.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 mb-3">
                          From {inq.name} ({inq.email}) — &ldquo;{inq.message}&rdquo;
                        </p>
                        <a
                          href={inq.mailtoHref}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Open in Default Mail Client</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
