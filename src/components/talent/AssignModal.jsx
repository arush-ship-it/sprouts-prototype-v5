import React, { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECRUITERS = [
  { id: 1, name: "Sarah Kim", role: "Senior Recruiter" },
  { id: 2, name: "James Okafor", role: "Recruiter" },
  { id: 3, name: "Priya Nair", role: "Technical Recruiter" },
];

const JOBS = [
  { id: 1, title: "Senior Product Designer", dept: "Design" },
  { id: 2, title: "Frontend Engineer", dept: "Engineering" },
  { id: 3, title: "Data Scientist", dept: "Analytics" },
  { id: 4, title: "Marketing Manager", dept: "Marketing" },
];

export default function AssignModal({ candidate, onClose, onSubmit }) {
  const [recruiter, setRecruiter] = useState(null);
  const [job, setJob] = useState(null);

  const handleSubmit = () => {
    onSubmit({ recruiter, job });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-indigo-500" />
            <p className="text-[14px] font-semibold text-gray-900">Assign Candidate</p>
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

          {/* Assign to Recruiter */}
          <p className="text-[12px] font-semibold text-gray-700 mb-2">Assign to Recruiter</p>
          <div className="space-y-1.5 mb-4">
            {RECRUITERS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRecruiter(r.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between ${
                  recruiter === r.id
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className={`text-[13px] font-semibold ${recruiter === r.id ? "text-indigo-700" : "text-gray-800"}`}>{r.name}</p>
                  <p className="text-[11px] text-gray-400">{r.role}</p>
                </div>
                {recruiter === r.id && <div className="w-3 h-3 rounded-full bg-indigo-500" />}
              </button>
            ))}
          </div>

          {/* Assign to Job */}
          <p className="text-[12px] font-semibold text-gray-700 mb-2">Assign to Job Opening</p>
          <div className="space-y-1.5 mb-4">
            {JOBS.map((j) => (
              <button
                key={j.id}
                onClick={() => setJob(j.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-center justify-between ${
                  job === j.id
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className={`text-[13px] font-semibold ${job === j.id ? "text-indigo-700" : "text-gray-800"}`}>{j.title}</p>
                  <p className="text-[11px] text-gray-400">{j.dept}</p>
                </div>
                {job === j.id && <div className="w-3 h-3 rounded-full bg-indigo-500" />}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 text-[13px]">Cancel</Button>
            <Button
              onClick={handleSubmit}
              disabled={!recruiter && !job}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] disabled:opacity-40"
            >
              Confirm Assignment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}