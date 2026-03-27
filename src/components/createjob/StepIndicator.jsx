import React from "react";
import { Check } from "lucide-react";

const STEPS = [
{ number: 1, label: "Generate" },
{ number: 2, label: "Review JD" },
{ number: 3, label: "Confirm Details" },
{ number: 4, label: "Screening" },
{ number: 5, label: "Publish" }];


export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center gap-1 px-6 py-3 border-b border-gray-100">
      {STEPS.map((step, idx) =>
      <React.Fragment key={step.number}>
          <div className="flex items-center gap-2 shrink-0">
            <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 transition-colors ${
            currentStep > step.number ?
            "bg-emerald-500 text-white" :
            currentStep === step.number ?
            "bg-indigo-600 text-white" :
            "bg-gray-100 text-gray-400"}`
            }>

              {currentStep > step.number ?
            <Check className="w-3 h-3" /> :

            step.number
            }
            </div>
            






          </div>
          {idx < STEPS.length - 1 &&
        <div
          className={`flex-1 h-px mx-2 transition-colors ${
          currentStep > step.number ? "bg-emerald-300" : "bg-gray-200"}`
          } />

        }
        </React.Fragment>
      )}
    </div>);

}