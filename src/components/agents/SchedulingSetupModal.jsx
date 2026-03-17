import React, { useState } from "react";
import { X, Sparkles, ChevronRight, ChevronLeft, Check, Mail, Clock, Shield, Bot, AlertTriangle, Eye, Loader2, Calendar, Filter, Video, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// ── Sidebar Stack ─────────────────────────────────────────────────────────────
const STACK_STEPS = [
  { id: 1, label: "Scheduling Criteria", tag: "Automation", badge: "Optional", badgeColor: "text-blue-500", desc: "Define which candidates should be automatically scheduled for an interview" },
  { id: 2, label: "Interview Setup", tag: "Configuration", badge: "Mandatory", badgeColor: "text-orange-500", desc: "Configure interview format, duration, and calendar availability" },
  { id: 3, label: "Invite Email", tag: "Email Template", badge: "Optional", badgeColor: "text-blue-500", desc: "Customize the interview invitation and reminder emails sent to candidates" },
  { id: 4, label: "Filtering Criteria", tag: "Automation", badge: "Optional", badgeColor: "text-blue-500", desc: "Define how AI handles no-shows and cancellations" },
];

const STEP_TO_SIDEBAR = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 4 };
const TOTAL_STEPS = 5;
const OPTIONAL_STEPS = new Set([1, 3, 4, 5]);

const DEFAULT_INVITE_EMAIL = `Hi {{candidate_name}},

Great news! We'd like to invite you for an interview for the {{job_title}} role at {{company_name}}.

Interview Details:
• Format: {{interview_format}}
• Duration: {{duration}} minutes
• Date & Time: {{interview_datetime}}
• Location/Link: {{interview_link}}

Please confirm your attendance by clicking below:
{{confirm_link}}

Looking forward to speaking with you!`;

