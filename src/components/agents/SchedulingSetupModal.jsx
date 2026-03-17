import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft, Check, Mail, Clock, Shield, Bot, AlertTriangle, Eye, Loader2, Calendar, Filter, Video, MapPin, Users, Globe, FileText, ListChecks, ChevronLeft as PrevIcon, ChevronRight as NextIcon } from "lucide-react";
import { addDays, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, isAfter, isBefore, addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

// ── Stack Structure ───────────────────────────────────────────────────────────
// Stack 1: Availability Finder  → wizard steps 1, 2
// Stack 2: Interview Setup      → wizard steps 3, 4, 5
// Stack 3: Feedback Setup       → wizard steps 6, 7
// Stack 4: Filtering Criteria   → wizard step 8
// + Review step 9

const STACK_STEPS = [
{
  id: 1, label: "Availability Finder", tag: "Automation", badge: "Optional", badgeColor: "text-blue-500",
  desc: "Share an availability template with candidates and collect their preferred time slots"
},
{
  id: 2, label: "Interview Setup", tag: "Configuration", badge: "Mandatory", badgeColor: "text-orange-500",
  desc: "Define scheduling criteria, interview format guidelines, and the invitation email sent to candidates"
},
{
  id: 3, label: "Feedback Setup", tag: "Report", badge: "Optional", badgeColor: "text-blue-500",
  desc: "Configure the feedback form interviewers must fill in, and the email to send it to them after the interview"
},
{
  id: 4, label: "Filtering Criteria", tag: "Automation", badge: "Optional", badgeColor: "text-blue-500",
  desc: "Define how AI handles no-shows and cancellations"
}];


// step → sidebar item
const STEP_TO_SIDEBAR = { 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 3, 7: 3, 8: 4, 9: 4 };
const TOTAL_STEPS = 9;
// Steps with a Skip button
const OPTIONAL_STEPS = new Set([1, 2, 6, 7, 8]);

// ── Email defaults ────────────────────────────────────────────────────────────
const DEFAULT_AVAILABILITY_EMAIL = `Hi {{candidate_name}},

Thank you for your interest in the {{job_title}} role at {{company_name}}!

We'd like to schedule an interview with you. Please use the link below to share your availability:
{{availability_link}}

Please indicate your preferred slots in your timezone ({{candidate_timezone}}). We'll confirm the final time once we've reviewed your availability.

Looking forward to connecting!`;

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
            </div>
            <div className="mb-1.5">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.badge === "Mandatory" ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-blue-50 text-blue-500 border-blue-200"}`}>{s.badge}</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</p>
          </div>);

      })}
    </div>);

}

// ── Availability Window Picker (Date Range + Time Range) ─────────────────────
function MiniCalendar({ month, startDate, endDate, onDayClick, onMonthChange }) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const today = new Date();

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => onMonthChange(addMonths(month, -1))} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>
        <span className="text-[13px] font-semibold text-gray-800">{format(month, "MMMM yyyy")}</span>
        <button onClick={() => onMonthChange(addMonths(month, 1))} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) =>
        <div key={d} className="text-[10px] font-semibold text-gray-400 text-center py-1">{d}</div>
        )}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day) => {
          const isThisMonth = isSameMonth(day, month);
          const isStart = startDate && isSameDay(day, startDate);
          const isEnd = endDate && isSameDay(day, endDate);
          const inRange = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
          const isToday = isSameDay(day, today);
          const isPast = isBefore(day, today) && !isToday;

          return (
            <button
              key={day.toISOString()}
              onClick={() => !isPast && isThisMonth && onDayClick(day)}
              disabled={isPast || !isThisMonth}
              className={`
                relative h-8 w-full rounded-lg text-[12px] font-medium transition-all
                ${!isThisMonth || isPast ? "opacity-25 cursor-not-allowed" : "cursor-pointer"}
                ${isStart || isEnd ? "bg-indigo-600 text-white z-10" : ""}
                ${inRange && !isStart && !isEnd ? "bg-indigo-100 text-indigo-700 rounded-none" : ""}
                ${isStart ? "rounded-r-none" : ""}
                ${isEnd ? "rounded-l-none" : ""}
                ${isStart && isEnd ? "rounded-lg" : ""}
                ${!isStart && !isEnd && !inRange && isThisMonth && !isPast ? "hover:bg-gray-100 text-gray-700" : ""}
                ${isToday && !isStart && !isEnd ? "ring-1 ring-indigo-300" : ""}
              `}>

              {format(day, "d")}
            </button>);

        })}
      </div>
    </div>);

}

const TIME_SLOTS = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"];

