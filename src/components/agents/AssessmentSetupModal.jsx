import React, { useState } from "react";
import { X, Sparkles, FileText, PenLine, ChevronRight, ChevronLeft, Check, Mail, Clock, Shield, Bot, AlertTriangle, Eye, Loader2, Plus, Trash2, UserCheck, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const STACK_STEPS = [
  { id: 1, label: "Invite Criteria", tag: "Automation", tagColor: "text-gray-500", badge: "Optional", badgeColor: "text-blue-500", desc: "Set invite criteria, for which candidates who need to be sent an invite" },
  { id: 2, label: "Invite Email", tag: "Email Template", tagColor: "text-gray-500", badge: "Optional", badgeColor: "text-blue-500", desc: "Set invite criteria, for which candidates who need to be sent an invite" },
  { id: 3, label: "Assessment", tag: "Report", tagColor: "text-gray-500", badge: "Mandatory", badgeColor: "text-orange-500", desc: "Set invite criteria, for which candidates who need to be sent an invite" },
  { id: 4, label: "Filtering Criteria", tag: "Automation", tagColor: "text-gray-500", badge: "Optional", badgeColor: "text-blue-500", desc: "Set invite criteria, for which candidates who need to be sent an invite" },
];

const DEFAULT_QUESTIONS = [
  { id: 1, type: "coding", text: "Write a function to reverse a linked list in O(n) time.", difficulty: "Medium" },
  { id: 2, type: "coding", text: "Implement a binary search algorithm and explain its time complexity.", difficulty: "Medium" },
  { id: 3, type: "mcq", text: "Which of the following is NOT a feature of React?", options: ["Virtual DOM", "Two-way data binding", "JSX", "Component-based architecture"], answer: 1, difficulty: "Easy" },
  { id: 4, type: "mcq", text: "What is the time complexity of quicksort in the average case?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1, difficulty: "Medium" },
  { id: 5, type: "descriptive", text: "Describe your experience with system design. How would you design a URL shortener like bit.ly?", difficulty: "Hard" },
];

const DEFAULT_INVITE_EMAIL = `Hi {{candidate_name}},

Congratulations on advancing to the next stage of your application for the {{job_title}} role at {{company_name}}!

We'd like to invite you to complete a technical assessment to help us better understand your skills.
• Duration: {{duration}} minutes
• Questions: {{question_count}} questions
• Deadline: {{deadline}}

Click the link below to begin:
{{assessment_link}}

Good luck! We look forward to reviewing your submission.`;

const DEFAULT_REMINDER_EMAIL = `Hi {{candidate_name}},

Just a friendly reminder that your technical assessment for {{job_title}} at {{company_name}} is due in 24 hours.

Deadline: {{deadline}}

Start your assessment: {{assessment_link}}

Best regards,
{{recruiter_name}}`;

// ── Left Sidebar ──────────────────────────────────────────────────────────────
function StackSidebar({ currentStep }) {
  return (
    <div className="w-[260px] shrink-0 bg-gray-50 border-r border-gray-100 px-5 py-6 flex flex-col gap-3">
      <p className="text-[13px] font-bold text-gray-900 mb-2">Stack</p>
      {STACK_STEPS.map((s) => {
        const active = currentStep === s.id;
        return (
          <div
            key={s.id}
            className={`rounded-2xl px-4 py-4 border transition-all ${
              active ? "bg-indigo-50 border-indigo-200" : "bg-white border-gray-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[13px] font-semibold ${active ? "text-indigo-700" : "text-gray-800"}`}>{s.label}</span>
              <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded-md">{s.tag}</span>
              <span className={`text-[10px] font-semibold ml-auto ${s.badgeColor}`}>{s.badge}</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Creation Method ───────────────────────────────────────────────────
function Step1({ value, onChange }) {
  const options = [
    { id: "ai", icon: Sparkles, title: "Generate with AI", badge: "Recommended", badgeColor: "bg-indigo-100 text-indigo-600", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", desc: "Let AI create a tailored assessment based on the job role and requirements." },
    { id: "template", icon: FileText, title: "Use a Template", badge: "Quick", badgeColor: "bg-emerald-100 text-emerald-600", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", desc: "Start from a pre-built assessment template for common roles." },
    { id: "scratch", icon: PenLine, title: "Create from Scratch", badge: "Custom", badgeColor: "bg-amber-100 text-amber-600", iconBg: "bg-amber-100", iconColor: "text-amber-600", desc: "Build your own assessment entirely from scratch with full control." },
  ];

  return (
    <div>
      <h2 className="text-[20px] font-bold text-gray-900 mb-1">How would you like to create this assessment?</h2>
      <p className="text-[13px] text-gray-400 mb-6">Choose the method that works best for you</p>
      <div className="space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all ${
                selected ? "border-indigo-400 bg-indigo-50/60" : "border-gray-100 bg-white hover:border-indigo-200"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl ${opt.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${opt.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[14px] font-semibold text-gray-900">{opt.title}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${opt.badgeColor}`}>{opt.badge}</span>
                </div>
                <p className="text-[12px] text-gray-400">{opt.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                selected ? "border-indigo-500 bg-indigo-500" : "border-gray-300"
              }`}>
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 2: Assessment Setup ──────────────────────────────────────────────────
function Step2({ config, onChange }) {
  const total = (config.coding || 0) + (config.mcq || 0) + (config.descriptive || 0);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-gray-900 mb-1">Configure your assessment</h2>
        <p className="text-[13px] text-gray-400">Set the difficulty and question mix</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Difficulty Level</p>
        <div className="flex gap-2 flex-wrap">
          {["Easy", "Medium", "Hard", "Mixed"].map((d) => (
            <button key={d} onClick={() => onChange({ ...config, difficulty: d })}
              className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${config.difficulty === d ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Question Mix</p>
        <div className="space-y-3">
          {[
            { key: "coding", label: "Coding Questions", desc: "Algorithmic & implementation problems", color: "text-blue-600", bg: "bg-blue-50" },
            { key: "mcq", label: "Multiple Choice (MCQ)", desc: "Conceptual and knowledge-based", color: "text-emerald-600", bg: "bg-emerald-50" },
            { key: "descriptive", label: "Descriptive Questions", desc: "Open-ended design or experience questions", color: "text-amber-600", bg: "bg-amber-50" },
          ].map(({ key, label, desc, color, bg }) => (
            <div key={key} className={`${bg} rounded-2xl px-5 py-4 flex items-center gap-4`}>
              <div className="flex-1">
                <p className={`text-[13px] font-semibold ${color} mb-0.5`}>{label}</p>
                <p className="text-[11px] text-gray-400">{desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => onChange({ ...config, [key]: Math.max(0, (config[key] || 0) - 1) })} className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold">−</button>
                <span className="text-[16px] font-bold text-gray-900 w-5 text-center">{config[key] || 0}</span>
                <button onClick={() => onChange({ ...config, [key]: (config[key] || 0) + 1 })} className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <p className="text-[12px] text-gray-400">Total questions</p>
          <p className="text-[14px] font-bold text-gray-900">{total}</p>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Duration</p>
        <div className="flex gap-2 flex-wrap">
          {[30, 45, 60, 90, 120].map((d) => (
            <button key={d} onClick={() => onChange({ ...config, duration: d })}
              className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${config.duration === d ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
              {d} min
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Review Questions ──────────────────────────────────────────────────
function Step3({ questions, setQuestions, generating }) {
  const typeColors = {
    coding: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    mcq: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
    descriptive: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  };

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
        </div>
        <p className="text-[15px] font-semibold text-gray-800">Generating questions with AI…</p>
        <p className="text-[12px] text-gray-400">Crafting tailored questions based on your configuration</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Review your questions</h2>
          <p className="text-[13px] text-gray-400">Edit or remove questions before saving</p>
        </div>
        <button className="flex items-center gap-1.5 text-[12px] text-indigo-600 font-medium border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Question
        </button>
      </div>
      <div className="space-y-3">
        {questions.map((q, idx) => {
          const colors = typeColors[q.type];
          return (
            <div key={q.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-bold text-gray-300 mt-0.5 w-5 shrink-0">Q{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border} uppercase tracking-wide`}>
                      {q.type === "mcq" ? "MCQ" : q.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{q.difficulty}</span>
                  </div>
                  <p className="text-[13px] text-gray-800 leading-relaxed mb-2">{q.text}</p>
                  {q.type === "mcq" && q.options && (
                    <div className="grid grid-cols-2 gap-1.5 mt-2">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`text-[11px] px-2.5 py-1.5 rounded-lg ${oi === q.answer ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200" : "bg-gray-50 text-gray-600"}`}>
                          {String.fromCharCode(65 + oi)}. {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => setQuestions(questions.filter((_, i) => i !== idx))} className="text-gray-300 hover:text-red-400 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 4: Invitation Email ──────────────────────────────────────────────────
function Step4({ emailContent, onChange }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Assessment Invitation Email</h2>
          <p className="text-[13px] text-gray-400">Customize the email candidates receive</p>
        </div>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[12px] text-amber-700 leading-relaxed">
          Variables in <span className="font-mono font-bold bg-amber-100 px-1 rounded">{`{{double_braces}}`}</span> are auto-filled by the system — candidate name, job title, assessment link, etc.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Subject Line</label>
          <input
            defaultValue="Technical Assessment Invitation — {{job_title}} at {{company_name}}"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Email Body</label>
          <Textarea
            value={emailContent}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[240px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none bg-white font-mono"
          />
        </div>
      </div>
    </div>
  );
}

// ── Step 5: Reminder ─────────────────────────────────────────────────────────
function Step5({ reminder, setReminder }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Deadline Reminder</h2>
          <p className="text-[13px] text-gray-400">Automatically nudge candidates before the deadline</p>
        </div>
      </div>
      <div className={`border-2 rounded-2xl px-5 py-4 mb-5 flex items-center justify-between transition-all ${reminder.enabled ? "border-amber-300 bg-amber-50/40" : "border-gray-100 bg-gray-50"}`}>
        <div>
          <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Enable Reminder</p>
          <p className="text-[12px] text-gray-400">Send an automated reminder before the deadline</p>
        </div>
        <Switch checked={reminder.enabled} onCheckedChange={(v) => setReminder({ ...reminder, enabled: v })} />
      </div>
      {reminder.enabled && (
        <div className="space-y-4">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Send reminder</p>
            <div className="flex gap-2 flex-wrap">
              {["24 hours before", "48 hours before", "3 days before"].map((t) => (
                <button key={t} onClick={() => setReminder({ ...reminder, timing: t })}
                  className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${reminder.timing === t ? "bg-amber-500 text-white border-amber-500" : "border-gray-200 text-gray-600 hover:border-amber-300"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Reminder Email Body</label>
            <Textarea
              value={reminder.emailContent}
              onChange={(e) => setReminder({ ...reminder, emailContent: e.target.value })}
              className="w-full min-h-[180px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none bg-white font-mono"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Step 6: Filtering & Approval ─────────────────────────────────────────────
function Step6({ criteria, setCriteria }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Filtering & Approval Rules</h2>
          <p className="text-[13px] text-gray-400">Define how the AI handles assessment results</p>
        </div>
      </div>

      {/* Score threshold */}
      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Auto-rejection threshold</p>
        <p className="text-[12px] text-gray-400 mb-5">Candidates scoring below this will be flagged for rejection</p>
        <div className="flex items-center justify-between text-[12px] text-gray-400 mb-1">
          <span>0</span>
          <span className="font-bold text-indigo-700 text-[15px]">{criteria.threshold} / 5</span>
          <span>5</span>
        </div>
        <input
          type="range" min={1} max={5} step={0.5}
          value={criteria.threshold}
          onChange={(e) => setCriteria({ ...criteria, threshold: parseFloat(e.target.value) })}
          className="w-full accent-indigo-600 mb-2"
        />
        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4, 5].map((v) => (
            <span key={v} className={`text-[11px] font-medium ${criteria.threshold >= v ? "text-indigo-600" : "text-gray-300"}`}>{v}</span>
          ))}
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-[12px] text-red-600">Candidates scoring below <strong>{criteria.threshold}/5</strong> will be auto-flagged for rejection</p>
        </div>
      </div>

      {/* AI Auto-decision */}
      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-500" />
            <p className="text-[14px] font-semibold text-gray-900">AI Auto-decision</p>
          </div>
          <Switch checked={criteria.autoDecide} onCheckedChange={(v) => setCriteria({ ...criteria, autoDecide: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed">
          When enabled, the AI will automatically reject candidates below the threshold without manual review. When disabled, the AI flags them but waits for human confirmation.
        </p>
      </div>

      {/* Human review */}
      <div className={`border-2 rounded-2xl p-5 mb-4 bg-white transition-all ${criteria.humanReview ? "border-emerald-300" : "border-gray-100"}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <p className="text-[14px] font-semibold text-gray-900">Human review before rejection</p>
          </div>
          <Switch checked={criteria.humanReview} onCheckedChange={(v) => setCriteria({ ...criteria, humanReview: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
          Even when the AI flags a candidate for rejection, you'll get a notification to review their full profile before the rejection is sent.
        </p>
        {criteria.humanReview && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[12px] text-emerald-700 font-medium">Rejections won't be sent until you approve them</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4">
        <p className="text-[12px] font-bold text-indigo-700 mb-2">Summary</p>
        <ul className="space-y-1.5">
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            Candidates below <strong>{criteria.threshold}/5</strong> are flagged
          </li>
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            AI will <strong>{criteria.autoDecide ? "automatically" : "not automatically"}</strong> reject flagged candidates
          </li>
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            Human review is <strong>{criteria.humanReview ? "required" : "not required"}</strong> before rejection
          </li>
        </ul>
      </div>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function AssessmentSetupModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [creationMethod, setCreationMethod] = useState("ai");
  const [assessmentConfig, setAssessmentConfig] = useState({ difficulty: "Medium", coding: 2, mcq: 2, descriptive: 1, duration: 60 });
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [generating, setGenerating] = useState(false);
  const [inviteEmail, setInviteEmail] = useState(DEFAULT_INVITE_EMAIL);
  const [reminder, setReminder] = useState({ enabled: true, timing: "24 hours before", emailContent: DEFAULT_REMINDER_EMAIL });
  const [criteria, setCriteria] = useState({ threshold: 3, autoDecide: true, humanReview: true });

  const TOTAL_STEPS = 6;

  const handleNext = () => {
    if (step === 2 && creationMethod === "ai") {
      setGenerating(true);
      setStep(3);
      setTimeout(() => setGenerating(false), 2200);
    } else if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => { if (step > 1) setStep(step - 1); };

  // Map modal step → sidebar highlight (steps 4,5,6 relate to sidebar items 2,3,4)
  const sidebarActive = step <= 3 ? step : step - 2;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[58rem] mx-4 flex flex-col overflow-hidden max-h-[90vh]" style={{ height: "680px" }}>

        {/* Modal layout: sidebar + content */}
        <div className="flex flex-1 overflow-hidden">

          {/* Left Sidebar */}
          <StackSidebar currentStep={sidebarActive} />

          {/* Right Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-[14px] font-bold text-gray-900">Assessment Agent Setup</h1>
                  <p className="text-[11px] text-gray-400">Step {step} of {TOTAL_STEPS}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {step === 1 && <Step1 value={creationMethod} onChange={setCreationMethod} />}
              {step === 2 && <Step2 config={assessmentConfig} onChange={setAssessmentConfig} />}
              {step === 3 && <Step3 questions={questions} setQuestions={setQuestions} generating={generating} />}
              {step === 4 && <Step4 emailContent={inviteEmail} onChange={setInviteEmail} />}
              {step === 5 && <Step5 reminder={reminder} setReminder={setReminder} />}
              {step === 6 && <Step6 criteria={criteria} setCriteria={setCriteria} />}
            </div>

            {/* Footer */}
            <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div key={i} className={`rounded-full transition-all ${step === i + 1 ? "w-4 h-2.5 bg-indigo-600" : "w-2.5 h-2.5 bg-gray-200"}`} />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={generating}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 h-9 rounded-xl text-[13px] font-semibold flex items-center gap-1.5"
              >
                {generating ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating…</>
                ) : step === TOTAL_STEPS ? (
                  <><Check className="w-3.5 h-3.5" /> Save & Activate</>
                ) : (
                  <>Continue <ChevronRight className="w-3.5 h-3.5" /></>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}