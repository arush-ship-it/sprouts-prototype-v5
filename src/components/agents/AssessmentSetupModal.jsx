import React, { useState, useEffect } from "react";
import { X, Sparkles, FileText, PenLine, ChevronRight, ChevronLeft, Check, Mail, Clock, Shield, Bot, AlertTriangle, Eye, Loader2, Plus, Trash2, Filter, ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// Sidebar stack items and which modal steps map to them
const STACK_STEPS = [
{ id: 1, label: "Invite Criteria", tag: "Automation", badge: "Optional", badgeColor: "text-blue-500", desc: "Define which candidates should be automatically invited to take this assessment" },
{ id: 2, label: "Invite Email", tag: "Email Template", badge: "Optional", badgeColor: "text-blue-500", desc: "Customize the invitation email and deadline reminder sent to candidates" },
{ id: 3, label: "Assessment", tag: "Report", badge: "Mandatory", badgeColor: "text-orange-500", desc: "Create and configure the assessment questions, difficulty, and duration" },
{ id: 4, label: "Filtering Criteria", tag: "Automation", badge: "Optional", badgeColor: "text-blue-500", desc: "Define how AI handles results and approval rules for rejections" }];


// step → sidebar item
const STEP_TO_SIDEBAR = { 1: 1, 2: 2, 3: 3, 4: 3, 5: 3, 6: 4 };

const TOTAL_STEPS = 6;

const DEFAULT_QUESTIONS = [
{ id: 1, type: "coding", text: "Write a function to reverse a linked list in O(n) time.", difficulty: "Medium" },
{ id: 2, type: "coding", text: "Implement a binary search algorithm and explain its time complexity.", difficulty: "Medium" },
{ id: 3, type: "coding", text: "Given an array of integers, find two numbers that add up to a target sum. Return their indices.", difficulty: "Easy" },
{ id: 4, type: "mcq", text: "Which of the following is NOT a feature of React?", options: ["Virtual DOM", "Two-way data binding", "JSX", "Component-based architecture"], answer: 1, difficulty: "Easy" },
{ id: 5, type: "mcq", text: "What is the time complexity of quicksort in the average case?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: 1, difficulty: "Medium" },
{ id: 6, type: "mcq", text: "Which HTTP method is idempotent but NOT safe?", options: ["GET", "DELETE", "POST", "PATCH"], answer: 1, difficulty: "Medium" },
{ id: 7, type: "mcq", text: "What does the 'S' in SOLID principles stand for?", options: ["Scalability", "Single Responsibility", "Separation of Concerns", "Statelessness"], answer: 1, difficulty: "Easy" },
{ id: 8, type: "descriptive", text: "Describe your experience with system design. How would you design a URL shortener like bit.ly?", difficulty: "Hard" },
{ id: 9, type: "descriptive", text: "Walk us through a challenging technical problem you solved. What was your approach and what did you learn?", difficulty: "Medium" }];


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
  const activeSidebarId = STEP_TO_SIDEBAR[currentStep];
  return (
    <div className="w-[270px] shrink-0 bg-gray-50 border-r border-gray-100 px-5 py-6 flex flex-col gap-3 overflow-y-auto">
      <p className="text-[13px] font-bold text-gray-900 mb-2">Stack</p>
      {STACK_STEPS.map((s) => {
        const active = activeSidebarId === s.id;
        return (
          <div key={s.id} className={`rounded-2xl px-4 py-4 border transition-all ${active ? "bg-indigo-50 border-indigo-200" : "bg-white border-gray-100"}`}>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`text-[13px] font-semibold ${active ? "text-indigo-700" : "text-gray-800"}`}>{s.label}</span>
              <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded-md">{s.tag}</span>
            </div>
            <div className="mb-1.5">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.badge === "Mandatory" ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-blue-50 text-blue-500 border-blue-200"}`}>{s.badge}</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</p>
          </div>);

      })}
    </div>);

}