function AvailabilityWindowPicker({ config, onChange }) {
  const [month, setMonth] = useState(new Date());

  const startDate = config.startDate ? new Date(config.startDate) : null;
  const endDate = config.endDate ? new Date(config.endDate) : null;

  const handleDayClick = (day) => {
    if (!startDate || startDate && endDate) {
      onChange({ ...config, startDate: day.toISOString(), endDate: null });
    } else {
      if (isAfter(day, startDate)) {
        onChange({ ...config, endDate: day.toISOString() });
      } else {
        onChange({ ...config, startDate: day.toISOString(), endDate: null });
      }
    }
  };

  const dayCount = startDate && endDate ?
  Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 :
  null;

  const fromTime = config.fromTime || "09:00";
  const toTime = config.toTime || "17:00";

  return (
    <div className="border border-gray-100 rounded-2xl p-5 bg-white space-y-5">
      <div>
        <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Availability window</p>
        <p className="text-[12px] text-gray-400 mb-4">Select the date range candidates can share their availability within</p>

        <div className="flex gap-6">
          {/* Calendar */}
          <div className="flex-1">
            <MiniCalendar
              month={month}
              startDate={startDate}
              endDate={endDate}
              onDayClick={handleDayClick}
              onMonthChange={setMonth} />

          </div>

          {/* Selected range summary */}
          <div className="w-[160px] flex flex-col gap-3 justify-center">
            <div className={`rounded-xl p-3 text-center transition-all ${startDate ? "bg-indigo-50 border border-indigo-100" : "bg-gray-50 border border-dashed border-gray-200"}`}>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">From</p>
              <p className={`text-[13px] font-bold ${startDate ? "text-indigo-700" : "text-gray-300"}`}>
                {startDate ? format(startDate, "MMM d, yyyy") : "Select start"}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-px h-4 bg-gray-200" />
            </div>
            <div className={`rounded-xl p-3 text-center transition-all ${endDate ? "bg-indigo-50 border border-indigo-100" : "bg-gray-50 border border-dashed border-gray-200"}`}>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">To</p>
              <p className={`text-[13px] font-bold ${endDate ? "text-indigo-700" : "text-gray-300"}`}>
                {endDate ? format(endDate, "MMM d, yyyy") : "Select end"}
              </p>
            </div>
            {dayCount &&
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2 text-center">
                <p className="text-[11px] font-bold text-emerald-700">{dayCount} day{dayCount !== 1 ? "s" : ""}</p>
                <p className="text-[10px] text-emerald-500">window</p>
              </div>
            }
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-100" />

      {/* Time range */}
      <div>
        <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Available hours</p>
        <p className="text-[12px] text-gray-400 mb-4">Set the daily time window candidates can pick slots from</p>

        <div className="flex items-center gap-4">
          {/* From time */}
          <div className="flex-1">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">From</p>
            <div className="grid grid-cols-4 gap-1.5">
              {TIME_SLOTS.slice(0, 8).map((t) =>
              <button key={t} onClick={() => onChange({ ...config, fromTime: t })}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-all text-center ${fromTime === t ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                  {t}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 pt-5">
            <div className="w-px h-3 bg-gray-200" />
            <span className="text-[11px] text-gray-400 font-medium">to</span>
            <div className="w-px h-3 bg-gray-200" />
          </div>

          {/* To time */}
          <div className="flex-1">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">To</p>
            <div className="grid grid-cols-4 gap-1.5">
              {TIME_SLOTS.slice(8).map((t) =>
              <button key={t} onClick={() => onChange({ ...config, toTime: t })}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-medium border transition-all text-center ${toTime === t ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50"}`}>
                  {t}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Visual time bar */}
        <div className="mt-4 bg-gray-100 rounded-full h-2 relative overflow-hidden">
          {(() => {
            const allHours = TIME_SLOTS;
            const fromIdx = allHours.indexOf(fromTime);
            const toIdx = allHours.indexOf(toTime);
            if (fromIdx === -1 || toIdx === -1 || toIdx <= fromIdx) return null;
            const left = fromIdx / (allHours.length - 1) * 100;
            const width = (toIdx - fromIdx) / (allHours.length - 1) * 100;
            return <div className="absolute top-0 h-full bg-indigo-500 rounded-full transition-all" style={{ left: `${left}%`, width: `${width}%` }} />;
          })()}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-gray-400">{fromTime}</span>
          <span className="text-[11px] font-semibold text-indigo-600">{fromTime} – {toTime}</span>
          <span className="text-[10px] text-gray-400">{toTime}</span>
        </div>
      </div>

      {/* Slots per day */}

      {/* Date & Time Preview */}
      {startDate && endDate && (
        <div>
          <div className="border-t border-dashed border-gray-100 pt-5" />
          <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Availability Preview</p>
          <p className="text-[12px] text-gray-400 mb-4">Finalised date range with available daily hours</p>
          <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
            {eachDayOfInterval({ start: startDate, end: endDate }).map((day) => {
              const isWeekend = day.getDay() === 0 || day.getDay() === 6;
              return (
                <div key={day.toISOString()} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${isWeekend ? "bg-gray-50 border-gray-100 opacity-60" : "bg-indigo-50 border-indigo-100"}`}>
                  <div className={`text-center min-w-[36px] ${isWeekend ? "opacity-50" : ""}`}>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase">{format(day, "EEE")}</p>
                    <p className={`text-[18px] font-bold ${isWeekend ? "text-gray-400" : "text-indigo-700"}`}>{format(day, "d")}</p>
                    <p className="text-[10px] text-gray-400">{format(day, "MMM")}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    {isWeekend ? (
                      <p className="text-[11px] text-gray-400 font-medium">Weekend</p>
                    ) : (
                      <>
                        <p className="text-[12px] font-semibold text-indigo-700">{fromTime} – {toTime}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{format(day, "MMMM d, yyyy")}</p>
                      </>
                    )}
                  </div>
                  {!isWeekend && (
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 flex items-center justify-between">
            <p className="text-[12px] text-indigo-700 font-medium">
              {eachDayOfInterval({ start: startDate, end: endDate }).filter(d => d.getDay() !== 0 && d.getDay() !== 6).length} available days · {fromTime} – {toTime} daily
            </p>
            <span className="text-[11px] font-semibold text-indigo-500 bg-indigo-100 px-2 py-0.5 rounded-full">
              {config.timezone || "UTC"}
            </span>
          </div>
        </div>
      )}










    </div>);

}

// ── Step 1: Share Availability Template ──────────────────────────────────────
const TIMEZONES = [
"UTC", "America/New_York", "America/Los_Angeles", "America/Chicago",
"Europe/London", "Europe/Paris", "Asia/Calcutta", "Asia/Singapore", "Asia/Tokyo", "Australia/Sydney"];


function StepAvailabilityTemplate({ config, onChange }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Share Availability Template</h2>
          <p className="text-[13px] text-gray-400">Configure how candidates share their available time slots</p>
        </div>
      </div>

      {/* Date Range + Time Picker */}
      <AvailabilityWindowPicker config={config} onChange={onChange} />

      {/* Timezone */}
      <div className="border border-gray-100 rounded-2xl p-5 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-indigo-500" />
          <p className="text-[14px] font-semibold text-gray-900">Default Timezone</p>
        </div>
        <p className="text-[12px] text-gray-400 mb-3">Candidates will see slots in this timezone. They can also adjust to their own.</p>
        <div className="flex flex-wrap gap-2">
          {TIMEZONES.map((tz) =>
          <button key={tz} onClick={() => onChange({ ...config, timezone: tz })}
          className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all ${config.timezone === tz ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
              {tz}
            </button>
          )}
        </div>
      </div>

      {/* Allow candidate timezone override */}
      <div className={`border-2 rounded-2xl p-5 bg-white transition-all ${config.allowTimezoneOverride ? "border-emerald-300" : "border-gray-100"}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <p className="text-[14px] font-semibold text-gray-900">Allow candidate timezone override</p>
          </div>
          <Switch checked={config.allowTimezoneOverride} onCheckedChange={(v) => onChange({ ...config, allowTimezoneOverride: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed">
          Candidates can select their own local timezone when filling out the availability form.
        </p>
      </div>
    </div>);

}

// ── Step 2: Request Availability Email ───────────────────────────────────────
function StepAvailabilityEmail({ emailContent, onChange }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Request Availability Email</h2>
          <p className="text-[13px] text-gray-400">Finalise the email sent to candidates asking them to share their availability</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[12px] text-amber-700 leading-relaxed">
          Variables in <span className="font-mono font-bold bg-amber-100 px-1 rounded">{`{{double_braces}}`}</span> are auto-filled — candidate name, job title, availability link, timezone, etc.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Subject Line</label>
          <input
            defaultValue="Share your availability — {{job_title}} Interview at {{company_name}}"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-400 bg-white" />

        </div>
        <div>
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Email Body</label>
          <Textarea
            value={emailContent}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[220px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none bg-white font-mono" />

        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 flex items-start gap-3">
        <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[12px] text-blue-600 leading-relaxed">
          Once candidates fill in their availability, the AI will cross-reference with interviewer calendars and auto-propose the best matching slot.
        </p>
      </div>
    </div>);

}

// ── Step 3: Scheduling Criteria ───────────────────────────────────────────────
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

      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Minimum assessment score to schedule</p>
        <p className="text-[12px] text-gray-400 mb-5">Candidates meeting this score or above will be automatically scheduled</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
          { id: "any", label: "Any Score", desc: "Schedule all candidates regardless of score", color: "text-red-600", iconBg: "bg-red-100", activeBorder: "border-red-400 bg-red-50/60", activeText: "text-red-700" },
          { id: "passing", label: "Passing Score", desc: "Schedule candidates who meet the passing mark", color: "text-amber-600", iconBg: "bg-amber-100", activeBorder: "border-amber-400 bg-amber-50/60", activeText: "text-amber-700" },
          { id: "top", label: "Top Performers", desc: "Only schedule highest scoring candidates", color: "text-emerald-600", iconBg: "bg-emerald-100", activeBorder: "border-emerald-400 bg-emerald-50/60", activeText: "text-emerald-700" }].
          map((opt) => {
            const selected = criteria.scoreThreshold === opt.id;
            return (
              <button key={opt.id} onClick={() => setCriteria({ ...criteria, scoreThreshold: opt.id })}
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
      </div>

      <div className="border border-gray-100 rounded-2xl p-5 mb-4 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-500" />
            <p className="text-[14px] font-semibold text-gray-900">AI Auto-schedule</p>
          </div>
          <Switch checked={criteria.autoSchedule} onCheckedChange={(v) => setCriteria({ ...criteria, autoSchedule: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed">
          When enabled, the AI will automatically send interview invites to qualifying candidates. When disabled, candidates are flagged for your approval first.
        </p>
      </div>

      <div className={`border-2 rounded-2xl p-5 mb-4 bg-white transition-all ${criteria.humanReview ? "border-emerald-300" : "border-gray-100"}`}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600" />
            <p className="text-[14px] font-semibold text-gray-900">Human review before scheduling</p>
          </div>
          <Switch checked={criteria.humanReview} onCheckedChange={(v) => setCriteria({ ...criteria, humanReview: v })} />
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
          Even when the AI qualifies a candidate, you'll get a notification to review before the interview invite is sent.
        </p>
        {criteria.humanReview &&
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[12px] text-emerald-700 font-medium">Interviews won't be scheduled until you approve them</p>
          </div>
        }
      </div>

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
    </div>);

}

// ── Step 4: Interview Format + Guidelines ─────────────────────────────────────
const DEFAULT_GUIDELINES = `1. Start by introducing yourself and the team.
2. Give a brief overview of the role and what success looks like.
3. Ask behavioural questions using the STAR method (Situation, Task, Action, Result).
4. Allow time for the candidate to ask questions.
5. Close by explaining next steps and the timeline for a decision.
6. Keep the conversation structured but conversational — make the candidate feel at ease.`;

function StepInterviewFormat({ config, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-bold text-gray-900 mb-1">Interview Format</h2>
        <p className="text-[13px] text-gray-400">Set the interview format, duration, and provide interviewers with a guideline to follow</p>
      </div>

      {/* Format */}
      <div>
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Format</p>
        <div className="grid grid-cols-3 gap-3">
          {[
          { id: "video", label: "Video Call", desc: "Zoom, Meet, or Teams", icon: Video, iconBg: "bg-blue-100", iconColor: "text-blue-600" },
          { id: "phone", label: "Phone Call", desc: "Standard phone interview", icon: Clock, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
          { id: "onsite", label: "On-site", desc: "In-person at the office", icon: MapPin, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" }].
          map((opt) => {
            const Icon = opt.icon;
            const selected = config.format === opt.id;
            return (
              <button key={opt.id} onClick={() => onChange({ ...config, format: opt.id })}
              className={`flex flex-col items-start gap-2 px-4 py-4 rounded-2xl border-2 text-left transition-all ${selected ? "border-indigo-400 bg-indigo-50/60" : "border-gray-100 bg-white hover:border-indigo-200"}`}>
                <div className={`w-9 h-9 rounded-xl ${opt.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${opt.iconColor}`} />
                </div>
                <div>
                  <p className={`text-[13px] font-semibold mb-0.5 ${selected ? "text-indigo-700" : "text-gray-800"}`}>{opt.label}</p>
                  <p className="text-[11px] text-gray-400">{opt.desc}</p>
                </div>
              </button>);

          })}
        </div>
      </div>

      {/* Duration + Interviewers + Buffer */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Duration</p>
          <div className="flex gap-2 flex-wrap">
            {[30, 45, 60, 90].map((d) =>
            <button key={d} onClick={() => onChange({ ...config, duration: d })}
            className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${config.duration === d ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                {d} min
              </button>
            )}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Buffer Between Interviews</p>
          <div className="flex gap-2 flex-wrap">
            {["None", "15 min", "30 min", "1 hour"].map((b) =>
            <button key={b} onClick={() => onChange({ ...config, buffer: b })}
            className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${config.buffer === b ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
                {b}
              </button>
            )}
          </div>
        </div>
      </div>

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

      {/* Interviewer Guidelines */}
      <div className="border border-gray-100 rounded-2xl p-5 bg-white">
        <div className="flex items-center gap-2 mb-1">
          <ListChecks className="w-4 h-4 text-indigo-500" />
          <p className="text-[14px] font-semibold text-gray-900">Interviewer Guidelines</p>
        </div>
        <p className="text-[12px] text-gray-400 mb-3 leading-relaxed">
          This basic guideline will be shared with interviewers to help them run a consistent and structured interview.
        </p>
        <Textarea
          value={config.guidelines || DEFAULT_GUIDELINES}
          onChange={(e) => onChange({ ...config, guidelines: e.target.value })}
          className="w-full min-h-[160px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none bg-gray-50" />

      </div>
    </div>);

}

// ── Step 5: Interview Invitation Email ───────────────────────────────────────
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
            <p className="text-[13px] text-gray-400">Customize the email candidates receive when their interview is confirmed</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[12px] text-amber-700 leading-relaxed">
            Variables in <span className="font-mono font-bold bg-amber-100 px-1 rounded">{`{{double_braces}}`}</span> are auto-filled — candidate name, job title, interview link, date/time, etc.
          </p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Subject Line</label>
            <input
              defaultValue="Interview Confirmed — {{job_title}} at {{company_name}}"
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
        {reminder.enabled &&
        <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Send reminder</p>
              <div className="flex gap-2 flex-wrap">
                {["1 hour before", "3 hours before", "24 hours before"].map((t) =>
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

// ── Step 6: Feedback Form Builder ────────────────────────────────────────────
const DEFAULT_FEEDBACK_SECTIONS = [
{ id: "overall", label: "Overall Impression", type: "rating", required: true },
{ id: "technical", label: "Technical Skills", type: "rating", required: true },
{ id: "communication", label: "Communication & Clarity", type: "rating", required: true },
{ id: "culture", label: "Culture Fit", type: "rating", required: false },
{ id: "strengths", label: "Key Strengths", type: "text", required: true },
{ id: "concerns", label: "Concerns / Red Flags", type: "text", required: false },
{ id: "recommendation", label: "Hire Recommendation", type: "decision", required: true },
{ id: "notes", label: "Additional Notes", type: "text", required: false }];


const FIELD_TYPE_META = {
  rating: { label: "Rating (1–5)", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  text: { label: "Text answer", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  decision: { label: "Yes / No / Maybe", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-200" }
};

function StepFeedbackForm({ feedbackForm, setFeedbackForm }) {
  const toggleField = (id) =>
  setFeedbackForm((prev) => ({ ...prev, fields: prev.fields.map((f) => f.id === id ? { ...f, enabled: !f.enabled } : f) }));
  const toggleRequired = (id) =>
  setFeedbackForm((prev) => ({ ...prev, fields: prev.fields.map((f) => f.id === id ? { ...f, required: !f.required } : f) }));

  const fields = feedbackForm.fields || DEFAULT_FEEDBACK_SECTIONS.map((f) => ({ ...f, enabled: true }));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Feedback Form</h2>
          <p className="text-[13px] text-gray-400">Select which sections interviewers must complete after each interview</p>
        </div>
      </div>

      <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 flex items-start gap-2">
        <ListChecks className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
        <p className="text-[12px] text-violet-700 leading-relaxed">
          Toggle sections on/off and mark them as required or optional. Interviewers will receive a link to this form after the interview ends.
        </p>
      </div>

      <div className="space-y-2">
        {fields.map((field) => {
          const meta = FIELD_TYPE_META[field.type];
          return (
            <div key={field.id} className={`border rounded-2xl px-4 py-3.5 flex items-center gap-3 transition-all ${field.enabled ? "bg-white border-gray-100" : "bg-gray-50 border-gray-100 opacity-50"}`}>
              <Switch checked={field.enabled} onCheckedChange={() => toggleField(field.id)} />
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-semibold ${field.enabled ? "text-gray-900" : "text-gray-400"}`}>{field.label}</p>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.color} ${meta.border}`}>{meta.label}</span>
              </div>
              {field.enabled &&
              <button
                onClick={() => toggleRequired(field.id)}
                className={`text-[11px] font-semibold px-3 py-1 rounded-full border transition-all ${field.required ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-gray-50 text-gray-400 border-gray-200 hover:border-gray-300"}`}>
                  {field.required ? "Required" : "Optional"}
                </button>
              }
            </div>);

        })}
      </div>

      {/* Deadline to submit */}
      <div className="border border-gray-100 rounded-2xl p-5 bg-white">
        <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Submission deadline</p>
        <p className="text-[12px] text-gray-400 mb-3">How long after the interview should feedback be submitted?</p>
        <div className="flex gap-2 flex-wrap">
          {["Same day", "24 hours", "48 hours", "72 hours"].map((d) =>
          <button key={d} onClick={() => setFeedbackForm((prev) => ({ ...prev, deadline: d }))}
          className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${feedbackForm.deadline === d ? "bg-indigo-600 text-white border-indigo-600" : "border-gray-200 text-gray-600 hover:border-indigo-300"}`}>
              {d}
            </button>
          )}
        </div>
      </div>
    </div>);

}

// ── Step 7: Feedback Form Email ───────────────────────────────────────────────
const DEFAULT_FEEDBACK_EMAIL = `Hi {{interviewer_name}},

Thank you for conducting the interview with {{candidate_name}} for the {{job_title}} role.

Please take a few minutes to complete your feedback using the link below:
{{feedback_form_link}}

Deadline: {{feedback_deadline}}

Your feedback helps us make a fair and informed hiring decision. Please be as specific as possible.

Thank you!`;

const DEFAULT_FEEDBACK_REMINDER_EMAIL = `Hi {{interviewer_name}},

Just a reminder — your feedback for {{candidate_name}} ({{job_title}}) is due by {{feedback_deadline}}.

Complete your feedback here: {{feedback_form_link}}

Thank you!`;

function StepFeedbackEmail({ feedbackEmail, setFeedbackEmail }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 text-violet-600" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-0.5">Feedback Request Email</h2>
          <p className="text-[13px] text-gray-400">Customise the email sent to interviewers after the interview ends</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[12px] text-amber-700 leading-relaxed">
          Variables in <span className="font-mono font-bold bg-amber-100 px-1 rounded">{`{{double_braces}}`}</span> are auto-filled — interviewer name, candidate name, feedback link, deadline, etc.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Subject Line</label>
          <input
            defaultValue="Feedback required — {{candidate_name}} interview ({{job_title}})"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-violet-400 bg-white" />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Email Body</label>
          <Textarea
            value={feedbackEmail.body}
            onChange={(e) => setFeedbackEmail((prev) => ({ ...prev, body: e.target.value }))}
            className="w-full min-h-[200px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-violet-400 resize-none bg-white font-mono" />
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200" />

      {/* Reminder */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-gray-900 mb-0.5">Feedback Reminder</h2>
            <p className="text-[13px] text-gray-400">Nudge interviewers who haven't submitted yet</p>
          </div>
        </div>
        <div className={`border-2 rounded-2xl px-5 py-4 mb-4 flex items-center justify-between transition-all ${feedbackEmail.reminderEnabled ? "border-amber-300 bg-amber-50/40" : "border-gray-100 bg-gray-50"}`}>
          <div>
            <p className="text-[14px] font-semibold text-gray-900 mb-0.5">Enable Reminder</p>
            <p className="text-[12px] text-gray-400">Send a follow-up if feedback hasn't been submitted</p>
          </div>
          <Switch checked={feedbackEmail.reminderEnabled} onCheckedChange={(v) => setFeedbackEmail((prev) => ({ ...prev, reminderEnabled: v }))} />
        </div>
        {feedbackEmail.reminderEnabled &&
        <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">Send reminder</p>
              <div className="flex gap-2 flex-wrap">
                {["12 hours before deadline", "24 hours before deadline", "On deadline day"].map((t) =>
              <button key={t} onClick={() => setFeedbackEmail((prev) => ({ ...prev, reminderTiming: t }))}
              className={`px-4 py-2 rounded-full text-[12px] font-medium border transition-all ${feedbackEmail.reminderTiming === t ? "bg-amber-500 text-white border-amber-500" : "border-gray-200 text-gray-600 hover:border-amber-300"}`}>
                    {t}
                  </button>
              )}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Reminder Email Body</label>
              <Textarea
              value={feedbackEmail.reminderBody}
              onChange={(e) => setFeedbackEmail((prev) => ({ ...prev, reminderBody: e.target.value }))}
              className="w-full min-h-[140px] border border-gray-200 rounded-xl px-3 py-2.5 text-[13px] text-gray-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none bg-white font-mono" />
            </div>
          </div>
        }
      </div>
    </div>);

}

// ── Step 8: Filtering & No-Show Rules ─────────────────────────────────────────
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
        {criteria.humanReview &&
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[12px] text-emerald-700 font-medium">Disqualifications won't be sent until you approve them</p>
          </div>
        }
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
    </div>);

}

// ── Step 9: Review & Confirm ──────────────────────────────────────────────────
function StepReviewConfirm({ availabilityConfig, schedulingCriteria, interviewConfig, reminder, feedbackForm, feedbackEmail, filterCriteria, generating }) {
  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
          <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
        </div>
        <p className="text-[15px] font-semibold text-gray-800">Configuring Scheduling Agent…</p>
        <p className="text-[12px] text-gray-400">Setting up calendar sync and automation rules</p>
      </div>);

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
          label: "Availability Finder",
          icon: Calendar,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          items: [
          `Window: ${availabilityConfig.window || "7 days"}`,
          `Min slots: ${availabilityConfig.minSlots || 3}`,
          `Timezone: ${availabilityConfig.timezone || "UTC"}`,
          `Candidate override: ${availabilityConfig.allowTimezoneOverride ? "Allowed" : "Not allowed"}`]

        },
        {
          label: "Interview Setup",
          icon: Video,
          iconBg: "bg-indigo-100",
          iconColor: "text-indigo-600",
          items: [
          `Score threshold: ${schedulingCriteria.scoreThreshold || "Passing"}`,
          `Format: ${interviewConfig.format || "Video"}`,
          `Duration: ${interviewConfig.duration || 60} min`,
          `Interviewers: ${interviewConfig.interviewers || 1}`]

        },
        {
          label: "Invite Email & Reminder",
          icon: Mail,
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
          items: [
          "Custom invite email configured",
          reminder.enabled ? `Reminder: ${reminder.timing}` : "No reminder set"]

        },
        {
          label: "Feedback Setup",
          icon: FileText,
          iconBg: "bg-violet-100",
          iconColor: "text-violet-600",
          items: [
          `${(feedbackForm.fields || []).filter((f) => f.enabled).length} form sections enabled`,
          `Deadline: ${feedbackForm.deadline || "24 hours"} after interview`,
          feedbackEmail.reminderEnabled ? `Reminder: ${feedbackEmail.reminderTiming}` : "No reminder set"]
        },
        {
          label: "Filtering Rules",
          icon: Shield,
          iconBg: "bg-red-100",
          iconColor: "text-red-500",
          items: [
          `No-show limit: ${filterCriteria.noShowLimit || 1}`,
          `Auto-reschedule: ${filterCriteria.autoReschedule ? "Enabled" : "Disabled"}`,
          `Human review: ${filterCriteria.humanReview ? "Required" : "Not required"}`]

        }].
        map(({ label, icon: Icon, iconBg, iconColor, items }) =>
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
              {items.map((item, i) =>
            <li key={i} className="text-[12px] text-gray-500 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />{item}
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
    </div>);

}

// ── Stage Transition ──────────────────────────────────────────────────────────
function StageTransition({ config, onContinue, isLast, stackStatus }) {
  const [visible, setVisible] = useState(false);
  React.useEffect(() => {setTimeout(() => setVisible(true), 50);}, []);

  const enabledCount = stackStatus.filter((s) => s.enabled).length;
  const idleCount = stackStatus.filter((s) => !s.enabled).length;

  return (
    <div className={`flex flex-col items-center justify-center h-full px-12 text-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${config.enabled ? "bg-emerald-100" : "bg-gray-100"}`}>
        {config.enabled ? <Check className="w-9 h-9 text-emerald-500" /> : <ChevronRight className="w-9 h-9 text-gray-400" />}
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

      <button onClick={onContinue} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-10 rounded-xl text-[13px] font-semibold flex items-center gap-2 transition-colors">
        {isLast ? <><Check className="w-4 h-4" /> Finish Setup</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
      </button>
    </div>);

}

// ── Main Modal ────────────────────────────────────────────────────────────────
export default function SchedulingSetupModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [transition, setTransition] = useState(null);
  const [availabilityConfig, setAvailabilityConfig] = useState({ window: "7 days", minSlots: 3, timezone: "UTC", allowTimezoneOverride: true });
  const [availabilityEmail, setAvailabilityEmail] = useState(DEFAULT_AVAILABILITY_EMAIL);
  const [schedulingCriteria, setSchedulingCriteria] = useState({ scoreThreshold: "passing", autoSchedule: true, humanReview: true });
  const [interviewConfig, setInterviewConfig] = useState({ format: "video", duration: 60, interviewers: 1, buffer: "15 min", guidelines: DEFAULT_GUIDELINES });
  const [inviteEmail, setInviteEmail] = useState(DEFAULT_INVITE_EMAIL);
  const [reminder, setReminder] = useState({ enabled: true, timing: "24 hours before", emailContent: DEFAULT_REMINDER_EMAIL });
  const [filterCriteria, setFilterCriteria] = useState({ noShowLimit: 1, autoReschedule: true, humanReview: true });
  const [feedbackForm, setFeedbackForm] = useState({ fields: DEFAULT_FEEDBACK_SECTIONS.map((f) => ({ ...f, enabled: true })), deadline: "24 hours" });
  const [feedbackEmail, setFeedbackEmail] = useState({ body: DEFAULT_FEEDBACK_EMAIL, reminderEnabled: true, reminderTiming: "24 hours before deadline", reminderBody: DEFAULT_FEEDBACK_REMINDER_EMAIL });
  const [generating, setGenerating] = useState(false);
  const [stackStatus, setStackStatus] = useState([
  { label: "Availability Finder", configured: false, enabled: false },
  { label: "Interview Setup", configured: false, enabled: true },
  { label: "Feedback Setup", configured: false, enabled: false },
  { label: "Filtering Criteria", configured: false, enabled: false }]
  );

  // Transitions fire after completing the last step of each stack
  // Stack 1 ends at step 2, Stack 2 ends at step 5, Stack 3 ends at step 7, Stack 4 ends at step 8
  const getTransitionConfig = (completedStep, skipped) => {
    if (completedStep === 2) return {
      sectionLabel: "Availability Finder",
      enabled: !skipped,
      title: skipped ? "Availability Finder Skipped" : "Availability Finder configured",
      desc: skipped ?
      "Candidates will be scheduled directly. You can add availability collection later." :
      `Candidates will share ${availabilityConfig.minSlots || 3} slots over a ${availabilityConfig.window || "7 days"} window in ${availabilityConfig.timezone || "UTC"}.`,
      statusLabel: skipped ? "Not configured" : "Availability collection active"
    };
    if (completedStep === 5) return {
      sectionLabel: "Interview Setup",
      enabled: true,
      title: `Interview ready — ${interviewConfig.duration || 60} min ${interviewConfig.format || "video"} interview`,
      desc: `Scheduling criteria, format, and invitation email are all configured and ready to go.`,
      statusLabel: "Interview setup complete"
    };
    if (completedStep === 7) return {
      sectionLabel: "Feedback Setup",
      enabled: !skipped,
      title: skipped ? "Feedback Setup Skipped" : "Feedback form configured",
      desc: skipped ?
      "No feedback form will be sent to interviewers. You can configure this later." :
      `Interviewers will receive a feedback form with ${(feedbackForm.fields || []).filter((f) => f.enabled).length} sections, due ${feedbackForm.deadline || "24 hours"} after the interview.`,
      statusLabel: skipped ? "Not configured" : feedbackEmail.reminderEnabled ? "Form + reminder active" : "Form active"
    };
    if (completedStep === 8) return {
      sectionLabel: "Filtering Criteria",
      enabled: !skipped && filterCriteria.autoReschedule,
      title: skipped ? "Filtering Criteria Skipped" : filterCriteria.autoReschedule ? "Auto-reschedule is On" : "Manual filtering mode",
      desc: skipped ?
      "All cancellations and no-shows will require manual review." :
      filterCriteria.autoReschedule ?
      "The AI will automatically offer new slots to candidates who cancel." :
      "Cancellations will be flagged for your manual approval.",
      statusLabel: skipped ? "Not configured" : filterCriteria.autoReschedule ? "Automation enabled" : "Manual review required"
    };
    return null;
  };

  const updateStackStatus = (completedStep, skipped) => {
    const updates = {
      2: { label: "Availability Finder", enabled: !skipped },
      5: { label: "Interview Setup", enabled: true },
      7: { label: "Feedback Setup", enabled: !skipped },
      8: { label: "Filtering Criteria", enabled: !skipped && filterCriteria.autoReschedule }
    };
    const update = updates[completedStep];
    if (!update) return;
    setStackStatus((prev) => prev.map((s) =>
    s.label === update.label ? { ...s, configured: true, enabled: update.enabled } : s
    ));
  };

  const handleNext = () => {
    const tc = getTransitionConfig(step, false);
    if (tc) {
      updateStackStatus(step, false);
      setTransition({ config: tc, nextStep: step + 1 });
    } else if (step === TOTAL_STEPS) {
      setGenerating(true);
      setTimeout(() => {setGenerating(false);onClose();}, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const handleSkip = () => {
    const tc = getTransitionConfig(step, true);
    if (tc) {
      updateStackStatus(step, true);
      setTransition({ config: tc, nextStep: step + 1 });
    } else {
      setStep(step + 1);
    }
  };

  const handleTransitionContinue = () => {
    const nextStep = transition.nextStep;
    setTransition(null);
    if (nextStep > TOTAL_STEPS) onClose();else
    setStep(nextStep);
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

          {!transition && <StackSidebar currentStep={step} />}

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-[14px] font-bold text-gray-900">Interview Agent Setup</h1>
                  <p className="text-[11px] text-gray-400">{transition ? "Stage complete" : `Step ${step} of ${TOTAL_STEPS}`}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {transition ?
              <StageTransition config={transition.config} onContinue={handleTransitionContinue} isLast={transition.nextStep > TOTAL_STEPS} stackStatus={stackStatus} /> :

              <>
                  {step === 1 && <StepAvailabilityTemplate config={availabilityConfig} onChange={setAvailabilityConfig} />}
                  {step === 2 && <StepAvailabilityEmail emailContent={availabilityEmail} onChange={setAvailabilityEmail} />}
                  {step === 3 && <StepSchedulingCriteria criteria={schedulingCriteria} setCriteria={setSchedulingCriteria} />}
                  {step === 4 && <StepInterviewFormat config={interviewConfig} onChange={setInterviewConfig} />}
                  {step === 5 && <StepInviteEmail emailContent={inviteEmail} onChange={setInviteEmail} reminder={reminder} setReminder={setReminder} />}
                  {step === 6 && <StepFeedbackForm feedbackForm={feedbackForm} setFeedbackForm={setFeedbackForm} />}
                  {step === 7 && <StepFeedbackEmail feedbackEmail={feedbackEmail} setFeedbackEmail={setFeedbackEmail} />}
                  {step === 8 && <StepFilteringCriteria criteria={filterCriteria} setCriteria={setFilterCriteria} />}
                  {step === 9 && <StepReviewConfirm availabilityConfig={availabilityConfig} schedulingCriteria={schedulingCriteria} interviewConfig={interviewConfig} reminder={reminder} feedbackForm={feedbackForm} feedbackEmail={feedbackEmail} filterCriteria={filterCriteria} generating={generating} />}
                </>
              }
            </div>

            {!transition &&
            <div className="px-8 py-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
                <button onClick={handleBack} disabled={step === 1}
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
                <button onClick={handleSkip}
                className="text-[13px] font-medium text-gray-400 hover:text-gray-600 px-4 h-9 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                      Skip
                    </button>
                }
                  <Button onClick={handleNext} disabled={generating}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 h-9 rounded-xl text-[13px] font-semibold flex items-center gap-1.5">
                    {generating ?
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Activating…</> :
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