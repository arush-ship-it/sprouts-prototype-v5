import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  FileText, 
  Pencil, 
  ChevronRight, 
  Plus, 
  Bot, 
  CheckCircle,
  Users,
  Mail,
  Calendar,
  FileCheck,
  MessageSquare,
  PlayCircle
} from "lucide-react";

const templates = [
  { id: 1, name: "Tech Hiring Pipeline", stages: ["Application Review", "Technical Assessment", "Interview", "Offer"] },
  { id: 2, name: "Sales Hiring Pipeline", stages: ["Application Review", "Phone Screen", "Case Study", "Final Interview", "Offer"] },
  { id: 3, name: "Design Hiring Pipeline", stages: ["Portfolio Review", "Design Challenge", "Interview", "Offer"] },
];

const operationsAgents = [
  { id: "email", name: "Email Agent", icon: Mail, description: "Sends automated emails to candidates" },
  { id: "schedule", name: "Scheduling Agent", icon: Calendar, description: "Schedules interviews automatically" },
  { id: "screening", name: "Initial Screening", icon: Users, description: "Conducts initial candidate screening" },
  { id: "notify", name: "Notification Agent", icon: MessageSquare, description: "Sends status updates" },
];

const evaluationAgents = [
  { id: "resume", name: "Resume Analyzer", icon: FileCheck, description: "Analyzes resumes for fit" },
  { id: "skill", name: "Skills Evaluator", icon: CheckCircle, description: "Evaluates technical skills" },
  { id: "culture", name: "Culture Fit Analyzer", icon: Users, description: "Assesses culture alignment" },
  { id: "video", name: "Video Interview AI", icon: PlayCircle, description: "Analyzes video interviews" },
];

