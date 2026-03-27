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
    <div className="bg-[#f2f3f5] pl-3 flex-1 min-h-screen overflow-auto">
        <JobHeader onActivityApprovalClick={() => setIsActivityApprovalOpen(true)} />
        <SubTabs
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onCreateNew={() => setShowSandboxBuilder(true)} />

        
        {/* Sandbox Builder - full screen when active */}
        {showSandboxBuilder ?
      <PipelineSandboxBuilder onClose={() => setShowSandboxBuilder(false)} /> :

      <>
            {/* Pipeline Builder Button - Only show in Pipeline tab */}
            















        

            {activeTab === "pipeline" && showRecommendedPipeline ?
        <RecommendedPipeline
          onClose={() => setShowRecommendedPipeline(false)}
          onUsePipeline={() => {
            setShowRecommendedPipeline(false);
          }} /> :

        activeTab === "review" ?
        <CandidateList activeTab={activeTab} viewMode={viewMode} /> :
        viewMode === "pipeline" ?
        <PipelineView /> :

        <CandidateList activeTab={activeTab} viewMode={viewMode} />
        }
          </>
      }

        <PipelineBuilderModal
        isOpen={isPipelineBuilderOpen}
        onClose={() => setIsPipelineBuilderOpen(false)} />

        <ActivityApprovalModal
        isOpen={isActivityApprovalOpen}
        onClose={() => setIsActivityApprovalOpen(false)} />

    </div>);

}