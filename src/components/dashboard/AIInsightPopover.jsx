import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, AlertTriangle, TrendingDown, TrendingUp, Loader2 } from "lucide-react";

// Pre-written insights keyed by insight ID — simulates AI responses instantly
const INSIGHTS = {
  // KPI cards — Hiring Health
  kpi_openroles: {
    type: "info",
    headline: "24 open roles — 6 flagged urgent",
    body: "Engineering accounts for 9 of your open roles (37.5%). At the current fill rate, 3 of those are at risk of exceeding your 35-day target. Consider re-prioritising the sourcing pipeline for Staff Engineer – Backend, which has been open 54 days.",
    actions: ["View urgent roles", "Boost sourcing for Engineering"],
  },
  kpi_ttf: {
    type: "positive",
    headline: "Time to Fill is 14 days under target 🎉",
    body: "Your 28-day TTF is well below the industry average of 42 days and your own 35-day target. The trend has been consistently declining since September. Sustaining this will require keeping the interview scheduling SLA under 5 days.",
    actions: ["See TTF by department", "Compare vs industry"],
  },
  kpi_offer: {
    type: "warning",
    headline: "Offer acceptance 3% below target",
    body: "At 82%, you're close but not yet at your 85% target. November saw a dip to 6 accepted vs 3 declined — the highest decline rate in 6 months. Common causes: compensation misalignment or delayed offer timelines. Review Nov offer details.",
    actions: ["Analyse Nov declines", "Check compensation benchmarks"],
  },
  kpi_quality: {
    type: "positive",
    headline: "Quality of Hire improving steadily",
    body: "4.2/5 is a +0.3 improvement vs Q3. Hires from referral channels score consistently 0.4 higher than job board hires. Expanding your employee referral programme could compound this trend over the next quarter.",
    actions: ["Breakdown by source", "Expand referral programme"],
  },

  // Chart-level insights
  chart_ttf: {
    type: "positive",
    headline: "TTF trend is consistently improving",
    body: "Six consecutive months of improvement, dropping from 38 days in Sep to 28 days in Feb. The biggest single-month drop was Oct → Nov (−3 days), coinciding with the rollout of structured interview panels. That process change appears to be the key driver.",
    actions: ["View process change log"],
  },
  chart_openings: {
    type: "warning",
    headline: "Engineering open roles are accumulating",
    body: "Engineering has 9 open roles vs only 3 filled this month — the highest open-to-filled ratio across all departments. Sales has a much healthier ratio (5:4). Consider temporarily reallocating recruiter bandwidth from Sales to Engineering.",
    actions: ["Rebalance recruiter workload"],
  },
  chart_offer: {
    type: "warning",
    headline: "November offer declines spiked",
    body: "November recorded 3 declines — 3× the previous month. This is an anomaly against the otherwise improving trend. Exit interview data from those candidates may reveal whether compensation, role clarity, or timing was the deciding factor.",
    actions: ["Review Nov candidate feedback"],
  },

  // Anomaly-specific
  anomaly_nov_decline: {
    type: "anomaly",
    headline: "⚠ Anomaly: Nov offer declines tripled",
    body: "In November, offer declines jumped to 3 from just 1 in October — a 200% spike. This is statistically outside your normal range. Possible causes: a competing employer making counter-offers, delayed offer letters (avg 6.2 days vs your 4-day SLA), or compensation packages not adjusted for Q4 market rates.",
    actions: ["Check Nov offer timelines", "Review comp vs market"],
  },
  anomaly_high_risk_roles: {
    type: "anomaly",
    headline: "⚠ 2 roles at critical open-day threshold",
    body: "Staff Engineer – Backend (54 days) and Head of Sales – APAC (38 days) have both exceeded your internal 35-day SLA. Combined, they represent 18 applicants who may be losing interest. Automated re-engagement sequences haven't fired for either role.",
    actions: ["Trigger re-engagement", "Escalate to hiring managers"],
  },

  // Funnel
  kpi_hirerate: {
    type: "anomaly",
    headline: "⚠ Overall hire rate dipped −0.2%",
    body: "Your hire rate has slipped from 2.1% to 1.9%. While small in absolute terms, it represents roughly 2–3 fewer hires per 1,000 applicants. The drop correlates with the 'Failed Assessment' drop-off increasing by 18% this period — your assessment bar may have shifted without a corresponding improvement in top-of-funnel quality.",
    actions: ["Review assessment pass rates", "Audit top-of-funnel quality"],
  },
  chart_dropoff: {
    type: "warning",
    headline: "187 candidates withdrew — highest single reason",
    body: "Candidate withdrawals (187) dwarf every other drop-off reason. This often signals a slow process — candidates find other roles while waiting. Your median time between stages is 4.2 days; industry best-practice is under 2 days. Compressing stage delays could recover an estimated 30–40 candidates per cycle.",
    actions: ["Compress stage timelines", "Send status update sequences"],
  },
  chart_source: {
    type: "info",
    headline: "Referrals convert at 1.4× the average",
    body: "Referral hires convert at 3.3% vs your overall 1.9% average — the highest of any channel. Yet referrals represent only 14.5% of your total applicant volume. Increasing referral volume by 20% could add ~1–2 additional hires per cycle at the same cost.",
    actions: ["Boost referral programme", "Set referral volume targets"],
  },

  // Recruiter
  recruiter_productivity: {
    type: "info",
    headline: "Sarah M. is outperforming on speed",
    body: "Sarah's avg TTF of 24 days is 6 days faster than team average, while maintaining the highest placement count (6). James K. has the second-best efficiency. Alex T.'s TTF of 38 days and score of 72 suggest they may benefit from structured coaching or workload reduction.",
    actions: ["Schedule Alex coaching session", "Replicate Sarah's process"],
  },
  chart_completion: {
    type: "warning",
    headline: "Offers Extended is the weakest task metric",
    body: "At 68%, 'Offers Extended' is 17 percentage points behind 'Feedback Filed' (90%). This bottleneck sits between a successful interview and a closed hire — delays here directly increase the risk of offer declines. Automating offer letter generation could compress this.",
    actions: ["Automate offer letters", "Set offer SLA alerts"],
  },
};

