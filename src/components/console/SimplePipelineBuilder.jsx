import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Mail,
  Calendar,
  Users,
  MessageSquare,
  FileCheck,
  CheckCircle,
  PlayCircle,
  Plus,
  X
} from "lucide-react";

const pipelineStages = [
  { id: "screening", name: "Screening", color: "bg-blue-100 text-blue-700" },
  { id: "assessment", name: "Assessment", color: "bg-purple-100 text-purple-700" },
  { id: "interview", name: "Interview", color: "bg-indigo-100 text-indigo-700" },
  { id: "final", name: "Final Round", color: "bg-violet-100 text-violet-700" },
  { id: "offer", name: "Offer", color: "bg-emerald-100 text-emerald-700" },
];

const allAgents = [
  { id: "email", name: "Email Agent", icon: Mail, type: "operations", description: "Sends automated emails" },
  { id: "schedule", name: "Scheduling Agent", icon: Calendar, type: "operations", description: "Schedules interviews" },
  { id: "screening", name: "Initial Screening", icon: Users, type: "operations", description: "Conducts screening" },
  { id: "notify", name: "Notification Agent", icon: MessageSquare, type: "operations", description: "Sends updates" },
  { id: "resume", name: "Resume Analyzer", icon: FileCheck, type: "evaluation", description: "Analyzes resumes" },
  { id: "skill", name: "Skills Evaluator", icon: CheckCircle, type: "evaluation", description: "Evaluates skills" },
  { id: "video", name: "Video Interview AI", icon: PlayCircle, type: "evaluation", description: "Analyzes videos" },
];

export default function SimplePipelineBuilder({ isOpen, onClose }) {
  const [selectedStage, setSelectedStage] = useState("screening");
  const [stageAgents, setStageAgents] = useState({});

  const toggleAgent = (agentId) => {
    setStageAgents(prev => {
      const currentAgents = prev[selectedStage] || [];
      const agentExists = currentAgents.includes(agentId);
      
      if (agentExists) {
        return {
          ...prev,
          [selectedStage]: currentAgents.filter(id => id !== agentId)
        };
      } else {
        return {
          ...prev,
          [selectedStage]: [...currentAgents, agentId]
        };
      }
    });
  };

  const isAgentSelected = (agentId) => {
    return (stageAgents[selectedStage] || []).includes(agentId);
  };

  const handleSave = () => {
    console.log("Pipeline configuration:", stageAgents);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Build Your Pipeline</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 min-h-0 gap-6">
          {/* Left: Pipeline Stages */}
          <div className="w-[280px] flex flex-col">
            <h3 className="text-[14px] font-semibold text-gray-900 mb-3">Pipeline Stages</h3>
            <div className="space-y-2 flex-1 overflow-y-auto">
              {pipelineStages.map(stage => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedStage === stage.id
                      ? "bg-indigo-100 border-2 border-indigo-500"
                      : "bg-gray-50 border-2 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-gray-900">{stage.name}</span>
                    {stageAgents[stage.id]?.length > 0 && (
                      <Badge className="text-[10px] h-5 bg-indigo-600">{stageAgents[stage.id].length}</Badge>
                    )}
                  </div>
                  {stageAgents[stage.id]?.length > 0 && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      {stageAgents[stage.id].length} agent{stageAgents[stage.id].length > 1 ? 's' : ''} assigned
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Available Agents */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="mb-3">
              <h3 className="text-[14px] font-semibold text-gray-900">
                Add Agents to <span className="text-indigo-600">{pipelineStages.find(s => s.id === selectedStage)?.name}</span>
              </h3>
              <p className="text-[12px] text-gray-500 mt-0.5">
                Select the agents you want to add to this stage
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3">
              {allAgents.map(agent => {
                const Icon = agent.icon;
                const isSelected = isAgentSelected(agent.id);
                
                return (
                  <div
                    key={agent.id}
                    onClick={() => toggleAgent(agent.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        agent.type === "operations" ? "bg-blue-100" : "bg-purple-100"
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          agent.type === "operations" ? "text-blue-600" : "text-purple-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-[13px] font-semibold text-gray-900">{agent.name}</h4>
                          <Checkbox checked={isSelected} />
                        </div>
                        <p className="text-[11px] text-gray-500">{agent.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
          <p className="text-[12px] text-gray-500">
            {Object.keys(stageAgents).reduce((sum, key) => sum + (stageAgents[key]?.length || 0), 0)} total agents configured
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
              Save Pipeline
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}