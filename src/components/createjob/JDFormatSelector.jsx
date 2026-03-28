import React from "react";
import { Check, FileText, Brain, Rocket, Code2, Scale, Building2 } from "lucide-react";

export const JD_FORMATS = [
  {
    id: "classic",
    label: "Classic / Standard",
    Icon: FileText,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-700",
    desc: "The universally understood format used by LinkedIn, Amazon, and most enterprise companies.",
    sections: ["About the Company", "Job Summary", "Key Responsibilities", "Required Qualifications", "Preferred Qualifications", "Skills", "Salary & Benefits"],
  },
  {
    id: "competency",
    label: "Competency-Based",
    Icon: Brain,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50",
    badge: "Corporate / HR",
    badgeColor: "bg-violet-100 text-violet-700",
    desc: "Focuses on skills, behaviors, and measurable abilities. Common in consulting and leadership roles.",
    sections: ["Role Overview", "Core Competencies", "Behavioral Indicators", "Technical Skills", "Experience Requirements"],
  },
  {
    id: "outcome",
    label: "Outcome-Based",
    Icon: Rocket,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    badge: "Startup / Tech",
    badgeColor: "bg-emerald-100 text-emerald-700",
    desc: "Defines what the person will achieve. Popular at startups like Stripe. More engaging and performance-oriented.",
    sections: ["Mission of the Role", "30/60/90 Day Outcomes", "Key Success Metrics", "Responsibilities", "Requirements"],
  },
  {
    id: "technical",
    label: "Technical / Engineering",
    Icon: Code2,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    badge: "Engineering",
    badgeColor: "bg-amber-100 text-amber-700",
    desc: "Highly skills and tools focused. Used by Google, Meta, and engineering-heavy orgs.",
    sections: ["Role Summary", "Tech Stack", "Responsibilities", "Required Technical Skills", "Preferred Tools/Frameworks", "Education"],
  },
  {
    id: "legal",
    label: "Legal / Compliance",
    Icon: Scale,
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    badge: "Regulated Industries",
    badgeColor: "bg-red-100 text-red-700",
    desc: "Formal and detailed. Used in finance, healthcare, and regulated industries requiring certifications.",
    sections: ["Job Classification", "Reporting Structure", "Duties & Responsibilities", "Required Certifications", "Compliance Requirements"],
  },
  {
    id: "internal",
    label: "Internal / HR Format",
    Icon: Building2,
    iconColor: "text-gray-500",
    iconBg: "bg-gray-100",
    badge: "Internal",
    badgeColor: "bg-gray-100 text-gray-600",
    desc: "Used for internal promotions and transfers. Focuses on performance metrics rather than marketing.",
    sections: ["Job Purpose", "Key Result Areas (KRAs)", "KPIs / Performance Metrics", "Reporting Relationships", "Grade / Level"],
  },
];

export const JD_FORMAT_PROMPTS = {
  classic: `Use the Classic/Standard job description format with these sections in order: About the Company, Job Summary/Role Overview, Key Responsibilities, Required Qualifications (Must-have), Preferred Qualifications (Nice-to-have), Skills/Competencies, Salary & Benefits, Application Process.`,
  competency: `Use the Competency-Based job description format with these sections: Role Overview, Core Competencies (e.g. leadership, communication, problem-solving), Behavioral Indicators (what good performance looks like), Technical Skills, Experience Requirements.`,
  outcome: `Use the Outcome-Based/Modern job description format with these sections: Mission of the Role, What You'll Accomplish in 30/60/90 Days, Key Outcomes and Success Metrics, Responsibilities (lighter section), Requirements. Make it performance-oriented and engaging.`,
  technical: `Use the Technical/Engineering job description format with these sections: Role Summary, Tech Stack (prominently featured), Responsibilities, Required Technical Skills, Preferred Tools/Frameworks, Education/Experience. Be specific about technologies.`,
  legal: `Use the Legal/Compliance job description format with these sections: Job Title and Classification, Reporting Structure, Duties and Responsibilities (very detailed), Required Certifications/Licenses, Compliance Requirements. Keep the tone formal and precise.`,
  internal: `Use the Internal HR job description format with these sections: Job Purpose, Key Result Areas (KRAs), KPIs/Performance Metrics, Reporting Relationships, Grade/Level. Focus on performance tracking rather than marketing the role.`,
};

export default function JDFormatSelector({ selectedFormat, onSelect }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-[18px] font-semibold text-gray-900">Choose a Format</h2>
        <p className="text-[12px] text-gray-400 mt-1">
          Select the job description structure that best fits the role and your industry. This will guide the AI generation.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {JD_FORMATS.map((fmt) => {
            const isSelected = selectedFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => onSelect(fmt.id)}
                className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 relative ${
                  isSelected
                    ? "border-indigo-400 bg-indigo-50/60 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                {/* Selected check */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${fmt.iconBg}`}>
                    <fmt.Icon className={`w-3.5 h-3.5 ${fmt.iconColor}`} />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${fmt.badgeColor}`}>
                    {fmt.badge}
                  </span>
                </div>

                <p className={`text-[13px] font-semibold mb-1.5 ${isSelected ? "text-indigo-800" : "text-gray-800"}`}>
                  {fmt.label}
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{fmt.desc}</p>

                {/* Section preview */}
                <div className="flex flex-wrap gap-1">
                  {fmt.sections.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${
                        isSelected
                          ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                          : "border-gray-200 bg-gray-50 text-gray-500"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                  {fmt.sections.length > 4 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-400">
                      +{fmt.sections.length - 4} more
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}