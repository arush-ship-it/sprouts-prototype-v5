import React, { useState } from "react";
import { Send, Sparkles, CheckCircle2, ArrowRight, SkipForward, Plus, X, Building2, Pencil, TrendingUp, ChevronUp, ChevronDown, ExternalLink, Globe, Lock, Link as LinkIcon, Users, Upload, FileText, Calendar, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import StepIndicator from "@/components/createjob/StepIndicator";
import CandidateApplicationPreview from "@/components/createjob/CandidateApplicationPreview";

// Mock existing jobs for the default screen
const existingJobs = [
{ id: 1, title: "Senior Product Designer", department: "Design", applicants: 34, status: "Active" },
{ id: 2, title: "Frontend Engineer", department: "Engineering", applicants: 67, status: "Active" },
{ id: 3, title: "Product Manager", department: "Product", applicants: 12, status: "Draft" }];


const DEFAULT_JD = {
  title: "Senior Product Designer",
  department: "Design",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120k – $180k",
  description:
  "We're looking for a talented Senior Product Designer to join our team and help shape the future of our products. You'll work closely with cross-functional teams to create intuitive, user-centered designs that solve real problems.",
  requirements: [
  "5+ years of product design experience",
  "Strong portfolio showcasing UX/UI work",
  "Proficiency in Figma and design systems",
  "Experience with user research and testing",
  "Excellent communication and collaboration skills"],

  responsibilities: [
  "Lead design projects from concept to launch",
  "Create wireframes, prototypes, and high-fidelity designs",
  "Conduct user research and usability testing",
  "Collaborate with product and engineering teams",
  "Contribute to and maintain design system"]

};

const JD_FORMATS = [
{ value: "classic", label: "Classic / Standard", emoji: "·", desc: "LinkedIn/Amazon style — works for almost every role" },
{ value: "competency", label: "Competency-Based", emoji: "·", desc: "Skills, behaviors & measurable abilities (Deloitte style)" },
{ value: "outcome", label: "Outcome-Based", emoji: "·", desc: "30/60/90 day goals & success metrics (Startup/Stripe style)" },
{ value: "technical", label: "Technical / Engineering", emoji: "·", desc: "Tech stack, tools & skills focused (Google style)" },
{ value: "legal", label: "Legal / Compliance", emoji: "·", desc: "Formal, detailed with certifications & compliance" },
{ value: "internal", label: "Internal / HR Format", emoji: "·", desc: "KRAs, KPIs & reporting relationships for promotions/transfers" }];


const JOB_SUGGESTIONS = {
  Software: ["Senior Software Engineer", "Senior Automation Engineer", "Backend Engineer"],
  Product: ["Product Manager", "Project Manager", "Senior Project Manager"],
  Design: ["Senior Product Designer", "UX Designer", "Junior UI Designer"]
};

// ─── Quick Action Slideshow ───────────────────────────────────────────────────
const QUICK_ACTIONS = [
{
  key: "upload",
  label: "Upload Job Description",
  desc: "Import from PDF, DOC, or TXT",
  bg: "bg-violet-50",
  iconBg: "bg-violet-100",
  iconColor: "text-violet-400",
  border: "border-violet-100",
  emoji: "📄"
},
{
  key: "drafts",
  label: "Use Saved Drafts",
  desc: "Continue from a previous draft",
  bg: "bg-sky-50",
  iconBg: "bg-sky-100",
  iconColor: "text-sky-400",
  border: "border-sky-100",
  emoji: "📝"
}];


function QuickActionSlideshow({ onStart, onShowDrafts }) {
  const [index, setIndex] = React.useState(0);
  const card = QUICK_ACTIONS[index];

  const handleAction = () => {
    if (card.key === "upload") {
      document.getElementById("quick-upload-input")?.click();
    } else {
      onShowDrafts?.(true);
    }
  };

  return null;

































}

// ─── Drafts Drop-up ──────────────────────────────────────────────────────────
function DraftsDropup({ onStart }) {
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => setOpen(false);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((v) => !v)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-gray-600 hover:text-indigo-700 hover:bg-indigo-50"

        title="Previous drafts">
        <FileText className="w-3.5 h-3.5" />
      </button>
      {open &&
      <div className="absolute bottom-full left-0 mb-2 w-[240px] bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-2">Previous Drafts</p>
          <div className="flex flex-col pb-2">
            {SAVED_DRAFTS.map((draft) =>
          <button
            key={draft.id}
            onClick={() => {onStart(`Continue editing: ${draft.title}`);setOpen(false);}}
            className="flex items-start gap-3 px-4 py-2.5 hover:bg-indigo-50 transition-colors text-left">
                <FileText className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-gray-800 truncate">{draft.title}</p>
                  <p className="text-[11px] text-gray-400">{draft.role} · {draft.created}</p>
                </div>
              </button>
          )}
          </div>
        </div>
      }
    </div>);

}

// ─── Step 0: Default / Landing ───────────────────────────────────────────────
const SAVED_DRAFTS = [
{ id: 1, title: "Senior Product Manager", role: "Product", status: "Draft", created: "2 days ago" },
{ id: 2, title: "Frontend Engineer", role: "Engineering", status: "Draft", created: "1 week ago" },
{ id: 3, title: "UX Designer", role: "Design", status: "Draft", created: "3 days ago" },
{ id: 4, title: "Sales Executive", role: "Sales", status: "Draft", created: "5 days ago" }];


