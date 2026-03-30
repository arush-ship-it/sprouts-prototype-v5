import React, { useState } from "react";
import { X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEEDBACK_OPTIONS = [
  { label: "Strong fit", color: "bg-emerald-50 border-emerald-300 text-emerald-700" },
  { label: "Good fit", color: "bg-blue-50 border-blue-300 text-blue-700" },
  { label: "Needs more info", color: "bg-amber-50 border-amber-300 text-amber-700" },
  { label: "Not a fit", color: "bg-red-50 border-red-300 text-red-700" },
];

export default function FeedbackModal({ candidate, onClose, onSubmit }) {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!selected) return;
    onSubmit({ feedback: selected, note });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <p className="text-[14px] font-semibold text-gray-900">Quick Feedback</p>
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

          {/* Feedback chips */}
          <p className="text-[12px] font-semibold text-gray-700 mb-2">Select feedback <span className="text-red-400">*</span></p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {FEEDBACK_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setSelected(opt.label)}
                className={`px-3 py-2 rounded-xl border text-[12px] font-semibold transition-all ${
                  selected === opt.label ? opt.color : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Optional note */}
          <p className="text-[12px] font-semibold text-gray-700 mb-1.5">Note <span className="text-gray-400 font-normal">(optional)</span></p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Add context for your team..."
            className="w-full text-[12px] text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 resize-none focus:outline-none focus:ring-1 focus:ring-blue-300"
          />

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 text-[13px]">Cancel</Button>
            <Button
              onClick={handleSubmit}
              disabled={!selected}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-[13px] disabled:opacity-40"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}