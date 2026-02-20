import React, { useState } from "react";
import { Sparkles, FileText, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const templates = [
  {
    id: 1,
    name: "Standard Hiring Pipeline",
    stages: ["Applied", "Screening", "Assessment", "Interview", "Offer"],
    description: "A classic recruitment pipeline for most positions",
  },
  {
    id: 2,
    name: "Technical Hiring",
    stages: ["Applied", "Screening", "Technical Test", "Technical Interview", "Final Round", "Offer"],
    description: "Optimized for engineering and technical roles",
  },
  {
    id: 3,
    name: "Executive Hiring",
    stages: ["Sourced", "Initial Contact", "Screening", "Panel Interview", "Executive Review", "Offer"],
    description: "For senior leadership and executive positions",
  },
];

export default function CreatePipeline() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [stages, setStages] = useState([{ name: "Applied" }, { name: "Interview" }, { name: "Offer" }]);
  const [newStageName, setNewStageName] = useState("");

  const handleAICreate = () => {
    setSelectedMethod("ai");
  };

  const handleTemplateSelect = (template) => {
    setStages(template.stages.map(name => ({ name })));
    setSelectedMethod(null);
  };

  const handleManualCreate = () => {
    setSelectedMethod("manual");
  };

  const addStage = () => {
    if (newStageName.trim()) {
      setStages([...stages, { name: newStageName }]);
      setNewStageName("");
    }
  };

  const removeStage = (index) => {
    setStages(stages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
      <div className="max-w-5xl mx-auto px-8 pt-12 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-[32px] font-bold text-gray-900 mb-3">
            Create Your Pipeline
          </h1>
          <p className="text-[15px] text-gray-500">
            Choose how you'd like to set up your recruitment pipeline
          </p>
        </div>

        {/* Three Options */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* AI Prompt */}
          <button
            onClick={handleAICreate}
            className="group p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
              Create with AI
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              Describe your ideal pipeline and let AI build it for you
            </p>
            <span className="inline-flex items-center text-[13px] font-medium text-indigo-600 group-hover:gap-2 transition-all">
              Get Started <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
            </span>
          </button>

          {/* Templates */}
          <button
            onClick={() => setSelectedMethod("template")}
            className="group p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
              Use a Template
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              Start with a proven pipeline template and customize it
            </p>
            <span className="inline-flex items-center text-[13px] font-medium text-emerald-600 group-hover:gap-2 transition-all">
              Browse Templates <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
            </span>
          </button>

          {/* Manual */}
          <button
            onClick={handleManualCreate}
            className="group p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-[18px] font-semibold text-gray-900 mb-2">
              Build Manually
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              Create a custom pipeline from scratch with full control
            </p>
            <span className="inline-flex items-center text-[13px] font-medium text-amber-600 group-hover:gap-2 transition-all">
              Start Building <ArrowRight className="w-4 h-4 ml-1 group-hover:ml-0" />
            </span>
          </button>
        </div>

        {/* AI Dialog */}
        <Dialog open={selectedMethod === "ai"} onOpenChange={(open) => !open && setSelectedMethod(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Pipeline with AI</DialogTitle>
            </DialogHeader>
            <div className="pt-4 space-y-4">
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-2 block">
                  Describe your ideal pipeline
                </label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., I need a pipeline for hiring software engineers with technical assessments and multiple interview rounds..."
                  className="min-h-[120px] text-[13px]"
                />
              </div>
              <Button className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Pipeline
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Template Dialog */}
        <Dialog open={selectedMethod === "template"} onOpenChange={(open) => !open && setSelectedMethod(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Choose a Template</DialogTitle>
            </DialogHeader>
            <div className="pt-4 space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="p-5 rounded-xl border-2 border-gray-200 hover:border-emerald-400 hover:shadow-sm transition-all cursor-pointer"
                >
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-[12px] text-gray-500 mb-3">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {template.stages.map((stage, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Manual Builder Dialog */}
        <Dialog open={selectedMethod === "manual"} onOpenChange={(open) => !open && setSelectedMethod(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Build Your Pipeline</DialogTitle>
            </DialogHeader>
            <div className="pt-4 space-y-4">
              <div>
                <label className="text-[13px] font-medium text-gray-700 mb-2 block">
                  Pipeline Stages
                </label>
                <div className="space-y-2 mb-3">
                  {stages.map((stage, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-gray-400">
                          {idx + 1}
                        </span>
                        <span className="text-[13px] font-medium text-gray-900">
                          {stage.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removeStage(idx)}
                        className="text-[11px] text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newStageName}
                    onChange={(e) => setNewStageName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addStage()}
                    placeholder="Enter stage name..."
                    className="text-[13px]"
                  />
                  <Button onClick={addStage} variant="outline">
                    Add Stage
                  </Button>
                </div>
              </div>
              <Button className="w-full">Create Pipeline</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Preview if stages exist */}
        {stages.length > 0 && selectedMethod === null && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-[18px] font-semibold text-gray-900 mb-6">
              Pipeline Preview
            </h2>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {stages.map((stage, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center min-w-[140px]">
                    <div className="w-full px-4 py-3 rounded-xl bg-indigo-50 border-2 border-indigo-200 text-center">
                      <p className="text-[13px] font-semibold text-indigo-900">
                        {stage.name}
                      </p>
                    </div>
                  </div>
                  {idx < stages.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-300 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1">Save Pipeline</Button>
              <Button variant="outline" className="flex-1">
                Edit Stages
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}