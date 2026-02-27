import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bot, X, Sparkles } from "lucide-react";

const recommendedPipeline = [
{
  id: 1,
  stageNumber: 1,
  stageName: "Review",
  stageDescription: "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria.",
  agent: {
    name: "Automated Assessment",
    icon: Bot,
    description: "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation."
  }
},
{
  id: 2,
  stageNumber: 2,
  stageName: "Screening",
  stageDescription: "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria.",
  agent: {
    name: "AI Interview Agent",
    icon: Bot,
    description: "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation."
  }
},
{
  id: 3,
  stageNumber: 3,
  stageName: "Assessment",
  stageDescription: "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria.",
  agent: {
    name: "Smart Assessment Management",
    icon: Bot,
    description: "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation."
  }
},
{
  id: 4,
  stageNumber: 4,
  stageName: "Interview",
  stageDescription: "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria.",
  agent: {
    name: "Smart Interview Management",
    icon: Bot,
    description: "Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation. Analyses Inputs Against Defined Criteria. Filters Noise And Highlights High-Signal Candidates. Surfaces Structured Insights For Evaluation."
  }
}];


export default function RecommendedPipeline({ onClose, onUsePipeline }) {
  const [intelligenceEnabled, setIntelligenceEnabled] = useState(
    () => Object.fromEntries(recommendedPipeline.map((s) => [s.id, true]))
  );

  return (
    <div className="px-8 pb-8">
      <div className="bg-[#fafafa] py-4 rounded-2xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-gray-900 text-lg font-semibold">Recommended Pipeline

            </h2>
            
          </div>
          


        </div>

        {/* Pipeline Stages */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {recommendedPipeline.map((stage) => {
            const AgentIcon = stage.agent.icon;

            return (
              <div key={stage.id} className="bg-[#ffffff] px-2 py-2 rounded-2xl flex flex-col">
                {/* Stage Card */}
                <div className="bg-white rounded-xl p-5 mb-4 flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        STAGE {stage.stageNumber}
                      </p>
                      <h3 className="text-gray-900 text-sm font-semibold">
                        {stage.stageName}
                      </h3>
                    </div>
                    
                  </div>
                  
                  <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4">
                    {stage.stageDescription}
                  </p>
                </div>

                {/* Agent Card */}
                <div className="bg-blue-50 mb-3 p-5 rounded-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <AgentIcon className={`w-5 h-5 ${intelligenceEnabled[stage.id] ? "text-blue-600" : "text-gray-400"}`} />
                    </div>
                    <h4 className="text-blue-600 text-sm font-semibold flex-1">
                      {stage.agent.name}
                    </h4>
                  </div>
                  
                  <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-5">
                    {stage.agent.description}
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-blue-100 justify-end">
                    <span className="text-[10px] text-gray-400 font-medium">Intelligence Layer</span>
                    <Switch
                      checked={intelligenceEnabled[stage.id]}
                      onCheckedChange={(val) => setIntelligenceEnabled((prev) => ({ ...prev, [stage.id]: val }))}
                      className="scale-75" />

                  </div>
                </div>

                {/* Remove Button */}
                <button className="text-[12px] text-red-500 hover:text-red-600 font-medium flex items-center justify-center gap-1.5 py-2 transition-colors">
                  <X className="w-3.5 h-3.5" />
                  Remove Stage
                </button>
              </div>);

          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-10 px-6 text-[13px] font-semibold">

            Create New
          </Button>
          <Button
            onClick={onUsePipeline}
            className="h-10 px-6 text-[13px] font-semibold bg-blue-600 hover:bg-blue-700">

            Use Pipeline
          </Button>
        </div>
      </div>
    </div>);

}