const DEFAULT_REMINDER_EMAIL = `Hi {{candidate_name}},

Just a reminder that your interview for {{job_title}} at {{company_name}} is scheduled for tomorrow.

Date & Time: {{interview_datetime}}
Join link: {{interview_link}}

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
              <span className={`text-[10px] font-semibold ml-auto ${s.badgeColor}`}>{s.badge}</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Step 1: Scheduling Criteria ───────────────────────────────────────────────
function StepSchedulingCriteria({ criteria, setCriteria }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Filter className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Scheduling Criteria</h2>
          <p className="text-[13px] text-gray-400">Define which candidates should be automatically scheduled</p>
        </div>
      </div>

      {/* Minimum assessment score */}
      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Minimum assessment score to schedule</p>
        <p className="text-[12px] text-gray-400 mb-5">Candidates meeting this score or above will be automatically scheduled</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { id: "any", label: "Any Score", desc: "Schedule all candidates regardless of score", color: "text-red-600", iconBg: "bg-red-100", activeBorder: "border-red-400 bg-red-50/60", activeText: "text-red-700" },
            { id: "passing", label: "Passing Score", desc: "Schedule candidates who meet the passing mark", color: "text-amber-600", iconBg: "bg-amber-100", activeBorder: "border-amber-400 bg-amber-50/60", activeText: "text-amber-700" },
            { id: "top", label: "Top Performers", desc: "Only schedule highest scoring candidates", color: "text-emerald-600", iconBg: "bg-emerald-100", activeBorder: "border-emerald-400 bg-emerald-50/60", activeText: "text-emerald-700" },
          ].map((opt) => {
            const selected = criteria.scoreThreshold === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setCriteria({ ...criteria, scoreThreshold: opt.id })}
                className={`flex flex-col items-start gap-2 px-4 py-4 rounded-2xl border-2 text-left transition-all ${selected ? opt.activeBorder : "border-gray-100 bg-white hover:border-gray-200"}`}
              >
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto-schedule toggle */}
      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-500" />
            <p className="text-[14px] font-semibold text-gray-900">AI Auto-schedule</p>
          </div>
          <Switch checked={criteria.autoSchedule} onCheckedChange={(v) => setCriteria({ ...criteria, autoSchedule: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed">
          When enabled, the AI will automatically send interview invites to qualifying candidates without manual review. When disabled, candidates are flagged for your approval first.
        </p>
      </div>

      {/* Human review */}
      <div className={`border-2 rounded-2xl p-5 mb-4 bg-white transition-all ${criteria.humanReview ? "border-emerald-300" : "border-gray-100"}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <p className="text-[14px] font-semibold text-gray-900">Human review before scheduling</p>
          </div>
          <Switch checked={criteria.humanReview} onCheckedChange={(v) => setCriteria({ ...criteria, humanReview: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
          Even when the AI qualifies a candidate, you'll get a notification to review their profile before the interview invite is sent.
        </p>
        {criteria.humanReview && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[12px] text-emerald-700 font-medium">Interviews won't be scheduled until you approve them</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4">
        <p className="text-[12px] font-bold text-indigo-700 mb-2">Summary</p>
        <ul className="space-y-1.5">
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            Candidates with a <strong className="capitalize">{criteria.scoreThreshold || "passing"}</strong> score will be scheduled
          </li>
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            AI will <strong>{criteria.autoSchedule ? "automatically" : "not automatically"}</strong> schedule interviews
          </li>
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            Human review is <strong>{criteria.humanReview ? "required" : "not required"}</strong> before scheduling
          </li>
        </ul>
      </div>
    </div>
  );
}

// ── Step 2: Interview Setup ───────────────────────────────────────────────────
function StepInterviewSetup({ config, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-gray-900 mb-1">Interview Setup</h2>
        <p className="text-[13px] text-gray-400">Configure the interview format and scheduling preferences</p>
      </div>

      {/* Interview Format */}
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Interview Format</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "video", label: "Video Call", desc: "Zoom, Meet, or Teams", icon: Video, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
            { id: "phone", label: "Phone Call", desc: "Standard phone interview", icon: Clock, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
            { id: "onsite", label: "On-site", desc: "In-person at the office", icon: MapPin, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
          ].map((opt) => {
            const Icon = opt.icon;
            const selected = config.format === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onChange({ ...config, format: opt.id })}
                className={`flex flex-col items-start gap-2 px-4 py-4 rounded-2xl border-2 text-left transition-all ${selected ? "border-indigo-400 bg-indigo-50/60" : "border-gray-100 bg-white hover:border-indigo-200"}`}
              >
                <div className={`w-9 h-9 rounded-xl ${opt.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${opt.iconColor}`} />
                </div>
                <div>
                  <p className={`text-[13px] font-semibold mb-0.5 ${selected ? "text-indigo-700" : "text-gray-800"}`}>{opt.label}</p>
                  <p className="text-[11px] text-gray-400">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Interview Duration</p>
        <div className="flex gap-2 flex-wrap">
          {[30, 45, 60, 90].map((d) => (
            <button key={d} onClick={() => onChange({ ...config, duration: d })}
              className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${config.duration === d ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
              {d} min
            </button>
          ))}
        </div>
      </div>

      {/* Interviewers */}
      <div className="border border-gray-100 rounded-2xl p-5 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-indigo-500" />
          <p className="text-[14px] font-semibold text-gray-900">Number of Interviewers</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onChange({ ...config, interviewers: Math.max(1, (config.interviewers || 1) - 1) })} className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold">−</button>
          <span className="text-[18px] font-bold text-gray-900 w-6 text-center">{config.interviewers || 1}</span>
          <button onClick={() => onChange({ ...config, interviewers: (config.interviewers || 1) + 1 })} className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold">+</button>
          <span className="text-[12px] text-gray-400 ml-2">interviewer{(config.interviewers || 1) > 1 ? "s" : ""} per session</span>
        </div>
      </div>

      {/* Buffer time */}
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Buffer Time Between Interviews</p>
        <div className="flex gap-2 flex-wrap">
          {["None", "15 min", "30 min", "1 hour"].map((b) => (
            <button key={b} onClick={() => onChange({ ...config, buffer: b })}
              className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${config.buffer === b ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar integration notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 flex items-start gap-3">
        <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-[13px] font-semibold text-blue-800 mb-0.5">Calendar Integration</p>
          <p className="text-[12px] text-blue-600 leading-relaxed">The scheduling agent will sync with your connected calendar to find available slots automatically based on your team's availability.</p>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: Invite Email ──────────────────────────────────────────────────────
function StepInviteEmail({ emailContent, onChange, reminder, setReminder }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Interview Invitation Email</h2>
            <p className="text-[13px] text-gray-400">Customize the email candidates receive when invited to interview</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[12px] text-amber-700 leading-relaxed">
            Variables in <span className="font-mono font-bold bg-amber-100 px-1 rounded">{`{{double_braces}}`}</span> are auto-filled by the system — candidate name, job title, interview link, date/time, etc.
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Subject Line</label>
            <input
              defaultValue="Interview Invitation — {{job_title}} at {{company_name}}"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Email Body</label>
            <Textarea
              value={emailContent}
              onChange={(e) => onChange(e.target.value)}
              className="w-full min-h-[200px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none bg-white font-mono"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200" />

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-gray-900 mb-0.5">Interview Reminder</h2>
            <p className="text-[13px] text-gray-400">Automatically remind candidates before the interview</p>
          </div>
        </div>
        <div className={`border-2 rounded-2xl px-5 py-4 mb-4 flex items-center justify-between transition-all ${reminder.enabled ? "border-amber-300 bg-amber-50/40" : "border-gray-100 bg-gray-50"}`}>
          <div>
            <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Enable Reminder</p>
            <p className="text-[12px] text-gray-400">Send an automated reminder before the interview</p>
          </div>
          <Switch checked={reminder.enabled} onCheckedChange={(v) => setReminder({ ...reminder, enabled: v })} />
        </div>
        {reminder.enabled && (
          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Send reminder</p>
              <div className="flex gap-2 flex-wrap">
                {["1 hour before", "3 hours before", "24 hours before"].map((t) => (
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
                className="w-full min-h-[160px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none bg-white font-mono"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Step 4: Filtering & No-Show Rules ─────────────────────────────────────────
function StepFilteringCriteria({ criteria, setCriteria }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Filtering & No-Show Rules</h2>
          <p className="text-[13px] text-gray-400">Define how the AI handles cancellations and no-shows</p>
        </div>
      </div>

      {/* No-show handling */}
      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <p className="text-[14px] font-semibold text-gray-900 mb-0.5">No-show threshold</p>
        <p className="text-[12px] text-gray-400 mb-5">Candidates who miss this many interviews will be flagged for disqualification</p>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setCriteria({ ...criteria, noShowLimit: Math.max(1, (criteria.noShowLimit || 1) - 1) })} className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold">−</button>
          <span className="text-[22px] font-bold text-gray-900 w-8 text-center">{criteria.noShowLimit || 1}</span>
          <button onClick={() => setCriteria({ ...criteria, noShowLimit: Math.min(5, (criteria.noShowLimit || 1) + 1) })} className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-200 font-bold">+</button>
          <span className="text-[12px] text-gray-400">missed interview{(criteria.noShowLimit || 1) > 1 ? "s" : ""}</span>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-[12px] text-red-600">Candidates missing <strong>{criteria.noShowLimit || 1}</strong> or more interviews will be auto-flagged</p>
        </div>
      </div>

      {/* Auto-reschedule */}
      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-500" />
            <p className="text-[14px] font-semibold text-gray-900">AI Auto-reschedule</p>
          </div>
          <Switch checked={criteria.autoReschedule} onCheckedChange={(v) => setCriteria({ ...criteria, autoReschedule: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed">
          When enabled, the AI will automatically offer a new time slot to candidates who cancel, without requiring manual intervention.
        </p>
      </div>

      {/* Human review */}
      <div className={`border-2 rounded-2xl p-5 mb-4 bg-white transition-all ${criteria.humanReview ? "border-emerald-300" : "border-gray-100"}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <p className="text-[14px] font-semibold text-gray-900">Human review before disqualification</p>
          </div>
          <Switch checked={criteria.humanReview} onCheckedChange={(v) => setCriteria({ ...criteria, humanReview: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
          Even when the AI flags a candidate for disqualification, you'll get a notification to review before the action is taken.
        </p>
        {criteria.humanReview && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[12px] text-emerald-700 font-medium">Disqualifications won't be sent until you approve them</p>
          </div>
        )}
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-4">
        <p className="text-[12px] font-bold text-indigo-700 mb-2">Summary</p>
        <ul className="space-y-1.5">
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            Candidates missing <strong>{criteria.noShowLimit || 1}</strong> interview{(criteria.noShowLimit || 1) > 1 ? "s" : ""} are flagged
          </li>
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            AI will <strong>{criteria.autoReschedule ? "automatically" : "not automatically"}</strong> reschedule cancellations
          </li>
          <li className="text-[12px] text-indigo-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            Human review is <strong>{criteria.humanReview ? "required" : "not required"}</strong> before disqualification
          </li>
        </ul>
      </div>
    </div>
  );
}

// ── Step 5: Review & Confirm ──────────────────────────────────────────────────
function StepReviewConfirm({ schedulingCriteria, interviewConfig, reminder, filterCriteria, generating }) {
  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
        </div>
        <p className="text-[15px] font-semibold text-gray-800">Configuring Scheduling Agent…</p>
        <p className="text-[12px] text-gray-400">Setting up calendar sync and automation rules</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Review Configuration</h2>
          <p className="text-[13px] text-gray-400">Confirm your scheduling agent setup before activating</p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          {
            label: "Scheduling Criteria",
            icon: Filter,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            items: [
              `Score threshold: ${schedulingCriteria.scoreThreshold || "Passing Score"}`,
              `Auto-schedule: ${schedulingCriteria.autoSchedule ? "Enabled" : "Disabled"}`,
              `Human review: ${schedulingCriteria.humanReview ? "Required" : "Not required"}`,
            ],
          },
          {
            label: "Interview Setup",
            icon: Calendar,
            iconBg: "bg-indigo-100",
            iconColor: "text-indigo-600",
            items: [
              `Format: ${interviewConfig.format || "Video Call"}`,
              `Duration: ${interviewConfig.duration || 60} minutes`,
              `Interviewers: ${interviewConfig.interviewers || 1}`,
              `Buffer: ${interviewConfig.buffer || "None"}`,
            ],
          },
          {
            label: "Email & Reminder",
            icon: Mail,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            items: [
              "Custom invite email configured",
              reminder.enabled ? `Reminder: ${reminder.timing}` : "No reminder set",
            ],
          },
          {
            label: "Filtering Rules",
            icon: Shield,
            iconBg: "bg-red-100",
            iconColor: "text-red-500",
            items: [
              `No-show limit: ${filterCriteria.noShowLimit || 1}`,
              `Auto-reschedule: ${filterCriteria.autoReschedule ? "Enabled" : "Disabled"}`,
              `Human review: ${filterCriteria.humanReview ? "Required" : "Not required"}`,
            ],
          },
        ].map(({ label, icon: Icon, iconBg, iconColor, items }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
              </div>
              <p className="text-[14px] font-semibold text-gray-900">{label}</p>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-emerald-600 font-medium">Configured</span>
              </div>
            </div>
            <ul className="space-y-1 pl-11">
              {items.map((item, i) => (
                <li key={i} className="text-[12px] text-gray-500 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stage Transition Microinteraction ─────────────────────────────────────────
function StageTransition({ config, onContinue, isLast, stackStatus }) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const enabledCount = stackStatus.filter((s) => s.enabled).length;
  const idleCount = stackStatus.filter((s) => !s.enabled).length;

  return (
    <div className={`flex flex-col items-center justify-center h-full px-12 text-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${config.enabled ? "bg-emerald-100" : "bg-gray-100"}`}>
        {config.enabled
          ? <Check className="w-9 h-9 text-emerald-500" />
          : <ChevronRight className="w-9 h-9 text-gray-400" />
        }
      </div>
      <span className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${config.enabled ? "text-emerald-500" : "text-gray-400"}`}>
        {config.sectionLabel}
      </span>
      <h2 className="text-[22px] font-bold text-gray-900 mb-2">{config.title}</h2>
      <p className="text-[13px] text-gray-400 max-w-sm mb-6 leading-relaxed">{config.desc}</p>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold mb-6 ${config.enabled ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
        <div className={`w-2 h-2 rounded-full ${config.enabled ? "bg-emerald-500" : "bg-gray-400"}`} />
        {config.statusLabel}
      </div>

      {/* Stack Overview — only on last transition screen */}
      {isLast && stackStatus.some((s) => s.configured) && (
        <div className="w-full max-w-sm bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-6 text-left">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">Stack Overview</p>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-emerald-600">{enabledCount} active</span>
              {idleCount > 0 && <span className="text-[11px] font-semibold text-gray-400">{idleCount} idle</span>}
            </div>
          </div>
          <div className="space-y-2">
            {stackStatus.map((s) => (
              <div key={s.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${s.configured ? (s.enabled ? "bg-emerald-50 border border-emerald-100" : "bg-gray-100 border border-gray-100") : "opacity-40 bg-white border border-dashed border-gray-200"}`}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${s.configured ? (s.enabled ? "bg-emerald-500" : "bg-gray-400") : "bg-gray-300"}`} />
                <span className={`text-[12px] font-medium flex-1 ${s.configured ? (s.enabled ? "text-emerald-700" : "text-gray-500") : "text-gray-300"}`}>{s.label}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.configured ? (s.enabled ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-500") : "bg-gray-100 text-gray-300"}`}>
                  {s.configured ? (s.enabled ? "Active" : "Idle") : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onContinue}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-10 rounded-xl text-[13px] font-semibold flex items-center gap-2 transition-colors"
      >
        {isLast ? <><Check className="w-4 h-4" /> Finish Setup</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
      </button>
    </div>
  );
}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function SchedulingSetupModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [transition, setTransition] = useState(null);
  const [schedulingCriteria, setSchedulingCriteria] = useState({ scoreThreshold: "passing", autoSchedule: true, humanReview: true });
  const [interviewConfig, setInterviewConfig] = useState({ format: "video", duration: 60, interviewers: 1, buffer: "15 min" });
  const [inviteEmail, setInviteEmail] = useState(DEFAULT_INVITE_EMAIL);
  const [reminder, setReminder] = useState({ enabled: true, timing: "24 hours before", emailContent: DEFAULT_REMINDER_EMAIL });
  const [filterCriteria, setFilterCriteria] = useState({ noShowLimit: 1, autoReschedule: true, humanReview: true });
  const [generating, setGenerating] = useState(false);
  const [stackStatus, setStackStatus] = useState([
    { label: "Scheduling Criteria", configured: false, enabled: false },
    { label: "Interview Setup", configured: false, enabled: true },
    { label: "Invite Email", configured: false, enabled: false },
    { label: "Filtering Criteria", configured: false, enabled: false },
  ]);

  const getTransitionConfig = (completedStep, skipped) => {
    if (completedStep === 1) return {
      sectionLabel: "Scheduling Criteria",
      enabled: !skipped && schedulingCriteria.autoSchedule,
      title: skipped ? "Scheduling Criteria Skipped" : schedulingCriteria.autoSchedule ? "Auto-schedule is On" : "Manual scheduling mode",
      desc: skipped
        ? "You can configure scheduling criteria later from the agent settings."
        : schedulingCriteria.autoSchedule
          ? "Qualifying candidates will be automatically scheduled for an interview."
          : "Candidates will be flagged for your manual review before an interview is scheduled.",
      statusLabel: skipped ? "Not configured" : schedulingCriteria.autoSchedule ? "Automation enabled" : "Manual review required",
    };
    if (completedStep === 2) return {
      sectionLabel: "Interview Setup",
      enabled: true,
      title: `Interview configured — ${interviewConfig.duration || 60} min ${interviewConfig.format || "video"} interview`,
      desc: `A ${interviewConfig.duration || 60}-minute ${interviewConfig.format || "video"} interview with ${interviewConfig.interviewers || 1} interviewer${(interviewConfig.interviewers || 1) > 1 ? "s" : ""} is set up.`,
      statusLabel: "Interview configured",
    };
    if (completedStep === 3) return {
      sectionLabel: "Invite Email",
      enabled: !skipped,
      title: skipped ? "Default email will be used" : "Interview email customised",
      desc: skipped
        ? "A default system email will be sent to candidates. You can customise it anytime."
        : reminder.enabled
          ? `A custom invite email and a reminder (${reminder.timing}) are configured.`
          : "A custom invite email is configured. No reminder set.",
      statusLabel: skipped ? "Using default template" : reminder.enabled ? "Email + reminder active" : "Custom email active",
    };
    if (completedStep === 4) return {
      sectionLabel: "Filtering Criteria",
      enabled: !skipped && filterCriteria.autoReschedule,
      title: skipped ? "Filtering Criteria Skipped" : filterCriteria.autoReschedule ? "Auto-reschedule is On" : "Manual filtering mode",
      desc: skipped
        ? "All cancellations and no-shows will require manual review."
        : filterCriteria.autoReschedule
          ? "The AI will automatically offer new slots to candidates who cancel."
          : "Cancellations will be flagged for your manual approval.",
      statusLabel: skipped ? "Not configured" : filterCriteria.autoReschedule ? "Automation enabled" : "Manual review required",
    };
    return null;
  };

  const updateStackStatus = (completedStep, skipped) => {
    const labelMap = { 1: "Scheduling Criteria", 2: "Interview Setup", 3: "Invite Email", 4: "Filtering Criteria" };
    const label = labelMap[completedStep];
    if (!label) return;
    const enabledMap = {
      1: !skipped && schedulingCriteria.autoSchedule,
      2: true,
      3: !skipped,
      4: !skipped && filterCriteria.autoReschedule,
    };
    setStackStatus((prev) => prev.map((s) =>
      s.label === label ? { ...s, configured: true, enabled: enabledMap[completedStep] } : s
    ));
  };

  const advanceStep = (fromStep) => {
    if (fromStep === TOTAL_STEPS) {
      setGenerating(true);
      setTimeout(() => { setGenerating(false); onClose(); }, 2000);
    } else {
      setStep(fromStep + 1);
    }
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
    if (transition) { setTransition(null); return; }
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

          {!transition && <StackSidebar currentStep={step} />}

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-[14px] font-bold text-gray-900">Scheduling Agent Setup</h1>
                  <p className="text-[11px] text-gray-400">{transition ? "Stage complete" : `Step ${step} of ${TOTAL_STEPS}`}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {transition ? (
                <StageTransition config={transition.config} onContinue={handleTransitionContinue} isLast={transition.nextStep > TOTAL_STEPS} stackStatus={stackStatus} />
              ) : (
                <>
                  {step === 1 && <StepSchedulingCriteria criteria={schedulingCriteria} setCriteria={setSchedulingCriteria} />}
                  {step === 2 && <StepInterviewSetup config={interviewConfig} onChange={setInterviewConfig} />}
                  {step === 3 && <StepInviteEmail emailContent={inviteEmail} onChange={setInviteEmail} reminder={reminder} setReminder={setReminder} />}
                  {step === 4 && <StepFilteringCriteria criteria={filterCriteria} setCriteria={setFilterCriteria} />}
                  {step === 5 && <StepReviewConfirm schedulingCriteria={schedulingCriteria} interviewConfig={interviewConfig} reminder={reminder} filterCriteria={filterCriteria} generating={generating} />}
                </>
              )}
            </div>

            {/* Footer */}
            {!transition && (
              <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div key={i} className={`rounded-full transition-all ${step === i + 1 ? "w-4 h-2.5 bg-indigo-600" : "w-2.5 h-2.5 bg-gray-200"}`} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {isOptional && (
                    <button
                      onClick={handleSkip}
                      className="text-[13px] font-medium text-gray-400 hover:text-gray-600 px-4 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Skip
                    </button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={generating}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 h-9 rounded-xl text-[13px] font-semibold flex items-center gap-1.5"
                  >
                    {generating ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Activating…</>
                    ) : isLastStep ? (
                      <><Check className="w-3.5 h-3.5" /> Save & Activate</>
                    ) : (
                      <>Continue <ChevronRight className="w-3.5 h-3.5" /></>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}