function DefaultScreen({ onStart }) {
  const [prompt, setPrompt] = useState("");
  const [showDrafts, setShowDrafts] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [jdFormat, setJdFormat] = useState("classic");
  const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);

  const selectedFormat = JD_FORMATS.find((f) => f.value === jdFormat);

  React.useEffect(() => {
    if (!formatDropdownOpen) return;
    const handler = () => setFormatDropdownOpen(false);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [formatDropdownOpen]);

  const handleSuggestion = (title) => {
    onStart(`Create a job posting for a ${title}`, jdFormat);
  };

  return (
    <div className="flex h-full">
      {/* Left: AI Chat Panel */}
      <div className="bg-white m-0 rounded-3xl w-[400px] shrink-0 shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-[14px] font-semibold text-gray-900">Sprouts Generate</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
          <div className="bg-white rounded-2xl px-4 py-3 text-[13px] text-gray-700 max-w-[90%]">
            Hi! I'll help you create a job posting.<br />What position are you hiring for?
          </div>

          {/* Quick action cards - slideshow */}
           <QuickActionSlideshow onStart={onStart} onShowDrafts={setShowDrafts} />
        </div>
        <div className="px-4 py-4 shrink-0">
          {/* File attachment chip */}
          {attachedFile &&
          <div className="flex items-center gap-2 mb-2 px-1">
              <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-medium px-2.5 py-1 rounded-full">
                <FileText className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[160px]">{attachedFile.name}</span>
                <button onClick={() => setAttachedFile(null)} className="ml-0.5 text-indigo-400 hover:text-indigo-700">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          }
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {e.preventDefault();if (prompt.trim() || attachedFile) onStart(attachedFile ? `Upload: ${attachedFile.name}` : prompt, jdFormat);}
              }}
              placeholder="Describe the role, requirements, or make changes…" className="border-white border-input px-0 py-2 bg-gray-100 text-[13px] pt-12 pr-3 pb-12 pl-3 rounded-2xl flex w-full shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none min-h-[60px]"
              rows={2} />

            {/* Upload icon */}
            <div className="absolute left-2 bottom-2 flex items-center gap-1">
              <label className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:text-indigo-500 hover:bg-indigo-50 cursor-pointer transition-colors" title="Upload job description">
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={(e) => {if (e.target.files?.[0]) setAttachedFile(e.target.files[0]);}} />
              </label>

              {/* Drafts drop-up */}
              <DraftsDropup onStart={onStart} />

              {/* JD Format selector */}
              <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setFormatDropdownOpen((v) => !v)} className="h-7 px-2.5 rounded-lg flex items-center gap-1.5 transition-colors text-[11px] font-medium text-gray-500 bg-white hover:border-indigo-300 hover:text-indigo-500">
                  
                  <span>{jdFormat === "classic" ? "Format" : selectedFormat?.label ?? "Format"}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${formatDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {formatDropdownOpen &&
                <div className="absolute bottom-full left-0 mb-2 w-[260px] bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-2">JD Format</p>
                  {JD_FORMATS.map((fmt) =>
                  <button
                    key={fmt.value}
                    onClick={() => {setJdFormat(fmt.value);setFormatDropdownOpen(false);}}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 transition-colors text-left ${jdFormat === fmt.value ? "bg-indigo-50" : ""}`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${jdFormat === fmt.value ? "bg-indigo-500" : "bg-gray-300"}`} />
                    <div className="min-w-0">
                      <p className={`text-[12px] font-semibold ${jdFormat === fmt.value ? "text-indigo-700" : "text-gray-800"}`}>{fmt.label}</p>
                      <p className="text-[10px] text-gray-400 truncate">{fmt.desc}</p>
                    </div>
                    {jdFormat === fmt.value && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                  </button>
                  )}
                </div>
                }
              </div>
            </div>

            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              {/* Parse button — only shown when file is attached */}
              {attachedFile &&
              <Button
                onClick={() => onStart(`Upload: ${attachedFile.name}`, jdFormat)}
                size="sm" className="bg-blue-50 text-blue-600 px-3 text-xs font-medium rounded-full inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 gap-1">
                
                <Sparkles className="w-3 h-3" /> Parse
              </Button>
              }
              <Button
                onClick={() => {if (prompt.trim() || attachedFile) onStart(attachedFile ? `Upload: ${attachedFile.name}` : prompt, jdFormat);}}
                size="icon" className="bg-blue-600 text-primary-foreground text-sm font-medium rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-8 w-8 hover:bg-indigo-700">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Hero + Job Suggestions */}
      <div className="pt-8 pr-10 pb-10 pl-10 flex-1 flex flex-col items-center justify-center">
        {/* Step dots */}
        








        {/* Hero */}
        <div className="text-center mb-10">
          <div className="bg-gray-300 mb-4 mx-auto rounded-[64px] w-14 h-14 flex items-center justify-center">
            <Sparkles className="text-[hsl(var(--background))] lucide lucide-sparkles w-7 h-7" />
          </div>
          <h2 className="text-slate-700 mb-1 text-2xl font-medium">SproutsAI Job Generation</h2>
          <p className="text-[12px] text-gray-400">Generate &amp; Post Job Instantly With Ease With SproutsAI Job Builder</p>
        </div>

        {/* Job suggestion grid */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-2xl mb-8">
          {Object.entries(JOB_SUGGESTIONS).map(([category, roles]) =>
          <div key={category}>
              <p className="text-[12px] font-semibold text-gray-700 text-center mb-3">{category}</p>
              <div className="space-y-2">
                {roles.map((role) =>
              <button
                key={role}
                onClick={() => handleSuggestion(role)}
                className="w-full px-3 py-2.5 rounded-lg bg-white text-[12px] text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-center">

                    {role}
                  </button>
              )}
              </div>
            </div>
          )}
        </div>



        {/* Saved Drafts List */}
        {showDrafts &&
        <div className="mb-8">
            <p className="text-[13px] font-semibold text-gray-700 mb-3">Recent Drafts</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {SAVED_DRAFTS.map((draft) =>
            <button
              key={draft.id}
              onClick={() => onStart(`Continue editing: ${draft.title}`)}
              className="flex-shrink-0 w-[240px] p-4 rounded-xl bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-sm transition-all text-left">
                  <p className="text-[13px] font-semibold text-gray-900 mb-1">{draft.title}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{draft.role}</span>
                    <span className="text-[11px] text-gray-400">{draft.status}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">Created {draft.created}</p>
                </button>
            )}
            </div>
          </div>
        }



      </div>
    </div>);

}

// ─── Step 1: Generating (animated) ────────────────────────────────────────────
function GeneratingScreen({ prompt, onDone }) {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {clearInterval(interval);return 100;}
        return prev + 5;
      });
    }, 100);
    const timer = setTimeout(() => {onDone();}, 2000);
    return () => {clearTimeout(timer);clearInterval(interval);};
  }, [onDone]);

  return (
    <div className="flex flex-col h-full items-center justify-center px-8">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse" />
      </div>
      <h2 className="text-[18px] font-semibold text-gray-900 mb-2">Generating Job Description…</h2>
      <p className="text-[13px] text-gray-400 mb-8 text-center max-w-xs">
        AI is analysing your prompt and creating a complete job description for you.
      </p>
      <div className="w-full max-w-xs bg-gray-100 rounded-full h-2 mb-3 overflow-hidden">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }} />

      </div>
      <p className="text-[12px] text-gray-400">{progress}%</p>
    </div>);

}

// ─── Step 2: Review JD ─────────────────────────────────────────────────────────
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const WORKPLACE_TYPES = ["On-site", "Remote", "Hybrid"];
const BENEFITS_OPTIONS = ["Health Insurance", "401k", "Flexible Hours", "Stock Options", "Remote Work", "Gym Membership", "Learning Budget", "Unlimited PTO"];

function AIEnhanceToolbar({ position, selectedText, onEnhance, onClose }) {
  if (!position || !selectedText) return null;
  const actions = [
  { label: "Make Professional", prompt: "Make this text more professional" },
  { label: "Make Concise", prompt: "Make this text more concise" },
  { label: "Expand", prompt: "Expand this text with more detail" },
  { label: "Fix Grammar", prompt: "Fix grammar and spelling" }];

  return (
    <div
      className="fixed z-50 bg-white border border-gray-200 rounded-xl shadow-lg px-2 py-1.5 flex items-center gap-1"
      style={{ top: position.y - 48, left: position.x, transform: "translateX(-50%)" }}>
      <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mr-1" />
      {actions.map((a) =>
      <button
        key={a.label}
        onMouseDown={(e) => {e.preventDefault();onEnhance(a.prompt);}}
        className="text-[11px] font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-md whitespace-nowrap transition-colors">
          {a.label}
        </button>
      )}
    </div>);

}

function EditableListItem({ value, onChange, onDelete, placeholder }) {
  return (
    <li className="flex items-start gap-2 group">
      <span className="bg-slate-300 mt-2.5 rounded-full w-1.5 h-1.5 shrink-0" />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={1}
        className="flex-1 text-[13px] text-gray-700 leading-relaxed bg-transparent border-b border-transparent hover:border-gray-200 focus:border-indigo-300 focus:outline-none resize-none py-0.5 transition-colors"
        style={{ minHeight: "1.5rem" }}
        onInput={(e) => {e.target.style.height = "auto";e.target.style.height = e.target.scrollHeight + "px";}} />

      <button onClick={onDelete} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all mt-0.5 shrink-0">
        <X className="w-3.5 h-3.5" />
      </button>
    </li>);

}

const EXTRA_SECTIONS_CONFIG = [
{ label: "Talk About the Company", icon: "🏢", key: "company", defaultItems: [
  "We are a fast-growing company with a mission to [describe mission].",
  "Our team is made up of passionate individuals who [describe team culture].",
  "We believe in [core values] and are committed to building a product that [impact]."]
},
{ label: "Mention Benefits", icon: "🎁", key: "benefits_section", defaultItems: [
  "Competitive salary and equity package",
  "Comprehensive health, dental, and vision insurance",
  "Flexible work hours and remote-friendly environment",
  "Learning & development budget",
  "Generous PTO and paid holidays"]
},
{ label: "Growth Opportunities", icon: "📈", key: "growth", defaultItems: [
  "Access to mentorship and regular performance reviews",
  "Clear career progression path with internal promotions",
  "Dedicated learning budget to support your growth"]
},
{ label: "Team Culture", icon: "🤝", key: "culture", defaultItems: [
  "Collaboration, transparency, and mutual respect",
  "Inclusive environment where every voice matters",
  "We celebrate wins together and support each other through challenges"]
},
{ label: "What We Value", icon: "⭐", key: "values", defaultItems: [
  "Ownership & accountability",
  "Curiosity and continuous learning",
  "Collaboration over competition",
  "Honest and open communication",
  "Customer-first mindset"]
}];