// ── Step 1: Invite Criteria ───────────────────────────────────────────────────
function StepInviteCriteria({ criteria, setCriteria }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Filter className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-gray-900 mb-0.5 text-base font-semibold">Invite Criteria</h2>
          <p className="text-[13px] text-gray-400">Define which candidates should be automatically invited</p>
        </div>
      </div>

      {/* Match Fit to invite */}
      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Minimum match fit to invite</p>
        <p className="text-[12px] text-gray-400 mb-5">Candidates meeting this match level or above will be automatically invited</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
          { id: "weak", label: "Weak Match", desc: "Invite all candidates, even partial fits", color: "text-red-600", iconBg: "bg-red-100", activeBorder: "border-red-400 bg-red-50/60", activeText: "text-red-700" },
          { id: "good", label: "Good Match", desc: "Invite candidates with solid alignment", color: "text-amber-600", iconBg: "bg-amber-100", activeBorder: "border-amber-400 bg-amber-50/60", activeText: "text-amber-700" },
          { id: "strong", label: "Strong Match", desc: "Only invite best-fit candidates", color: "text-emerald-600", iconBg: "bg-emerald-100", activeBorder: "border-emerald-400 bg-emerald-50/60", activeText: "text-emerald-700" }].
          map((opt) => {
            const selected = criteria.matchFit === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setCriteria({ ...criteria, matchFit: opt.id })}
                className={`flex flex-col items-start gap-2 px-4 py-4 rounded-2xl border-2 text-left transition-all ${selected ? opt.activeBorder : "border-gray-100 bg-white hover:border-gray-200"}`}>

                <div className={`w-8 h-8 rounded-xl ${opt.iconBg} flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${selected ? opt.color.replace("text-", "bg-") : "bg-gray-300"}`} />
                </div>
                <div>
                  <p className={`text-[13px] font-semibold mb-0.5 ${selected ? opt.activeText : "text-gray-800"}`}>{opt.label}</p>
                  <p className="text-[11px] text-gray-400 leading-snug">{opt.desc}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ml-auto flex items-center justify-center transition-all ${selected ? `border-current ${opt.color} bg-current` : "border-gray-300"}`}>
                  {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>);

          })}
        </div>
        {criteria.matchFit &&
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-blue-500 shrink-0" />
            <p className="text-[12px] text-blue-600">
              Candidates with a <strong className="capitalize">{criteria.matchFit}</strong> match or above will be auto-invited
            </p>
          </div>
        }
      </div>

      {/* Auto-invite toggle */}
      












      {/* Human review before invite */}
      <div className={`border-2 rounded-2xl p-5 mb-4 bg-white transition-all ${criteria.humanReview ? "border-emerald-300" : "border-gray-100"}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <p className="text-[14px] font-semibold text-gray-900">Human review before invite</p>
          </div>
          <Switch checked={criteria.humanReview} onCheckedChange={(v) => setCriteria({ ...criteria, humanReview: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
          Even when the AI qualifies a candidate, you'll get a notification to review their profile before the invite is sent.
        </p>
        {criteria.humanReview &&
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[12px] text-emerald-700 font-medium">Invites won't be sent until you approve them</p>
          </div>
        }
      </div>

      {/* Summary */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4">
        <p className="text-[12px] font-bold text-indigo-700 mb-2">Summary</p>
        <ul className="space-y-1.5">
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            Candidates with a <strong className="capitalize">{criteria.matchFit}</strong> match or above are invited
          </li>
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            AI will <strong>{criteria.autoInvite ? "automatically" : "not automatically"}</strong> send invites
          </li>
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            Human review is <strong>{criteria.humanReview ? "required" : "not required"}</strong> before invite
          </li>
        </ul>
      </div>
    </div>);

}

// ── Step 2: Invite Email + Deadline Reminder ──────────────────────────────────
function StepInviteEmail({ emailContent, onChange, reminder, setReminder }) {
  return (
    <div className="space-y-6">
      {/* Invite Email */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-gray-900 mb-0.5 text-base font-semibold">Assessment Invitation Email</h2>
            <p className="text-[13px] text-gray-400">Customize the email candidates receive</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[12px] text-amber-700 leading-relaxed">
            Variables in <span className="font-mono font-bold bg-amber-100 px-1 rounded">{`{{double_braces}}`}</span> are auto-filled by the system — candidate name, job title, assessment link, etc.
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Subject Line</label>
            <input
              defaultValue="Technical Assessment Invitation — {{job_title}} at {{company_name}}"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white" />

          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Email Body</label>
            <Textarea
              value={emailContent}
              onChange={(e) => onChange(e.target.value)}
              className="w-full min-h-[200px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none bg-white font-mono" />

          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-200" />

      {/* Deadline Reminder */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-gray-900 mb-0.5">Deadline Reminder</h2>
            <p className="text-[13px] text-gray-400">Automatically nudge candidates before the deadline</p>
          </div>
        </div>
        <div className={`border-2 rounded-2xl px-5 py-4 mb-4 flex items-center justify-between transition-all ${reminder.enabled ? "border-amber-300 bg-amber-50/40" : "border-gray-100 bg-gray-50"}`}>
          <div>
            <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Enable Reminder</p>
            <p className="text-[12px] text-gray-400">Send an automated reminder before the deadline</p>
          </div>
          <Switch checked={reminder.enabled} onCheckedChange={(v) => setReminder({ ...reminder, enabled: v })} />
        </div>
        {reminder.enabled &&
        <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Send reminder</p>
              <div className="flex gap-2 flex-wrap">
                {["24 hours before", "48 hours before", "3 days before"].map((t) =>
              <button key={t} onClick={() => setReminder({ ...reminder, timing: t })}
              className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${reminder.timing === t ? "bg-amber-500 text-white border-amber-500" : "border-gray-200 text-gray-600 hover:border-amber-300"}`}>
                    {t}
                  </button>
              )}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Reminder Email Body</label>
              <Textarea
              value={reminder.emailContent}
              onChange={(e) => setReminder({ ...reminder, emailContent: e.target.value })}
              className="w-full min-h-[160px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none bg-white font-mono" />

            </div>
          </div>
        }
      </div>
    </div>);

}

// ── Step 3: How to create? ────────────────────────────────────────────────────
function StepCreationMethod({ value, onChange }) {
  const options = [
  { id: "ai", icon: Sparkles, title: "Generate with AI", badge: "Recommended", badgeColor: "bg-indigo-100 text-indigo-600", iconBg: "bg-indigo-100", iconColor: "text-indigo-600", desc: "Let AI create a tailored assessment based on the job role and requirements." },
  { id: "template", icon: FileText, title: "Use a Template", badge: "Quick", badgeColor: "bg-emerald-100 text-emerald-600", iconBg: "bg-emerald-100", iconColor: "text-emerald-600", desc: "Start from a pre-built assessment template for common roles." },
  { id: "scratch", icon: PenLine, title: "Create from Scratch", badge: "Custom", badgeColor: "bg-amber-100 text-amber-600", iconBg: "bg-amber-100", iconColor: "text-amber-600", desc: "Build your own assessment entirely from scratch with full control." }];

  return (
    <div>
      <h2 className="text-gray-900 mb-1 text-base font-semibold">How would you like to create this assessment?</h2>
      <p className="text-[13px] text-gray-400 mb-6">Choose the method that works best for you</p>
      <div className="space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const selected = value === opt.id;
          return (
            <button key={opt.id} onClick={() => onChange(opt.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all ${selected ? "border-indigo-400 bg-indigo-50/60" : "border-gray-100 bg-white hover:border-indigo-200"}`}>
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
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${selected ? "border-indigo-500 bg-indigo-500" : "border-gray-300"}`}>
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>);

        })}
      </div>
    </div>);

}

// ── Step 4: Configure Assessment ─────────────────────────────────────────────
function StepConfigureAssessment({ config, onChange }) {
  const total = (config.coding || 0) + (config.mcq || 0) + (config.descriptive || 0);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1 text-base font-semibold">Configure your assessment</h2>
        <p className="text-[13px] text-gray-400">Set the difficulty and question mix</p>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Difficulty Level</p>
        <div className="flex gap-2 flex-wrap">
          {["Easy", "Medium", "Hard", "Mixed"].map((d) =>
          <button key={d} onClick={() => onChange({ ...config, difficulty: d })}
          className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${config.difficulty === d ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
              {d}
            </button>
          )}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Question Mix</p>
        <div className="space-y-3">
          {[
          { key: "coding", label: "Coding Questions", desc: "Algorithmic & implementation problems", color: "text-blue-600", bg: "bg-blue-50" },
          { key: "mcq", label: "Multiple Choice (MCQ)", desc: "Conceptual and knowledge-based", color: "text-emerald-600", bg: "bg-emerald-50" },
          { key: "descriptive", label: "Descriptive Questions", desc: "Open-ended design or experience questions", color: "text-amber-600", bg: "bg-amber-50" }].
          map(({ key, label, desc, color, bg }) =>
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
          )}
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <p className="text-[12px] text-gray-400">Total questions</p>
          <p className="text-[14px] font-bold text-gray-900">{total}</p>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Duration</p>
        <div className="flex gap-2 flex-wrap">
          {[30, 45, 60, 90, 120].map((d) =>
          <button key={d} onClick={() => onChange({ ...config, duration: d })}
          className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${config.duration === d ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
              {d} min
            </button>
          )}
        </div>
      </div>
    </div>);

}

// ── Step 5: Review Questions ──────────────────────────────────────────────────
function StepReviewQuestions({ questions, setQuestions, generating }) {
  const typeColors = {
    coding: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
    mcq: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
    descriptive: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" }
  };
  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
        </div>
        <p className="text-[15px] font-semibold text-gray-800">Generating questions with AI…</p>
        <p className="text-[12px] text-gray-400">Crafting tailored questions based on your configuration</p>
      </div>);

  }
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-gray-900 mb-0.5 text-base font-semibold">Review your questions</h2>
          <p className="text-[13px] text-gray-400">Edit or remove questions before saving</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-[12px] text-gray-600 font-medium border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <ExternalLink className="w-3.5 h-3.5" /> View Full Assessment
          </button>
          <button className="flex items-center gap-1.5 text-[12px] text-gray-600 font-medium border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <button className="flex items-center gap-1.5 text-[12px] text-indigo-600 font-medium border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Question
          </button>
        </div>
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
                  {q.type === "mcq" && q.options &&
                  <div className="grid grid-cols-2 gap-1.5 mt-2">
                      {q.options.map((opt, oi) =>
                    <div key={oi} className={`text-[11px] px-2.5 py-1.5 rounded-lg ${oi === q.answer ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200" : "bg-gray-50 text-gray-600"}`}>
                          {String.fromCharCode(65 + oi)}. {opt}
                        </div>
                    )}
                    </div>
                  }
                </div>
                <button onClick={() => setQuestions(questions.filter((_, i) => i !== idx))} className="text-gray-300 hover:text-red-400 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>);

        })}
      </div>
    </div>);

}

// ── Step 6: Filtering & Approval Rules ───────────────────────────────────────
function StepFilteringCriteria({ criteria, setCriteria }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h2 className="text-gray-900 mb-0.5 text-base font-semibold">Filtering & Approval Rules</h2>
          <p className="text-[13px] text-gray-400">Define how the AI handles assessment results</p>
        </div>
      </div>

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
          className="w-full accent-indigo-600 mb-2" />

        <div className="flex justify-between mb-4">
          {[1, 2, 3, 4, 5].map((v) =>
          <span key={v} className={`text-[11px] font-medium ${criteria.threshold >= v ? "text-indigo-600" : "text-gray-300"}`}>{v}</span>
          )}
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-[12px] text-red-600">Candidates scoring below <strong>{criteria.threshold}/5</strong> will be auto-flagged for rejection</p>
        </div>
      </div>

      












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
        {criteria.humanReview &&
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[12px] text-emerald-700 font-medium">Rejections won't be sent until you approve them</p>
          </div>
        }
      </div>

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
    </div>);

}

// ── Stage Transition Microinteraction ────────────────────────────────────────
function StageTransition({ config, onContinue, isLast, stackStatus }) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {setTimeout(() => setVisible(true), 50);}, []);

  const enabledCount = stackStatus.filter((s) => s.enabled).length;
  const idleCount = stackStatus.filter((s) => !s.enabled).length;

  return (
    <div className={`flex flex-col items-center justify-center h-full px-12 text-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {/* Icon */}
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${config.enabled ? "bg-emerald-100" : "bg-gray-100"}`}>
        {config.enabled ?
        <Check className="w-9 h-9 text-emerald-500" /> :
        <ChevronRight className="w-9 h-9 text-gray-400" />
        }
      </div>

      {/* Label */}
      <span className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${config.enabled ? "text-emerald-500" : "text-gray-400"}`}>
        {config.sectionLabel}
      </span>

      {/* Heading */}
      <h2 className="text-[22px] font-bold text-gray-900 mb-2">{config.title}</h2>
      <p className="text-[13px] text-gray-400 max-w-sm mb-6 leading-relaxed">{config.desc}</p>

      {/* Status pill */}
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold mb-6 ${config.enabled ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
        <div className={`w-2 h-2 rounded-full ${config.enabled ? "bg-emerald-500" : "bg-gray-400"}`} />
        {config.statusLabel}
      </div>

      {/* Stack Overview — only on last transition screen */}
      {isLast && stackStatus.some((s) => s.configured) &&
      <div className="w-full max-w-sm bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-6 text-left">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">Stack Overview</p>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-emerald-600">{enabledCount} active</span>
              {idleCount > 0 && <span className="text-[11px] font-semibold text-gray-400">{idleCount} idle</span>}
            </div>
          </div>
          <div className="space-y-2">
            {stackStatus.map((s) =>
          <div key={s.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${s.configured ? s.enabled ? "bg-emerald-50 border border-emerald-100" : "bg-gray-100 border border-gray-100" : "opacity-40 bg-white border border-dashed border-gray-200"}`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${s.configured ? s.enabled ? "bg-emerald-500" : "bg-gray-400" : "bg-gray-300"}`} />
                <span className={`text-[12px] font-medium flex-1 ${s.configured ? s.enabled ? "text-emerald-700" : "text-gray-500" : "text-gray-300"}`}>{s.label}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.configured ? s.enabled ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-500" : "bg-gray-100 text-gray-300"}`}>
                  {s.configured ? s.enabled ? "Active" : "Idle" : "Pending"}
                </span>
              </div>
          )}
          </div>
        </div>
      }

      <button
        onClick={onContinue}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-10 rounded-xl text-[13px] font-semibold flex items-center gap-2 transition-colors">

        {isLast ? <><Check className="w-4 h-4" /> Finish Setup</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
      </button>
    </div>);

}

