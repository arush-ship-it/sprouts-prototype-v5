import React, { useState } from "react";
import { Eye, X } from "lucide-react";

export default function CandidateApplicationPreview() {
  const [showCoverLetter, setShowCoverLetter] = useState(true);
  const [showLastName, setShowLastName] = useState(true);
  const [showCurrentCompany, setShowCurrentCompany] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
      <div className="flex items-center gap-2 mb-5">
        <Eye className="w-4 h-4 text-indigo-500" />
        <h2 className="text-gray-800 text-base font-medium">Candidate Application Form</h2>
        <span className="ml-auto text-[11px] text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">Preview</span>
      </div>

      <div className="space-y-4">
        {/* Resume/CV - required */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
            Resume/CV <span className="text-red-500">*</span>
          </label>
          <div className="border border-blue-400 rounded-lg px-3 py-2.5 flex items-center gap-3 bg-white">
            <span className="text-[12px] border border-gray-300 rounded px-2 py-1 text-gray-600 bg-gray-50">Choose file</span>
            <span className="text-[12px] text-gray-400">No file chosen</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">(File types: pdf, doc, docx, txt)</p>
        </div>

        {/* Cover Letter - optional, removable */}
        {showCoverLetter && (
          <div className="group relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[13px] font-semibold text-gray-800">Cover Letter</label>
              <button
                onClick={() => setShowCoverLetter(false)}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            </div>
            <textarea
              disabled
              rows={3}
              className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] text-gray-400 bg-white resize-none cursor-default"
            />
          </div>
        )}

        {/* First Name - required */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            disabled
            placeholder="Enter your first name"
            className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
          />
        </div>

        {/* Last Name - optional, removable */}
        {showLastName && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[13px] font-semibold text-gray-800">Last Name</label>
              <button
                onClick={() => setShowLastName(false)}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            </div>
            <input
              disabled
              placeholder="Enter your last name"
              className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
            />
          </div>
        )}

        {/* Email - required */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            disabled
            placeholder="Enter your email"
            className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
          />
        </div>

        {/* Phone - required */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            disabled
            placeholder="Enter your phone number"
            className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
          />
        </div>

        {/* Location row - all required */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
              City <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              placeholder="Enter your city"
              className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
              State <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              placeholder="Enter your state"
              className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
            />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              disabled
              placeholder="Enter your country"
              className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
            />
          </div>
        </div>

        {/* LinkedIn - required */}
        <div>
          <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
            LinkedIn Profile <span className="text-red-500">*</span>
          </label>
          <input
            disabled
            placeholder="Enter your LinkedIn profile URL"
            className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
          />
        </div>

        {/* Current Company - optional, removable */}
        {showCurrentCompany && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[13px] font-semibold text-gray-800">Current Company</label>
              <button
                onClick={() => setShowCurrentCompany(false)}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="w-3 h-3" /> Remove
              </button>
            </div>
            <input
              disabled
              placeholder="Enter your current company"
              className="w-full border border-blue-400 rounded-lg px-3 py-2 text-[13px] placeholder:text-gray-400 bg-white cursor-default"
            />
          </div>
        )}
      </div>
    </div>
  );
}