function ReviewJDScreen({ job, onBack, onNext }) {
  const [jd, setJd] = useState(job);
  const [jobDetails, setJobDetails] = useState({
    companyName: "", jobTitle: jd.title || "", department: jd.department || "",
    internalJobTitle: "", jobType: "Full-time", workplaceType: "On-site",
    location: jd.location || "", salary: jd.salary || "", jobGrade: "", headcount: "1",
    benefits: ""
  });

  const [toolbar, setToolbar] = useState(null); // { x, y, text, field }
  const [enhancing, setEnhancing] = useState(false);
  const [addedSections, setAddedSections] = useState([]); // array of { key, label, icon, items }

  const selectedBenefits = jobDetails.benefits ? jobDetails.benefits.split(",").filter(Boolean) : [];
  const toggleBenefit = (b) => {
    const updated = selectedBenefits.includes(b) ? selectedBenefits.filter((x) => x !== b) : [...selectedBenefits, b];
    setJobDetails({ ...jobDetails, benefits: updated.join(",") });
  };
  const toggleJobType = (val) => setJobDetails({ ...jobDetails, jobType: val });
  const toggleWorkplace = (val) => setJobDetails({ ...jobDetails, workplaceType: val });

  const handleTextSelect = (field) => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim().length < 3) {setToolbar(null);return;}
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setToolbar({ x: rect.left + rect.width / 2, y: rect.top + window.scrollY, text: selection.toString(), field });
  };

  const handleEnhance = async (prompt) => {
    if (!toolbar) return;
    setEnhancing(true);
    setToolbar(null);
    const { base44 } = await import("@/api/base44Client");
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `${prompt}:\n\n"${toolbar.text}"\n\nReturn only the improved text, nothing else.`
    });
    const improved = typeof result === "string" ? result : result?.text || result?.content || toolbar.text;
    const field = toolbar.field;
    if (field === "description") {
      setJd((prev) => ({ ...prev, description: prev.description.replace(toolbar.text, improved) }));
    } else if (field === "requirements") {
      setJd((prev) => ({ ...prev, requirements: prev.requirements.map((r) => r === toolbar.text ? improved : r) }));
    } else if (field === "responsibilities") {
      setJd((prev) => ({ ...prev, responsibilities: prev.responsibilities.map((r) => r === toolbar.text ? improved : r) }));
    } else if (field === "title") {
      setJd((prev) => ({ ...prev, title: improved }));
    }
    setEnhancing(false);
  };

  const [enhancingSection, setEnhancingSection] = useState(null);
  const [reqDropdownOpen, setReqDropdownOpen] = useState(false);
  const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);
  const [selectedJdFormat, setSelectedJdFormat] = useState("classic");
  const currentFormat = JD_FORMATS.find((f) => f.value === selectedJdFormat);

  const handleEnhanceSection = async (section, mode = "enhance") => {
    setEnhancingSection(section);
    setReqDropdownOpen(false);
    const { base44 } = await import("@/api/base44Client");
    if (section === "requirements") {
      const modePrompts = {
        enhance: `Enhance and improve these job requirements to be more clear, compelling, and professional.`,
        longer: `Expand these job requirements to be more detailed and comprehensive, adding more specifics.`,
        detailed: `Make these job requirements more detailed with specific examples and measurable criteria.`,
        shorter: `Make these job requirements more concise and to the point, keeping only the most important items.`
      };
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `${modePrompts[mode]} Return a JSON array of strings only, no extra text:\n\n${JSON.stringify(jd.requirements)}`,
        response_json_schema: { type: "object", properties: { items: { type: "array", items: { type: "string" } } } }
      });
      if (result?.items) setJd((prev) => ({ ...prev, requirements: result.items }));
    } else if (section === "responsibilities") {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Enhance and improve these job responsibilities to be more clear, compelling, and professional. Return a JSON array of strings only, no extra text:\n\n${JSON.stringify(jd.responsibilities)}`,
        response_json_schema: { type: "object", properties: { items: { type: "array", items: { type: "string" } } } }
      });
      if (result?.items) setJd((prev) => ({ ...prev, responsibilities: result.items }));
    } else if (section === "description") {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Enhance and improve this job description to be more engaging, clear, and professional. Return only the improved text:\n\n${jd.description}`
      });
      const improved = typeof result === "string" ? result : result?.text || result?.content || jd.description;
      setJd((prev) => ({ ...prev, description: improved }));
    }
    setEnhancingSection(null);
  };

  const updateReq = (i, val) => setJd((prev) => {const r = [...prev.requirements];r[i] = val;return { ...prev, requirements: r };});
  const deleteReq = (i) => setJd((prev) => ({ ...prev, requirements: prev.requirements.filter((_, idx) => idx !== i) }));
  const addReq = () => setJd((prev) => ({ ...prev, requirements: [...prev.requirements, ""] }));

  const updateResp = (i, val) => setJd((prev) => {const r = [...prev.responsibilities];r[i] = val;return { ...prev, responsibilities: r };});
  const deleteResp = (i) => setJd((prev) => ({ ...prev, responsibilities: prev.responsibilities.filter((_, idx) => idx !== i) }));
  const addResp = () => setJd((prev) => ({ ...prev, responsibilities: [...prev.responsibilities, ""] }));

  React.useEffect(() => {
    const close = () => {setToolbar(null);setReqDropdownOpen(false);};
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="flex flex-col h-full" onClick={() => setToolbar(null)}>
      <AIEnhanceToolbar position={toolbar} selectedText={toolbar?.text} onEnhance={handleEnhance} onClose={() => setToolbar(null)} />
      <div className="bg-[#ffffff] flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-gray-900">Job Description</h2>
            <p className="text-[12px] text-gray-400 mt-1">Enhance a section with AI, edit it directly, add new sections, or remove ones you don't need.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            {/* Format dropdown */}
            <div className="relative" onMouseDown={(e) => e.stopPropagation()}>
              




              
              
















              
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] font-medium text-gray-500 hover:bg-gray-50 hover:text-red-500 hover:border-red-200 transition-colors">
              <X className="w-3.5 h-3.5" /> Delete
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-[12px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
          </div>
        </div>
        {/* JD Preview Card */}
        <div className="bg-gray-50 mx-6 px-5 py-5 rounded-2xl shadow-sm" onClick={(e) => e.stopPropagation()}>
          {/* Format dropdown - top right */}
          <div className="flex justify-end mb-3" onMouseDown={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setFormatDropdownOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-colors ${formatDropdownOpen ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
                Format: {currentFormat?.label}
                <ChevronDown className={`w-3 h-3 transition-transform ${formatDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {formatDropdownOpen &&
              <div className="absolute right-0 top-full mt-1.5 w-[260px] bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-2">JD Format</p>
                {JD_FORMATS.map((fmt) =>
                <button
                  key={fmt.value}
                  onClick={() => {setSelectedJdFormat(fmt.value);setFormatDropdownOpen(false);}}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 transition-colors text-left ${selectedJdFormat === fmt.value ? "bg-indigo-50" : ""}`}>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${selectedJdFormat === fmt.value ? "bg-indigo-500" : "bg-gray-300"}`} />
                  <div className="min-w-0">
                    <p className={`text-[12px] font-semibold ${selectedJdFormat === fmt.value ? "text-indigo-700" : "text-gray-800"}`}>{fmt.label}</p>
                    <p className="text-[10px] text-gray-400 truncate">{fmt.desc}</p>
                  </div>
                  {selectedJdFormat === fmt.value && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                </button>
                )}
              </div>
              }
            </div>
          </div>
          {/* Title */}
          <input
            value={jd.title}
            onChange={(e) => setJd({ ...jd, title: e.target.value })}
            onMouseUp={() => handleTextSelect("title")}
            className="text-gray-900 mb-5 text-xl font-semibold w-full bg-transparent border-b border-transparent hover:border-gray-200 focus:border-indigo-300 focus:outline-none pb-1 transition-colors" />


          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 text-base font-medium">About the Role</h3>
            <button
              onClick={() => handleEnhanceSection("description")}
              disabled={enhancingSection === "description"} title="Enhance with AI" className="text-indigo-500 hover:text-indigo-700 flex items-center disabled:opacity-50">
              <Sparkles className={`w-3.5 h-3.5 ${enhancingSection === "description" ? "animate-pulse" : ""}`} />
            </button>
          </div>
          <textarea
            value={jd.description}
            onChange={(e) => setJd({ ...jd, description: e.target.value })}
            onMouseUp={() => handleTextSelect("description")}
            rows={4}
            className="text-[13px] text-gray-700 leading-relaxed mb-5 w-full bg-transparent border border-transparent hover:border-gray-200 focus:border-indigo-300 focus:outline-none rounded-lg px-2 py-1 resize-none transition-colors" />


          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 text-base font-medium">Requirements</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setReqDropdownOpen((v) => !v)}
                  disabled={enhancingSection === "requirements"} className="text-indigo-500 text-xs font-medium hover:text-indigo-700 flex items-center gap-1 disabled:opacity-50">
                  
                  <Sparkles className="w-3.5 h-3.5" /> <ChevronDown className="w-3 h-3" />
                </button>
                {reqDropdownOpen &&
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
                    {[
                  { label: "Make it longer", mode: "longer" },
                  { label: "Make it more detailed", mode: "detailed" },
                  { label: "Make it shorter", mode: "shorter" }].
                  map(({ label, mode }) =>
                  <button
                    key={mode}
                    onMouseDown={(e) => {e.preventDefault();handleEnhanceSection("requirements", mode);}}
                    className="w-full text-left px-4 py-2 text-[12px] text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                        {label}
                      </button>
                  )}
                  </div>
                }
              </div>
              <button onClick={addReq} title="Add requirement" className="text-indigo-500 hover:text-indigo-700 flex items-center"><Plus className="w-3.5 h-3.5" /></button>
              <button onClick={() => setJd((prev) => ({ ...prev, requirements: [] }))} title="Remove section" className="text-red-400 hover:text-red-600 flex items-center"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <ul className="mb-5 space-y-1" onMouseUp={() => handleTextSelect("requirements")}>
            {jd.requirements.map((req, i) =>
            <EditableListItem key={i} value={req} onChange={(v) => updateReq(i, v)} onDelete={() => deleteReq(i)} placeholder="Add requirement…" />
            )}
          </ul>

          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 text-base font-medium">Responsibilities</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleEnhanceSection("responsibilities")}
                disabled={enhancingSection === "responsibilities"}
                className="text-[11px] text-indigo-500 hover:text-indigo-700 font-medium flex items-center gap-1 disabled:opacity-50">
                <Sparkles className="w-3.5 h-3.5" />
              </button>
              <button onClick={addResp} title="Add responsibility" className="text-indigo-500 hover:text-indigo-700 flex items-center"><Plus className="w-3.5 h-3.5" /></button>
              <button onClick={() => setJd((prev) => ({ ...prev, responsibilities: [] }))} title="Remove section" className="text-red-400 hover:text-red-600 flex items-center"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <ul className="space-y-1" onMouseUp={() => handleTextSelect("responsibilities")}>
            {jd.responsibilities.map((resp, i) =>
            <EditableListItem key={i} value={resp} onChange={(v) => updateResp(i, v)} onDelete={() => deleteResp(i)} placeholder="Add responsibility…" />
            )}
          </ul>
          {enhancing && <p className="text-[12px] text-indigo-500 mt-3 animate-pulse flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Enhancing with AI…</p>}

          {/* Extra Sections (added by user) */}
          {addedSections.map((sec) =>
          <div key={sec.key} className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[15px] font-bold text-gray-900 flex items-center gap-1.5">
                  <span>{sec.icon}</span> {sec.label}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                  onClick={() => setAddedSections((prev) => prev.map((s) => s.key === sec.key ? { ...s, items: [...s.items, ""] } : s))}
                  className="text-[11px] text-indigo-500 hover:text-indigo-700 font-medium flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add
                  </button>
                  <button
                  onClick={() => setAddedSections((prev) => prev.filter((s) => s.key !== sec.key))}
                  className="text-gray-300 hover:text-red-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <ul className="space-y-1">
                {sec.items.map((item, i) =>
              <EditableListItem
                key={i}
                value={item}
                onChange={(v) => setAddedSections((prev) => prev.map((s) => s.key === sec.key ? { ...s, items: s.items.map((it, idx) => idx === i ? v : it) } : s))}
                onDelete={() => setAddedSections((prev) => prev.map((s) => s.key === sec.key ? { ...s, items: s.items.filter((_, idx) => idx !== i) } : s))}
                placeholder="Add item…" />

              )}
              </ul>
            </div>
          )}

          {/* Section Hints */}
          <div className="mt-6 pt-5 border-t border-dashed border-gray-200">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Add more sections</p>
            <div className="flex flex-wrap gap-2">
              {EXTRA_SECTIONS_CONFIG.
              filter(({ key }) => !addedSections.find((s) => s.key === key)).
              map(({ label, icon, key, defaultItems }) =>
              <button
                key={key}
                onClick={() => setAddedSections((prev) => [...prev, { key, label, icon, items: [...defaultItems] }])} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] border border-border-gray-300 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                
                  <span>{icon}</span> {label}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      <div className="bg-[#ffffff] pt-4 pr-6 pb-4 pl-6 border-t border-gray-100 shrink-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <Button onClick={() => onNext(jd)} className="bg-blue-600 text-[#ffffff] px-5 py-2 text-xs font-medium rounded-lg inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 hover:bg-indigo-700 gap-1.5">
          Next <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>);

}

// ─── Step 3: Confirm Details ──────────────────────────────────────────────────
function ConfirmDetailsScreen({ onBack, onNext }) {
  const [salaryExpanded, setSalaryExpanded] = useState(false);
  const [rolesExpanded, setRolesExpanded] = useState(false);
  const [showSalary, setShowSalary] = useState(true);
  const [jobDetails, setJobDetails] = useState({
    companyName: "Sprouts AI", jobTitle: "Senior Product Designer", department: "Product",
    internalJobTitle: "SPD-2024", jobType: "Full-time", workplaceType: "Hybrid",
    location: "San Francisco, CA", salary: "$120k – $160k", jobGrade: "L5", headcount: "2",
    benefits: "Health Insurance,401k,Flexible Hours,Learning Budget"
  });

  const selectedBenefits = jobDetails.benefits ? jobDetails.benefits.split(",").filter(Boolean) : [];
  const toggleBenefit = (b) => {
    const updated = selectedBenefits.includes(b) ? selectedBenefits.filter((x) => x !== b) : [...selectedBenefits, b];
    setJobDetails({ ...jobDetails, benefits: updated.join(",") });
  };
  const toggleJobType = (val) => setJobDetails({ ...jobDetails, jobType: val });
  const toggleWorkplace = (val) => setJobDetails({ ...jobDetails, workplaceType: val });

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#ffffff] py-6 flex-1 overflow-y-auto space-y-4">

        {/* Role Information */}
        <div className="bg-slate-50 mb-0 mx-6 px-6 py-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-50 rounded-[48px] w-8 h-8 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-900 text-base font-medium">Role Information</p>
              <p className="text-[11px] text-gray-400">Core job details</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
            { label: "Company Name", key: "companyName", placeholder: "e.g. Acme Corp" },
            { label: "Job Title *", key: "jobTitle", placeholder: "e.g. Senior Designer" },
            { label: "Department", key: "department", placeholder: "e.g. Engineering" },
            { label: "Internal Job Title", key: "internalJobTitle", placeholder: "Internal reference" }].
            map(({ label, key, placeholder }) =>
            <div key={key} className="space-y-1.5">
                <Label className="text-[12px] font-medium text-gray-600">{label}</Label>
                <Input value={jobDetails[key]} onChange={(e) => setJobDetails({ ...jobDetails, [key]: e.target.value })} placeholder={placeholder} className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-[10px] flex w-full border border-input transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-9" />
              </div>
            )}
          </div>
        </div>

        {/* Work Arrangement */}
        <div className="bg-slate-50 mx-6 px-6 py-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-50 rounded-[28px] w-8 h-8 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-900 text-base font-medium">Work Arrangement</p>
              <p className="text-[11px] text-gray-400">Type and location</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-medium text-gray-600 w-20">Job Type</span>
              {JOB_TYPES.map((t) =>
              <button key={t} onClick={() => toggleJobType(t)}
              className={`px-3 py-1 rounded-full text-[12px] border transition-all ${jobDetails.jobType === t ? "bg-indigo-50 border-indigo-400 text-indigo-700" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                  {t}
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[12px] font-medium text-gray-600 w-20">Workplace</span>
              {WORKPLACE_TYPES.map((t) =>
              <button key={t} onClick={() => toggleWorkplace(t)}
              className={`px-3 py-1 rounded-full text-[12px] border transition-all ${jobDetails.workplaceType === t ? "bg-indigo-50 border-indigo-400 text-indigo-700" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                  {t}
                </button>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Location</Label>
              <Input value={jobDetails.location} onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} placeholder="e.g. San Francisco, CA" className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-[10px] flex w-full border border-input  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-9" />
            </div>
          </div>

          {/* Past Roles Context */}
          <div className="bg-[#ffffff] mt-5 pt-4 pr-5 pl-5 pb-4 rounded-2xl border-t border-gray-100">
            <button
              onClick={() => setRolesExpanded((v) => !v)}
              className="flex items-center gap-2 w-full text-left">
              <Building2 className="w-4 h-4 text-indigo-500 shrink-0" />
              <p className="text-[13px] font-semibold text-gray-800 flex-1">Work Arrangement Insights</p>
              <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-200 mr-2">AI Insight</span>
              {rolesExpanded ?
              <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> :
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
            </button>

            {/* Collapsed summary */}
            {!rolesExpanded &&
            <div className="mt-3 flex items-center gap-3">
              <div className="flex gap-2">
                {[{ label: "Hybrid", pct: "50%" }, { label: "Remote", pct: "30%" }, { label: "On-site", pct: "20%" }].map((t) =>
                <span key={t.label} className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{t.label} · {t.pct}</span>
                )}
              </div>
              <span className="text-[11px] text-indigo-600 font-medium shrink-0 ml-auto">3 similar roles</span>
            </div>
            }

            {rolesExpanded &&
            <div className="mt-3">
              <p className="text-[11px] text-gray-400 mb-4">Work arrangement history for similar roles at your company</p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                { label: "Hybrid", count: 3, pct: "50%", color: "bg-indigo-50 text-indigo-700" },
                { label: "Remote", count: 2, pct: "30%", color: "bg-emerald-50 text-emerald-700" },
                { label: "On-site", count: 1, pct: "20%", color: "bg-amber-50 text-amber-700" }].map((t) =>
                <div key={t.label} className={`${t.color} rounded-xl px-3 py-3 text-center`}>
                  <p className="text-[11px] opacity-70 mb-1">{t.label}</p>
                  <p className="text-[16px] font-bold">{t.pct}</p>
                  <p className="text-[10px] opacity-60">{t.count} roles</p>
                </div>
                )}
              </div>
              <p className="text-[12px] font-semibold text-gray-700 mb-2">Past similar roles</p>
              <div className="space-y-2">
                {[
                { name: "Alex Chen", role: "Senior Product Designer", year: "2023", arrangement: "Hybrid", location: "San Francisco, CA" },
                { name: "Priya Sharma", role: "Product Designer", year: "2022", arrangement: "Remote", location: "Remote" },
                { name: "James Liu", role: "UX Designer", year: "2021", arrangement: "On-site", location: "New York, NY" }].map((hire) =>
                <div key={hire.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-[13px] font-semibold text-gray-800">{hire.name} <span className="text-gray-400 font-normal">· {hire.role}</span></p>
                    <p className="text-[11px] text-gray-400">Hired {hire.year} · {hire.location}</p>
                  </div>
                  <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">{hire.arrangement}</span>
                </div>
                )}
              </div>
            </div>
            }
          </div>
        </div>

        {/* Compensation */}
        <div className="bg-slate-50 mx-6 px-6 py-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-50 rounded-[28px] w-8 h-8 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-900 text-base font-medium">Compensation & Scale</p>
              <p className="text-[11px] text-gray-400">Salary and headcount</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-[12px] font-medium text-gray-600">Salary Range</Label>
                <button
                  onClick={() => setShowSalary((v) => !v)}
                  className={`flex items-center gap-1 text-[11px] font-medium transition-colors ${showSalary ? "text-indigo-500 hover:text-indigo-700" : "text-gray-400 hover:text-gray-600"}`}
                  title={showSalary ? "Hide salary from candidates" : "Show salary to candidates"}>
                  {showSalary ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{showSalary ? "Visible to candidates" : "Hidden from candidates"}</span>
                </button>
              </div>
              <Input value={jobDetails.salary} onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })} placeholder="e.g. $120k – $180k" className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-[10px] flex w-full border border-input  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Job Grade</Label>
              <Input value={jobDetails.jobGrade} onChange={(e) => setJobDetails({ ...jobDetails, jobGrade: e.target.value })} placeholder="e.g. L4, Senior" className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-[10px] flex w-full border border-input transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-9" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[12px] font-medium text-gray-600">Headcount</Label>
            <div className="flex items-center gap-3">
              <button onClick={() => setJobDetails({ ...jobDetails, headcount: String(Math.max(1, parseInt(jobDetails.headcount || 1) - 1)) })} className="bg-[#ffffff] text-gray-600 rounded-lg w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-50">

                <span className="text-lg leading-none">‹</span>
              </button>
              <span className="text-[15px] font-semibold text-gray-900 w-6 text-center">{jobDetails.headcount}</span>
              <button onClick={() => setJobDetails({ ...jobDetails, headcount: String(Math.min(50, parseInt(jobDetails.headcount || 1) + 1)) })} className="bg-[#ffffff] text-gray-600 rounded-lg w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-50">

                <span className="text-lg leading-none">›</span>
              </button>
            </div>
          </div>

          {/* Salary Intelligence */}
          <div className="bg-[#ffffff] mt-5 pt-4 pr-5 pl-5 pb-4 rounded-2xl border-t border-gray-100">
            <button
              onClick={() => setSalaryExpanded((v) => !v)}
              className="flex items-center gap-2 w-full text-left">

              <TrendingUp className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-[13px] font-semibold text-gray-800 flex-1">Salary Insight</p>
              <span className="text-[10px] font-semibold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 mr-2">AI Insight</span>
              {salaryExpanded ?
              <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> :
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
            </button>

            {/* Collapsed summary */}
            {!salaryExpanded &&
            <div className="mt-3 flex items-center gap-3">
                <div className="flex-1">
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 rounded-full" style={{ left: "10%", width: "80%" }} />
                    <div className="absolute h-full bg-indigo-500 rounded-full opacity-80" style={{ left: "30%", width: "22%" }} />
                  </div>
                  <div className="flex justify-between text-[10px] mt-1">
                    <span className="text-gray-400">$90k</span>
                    <span className="font-semibold text-gray-600">$135k median</span>
                    <span className="text-gray-400">$175k</span>
                  </div>
                </div>
                <span className="text-[11px] text-indigo-600 font-medium shrink-0">Competitive ✓</span>
              </div>
            }

            {salaryExpanded &&
            <div>
            <p className="text-[11px] text-gray-400 mt-2 mb-4">Market data for Senior Product Designer · San Francisco, CA</p>

            {/* Market range bar */}
            <div className="mb-5">
              <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
                <span>Market Low</span>
                <span>Median</span>
                <span>Market High</span>
              </div>
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="absolute h-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 rounded-full" style={{ left: "10%", width: "80%" }} />
                <div className="absolute h-full bg-indigo-500 rounded-full opacity-80" style={{ left: "30%", width: "22%" }} />
              </div>
              <div className="flex justify-between text-[11px] mt-1.5">
                <span className="text-gray-400">$90k</span>
                <span className="font-semibold text-gray-700">$135k</span>
                <span className="text-gray-400">$175k</span>
              </div>
              <p className="text-[11px] text-indigo-600 font-medium mt-1.5">Your range ($120k–$160k) is <span className="font-bold">competitive</span> — above median for this location.</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-gray-50 rounded-xl px-3 py-3 text-center">
                <p className="text-[11px] text-gray-400 mb-1">SF Bay Median</p>
                <p className="text-[16px] font-bold text-gray-900">$138k</p>
              </div>
              <div className="bg-gray-50 rounded-xl px-3 py-3 text-center">
                <p className="text-[11px] text-gray-400 mb-1">Remote Median</p>
                <p className="text-[16px] font-bold text-gray-900">$118k</p>
              </div>
              <div className="bg-gray-50 rounded-xl px-3 py-3 text-center">
                <p className="text-[11px] text-gray-400 mb-1">NYC Median</p>
                <p className="text-[16px] font-bold text-gray-900">$142k</p>
              </div>
            </div>

            {/* Similar open roles */}
            <p className="text-[12px] font-semibold text-gray-700 mb-2">Similar roles currently hiring</p>
            <div className="space-y-2 mb-5">
              {[
                { company: "Figma", title: "Senior Product Designer", range: "$130k – $165k", location: "San Francisco, CA" },
                { company: "Notion", title: "Product Designer (Senior)", range: "$125k – $155k", location: "Remote" },
                { company: "Linear", title: "Sr. UX Designer", range: "$115k – $150k", location: "Remote" }].
                map((job) =>
                <div key={job.company} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-[13px] font-semibold text-gray-800">{job.company} <span className="font-normal text-gray-500">· {job.title}</span></p>
                    <p className="text-[11px] text-gray-400">{job.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-[12px] font-bold text-gray-800">{job.range}</p>
                    <button onClick={() => window.open("https://www.linkedin.com/jobs/search/?keywords=" + encodeURIComponent(job.title), "_blank")} className="text-gray-300 hover:text-indigo-500 transition-colors">
                      <ExternalLink className="text-blue-600 lucide lucide-external-link w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                )}
            </div>

            {/* Past internal hires */}
            <p className="text-[12px] font-semibold text-gray-700 mb-2">Past hires at your company</p>
            <div className="space-y-2">
              {[
                { name: "Alex Chen", role: "Senior Product Designer", year: "2023", salary: "$128k", level: "L5" },
                { name: "Priya Sharma", role: "Product Designer", year: "2022", salary: "$112k", level: "L4" }].
                map((hire) =>
                <div key={hire.name} className="flex items-center justify-between bg-indigo-50 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-[13px] font-semibold text-gray-800">{hire.name} <span className="text-gray-400 font-normal">· {hire.role}</span></p>
                    <p className="text-[11px] text-gray-400">Hired {hire.year} · Grade {hire.level}</p>
                  </div>
                  <p className="text-[13px] font-bold text-indigo-700">{hire.salary}</p>
                </div>
                )}
            </div>
              </div>
            }
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-slate-50 mb-0 mx-6 px-6 py-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-50 rounded-[32px] w-8 h-8 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-900">Benefits &amp; Perks</p>
              <p className="text-[11px] text-gray-400">Select what you offer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {BENEFITS_OPTIONS.map((b) =>
            <button key={b} onClick={() => toggleBenefit(b)}
            className={`px-3 py-1.5 rounded-full text-[12px] border transition-all ${selectedBenefits.includes(b) ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                {b}
              </button>
            )}
          </div>
        </div>


      </div>
      <div className="bg-[#ffffff] pt-4 pr-6 pb-4 pl-6 border-t border-gray-100 shrink-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <Button onClick={() => onNext(jobDetails)} className="bg-blue-600 text-[#ffffff] px-5 py-2 text-xs font-medium rounded-lg inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-9 hover:bg-indigo-700 gap-1.5">
          Continue <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>);

}

// ─── Step 3: Screening Questions ──────────────────────────────────────────────
const RECOMMENDED_QUESTIONS = [
{ id: 1, text: "Are you willing to undergo a background check, in accordance with local law/regulations?", type: "yes_no" },
{ id: 2, text: "Mention your experience in the industry (in years)", type: "text_input" },
{ id: 3, text: "Are you legally authorized to work in the country of job location?", type: "yes_no" }];

const SUGGESTED_QUESTIONS = [
{ id: 4, text: "Will you be able to reliably commute or relocate to the job location?", type: "yes_no" },
{ id: 5, text: "Are you legally authorised to work in the country of job location?", type: "yes_no" },
{ id: 6, text: "Are you legally authorised to work in the country of job location?", type: "yes_no" },
{ id: 7, text: "Are you legally authorised to work in the country of job location?", type: "yes_no" }];


function QuestionCard({ question, added, onAdd, onRemove, bankMode }) {
  const [editing, setEditing] = useState(false);
  const [questionText, setQuestionText] = useState(question.text);
  const [yesLabel, setYesLabel] = useState("Yes");
  const [noLabel, setNoLabel] = useState("No");
  const [textPlaceholder, setTextPlaceholder] = useState("Add your experience in years");

  return (
    <div className="bg-slate-50 px-5 py-4 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        {editing ?
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="flex-1 text-[13px] text-gray-800 border border-indigo-300 rounded-lg px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
          rows={2} /> :


        <p className="text-[13px] text-gray-800 flex-1">{questionText}</p>
        }
        {bankMode ?
        <button onClick={onAdd} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 shrink-0">
            <Plus className="text-slate-700 lucide lucide-plus w-4 h-4" />
          </button> :
        added ?
        <div className="flex items-center gap-2 shrink-0">
            <label className="flex items-center gap-1.5 text-[12px] text-gray-500 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="accent-indigo-600 w-3.5 h-3.5" />
              Required
            </label>
            <button onClick={() => setEditing((v) => !v)} className={`text-gray-400 hover:text-indigo-500 ${editing ? "text-indigo-500" : ""}`}><Pencil className="bg-transparent text-slate-500 lucide lucide-pencil w-4 h-4" /></button>
            <button onClick={onRemove} className="text-gray-300 hover:text-red-400"><X className="bg-[#ffffff] text-slate-700 lucide lucide-x w-4 h-4" /></button>
          </div> :
        <button onClick={onAdd} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 shrink-0">
            <Plus className="text-slate-700 lucide lucide-plus w-4 h-4" />
          </button>
        }
      </div>
      {question.type === "yes_no" && (
      editing ?
      <div className="space-y-1.5">
            <input
          value={yesLabel}
          onChange={(e) => setYesLabel(e.target.value)}
          className="text-[13px] border border-indigo-200 rounded px-2 py-0.5 w-24 focus:outline-none focus:ring-1 focus:ring-indigo-400" />

            <div />
            <input
          value={noLabel}
          onChange={(e) => setNoLabel(e.target.value)}
          className="text-[13px] border border-indigo-200 rounded px-2 py-0.5 w-24 focus:outline-none focus:ring-1 focus:ring-indigo-400" />

          </div> :

      <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
              <input type="radio" name={`q-${question.id}`} defaultChecked className="accent-indigo-600" /> {yesLabel}
            </label>
            <label className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
              <input type="radio" name={`q-${question.id}`} className="accent-indigo-600" /> {noLabel}
            </label>
          </div>)

      }
      {question.type === "text_input" && (
      editing ?
      <input
        value={textPlaceholder}
        onChange={(e) => setTextPlaceholder(e.target.value)}
        className="text-[13px] border border-indigo-200 rounded px-2 py-0.5 w-full max-w-[260px] focus:outline-none focus:ring-1 focus:ring-indigo-400"
        placeholder="Placeholder text" /> :


      <Input placeholder={textPlaceholder} className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-md flex w-full border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-8 max-w-[200px]" />)

      }
      {editing &&
      <div className="flex justify-end mt-3">
          <button onClick={() => setEditing(false)} className="text-[12px] text-indigo-600 font-medium hover:underline">Done</button>
        </div>
      }
    </div>);

}

function ScreeningScreen({ onBack, onNext, onSkip }) {
  const allQuestions = [...RECOMMENDED_QUESTIONS, ...SUGGESTED_QUESTIONS];
  const [chosenIds, setChosenIds] = useState([]);

  const addQuestion = (id) => setChosenIds((prev) => [...prev, id]);
  const removeQuestion = (id) => setChosenIds((prev) => prev.filter((x) => x !== id));

  const chosenQuestions = allQuestions.filter((q) => chosenIds.includes(q.id));
  const bankQuestions = allQuestions.filter((q) => !chosenIds.includes(q.id));

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#ffffff] px-6 py-6 flex-1 overflow-y-auto space-y-6">

        {/* Candidate Application Form Preview */}
        <div>
          <h2 className="text-gray-800 mb-1 text-xl font-medium">Application Form</h2>
          <p className="text-[13px] text-gray-400 mb-3">This is a preview of what candidates will see when they apply for this role.</p>
          <CandidateApplicationPreview />
        </div>

        {/* Screening Questions */}
        <div>
          <h2 className="text-gray-800 mb-0.5 text-xl font-medium">Screening Questions</h2>
          <p className="text-gray-700 mt-4 mb-1 text-base font-medium">Chosen Questions</p>
          <div className="space-y-3">
            {chosenQuestions.map((q) =>
            <QuestionCard key={q.id} question={q} added onAdd={() => addQuestion(q.id)} onRemove={() => removeQuestion(q.id)} />
            )}
            {chosenQuestions.length === 0 && <p className="bg-[#ffffff] text-gray-400 my-8 py-20 text-base font-normal text-center normal-case">Add questions from the bank below</p>}
          </div>
        </div>

        {/* Question Bank */}
        <div>
          <p className="text-gray-700 mb-1 text-base font-medium">Question Bank</p>
          <div className="space-y-3">
            {bankQuestions.map((q) =>
            <QuestionCard key={q.id} question={q} added={false} onAdd={() => addQuestion(q.id)} onRemove={() => removeQuestion(q.id)} bankMode />
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] pt-4 pr-6 pb-4 pl-6 border-t border-gray-100 shrink-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <div className="flex gap-2">
          

          
          <Button onClick={() => onNext(chosenIds)} className="bg-blue-600 text-[#ffffff] px-5 py-2 text-xs font-medium rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 hover:bg-indigo-700 gap-1.5">
            Continue <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>);

}

// ─── Step 4: Publish ──────────────────────────────────────────────────────────
const JOB_BOARDS = [
{ id: "linkedin", name: "LinkedIn", logo: "💼", desc: "500M+ professionals" },
{ id: "indeed", name: "Indeed", logo: "🔍", desc: "World's #1 job site" },
{ id: "glassdoor", name: "Glassdoor", logo: "🏢", desc: "Company reviews + jobs" },
{ id: "naukri", name: "Naukri", logo: "📋", desc: "India's top job portal" },
{ id: "monster", name: "Monster", logo: "👾", desc: "Global job marketplace" },
{ id: "ziprecruiter", name: "ZipRecruiter", logo: "⚡", desc: "AI-powered matching" },
{ id: "greenhouse", name: "Greenhouse", logo: "🌱", desc: "Integrated ATS posting" },
{ id: "wellfound", name: "Wellfound", logo: "🚀", desc: "Startup jobs & talent" }];


function PublishScreen({ onBack, onPublish }) {
  const [visibility, setVisibility] = useState("public");
  const [evergreen, setEvergreen] = useState(true);
  const [setExpiration, setSetExpiration] = useState(false);
  const [selectedBoards, setSelectedBoards] = useState(["linkedin", "indeed"]);
  const [hoveredBoard, setHoveredBoard] = useState(null);
  const [publishing, setPublishing] = useState(false);

  const toggleBoard = (id) => setSelectedBoards((prev) =>
  prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
  );

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {setPublishing(false);onPublish();}, 1200);
  };

  const visibilityOptions = [
  { value: "public", label: "Public", Icon: Globe, desc: "Visible on all job boards", color: "emerald" },
  { value: "private", label: "Private", Icon: Lock, desc: "Direct link only", color: "amber" },
  { value: "confidential", label: "Confidential", Icon: LinkIcon, desc: "Company name hidden", color: "violet" },
  { value: "internal", label: "Internal", Icon: Users, desc: "Employees only", color: "blue" }];


  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* Header */}
      <div className="bg-white px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          





          
          
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900">Ready to Publish</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">Configure your posting settings and go live</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.open("https://app.sproutsai.com/job-post/details/69707956bc83600006f4e2ae", "_blank")}
          className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <ExternalLink className="w-3.5 h-3.5" /> Preview
        </motion.button>
      </div>

      <div className="bg-[hsl(var(--background))] px-8 py-6 flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-5 max-w-5xl">

          {/* Left column */}
          <div className="flex flex-col gap-4">

            {/* Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }} className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
              
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" /> Visibility
              </p>
              <div className="grid grid-cols-2 gap-2">
                {visibilityOptions.map(({ value, label, Icon, desc }, i) => {
                  const active = visibility === value;
                  return (
                    <motion.button
                      key={value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setVisibility(value)} className="bg-[hsl(var(--background))] px-3.5 py-3 text-left rounded-xl flex flex-col items-start gap-1.5 border transition-all duration-200 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm">




                      
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${active ? "bg-indigo-100" : "bg-gray-100"}`}>
                          <Icon className={`w-3 h-3 ${active ? "text-indigo-600" : "text-gray-400"}`} />
                        </div>
                        <p className={`text-[12px] font-semibold ${active ? "text-indigo-700" : "text-gray-700"}`}>{label}</p>
                        {active &&
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        }
                      </div>
                      <p className="text-[10px] text-gray-400 leading-tight pl-8">{desc}</p>
                    </motion.button>);

                })}
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }} className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
              
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Duration
              </p>
              <div className="flex flex-col gap-2">
                {[
                { key: "evergreen", checked: evergreen, onChange: setEvergreen, label: "Evergreen Position", desc: "Keep this job open indefinitely", icon: "∞" },
                { key: "expiration", checked: setExpiration, onChange: setSetExpiration, label: "Set Expiration Date", desc: "Automatically close after a date", icon: "⏱" }].
                map(({ key, checked, onChange, label, desc, icon }) =>
                <motion.label
                  key={key}
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  checked ? "border-indigo-200 bg-indigo-50/70" : "border-gray-100 bg-gray-50/80 hover:bg-white hover:border-gray-200"}`
                  }>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 transition-colors ${checked ? "bg-indigo-100" : "bg-gray-100"}`}>
                      {icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] font-semibold ${checked ? "text-indigo-800" : "text-gray-700"}`}>{label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
                    {/* Custom toggle */}
                    <div
                    onClick={() => onChange(!checked)}
                    className={`w-9 h-5 rounded-full relative transition-colors duration-200 shrink-0 ${checked ? "bg-indigo-500" : "bg-gray-200"}`}>
                      <motion.div
                      animate={{ x: checked ? 16 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </motion.label>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right column — Job Boards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }} className="bg-slate-50 p-5 rounded-2xl border border-gray-100 flex flex-col transition-all duration-300">


            
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> Post to Job Boards
              </p>
              <motion.span
                key={selectedBoards.length}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-indigo-50 text-indigo-600 border border-indigo-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {selectedBoards.length} selected
              </motion.span>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1 content-start">
              {JOB_BOARDS.map(({ id, name, logo, desc }) => {
                const selected = selectedBoards.includes(id);
                return (
                  <motion.button
                    key={id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onHoverStart={() => setHoveredBoard(id)}
                    onHoverEnd={() => setHoveredBoard(null)}
                    onClick={() => toggleBoard(id)} className="bg-[hsl(var(--background))] px-3 py-2.5 text-left rounded-xl flex items-center gap-2.5 border transition-all duration-200 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm">




                    
                    
                    <div className="min-w-0 flex-1">
                      <p className={`text-[12px] font-semibold leading-tight ${selected ? "text-indigo-700" : "text-gray-700"}`}>{name}</p>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5">{desc}</p>
                    </div>
                    <motion.div
                      animate={selected ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                      className="w-4 h-4 rounded-full bg-indigo-500 shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </motion.div>
                  </motion.button>);

              })}
            </div>

            {/* Select all / none */}
            



            
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-gray-100 px-8 py-4 flex items-center justify-between shrink-0">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <ChevronDown className="w-4 h-4 rotate-90" /> Back
        </motion.button>
        



        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handlePublish}
          disabled={publishing} className="flex items-center gap-2 bg-blue-600 text-white px-8 h-10 font-semibold rounded-xl hover:shadow-[0_6px_20px_rgba(99,102,241,0.45)] transition-all duration-200 disabled:opacity-70 text-[13px]">
          
          {publishing ?
          <>
              <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              Publishing…
            </> :

          <>
              <CheckCircle2 className="w-4 h-4" />
              Post Job {selectedBoards.length > 0 && `· ${selectedBoards.length} board${selectedBoards.length > 1 ? "s" : ""}`}
            </>
          }
        </motion.button>
      </div>
    </div>);

}

// ─── Step 5: Confirmation ─────────────────────────────────────────────────────
function ConfirmationScreen({ jobTitle, generatedJob, onGoToJobs }) {
  return (
    <div className="bg-[#f2f2f2] px-8 text-center flex flex-col items-center justify-center h-full">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
      </div>
      <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Job Published!</h2>
      <p className="text-[13px] text-gray-500 max-w-sm mb-8">
        <span className="font-medium text-gray-700">{jobTitle}</span> has been published successfully. Candidates can now apply.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={() => window.location.href = createPageUrl("Home")}>
          <Building2 className="w-3.5 h-3.5 mr-1.5" /> View All Jobs
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-[13px] px-5" onClick={() => window.location.href = createPageUrl(`ViewJobSetupPipeline?jobId=${generatedJob.id || 'new'}&jobTitle=${encodeURIComponent(jobTitle)}`)}>View Job & Setup Pipeline</Button>
      </div>
    </div>);

}

// ─── AI Chat Box ──────────────────────────────────────────────────────────────
function AIChatBox() {
  const [message, setMessage] = useState("");
  return (
    <div className="relative">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey) {e.preventDefault();setMessage("");}}}
        placeholder="Ask AI to make changes…" className="bg-white text-[13px] pr-12 px-3 py-2 opacity-40 rounded-2xl flex w-full border shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none min-h-[60px] border-gray-200"

        rows={2} />

      <Button
        onClick={() => setMessage("")}
        size="icon" className="bg-indigo-600 text-primary-foreground text-sm font-medium opacity-40 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow absolute right-2 bottom-2 h-8 w-8 hover:bg-indigo-700">

        <Send className="w-3.5 h-3.5" />
      </Button>
    </div>);

}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CreateJob() {
  // step 0 = default landing, 1 = generating, 2 = review JD, 3 = confirm details, 4 = screening, 5 = publish, 6 = confirmation
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [generatedJob, setGeneratedJob] = useState(DEFAULT_JD);

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] bg-[#F2F3F5] overflow-hidden">
      <div className="px-4 py-4 flex flex-1 overflow-hidden gap-4 min-h-0">

        {/* Left Panel — AI Assistant (hidden on landing & confirmation) */}
        {step > 0 && step < 6 &&
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-[400px] shrink-0 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="bg-slate-400 rounded-[20px] w-8 h-8 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-[14px] font-semibold text-gray-900">AI Job Builder</h2>
                  <p className="text-[11px] text-gray-400">Generating your job post</p>
                </div>
              </div>
            </div>
            <StepIndicator currentStep={step} />
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              <div className="flex justify-start">
                <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] bg-gray-100 text-gray-900">
                  {prompt || "I'll help you build the perfect job posting."}
                </div>
              </div>
              {step >= 2 &&
            <div className="flex justify-start">
                  <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] bg-gray-100 text-gray-900">
                    ✅ Job description generated! Review it on the right and make any edits.
                  </div>
                </div>
            }
              {step >= 3 &&
            <div className="flex justify-start">
                  <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] bg-gray-100 text-gray-900">
                    Great! Now confirm the role details.
                  </div>
                </div>
            }
              {step >= 4 &&
            <div className="flex justify-start">
                  <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] bg-gray-100 text-gray-900">
                    Now add optional screening questions, or skip this step.
                  </div>
                </div>
            }
              {step >= 5 &&
            <div className="flex justify-start">
                  <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] bg-gray-100 text-gray-900">
                    Almost there! Choose your publish settings and go live.
                  </div>
                </div>
            }
            </div>
            <div className="p-3 border-t border-gray-100 shrink-0">
              <AIChatBox />
            </div>
          </div>
        }

        {/* Right Panel — Main Content */}
        <div className={`${step === 0 ? "" : "bg-white rounded-2xl border border-gray-100 shadow-sm"} overflow-hidden flex flex-col flex-1`}>
          {step === 0 &&
          <DefaultScreen
            onStart={(p) => {
              setPrompt(p);
              setStep(1);
            }} />

          }
          {step === 1 &&
          <GeneratingScreen
            prompt={prompt}
            onDone={() => setStep(2)} />

          }
          {step === 2 &&
          <ReviewJDScreen
            job={generatedJob}
            onBack={() => setStep(1)}
            onNext={(updatedJd) => {
              setGeneratedJob(updatedJd);
              setStep(3);
            }} />

          }
          {step === 3 &&
          <ConfirmDetailsScreen
            onBack={() => setStep(2)}
            onNext={() => setStep(4)} />

          }
          {step === 4 &&
          <ScreeningScreen
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
            onSkip={() => setStep(5)} />

          }
          {step === 5 &&
          <PublishScreen
            onBack={() => setStep(4)}
            onPublish={() => setStep(6)} />

          }
          {step === 6 &&
          <ConfirmationScreen
            jobTitle={generatedJob.title}
            generatedJob={generatedJob}
            onGoToJobs={() => window.location.href = createPageUrl("Dashboard")} />

          }
        </div>
      </div>
    </div>);

}