// Anomaly badge — shown directly on cards with a detected issue
export function AnomalyBadge({ insightId, onOpen, label = "Anomaly detected" }) {
  return (
    <button
      onClick={() => onOpen(insightId)}
      className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-semibold hover:bg-amber-100 transition-colors animate-pulse-slow group"
      title={label}>
      <AlertTriangle className="w-3 h-3 shrink-0" />
      <span className="group-hover:underline">{label}</span>
    </button>
  );
}

// The sparkles button that appears on hover and triggers the popover
export function AIInsightButton({ insightId, onOpen, className = "" }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onOpen(insightId); }}
      className={`w-6 h-6 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center hover:bg-indigo-200 transition-all hover:scale-110 shrink-0 ${className}`}
      title="AI insight">
      <Sparkles className="w-3 h-3 text-indigo-600" />
    </button>
  );
}

// The global popover panel — render once at a top level and pass openInsight / closeInsight down
export function AIInsightPanel({ insightId, onClose, inline = false }) {
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  const insight = INSIGHTS[insightId];

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [insightId]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  if (!insight) return null;

  const typeStyles = {
    positive: { bg: "bg-emerald-50", border: "border-emerald-200", icon: TrendingUp, iconColor: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", icon: AlertTriangle, iconColor: "text-amber-600", badge: "bg-amber-100 text-amber-700" },
    anomaly: { bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle, iconColor: "text-red-600", badge: "bg-red-100 text-red-700" },
    info: { bg: "bg-indigo-50", border: "border-indigo-200", icon: Sparkles, iconColor: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700" },
  };

  const s = typeStyles[insight.type] || typeStyles.info;
  const TypeIcon = s.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ duration: 0.18 }}
      className={`${inline ? "relative w-full h-full" : "fixed z-[200] bottom-6 right-6 w-[340px]"} bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden`}>
      {/* Header */}
      <div className={`px-4 py-3 ${s.bg} border-b ${s.border} flex items-start justify-between gap-3`}>
        <div className="flex items-start gap-2.5">
          <div className={`w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 border ${s.border}`}>
            <TypeIcon className={`w-3.5 h-3.5 ${s.iconColor}`} />
          </div>
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${s.badge}`}>
              {insight.type === "anomaly" ? "Anomaly" : insight.type === "positive" ? "Positive signal" : insight.type === "warning" ? "Watch out" : "AI Insight"}
            </span>
            <p className="text-[12px] font-semibold text-gray-900 mt-1.5 leading-snug">{insight.headline}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-6 h-6 rounded-full bg-white/70 flex items-center justify-center hover:bg-white transition-colors shrink-0">
          <X className="w-3 h-3 text-gray-500" />
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-400 py-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-[12px]">Analysing your data…</span>
          </div>
        ) : (
          <>
            <p className="text-[12px] text-gray-700 leading-relaxed">{insight.body}</p>
            {insight.actions?.length > 0 && (
              <div className="mt-3 flex flex-col gap-1.5">
                {insight.actions.map((a, i) => (
                  <button key={i} className="text-left text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
                    <span className="group-hover:underline">{a}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-indigo-400" />
        <span className="text-[10px] text-gray-400">Generated by SproutsAI · Based on your live data</span>
      </div>
    </motion.div>
  );
}

// Hook to manage open/close state at a parent level
export function useAIInsight() {
  const [activeInsight, setActiveInsight] = useState(null);
  const openInsight = (id) => setActiveInsight(id);
  const closeInsight = () => setActiveInsight(null);
  return { activeInsight, openInsight, closeInsight };
}