export default function PipelineBuilderModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [configMethod, setConfigMethod] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [pipelineStages, setPipelineStages] = useState([
    "Application Review",
    "Technical Assessment", 
    "Interview",
    "Final Round",
    "Offer"
  ]);
  const [stageAgents, setStageAgents] = useState({});

  const handleConfigMethodSelect = (method) => {
    setConfigMethod(method);
    if (method === "ai") {
      // Simulate AI configuration
      setTimeout(() => setStep(2), 1000);
    } else if (method === "template") {
      // User will select template
    } else {
      // Create from scratch
      setStep(2);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setPipelineStages(template.stages);
    setStep(2);
  };

  const toggleAgent = (stageName, agentId, agentType) => {
    setStageAgents(prev => {
      const stageKey = stageName;
      const currentAgents = prev[stageKey] || [];
      const agentExists = currentAgents.some(a => a.id === agentId);
      
      if (agentExists) {
        return {
          ...prev,
          [stageKey]: currentAgents.filter(a => a.id !== agentId)
        };
      } else {
        return {
          ...prev,
          [stageKey]: [...currentAgents, { id: agentId, type: agentType }]
        };
      }
    });
  };

  const isAgentInStage = (stageName, agentId) => {
    return (stageAgents[stageName] || []).some(a => a.id === agentId);
  };

  const handleComplete = () => {
    // Save pipeline configuration
    onClose();
    setStep(1);
    setConfigMethod(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[153vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Build Your Pipeline</DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-indigo-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
              step >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              1
            </div>
            <span className="text-[13px] font-medium">Configure</span>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 2 ? "bg-indigo-600" : "bg-gray-200"}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-indigo-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
              step >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              2
            </div>
            <span className="text-[13px] font-medium">Choose Agents</span>
          </div>
        </div>

        {/* Step 1: Configure Pipeline */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-4">How would you like to configure your pipeline?</h3>
              <div className="grid grid-cols-3 gap-4">
                {/* AI Configuration */}
                <button
                  onClick={() => handleConfigMethodSelect("ai")}
                  className={`p-6 rounded-xl border-2 transition-all text-left hover:border-indigo-300 hover:shadow-md ${
                    configMethod === "ai" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-[14px] font-semibold text-gray-900 mb-2">Configure with AI</h4>
                  <p className="text-[12px] text-gray-500">Let AI analyze your job and create the perfect pipeline</p>
                </button>

                {/* Use Template */}
                <button
                  onClick={() => handleConfigMethodSelect("template")}
                  className={`p-6 rounded-xl border-2 transition-all text-left hover:border-indigo-300 hover:shadow-md ${
                    configMethod === "template" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-gray-700" />
                  </div>
                  <h4 className="text-[14px] font-semibold text-gray-900 mb-2">Use Template</h4>
                  <p className="text-[12px] text-gray-500">Choose from pre-built pipeline templates</p>
                </button>

                {/* Create from Scratch */}
                <button
                  onClick={() => handleConfigMethodSelect("scratch")}
                  className={`p-6 rounded-xl border-2 transition-all text-left hover:border-indigo-300 hover:shadow-md ${
                    configMethod === "scratch" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                    <Pencil className="w-6 h-6 text-gray-700" />
                  </div>
                  <h4 className="text-[14px] font-semibold text-gray-900 mb-2">Create from Scratch</h4>
                  <p className="text-[12px] text-gray-500">Build your pipeline step by step</p>
                </button>
              </div>
            </div>

            {/* Template Selection */}
            {configMethod === "template" && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-[14px] font-semibold text-gray-900 mb-3">Choose a Template</h4>
                <div className="space-y-2">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="w-full p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-[13px] font-semibold text-gray-900">{template.name}</h5>
                          <div className="flex items-center gap-2 mt-2">
                            {template.stages.map((stage, idx) => (
                              <React.Fragment key={stage}>
                                <span className="text-[11px] text-gray-500">{stage}</span>
                                {idx < template.stages.length - 1 && (
                                  <ChevronRight className="w-3 h-3 text-gray-400" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Choose Agents */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2">Choose Agents for Your Pipeline</h3>
              <p className="text-[12px] text-gray-500">Drag and drop agents into pipeline stages to automate your hiring process</p>
            </div>

            <div className="grid grid-cols-[280px_1fr] gap-6">
              {/* Agent Library */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[13px] font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    Operations Agents
                  </h4>
                  <div className="space-y-2">
                    {operationsAgents.map(agent => (
                      <div
                        key={agent.id}
                        className="p-3 rounded-lg border border-gray-200 bg-white hover:border-indigo-300 transition-all cursor-move"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <agent.icon className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="text-[12px] font-semibold text-gray-900">{agent.name}</span>
                        </div>
                        <p className="text-[10px] text-gray-500">{agent.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[13px] font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Evaluation Agents
                  </h4>
                  <div className="space-y-2">
                    {evaluationAgents.map(agent => (
                      <div
                        key={agent.id}
                        className="p-3 rounded-lg border border-gray-200 bg-white hover:border-emerald-300 transition-all cursor-move"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <agent.icon className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[12px] font-semibold text-gray-900">{agent.name}</span>
                        </div>
                        <p className="text-[10px] text-gray-500">{agent.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pipeline Visualization */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
                <h4 className="text-[13px] font-semibold text-gray-900 mb-4">Pipeline Stages</h4>
                <div className="space-y-3">
                  {pipelineStages.map((stage, idx) => (
                    <div key={stage} className="relative">
                      <div className="p-4 rounded-lg bg-white border-2 border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[11px] font-bold text-indigo-600">
                              {idx + 1}
                            </div>
                            <span className="text-[13px] font-semibold text-gray-900">{stage}</span>
                          </div>
                          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Assigned Agents */}
                        <div className="flex flex-wrap gap-2">
                          {/* Operations Agents */}
                          {operationsAgents.map(agent => (
                            <button
                              key={agent.id}
                              onClick={() => toggleAgent(stage, agent.id, "operations")}
                              className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                                isAgentInStage(stage, agent.id)
                                  ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                                  : "bg-gray-100 text-gray-400 border border-transparent hover:border-indigo-200"
                              }`}
                            >
                              {agent.name}
                            </button>
                          ))}
                          {/* Evaluation Agents */}
                          {evaluationAgents.map(agent => (
                            <button
                              key={agent.id}
                              onClick={() => toggleAgent(stage, agent.id, "evaluation")}
                              className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                                isAgentInStage(stage, agent.id)
                                  ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                  : "bg-gray-100 text-gray-400 border border-transparent hover:border-emerald-200"
                              }`}
                            >
                              {agent.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      {idx < pipelineStages.length - 1 && (
                        <div className="flex justify-center my-2">
                          <div className="w-0.5 h-3 bg-gray-300" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleComplete}>
                Complete Pipeline
              </Button>
            </div>
          </div>
        )}

        {/* Step 1 Actions */}
        {step === 1 && configMethod && configMethod !== "template" && (
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setConfigMethod(null)}>
              Back
            </Button>
            <Button onClick={() => setStep(2)}>
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}