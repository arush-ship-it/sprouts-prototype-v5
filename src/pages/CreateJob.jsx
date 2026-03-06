import React, { useState } from "react";
import { Send, Sparkles, CheckCircle2, ArrowRight, SkipForward, Plus, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import StepIndicator from "@/components/createjob/StepIndicator";

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

const JOB_SUGGESTIONS = {
  Software: ["Senior Software Engineer", "Senior Automation Engineer", "Backend Engineer"],
  Product: ["Product Manager", "Project Manager", "Senior Project Manager"],
  Design: ["Senior Product Designer", "UX Designer", "Junior UI Designer"]
};

// ─── Step 0: Default / Landing ───────────────────────────────────────────────
function DefaultScreen({ onStart }) {
  const [prompt, setPrompt] = useState("");

  const handleSuggestion = (title) => {
    onStart(`Create a job posting for a ${title}`);
  };

  return (
    <div className="flex h-full">
      {/* Left: AI Chat Panel */}
      <div className="w-[360px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden m-0">
        <div className="px-4 py-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-[14px] font-semibold text-gray-900">Sprouts Generate</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div className="bg-gray-100 rounded-2xl px-4 py-3 text-[13px] text-gray-700 max-w-[90%]">
            Hi! I'll help you create a job posting.<br />What position are you hiring for?
          </div>
        </div>
        <div className="p-3 border-t border-gray-100 shrink-0">
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {e.preventDefault();if (prompt.trim()) onStart(prompt);}
              }}
              placeholder="Describe the role, requirements, or make changes…"
              className="resize-none text-[13px] pr-12 rounded-2xl min-h-[60px] bg-white border-gray-200"
              rows={2} />

            <Button
              onClick={() => {if (prompt.trim()) onStart(prompt);}}
              size="icon" className="bg-blue-600 text-primary-foreground text-sm font-medium rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow absolute right-2 bottom-2 h-8 w-8 hover:bg-indigo-700">


              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Hero + Job Suggestions */}
      <div className="pt-8 pr-10 pb-40 pl-10 flex-1 flex flex-col items-center justify-center">
        {/* Step dots */}
        








        {/* Hero */}
        <div className="text-center mb-10">
          <div className="bg-[#ffffff] mb-4 mx-auto rounded-[64px] w-14 h-14 flex items-center justify-center">
            <Sparkles className="text-blue-600 lucide lucide-sparkles w-7 h-7" />
          </div>
          <h2 className="text-slate-700 mb-1 text-2xl font-medium">SproutsAI Job Generation</h2>
          <p className="text-[12px] text-gray-400">Generate &amp; Post Job Instantly With Ease With SproutsAI Job Builder</p>
        </div>

        {/* Job suggestion grid */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-2xl">
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

function ReviewJDScreen({ job, onBack, onNext }) {
  const [jd, setJd] = useState(job);
  const [jobDetails, setJobDetails] = useState({
    companyName: "", jobTitle: jd.title || "", department: jd.department || "",
    internalJobTitle: "", jobType: "Full-time", workplaceType: "On-site",
    location: jd.location || "", salary: jd.salary || "", jobGrade: "", headcount: "1",
    benefits: ""
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
      <div className="bg-[#f2f2f2] flex-1 overflow-y-auto">
        {/* JD Preview Card */}
        <div className="bg-white mt-6 mb-5 mx-6 px-6 py-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-gray-900 mb-5 text-xl font-semibold">{jd.title}</h2>

          <h3 className="text-[15px] font-bold text-gray-900 mb-2">About the Role</h3>
          <p className="text-[13px] text-gray-700 leading-relaxed mb-5">{jd.description}</p>

          <h3 className="text-[15px] font-bold text-gray-900 mb-2">Requirements</h3>
          <ul className="mb-5 space-y-1">
            {jd.requirements.map((req, i) =>
            <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />{req}
              </li>
            )}
          </ul>

          <h3 className="text-[15px] font-bold text-gray-900 mb-2">Responsibilities</h3>
          <ul className="space-y-1">
            {jd.responsibilities.map((resp, i) =>
            <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />{resp}
              </li>
            )}
          </ul>
        </div>

        {/* Role Information */}
        <div className="bg-white mb-4 mx-6 px-6 py-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-900">Role Information</p>
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
                <Input value={jobDetails[key]} onChange={(e) => setJobDetails({ ...jobDetails, [key]: e.target.value })} placeholder={placeholder} className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-md flex w-full border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-9" />
              </div>
            )}
          </div>
        </div>

        {/* Work Arrangement */}
        <div className="bg-white mb-4 mx-6 px-6 py-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-900">Work Arrangement</p>
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
              <Input value={jobDetails.location} onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} placeholder="e.g. San Francisco, CA" className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-md flex w-full border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-9" />
            </div>
          </div>
        </div>

        {/* Compensation */}
        <div className="bg-white mb-4 mx-6 px-6 py-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-900">Compensation &amp; Scale</p>
              <p className="text-[11px] text-gray-400">Salary and headcount</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Salary Range</Label>
              <Input value={jobDetails.salary} onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })} placeholder="e.g. $120k – $180k" className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-md flex w-full border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Job Grade</Label>
              <Input value={jobDetails.jobGrade} onChange={(e) => setJobDetails({ ...jobDetails, jobGrade: e.target.value })} placeholder="e.g. L4, Senior" className="bg-[#ffffff] text-[13px] px-3 py-1 rounded-md flex w-full border border-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-9" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[12px] font-medium text-gray-600">Headcount</Label>
            <div className="flex items-center gap-3">
              <button onClick={() => setJobDetails({ ...jobDetails, headcount: String(Math.max(1, parseInt(jobDetails.headcount || 1) - 1)) })}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <span className="text-lg leading-none">‹</span>
              </button>
              <span className="text-[15px] font-semibold text-gray-900 w-6 text-center">{jobDetails.headcount}</span>
              <button onClick={() => setJobDetails({ ...jobDetails, headcount: String(Math.min(50, parseInt(jobDetails.headcount || 1) + 1)) })}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50">
                <span className="text-lg leading-none">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white mb-6 mx-6 px-6 py-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
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

      <div className="bg-[#f2f2f2] pt-3 pr-6 pl-6 border-t border-gray-100 shrink-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <Button onClick={() => onNext(jd)} className="bg-blue-600 text-[#ffffff] px-5 py-2 text-xs font-medium rounded-lg inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 hover:bg-indigo-700 gap-1.5">
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


function QuestionCard({ question, added, onAdd, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [questionText, setQuestionText] = useState(question.text);
  const [yesLabel, setYesLabel] = useState("Yes");
  const [noLabel, setNoLabel] = useState("No");
  const [textPlaceholder, setTextPlaceholder] = useState("Add your experience in years");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        {editing ?
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="flex-1 text-[13px] text-gray-800 border border-indigo-300 rounded-lg px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
          rows={2} /> :


        <p className="text-[13px] text-gray-800 flex-1">{questionText}</p>
        }
        {added ?
        <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 text-[12px] text-gray-500 border border-gray-200 rounded-md px-2 py-0.5">Required <span className="text-gray-400">∨</span></span>
            <button onClick={() => setEditing((v) => !v)} className={`text-gray-400 hover:text-indigo-500 ${editing ? "text-indigo-500" : ""}`}><span className="text-slate-700">✎</span></button>
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
  const [addedIds, setAddedIds] = useState(RECOMMENDED_QUESTIONS.map((q) => q.id));
  const [dismissedIds, setDismissedIds] = useState([]);

  const [promotedIds, setPromotedIds] = useState([]);

  const addQuestion = (id) => {
    setAddedIds((prev) => [...prev, id]);
    // If it's a suggested question, promote it to recommended section
    if (SUGGESTED_QUESTIONS.find((q) => q.id === id)) {
      setPromotedIds((prev) => [...prev, id]);
    }
  };
  const removeQuestion = (id) => {
    setAddedIds((prev) => prev.filter((x) => x !== id));
    setPromotedIds((prev) => prev.filter((x) => x !== id));
    // If it's a recommended question, move it to dismissed (bottom of suggested)
    if (RECOMMENDED_QUESTIONS.find((q) => q.id === id)) {
      setDismissedIds((prev) => [...prev, id]);
    }
  };

  const dismissedQuestions = RECOMMENDED_QUESTIONS.filter((q) => dismissedIds.includes(q.id));
  const visibleRecommended = RECOMMENDED_QUESTIONS.filter((q) => !dismissedIds.includes(q.id));
  const promotedQuestions = SUGGESTED_QUESTIONS.filter((q) => promotedIds.includes(q.id));
  const visibleSuggested = SUGGESTED_QUESTIONS.filter((q) => !promotedIds.includes(q.id));

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#f2f2f2] px-6 py-6 flex-1 overflow-y-auto space-y-6">
        {/* Recommended */}
        <div>
          <h2 className="text-gray-900 mb-0.5 text-lg font-semibold">Screening Questions</h2>
          <p className="text-[13px] font-semibold text-gray-700 mt-4 mb-1">Recommended</p>
          
          <div className="space-y-3">
            {visibleRecommended.map((q) =>
            <QuestionCard key={q.id} question={q} added={addedIds.includes(q.id)} onAdd={() => addQuestion(q.id)} onRemove={() => removeQuestion(q.id)} />
            )}
            {promotedQuestions.map((q) =>
            <QuestionCard key={q.id} question={q} added={addedIds.includes(q.id)} onAdd={() => addQuestion(q.id)} onRemove={() => removeQuestion(q.id)} />
            )}
          </div>
        </div>

        {/* Suggested */}
        <div>
          <p className="text-[13px] font-semibold text-gray-700 mb-1">Question Bank</p>
          
          <div className="space-y-3">
            {visibleSuggested.map((q) =>
            <QuestionCard key={q.id} question={q} added={addedIds.includes(q.id)} onAdd={() => addQuestion(q.id)} onRemove={() => removeQuestion(q.id)} />
            )}
            {dismissedQuestions.map((q) =>
            <QuestionCard key={q.id} question={q} added={addedIds.includes(q.id)} onAdd={() => addQuestion(q.id)} onRemove={() => removeQuestion(q.id)} />
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#f2f2f2] pt-2 pr-6 pl-6 border-t border-gray-100 shrink-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onSkip} className="text-gray-500 gap-1.5">
            <SkipForward className="w-3.5 h-3.5" /> Skip
          </Button>
          <Button onClick={() => onNext(addedIds)} className="bg-blue-600 text-[#ffffff] px-5 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 hover:bg-indigo-700 gap-1.5">
            Continue <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>);

}

// ─── Step 4: Publish ──────────────────────────────────────────────────────────
function PublishScreen({ onBack, onPublish }) {
  const [visibility, setVisibility] = useState("public");
  const [evergreen, setEvergreen] = useState(true);
  const [setExpiration, setSetExpiration] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#f2f2f2] px-6 py-8 flex-1 overflow-y-auto flex items-center justify-center">
        <div className="bg-[#f2f2f2] px-10 py-10 rounded-2xl border border-gray-100 shadow-sm w-full max-w-lg">
          {/* Illustration */}
          <div className="flex justify-center mb-5">
            
          </div>

          <h2 className="text-blue-600 mb-6 text-xl font-semibold text-center">All Job Related Details Have Been Filled!</h2>

          {/* Visibility */}
          <div className="mb-5">
            <p className="text-[13px] font-medium text-gray-700 mb-3">Visibility</p>
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              {["Private", "Public"].map((v) =>
              <button
                key={v}
                onClick={() => setVisibility(v.toLowerCase())}
                className={`flex-1 py-3 text-[13px] font-medium transition-all ${
                visibility === v.toLowerCase() ? "bg-indigo-50 text-gray-900" : "bg-white text-gray-500 hover:bg-gray-50"}`
                }>

                  {v}
                </button>
              )}
            </div>
            <div className="flex mt-3 gap-4">
              {["Confidential (shareable Link)", "Internal"].map((opt) =>
              <button key={opt} className="text-[12px] text-gray-500 hover:text-indigo-600 font-medium">{opt}</button>
              )}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-8">
            <p className="text-[13px] font-medium text-gray-700 mb-3">Duration</p>
            <div className="flex gap-6">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={evergreen} onChange={(e) => setEvergreen(e.target.checked)} className="accent-indigo-600 mt-0.5 w-4 h-4" />
                <div>
                  <p className="text-[13px] text-gray-800 font-medium">Evergreen Job Position</p>
                  <p className="text-[11px] text-gray-400">Keep this job open indefinitely</p>
                </div>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={setExpiration} onChange={(e) => setSetExpiration(e.target.checked)} className="accent-indigo-600 mt-0.5 w-4 h-4" />
                <div>
                  <p className="text-[13px] text-gray-800 font-medium">Set Expiration</p>
                  <p className="text-[11px] text-gray-400">Set an expiration date for the job</p>
                </div>
              </label>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <Button onClick={onPublish} className="bg-blue-600 text-[#ffffff] px-8 py-2 font-medium rounded-lg inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-indigo-700 h-10">
              Confirm Details
            </Button>
          </div>
        </div>
      </div>
    </div>);

}

// ─── Step 5: Confirmation ─────────────────────────────────────────────────────
function ConfirmationScreen({ jobTitle, onGoToJobs }) {
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
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-[13px] px-5" onClick={() => window.location.reload()}>
          Create Another Job
        </Button>
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
        placeholder="Ask AI to make changes…"
        className="resize-none text-[13px] pr-12 rounded-2xl min-h-[60px] bg-white border-gray-200"
        rows={2} />

      <Button
        onClick={() => setMessage("")}
        size="icon"
        className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-indigo-600 hover:bg-indigo-700">
        <Send className="w-3.5 h-3.5" />
      </Button>
    </div>);

}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CreateJob() {
  // step 0 = default landing, 1 = generating, 2 = review JD, 3 = screening, 4 = publish, 5 = confirmation
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [generatedJob, setGeneratedJob] = useState(DEFAULT_JD);

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] bg-[#F2F3F5] overflow-hidden">
      <div className="px-4 py-4 flex flex-1 overflow-hidden gap-4 min-h-0">

        {/* Left Panel — AI Assistant (hidden on landing & confirmation) */}
        {step > 0 && step < 5 &&
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-[360px] shrink-0 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 rounded-xl w-8 h-8 flex items-center justify-center">
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
                    Great! Now add optional screening questions, or skip this step.
                  </div>
                </div>
            }
              {step >= 4 &&
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
          <ScreeningScreen
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
            onSkip={() => setStep(4)} />

          }
          {step === 4 &&
          <PublishScreen
            onBack={() => setStep(3)}
            onPublish={() => setStep(5)} />

          }
          {step === 5 &&
          <ConfirmationScreen
            jobTitle={generatedJob.title}
            onGoToJobs={() => window.location.href = createPageUrl("Dashboard")} />

          }
        </div>
      </div>
    </div>);

}