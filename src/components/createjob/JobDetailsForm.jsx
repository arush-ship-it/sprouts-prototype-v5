import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Users, Building2, Tag, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const WORKPLACE_TYPES = ["On-site", "Remote", "Hybrid"];
const BENEFITS_OPTIONS = ["Health Insurance", "401k", "Flexible Hours", "Stock Options", "Remote Work", "Gym Membership", "Learning Budget", "Unlimited PTO"];

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-indigo-600" />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-gray-900">{title}</p>
        {subtitle && <p className="text-[11px] text-gray-400">{subtitle}</p>}
      </div>
    </div>);

}

function ChipToggle({ options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) =>
      <button
        key={opt}
        type="button"
        onClick={() => onToggle(opt)}
        className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-150 ${
        selected.includes(opt) ?
        "bg-indigo-600 text-white border-indigo-600" :
        "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"}`
        }>

          {opt}
        </button>
      )}
    </div>);

}

function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="bg-gray-100 p-1 rounded-xl inline-flex gap-1">
      {options.map((opt) =>
      <button
        key={opt}
        type="button"
        onClick={() => onChange(opt)}
        className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 ${
        value === opt ?
        "bg-white text-gray-900 shadow-sm" :
        "text-gray-500 hover:text-gray-700"}`
        }>

          {opt}
        </button>
      )}
    </div>);

}

function StepControl({ value, onChange, min = 1, max = 50 }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">

        <ChevronDown className="w-4 h-4" />
      </button>
      <span className="text-[15px] font-semibold text-gray-900 w-6 text-center">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors">

        <ChevronUp className="w-4 h-4" />
      </button>
    </div>);

}

export default function JobDetailsForm({ jobDetails, setJobDetails, onContinue }) {
  const [screeningQuestions, setScreeningQuestions] = useState([""]);

  const selectedBenefits = jobDetails.benefits ? jobDetails.benefits.split(",").filter(Boolean) : [];

  const toggleBenefit = (b) => {
    const current = selectedBenefits;
    const updated = current.includes(b) ? current.filter((x) => x !== b) : [...current, b];
    setJobDetails({ ...jobDetails, benefits: updated.join(",") });
  };

  const addQuestion = () => setScreeningQuestions([...screeningQuestions, ""]);
  const removeQuestion = (i) => setScreeningQuestions(screeningQuestions.filter((_, idx) => idx !== i));
  const updateQuestion = (i, val) => {
    const updated = [...screeningQuestions];
    updated[i] = val;
    setScreeningQuestions(updated);
    setJobDetails({ ...jobDetails, screeningQuestions: updated.join("||") });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">
        <h2 className="text-[16px] font-semibold text-gray-900">Job Details</h2>
        <p className="text-[12px] text-gray-400 mt-0.5">Fill in the details to get started</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

        {/* Section 1: Basic Info */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <SectionHeader icon={Briefcase} title="Role Information" subtitle="Core job details" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Company Name</Label>
              <Input
                value={jobDetails.companyName}
                onChange={(e) => setJobDetails({ ...jobDetails, companyName: e.target.value })}
                placeholder="e.g. Acme Corp"
                className="h-9 text-[13px] bg-white" />

            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Job Title <span className="text-red-500">*</span></Label>
              <Input
                value={jobDetails.jobTitle}
                onChange={(e) => setJobDetails({ ...jobDetails, jobTitle: e.target.value })}
                placeholder="e.g. Senior Designer"
                className="h-9 text-[13px] bg-white" />

            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Department</Label>
              <Input
                value={jobDetails.department}
                onChange={(e) => setJobDetails({ ...jobDetails, department: e.target.value })}
                placeholder="e.g. Engineering"
                className="h-9 text-[13px] bg-white" />

            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Internal Job Title</Label>
              <Input
                value={jobDetails.internalJobTitle}
                onChange={(e) => setJobDetails({ ...jobDetails, internalJobTitle: e.target.value })}
                placeholder="Internal reference"
                className="h-9 text-[13px] bg-white" />

            </div>
          </div>
        </div>

        {/* Section 2: Type & Location */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <SectionHeader icon={MapPin} title="Work Arrangement" subtitle="Type and location" />
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Job Type</Label>
              <SegmentedControl
                options={JOB_TYPES}
                value={jobDetails.jobType}
                onChange={(val) => setJobDetails({ ...jobDetails, jobType: val })} />

            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Workplace</Label>
              <SegmentedControl
                options={WORKPLACE_TYPES}
                value={jobDetails.workplaceType}
                onChange={(val) => setJobDetails({ ...jobDetails, workplaceType: val })} />

            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Location</Label>
              <Input
                value={jobDetails.location}
                onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
                placeholder="e.g. San Francisco, CA"
                className="h-9 text-[13px] bg-white" />

            </div>
          </div>
        </div>

        {/* Section 3: Compensation & Headcount */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <SectionHeader icon={DollarSign} title="Compensation & Scale" subtitle="Salary and headcount" />
          <div className="grid grid-cols-2 gap-4 items-end">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Salary Range</Label>
              <Input
                value={jobDetails.salary}
                onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })}
                placeholder="e.g. $120k – $180k"
                className="h-9 text-[13px] bg-white" />

            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Job Grade</Label>
              <Input
                value={jobDetails.jobGrade}
                onChange={(e) => setJobDetails({ ...jobDetails, jobGrade: e.target.value })}
                placeholder="e.g. L4, Senior"
                className="h-9 text-[13px] bg-white" />

            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-medium text-gray-600">Headcount</Label>
              <StepControl
                value={parseInt(jobDetails.headcount) || 1}
                onChange={(val) => setJobDetails({ ...jobDetails, headcount: String(val) })} />

            </div>
          </div>
        </div>

        {/* Section 4: Benefits */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <SectionHeader icon={Tag} title="Benefits & Perks" subtitle="Select what you offer" />
          <ChipToggle options={BENEFITS_OPTIONS} selected={selectedBenefits} onToggle={toggleBenefit} />
        </div>

        {/* Section 5: Screening Questions */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <SectionHeader icon={Users} title="Screening Questions" subtitle="Optional questions for candidates" />
          <div className="space-y-2">
            {screeningQuestions.map((q, i) =>
            <div key={i} className="flex gap-2 items-center">
                <Input
                value={q}
                onChange={(e) => updateQuestion(i, e.target.value)}
                placeholder={`Question ${i + 1}`}
                className="h-9 text-[13px] bg-white" />

                {screeningQuestions.length > 1 &&
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0">

                    <X className="w-4 h-4" />
                  </button>
              }
              </div>
            )}
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-1.5 text-[12px] text-indigo-600 hover:text-indigo-700 font-medium mt-1 transition-colors">

              <Plus className="w-3.5 h-3.5" />
              Add question
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-end">
        <Button onClick={onContinue} className="bg-blue-600 text-slate-50 px-5 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 hover:bg-indigo-700">
          Continue to AI Generation
        </Button>
      </div>
    </div>);

}