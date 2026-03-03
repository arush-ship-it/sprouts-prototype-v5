import React, { useState } from "react";
import JobHeader from "@/components/console/JobHeader";
import SubTabs from "@/components/console/SubTabs";
import CandidateList from "@/components/console/CandidateList";
import PipelineView from "@/components/console/PipelineView";
import PipelineBuilderModal from "@/components/console/PipelineBuilderModal";
import ActivityApprovalModal from "@/components/console/ActivityApprovalModal";
import RecommendedPipeline from "@/components/console/RecommendedPipeline";
import PipelineSandboxBuilder from "@/components/console/PipelineSandboxBuilder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, AlertCircle } from "lucide-react";

export default function Console() {
  const [activeTab, setActiveTab] = useState("review");
  const [viewMode, setViewMode] = useState(activeTab === "pipeline" ? "pipeline" : "card");
  const [isPipelineBuilderOpen, setIsPipelineBuilderOpen] = useState(false);
  const [isActivityApprovalOpen, setIsActivityApprovalOpen] = useState(false);
  const [showRecommendedPipeline, setShowRecommendedPipeline] = useState(false);
  const [showSandboxBuilder, setShowSandboxBuilder] = useState(false);

  // Update view mode when tab changes
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    // Set default view for each tab
    setViewMode(newTab === "pipeline" ? "pipeline" : "card");
  };

  return (
    <div className="flex-1 min-h-screen bg-[#FAFAFA] overflow-auto">
        <JobHeader onActivityApprovalClick={() => setIsActivityApprovalOpen(true)} />
        <SubTabs
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onCreateNew={() => setShowSandboxBuilder(true)} />

        
        {/* Sandbox Builder - full screen when active */}
        {showSandboxBuilder ? (
          <PipelineSandboxBuilder onClose={() => setShowSandboxBuilder(false)} />
        ) : (
          <>
            {/* Pipeline Builder Button - Only show in Pipeline tab */}
            {activeTab === "pipeline" && !showRecommendedPipeline && (
              <div className="px-6 flex items-center gap-2 justify-end">
                <Button
                  onClick={() => setShowSandboxBuilder(true)}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white h-8 px-3 font-medium rounded-md">
                  + Create New
                </Button>
                <Button
                  onClick={() => setShowRecommendedPipeline(true)}
                  size="sm"
                  className="bg-slate-100 text-slate-700 px-3 font-medium rounded-md h-8 hover:bg-slate-200">
                  <Workflow className="w-3.5 h-3.5 mr-1.5" />
                  Build Pipeline
                </Button>
              </div>
            )}

            {activeTab === "pipeline" && showRecommendedPipeline ? (
              <RecommendedPipeline
                onClose={() => setShowRecommendedPipeline(false)}
                onUsePipeline={() => {
                  setShowRecommendedPipeline(false);
                }}
              />
            ) : activeTab === "review" ? (
              <CandidateList activeTab={activeTab} viewMode={viewMode} />
            ) : viewMode === "pipeline" ? (
              <PipelineView />
            ) : (
              <CandidateList activeTab={activeTab} viewMode={viewMode} />
            )}
          </>
        )}

        <PipelineBuilderModal
        isOpen={isPipelineBuilderOpen}
        onClose={() => setIsPipelineBuilderOpen(false)} />

        <ActivityApprovalModal
        isOpen={isActivityApprovalOpen}
        onClose={() => setIsActivityApprovalOpen(false)} />

    </div>);

}