// ── Main Modal ────────────────────────────────────────────────────────────────
// Steps: 1=InviteCriteria, 2=InviteEmail, 3=CreationMethod, 4=ConfigureAssessment, 5=ReviewQuestions, 6=FilteringCriteria
// Transition screens are shown via `transition` state (not a separate step number)
const OPTIONAL_STEPS = new Set([1, 2, 6]);

export default function AssessmentSetupModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [transition, setTransition] = useState(null); // null | { config }
  const [inviteCriteria, setInviteCriteria] = useState({ matchFit: "good", autoInvite: true, humanReview: true });
  const [inviteEmail, setInviteEmail] = useState(DEFAULT_INVITE_EMAIL);
  const [reminder, setReminder] = useState({ enabled: true, timing: "24 hours before", emailContent: DEFAULT_REMINDER_EMAIL });
  const [creationMethod, setCreationMethod] = useState("ai");
  const [assessmentConfig, setAssessmentConfig] = useState({ difficulty: "Medium", coding: 2, mcq: 2, descriptive: 1, duration: 60 });
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [generating, setGenerating] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({ threshold: 3, autoDecide: true, humanReview: true });
  const [stackStatus, setStackStatus] = useState([
  { label: "Invite Criteria", configured: false, enabled: false },
  { label: "Invite Email", configured: false, enabled: false },
  { label: "Assessment", configured: false, enabled: true },
  { label: "Filtering Criteria", configured: false, enabled: false }]
  );

  // Determine transition config after completing certain stages
  const getTransitionConfig = (completedStep, skipped) => {
    if (completedStep === 1) return {
      sectionLabel: "Invite Criteria",
      enabled: !skipped && inviteCriteria.autoInvite,
      title: skipped ? "Invite Criteria Skipped" : inviteCriteria.autoInvite ? "Auto-invite is On" : "Manual invite mode",
      desc: skipped ?
      "You can configure invite criteria later from the agent settings." :
      inviteCriteria.autoInvite ?
      "Candidates with a matching fit will be automatically invited to take the assessment." :
      "Candidates will be flagged for your manual review before an invite is sent.",
      statusLabel: skipped ? "Not configured" : inviteCriteria.autoInvite ? "Automation enabled" : "Manual review required"
    };
    if (completedStep === 2) return {
      sectionLabel: "Invite Email",
      enabled: !skipped,
      title: skipped ? "Default email will be used" : "Invite email customised",
      desc: skipped ?
      "A default system email will be sent to candidates. You can customise it anytime." :
      reminder.enabled ?
      `A custom invite email and a deadline reminder (${reminder.timing}) are configured.` :
      "A custom invite email is configured. No deadline reminder set.",
      statusLabel: skipped ? "Using default template" : reminder.enabled ? "Email + reminder active" : "Custom email active"
    };
    if (completedStep === 5) return {
      sectionLabel: "Assessment",
      enabled: true,
      title: `Assessment ready — ${questions.length} question${questions.length !== 1 ? "s" : ""} configured`,
      desc: `A ${assessmentConfig.difficulty.toLowerCase()}-difficulty assessment with ${assessmentConfig.duration} min duration is set up and ready to send to candidates.`,
      statusLabel: "Assessment configured"
    };
    if (completedStep === 6) return {
      sectionLabel: "Filtering Criteria",
      enabled: !skipped && filterCriteria.autoDecide,
      title: skipped ? "Filtering Criteria Skipped" : filterCriteria.autoDecide ? "AI auto-filtering is On" : "Manual filtering mode",
      desc: skipped ?
      "All assessment results will require manual review. You can configure auto-filtering later." :
      filterCriteria.autoDecide ?
      "The AI will automatically filter candidates based on assessment scores." :
      "Assessment results will be flagged for your manual approval.",
      statusLabel: skipped ? "Not configured" : filterCriteria.autoDecide ? "Automation enabled" : "Manual review required"
    };
    return null;
  };

  const advanceStep = (fromStep) => {
    if (fromStep === 4 && creationMethod === "ai") {
      setGenerating(true);
      setStep(5);
      setTimeout(() => setGenerating(false), 2200);
    } else if (fromStep < TOTAL_STEPS) {
      setStep(fromStep + 1);
    } else {
      onClose();
    }
  };

  const updateStackStatus = (completedStep, skipped) => {
    const labelMap = { 1: "Invite Criteria", 2: "Invite Email", 5: "Assessment", 6: "Filtering Criteria" };
    const label = labelMap[completedStep];
    if (!label) return;
    const enabledMap = {
      1: !skipped && inviteCriteria.autoInvite,
      2: !skipped,
      5: true,
      6: !skipped && filterCriteria.autoDecide
    };
    setStackStatus((prev) => prev.map((s) =>
    s.label === label ? { ...s, configured: true, enabled: enabledMap[completedStep] } : s
    ));
  };

  const handleNext = () => {
    const tc = getTransitionConfig(step, false);
    if (tc) {
      updateStackStatus(step, false);
      setTransition({ config: tc, nextStep: step + 1 });
    } else {
      advanceStep(step);
    }
  };

  const handleSkip = () => {
    const tc = getTransitionConfig(step, true);
    if (tc) {
      updateStackStatus(step, true);
      setTransition({ config: tc, nextStep: step + 1 });
    } else {
      advanceStep(step);
    }
  };

  const handleTransitionContinue = () => {
    const nextStep = transition.nextStep;
    setTransition(null);
    if (nextStep > TOTAL_STEPS) {
      onClose();
    } else {
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    if (transition) {setTransition(null);return;}
    if (step > 1) setStep(step - 1);
  };

  if (!isOpen) return null;

  const isOptional = OPTIONAL_STEPS.has(step);
  const isLastStep = step === TOTAL_STEPS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[75rem] mx-4 flex flex-col overflow-hidden max-h-[90vh]" style={{ height: "700px" }}>
        <div className="flex flex-1 overflow-hidden">

          {/* Left Sidebar — hidden during transition */}
          {!transition && <StackSidebar currentStep={step} />}

          {/* Right Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                


                <div>
                  <h1 className="text-[14px] font-bold text-gray-900">Assessment Agent Setup</h1>
                  <p className="text-[11px] text-gray-400">{transition ? "Stage complete" : `Step ${step} of ${TOTAL_STEPS}`}</p>
                </div>
              </div>
              <button onClick={onClose} className="bg-[#ffffff] rounded-lg w-8 h-8 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {transition ?
              <StageTransition config={transition.config} onContinue={handleTransitionContinue} isLast={transition.nextStep > TOTAL_STEPS} stackStatus={stackStatus} /> :

              <>
                  {step === 1 && <StepInviteCriteria criteria={inviteCriteria} setCriteria={setInviteCriteria} />}
                  {step === 2 && <StepInviteEmail emailContent={inviteEmail} onChange={setInviteEmail} reminder={reminder} setReminder={setReminder} />}
                  {step === 3 && <StepCreationMethod value={creationMethod} onChange={setCreationMethod} />}
                  {step === 4 && <StepConfigureAssessment config={assessmentConfig} onChange={setAssessmentConfig} />}
                  {step === 5 && <StepReviewQuestions questions={questions} setQuestions={setQuestions} generating={generating} />}
                  {step === 6 && <StepFilteringCriteria criteria={filterCriteria} setCriteria={setFilterCriteria} />}
                </>
              }
            </div>

            {/* Footer — hidden during transition (transition has its own CTA) */}
            {!transition &&
            <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
                <button
                onClick={handleBack}
                disabled={step === 1}
                className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">

                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) =>
                <div key={i} className={`rounded-full transition-all ${step === i + 1 ? "w-4 h-2.5 bg-indigo-600" : "w-2.5 h-2.5 bg-gray-200"}`} />
                )}
                </div>
                <div className="flex items-center gap-2">
                  {isOptional &&
                <button
                  onClick={handleSkip}
                  className="text-[13px] font-medium text-gray-400 hover:text-gray-600 px-4 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">

                      Skip
                    </button>
                }
                  <Button
                  onClick={handleNext}
                  disabled={generating} className="bg-blue-600 text-[#ffffff] px-6 py-2 text-xs font-semibold rounded-xl justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow hover:bg-indigo-700 h-9 flex items-center gap-1.5">


                    {generating ?
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating…</> :
                  isLastStep ?
                  <><Check className="w-3.5 h-3.5" /> Save & Activate</> :

                  <>Continue <ChevronRight className="w-3.5 h-3.5" /></>
                  }
                  </Button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}