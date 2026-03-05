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
  { id: 3, title: "Product Manager", department: "Product", applicants: 12, status: "Draft" },
];

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
    "Excellent communication and collaboration skills",
  ],
  responsibilities: [
    "Lead design projects from concept to launch",
    "Create wireframes, prototypes, and high-fidelity designs",
    "Conduct user research and usability testing",
    "Collaborate with product and engineering teams",
    "Contribute to and maintain design system",
  ],
};

// ─── Step 0: Default / Landing ───────────────────────────────────────────────
function DefaultScreen({ onStart }) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {/* Prompt area */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[18px] font-semibold text-gray-900">Create a new job posting</h2>
          </div>
          <p className="text-[13px] text-gray-500 mb-4">
            Describe the role you're hiring for and our AI will generate a complete job description.
          </p>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. We need a senior fullstack engineer with 5+ years of experience in React and Node.js, to join our fintech team…"
              className="resize-none text-[13px] pr-14 min-h-[100px] rounded-2xl border-gray-200"
              rows={4}
            />
            <Button
              onClick={() => onStart(prompt)}
              disabled={!prompt.trim()}
              className="absolute right-3 bottom-3 bg-indigo-600 hover:bg-indigo-700 h-8 px-4 text-[12px] gap-1.5"
            >
              Generate <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Existing jobs */}
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Existing Jobs</p>
          <div className="space-y-2">
            {existingJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div>
                  <p className="text-[13px] font-medium text-gray-900">{job.title}</p>
                  <p className="text-[11px] text-gray-400">{job.department} · {job.applicants} applicants</p>
                </div>
                <span
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    job.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 1: Generating (animated) ────────────────────────────────────────────
function GeneratingScreen({ prompt, onDone }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Got it! Let me analyse the role and generate a complete job description for you…" },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Based on your prompt, I've drafted a job description for a ${DEFAULT_JD.title} role. You can refine it or continue to review.` },
      ]);
      setIsGenerating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Great suggestion! I've updated the job description accordingly." },
      ]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Prompt bubble */}
        <div className="flex justify-end">
          <div className="max-w-[80%] px-4 py-3 rounded-2xl text-[13px] bg-indigo-600 text-white">
            {prompt || "Generate a job description for our team."}
          </div>
        </div>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center mr-2 mt-1 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[13px] ${
                msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="px-4 py-3 bg-gray-100 rounded-2xl flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 shrink-0">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            placeholder="Refine or add details…"
            className="resize-none text-[13px] pr-28 rounded-2xl min-h-[52px]"
            rows={2}
          />
          <div className="absolute right-2 bottom-2 flex gap-2">
            <Button
              onClick={handleSend}
              size="sm"
              variant="ghost"
              className="h-8 px-3 text-[12px]"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
            <Button
              onClick={onDone}
              disabled={isGenerating}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 h-8 px-3 text-[12px] gap-1"
            >
              Review <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Review JD ─────────────────────────────────────────────────────────
function ReviewJDScreen({ job, onBack, onNext }) {
  const [jd, setJd] = useState(job);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
        <h2 className="text-[15px] font-semibold text-gray-900">Review Job Description</h2>
        <p className="text-[12px] text-gray-400 mt-0.5">Review and edit before continuing</p>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {/* Meta */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Job Title", key: "title" },
            { label: "Department", key: "department" },
            { label: "Location", key: "location" },
            { label: "Salary Range", key: "salary" },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1">
              <Label className="text-[11px] text-gray-500">{label}</Label>
              <Input
                value={jd[key]}
                onChange={(e) => setJd({ ...jd, [key]: e.target.value })}
                className="h-8 text-[13px] bg-gray-50"
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label className="text-[11px] text-gray-500">About the Role</Label>
          <Textarea
            value={jd.description}
            onChange={(e) => setJd({ ...jd, description: e.target.value })}
            className="text-[13px] bg-gray-50 resize-none"
            rows={4}
          />
        </div>

        {/* Requirements */}
        <div className="space-y-2">
          <Label className="text-[11px] text-gray-500">Requirements</Label>
          {jd.requirements.map((req, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <Input
                value={req}
                onChange={(e) => {
                  const updated = [...jd.requirements];
                  updated[i] = e.target.value;
                  setJd({ ...jd, requirements: updated });
                }}
                className="h-8 text-[13px] bg-gray-50"
              />
            </div>
          ))}
        </div>

        {/* Responsibilities */}
        <div className="space-y-2">
          <Label className="text-[11px] text-gray-500">Responsibilities</Label>
          {jd.responsibilities.map((resp, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
              <Input
                value={resp}
                onChange={(e) => {
                  const updated = [...jd.responsibilities];
                  updated[i] = e.target.value;
                  setJd({ ...jd, responsibilities: updated });
                }}
                className="h-8 text-[13px] bg-gray-50"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <Button onClick={() => onNext(jd)} className="bg-indigo-600 hover:bg-indigo-700 text-[13px] px-5 gap-1.5">
          Continue <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Step 3: Screening Questions ──────────────────────────────────────────────
function ScreeningScreen({ onBack, onNext, onSkip }) {
  const [questions, setQuestions] = useState([
    "How many years of relevant experience do you have?",
    "Are you authorized to work in the country of this role?",
  ]);

  const add = () => setQuestions([...questions, ""]);
  const remove = (i) => setQuestions(questions.filter((_, idx) => idx !== i));
  const update = (i, val) => {
    const updated = [...questions];
    updated[i] = val;
    setQuestions(updated);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
        <h2 className="text-[15px] font-semibold text-gray-900">Screening Questions</h2>
        <p className="text-[12px] text-gray-400 mt-0.5">Optional — add questions candidates must answer when applying</p>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-[12px] text-gray-400 w-5 text-right shrink-0">{i + 1}.</span>
            <Input
              value={q}
              onChange={(e) => update(i, e.target.value)}
              placeholder={`Question ${i + 1}`}
              className="h-9 text-[13px] bg-gray-50"
            />
            <button
              onClick={() => remove(i)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <button
          onClick={add}
          className="flex items-center gap-1.5 text-[12px] text-indigo-600 hover:text-indigo-700 font-medium mt-2"
        >
          <Plus className="w-3.5 h-3.5" /> Add question
        </button>
      </div>
      <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onSkip} className="text-gray-500 gap-1.5">
            <SkipForward className="w-3.5 h-3.5" /> Skip
          </Button>
          <Button onClick={() => onNext(questions)} className="bg-indigo-600 hover:bg-indigo-700 text-[13px] px-5 gap-1.5">
            Continue <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Publish ──────────────────────────────────────────────────────────
function PublishScreen({ onBack, onPublish }) {
  const [settings, setSettings] = useState({ visibility: "public", duration: "30", platforms: [] });

  const togglePlatform = (p) => {
    const updated = settings.platforms.includes(p)
      ? settings.platforms.filter((x) => x !== p)
      : [...settings.platforms, p];
    setSettings({ ...settings, platforms: updated });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
        <h2 className="text-[15px] font-semibold text-gray-900">Publish Job</h2>
        <p className="text-[12px] text-gray-400 mt-0.5">Choose where and how to post your job</p>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {/* Visibility */}
        <div className="space-y-2">
          <Label className="text-[12px] font-medium text-gray-600">Visibility</Label>
          <div className="flex gap-3">
            {["public", "private"].map((v) => (
              <button
                key={v}
                onClick={() => setSettings({ ...settings, visibility: v })}
                className={`flex-1 p-4 rounded-xl border-2 text-left transition-all ${
                  settings.visibility === v ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-semibold text-[13px] text-gray-900 capitalize mb-0.5">{v}</p>
                <p className="text-[11px] text-gray-500">
                  {v === "public" ? "Visible to everyone" : "Only invited candidates"}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label className="text-[12px] font-medium text-gray-600">Duration</Label>
          <Select value={settings.duration} onValueChange={(val) => setSettings({ ...settings, duration: val })}>
            <SelectTrigger className="h-9 text-[13px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["7", "14", "30", "60", "90"].map((d) => (
                <SelectItem key={d} value={d}>{d} days</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <Label className="text-[12px] font-medium text-gray-600">Post to Platforms</Label>
          <div className="grid grid-cols-2 gap-3">
            {["LinkedIn", "Indeed", "Glassdoor", "Company Website"].map((p) => (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`p-3.5 rounded-xl border-2 text-left transition-all ${
                  settings.platforms.includes(p) ? "border-indigo-600 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-semibold text-[13px] text-gray-900">{p}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>Back</Button>
        <Button onClick={onPublish} className="bg-emerald-600 hover:bg-emerald-700 text-[13px] px-6 gap-1.5">
          <Sparkles className="w-4 h-4" /> Publish Job
        </Button>
      </div>
    </div>
  );
}

// ─── Step 5: Confirmation ─────────────────────────────────────────────────────
function ConfirmationScreen({ jobTitle, onGoToJobs }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
      </div>
      <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Job Published!</h2>
      <p className="text-[13px] text-gray-500 max-w-sm mb-8">
        <span className="font-medium text-gray-700">{jobTitle}</span> has been published successfully. Candidates can now apply.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={onGoToJobs}>
          <Building2 className="w-3.5 h-3.5 mr-1.5" /> View All Jobs
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-[13px] px-5" onClick={() => window.location.reload()}>
          Create Another Job
        </Button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CreateJob() {
  // step 0 = default landing, 1 = generating, 2 = review JD, 3 = screening, 4 = publish, 5 = confirmation
  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [generatedJob, setGeneratedJob] = useState(DEFAULT_JD);

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] bg-[#F2F3F5] overflow-hidden">
      <div className="flex flex-1 overflow-hidden px-4 py-4 gap-4 min-h-0">

        {/* Left Panel — AI Assistant (hidden on landing & confirmation) */}
        {step > 0 && step < 5 && (
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
              {step >= 2 && (
                <div className="flex justify-start">
                  <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] bg-gray-100 text-gray-900">
                    ✅ Job description generated! Review it on the right and make any edits.
                  </div>
                </div>
              )}
              {step >= 3 && (
                <div className="flex justify-start">
                  <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] bg-gray-100 text-gray-900">
                    Great! Now add optional screening questions, or skip this step.
                  </div>
                </div>
              )}
              {step >= 4 && (
                <div className="flex justify-start">
                  <div className="max-w-[90%] px-4 py-3 rounded-2xl text-[13px] bg-gray-100 text-gray-900">
                    Almost there! Choose your publish settings and go live.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Panel — Main Content */}
        <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col ${step === 0 || step === 5 ? "flex-1" : "flex-1"}`}>
          {step === 0 && (
            <DefaultScreen
              onStart={(p) => {
                setPrompt(p);
                setStep(1);
              }}
            />
          )}
          {step === 1 && (
            <GeneratingScreen
              prompt={prompt}
              onDone={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <ReviewJDScreen
              job={generatedJob}
              onBack={() => setStep(1)}
              onNext={(updatedJd) => {
                setGeneratedJob(updatedJd);
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <ScreeningScreen
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
              onSkip={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <PublishScreen
              onBack={() => setStep(3)}
              onPublish={() => setStep(5)}
            />
          )}
          {step === 5 && (
            <ConfirmationScreen
              jobTitle={generatedJob.title}
              onGoToJobs={() => window.location.href = createPageUrl("Dashboard")}
            />
          )}
        </div>
      </div>
    </div>
  );
}