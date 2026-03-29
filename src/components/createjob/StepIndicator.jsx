import React, { useState } from "react";
import { Check } from "lucide-react";

const STEPS = [
  { number: 1, label: "Generate", desc: "Describe the role and let AI generate the job description" },
  { number: 2, label: "Review JD", desc: "Review and edit the AI-generated job description" },
  { number: 3, label: "Details", desc: "Confirm role details, salary, and work arrangement" },
  { number: 4, label: "Screening", desc: "Add screening questions for applicants" },
  { number: 5, label: "Publish", desc: "Set visibility and post to job boards" },
];

export default function StepIndicator({ currentStep, onStepClick }) {
  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="flex items-center px-5 py-4 border-b border-gray-100 relative">
      {STEPS.map((step, idx) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        const isClickable = onStepClick && currentStep >= step.number;

        return (
          <React.Fragment key={step.number}>
            <div className="relative flex flex-col items-center shrink-0">
              {/* Tooltip */}
              {tooltip === step.number && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-[11px] rounded-lg px-3 py-2 whitespace-nowrap shadow-lg pointer-events-none">
                  <span className="font-semibold">{step.label}</span>
                  <br />
                  <span className="text-gray-300 font-normal">{step.desc}</span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                </div>
              )}

              <button
                onClick={() => isClickable && onStepClick(step.number)}
                onMouseEnter={() => setTooltip(step.number)}
                onMouseLeave={() => setTooltip(null)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 transition-all duration-200 ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                } ${
                  isCompleted
                    ? "bg-gray-900 text-white"
                    : isActive
                    ? "bg-gray-900 text-white ring-4 ring-gray-200"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.number}
              </button>
            </div>

            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-1.5 transition-colors duration-300 ${
                  currentStep > step.number ? "bg-gray-900" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}