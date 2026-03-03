import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, X, Sparkles, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

const STAGE_TYPES = [
  {
    key: "screen",
    label: "Screen",
    description:
      "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal...",
  },
  {
    key: "assess",
    label: "Assess",
    description:
      "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal...",
  },
  {
    key: "interview",
    label: "Interview",
    description:
      "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal...",
  },
  {
    key: "interview_technical",
    label: "Interview (Technical)",
    description:
      "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal...",
  },
  {
    key: "offer",
    label: "Offer",
    description:
      "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal...",
  },
  {
    key: "background_check",
    label: "Background Check",
    description:
      "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal...",
  },
];

const STAGE_FULL_DESC =
  "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria.";

function StageTypeCard({ stage, onAdd }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3.5 cursor-pointer"
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="text-[14px] font-semibold text-gray-900">{stage.label}</span>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </div>
      {expanded && (
        <div className="px-4 pb-4">
          <p className="text-[12px] text-gray-500 leading-relaxed mb-3">{stage.description}</p>
        </div>
      )}
      {!expanded && (
        <div className="px-4 pb-3">
          <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2">{stage.description}</p>
        </div>
      )}
      <div className="px-4 pb-3 flex justify-end">
        <button
          onClick={() => onAdd(stage)}
          className="text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>
    </div>
  );
}

function SandboxStageCard({ stage, onRemove }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col">
      <h4 className="text-[14px] font-semibold text-gray-900 mb-2">{stage.label}</h4>
      <p className="text-[12px] text-gray-500 leading-relaxed flex-1">{STAGE_FULL_DESC}</p>
      {/* AI Sub-card */}
      <div className="mt-3 rounded-lg bg-indigo-50 border border-indigo-100 p-3 flex flex-col items-center text-center">
        <Sparkles className="w-4 h-4 text-indigo-500 mb-1" strokeWidth={1.5} />
        <p className="text-[12px] font-semibold text-indigo-600 mb-1">Automated Assessment</p>
        <p className="text-[11px] text-gray-500 leading-relaxed">{STAGE_FULL_DESC}</p>
      </div>
      <button
        onClick={() => onRemove(stage.instanceId)}
        className="mt-3 text-[11px] font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors self-center"
      >
        <X className="w-3 h-3" />
        Remove
      </button>
    </div>
  );
}

export default function PipelineSandboxBuilder({ onClose }) {
  const [sandboxStages, setSandboxStages] = useState([]);
  const [nextId, setNextId] = useState(1);

  const handleAdd = (stage) => {
    setSandboxStages((prev) => [...prev, { ...stage, instanceId: nextId }]);
    setNextId((id) => id + 1);
  };

  const handleRemove = (instanceId) => {
    setSandboxStages((prev) => prev.filter((s) => s.instanceId !== instanceId));
  };

  return (
    <div className="flex h-full min-h-0">
      {/* Left Panel */}
      <div className="w-[220px] flex-shrink-0 overflow-y-auto px-6 py-6">
        <h2 className="text-[16px] font-bold text-gray-900 mb-4">Pipeline Stages</h2>
        <div className="flex flex-col gap-3">
          {STAGE_TYPES.map((stage) => (
            <StageTypeCard key={stage.key} stage={stage} onAdd={handleAdd} />
          ))}
        </div>
      </div>

      {/* Right Sandbox */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="rounded-2xl border border-gray-200 bg-white min-h-[500px] p-6 h-full">
          {sandboxStages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-3">
              <Inbox className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
              <p className="text-[15px] font-semibold text-gray-700">Sandbox</p>
              <p className="text-[13px] text-gray-400">Add Pipeline Stages Here By Dropping And Dragging</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {sandboxStages.map((stage) => (
                <SandboxStageCard key={stage.instanceId} stage={stage} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {sandboxStages.length > 0 && (
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Save Pipeline
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}