import React, { useState } from "react";
import { X, Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const TEMPLATES = [
  {
    label: "Interested in Connecting",
    body: (name) =>
      `Hi ${name},\n\nI came across your profile and was impressed by your background. I'd love to connect and explore potential opportunities that might align with your goals.\n\nLooking forward to hearing from you!\n\nBest regards`,
  },
  {
    label: "Follow Up on Role",
    body: (name) =>
      `Hi ${name},\n\nI wanted to follow up regarding a role we discussed earlier. We have an exciting opening that we think could be a great match for your skillset.\n\nWould you be open to a quick call this week?\n\nBest regards`,
  },
  {
    label: "Request More Details",
    body: (name) =>
      `Hi ${name},\n\nThank you for your interest. To help us better evaluate your profile, could you share more details about your recent experience and current availability?\n\nLooking forward to your response!\n\nBest regards`,
  },
  {
    label: "Invite to Apply",
    body: (name) =>
      `Hi ${name},\n\nBased on your profile, I'd like to personally invite you to apply for an open position on our team. I believe your background aligns well with what we're looking for.\n\nPlease let me know if you'd be interested in learning more!\n\nBest regards`,
  },
];

export default function MessageModal({ candidate, onClose }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSelect = (template) => {
    setSelectedTemplate(template.label);
    setDraft(template.body(candidate.name.split(" ")[0]));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            <p className="text-[14px] font-semibold text-gray-900">Send Message</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {/* Candidate */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
            <img src={candidate.avatar} alt={candidate.name} className="w-9 h-9 rounded-full object-cover" />
            <div>
              <p className="text-[13px] font-semibold text-gray-900">{candidate.name}</p>
              <p className="text-[11px] text-gray-500">{candidate.title}</p>
            </div>
          </div>

          {/* Template selector */}
          <p className="text-[12px] font-semibold text-gray-700 mb-2">Choose a template</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {TEMPLATES.map((t) => (
              <button
                key={t.label}
                onClick={() => handleSelect(t)}
                className={`px-3 py-2 rounded-xl border text-[11px] font-medium text-left transition-all ${
                  selectedTemplate === t.label
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Draft */}
          {draft && (
            <>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[12px] font-semibold text-gray-700">Email Draft</p>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 font-medium">Auto-generated</span>
              </div>
              <div className="relative">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={7}
                  className="w-full text-[12px] text-gray-700 leading-relaxed bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 resize-none focus:outline-none focus:ring-1 focus:ring-blue-300"
                />
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-blue-600 bg-white border border-gray-200 px-2 py-1 rounded-lg transition-colors"
                >
                  {copied ? <><Check className="w-3 h-3 text-emerald-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
            </>
          )}

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 text-[13px]">Cancel</Button>
            <Button
              disabled={!draft}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[13px] disabled:opacity-40"
              onClick={onClose}
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}