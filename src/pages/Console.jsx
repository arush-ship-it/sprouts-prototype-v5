import React, { useState, useEffect } from "react";
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

const jobDataMap = {
  "1": { name: "Senior Product Designer", candidates: 45, pipelines: 3 },
  "2": { name: "Frontend Engineer", candidates: 62, pipelines: 4 },
  "3": { name: "Product Manager", candidates: 28, pipelines: 2 },
  "4": { name: "Data Scientist", candidates: 19, pipelines: 2 },
  "5": { name: "UX Researcher", candidates: 15, pipelines: 1 },
  "6": { name: "Full Stack Developer", candidates: 73, pipelines: 5 },
  "7": { name: "Design Lead", candidates: 12, pipelines: 1 },
  "8": { name: "Backend Engineer", candidates: 54, pipelines: 3 },
  "9": { name: "DevOps Engineer", candidates: 21, pipelines: 2 },
  "10": { name: "QA Engineer", candidates: 38, pipelines: 3 }
};

export default function Console() {
  const [activeTab, setActiveTab] = useState("review");
  const [viewMode, setViewMode] = useState(activeTab === "pipeline" ? "pipeline" : "card");
  const [isPipelineBuilderOpen, setIsPipelineBuilderOpen] = useState(false);
  const [isActivityApprovalOpen, setIsActivityApprovalOpen] = useState(false);
  const [showRecommendedPipeline, setShowRecommendedPipeline] = useState(false);
  const [showSandboxBuilder, setShowSandboxBuilder] = useState(false);
  const [currentJobId, setCurrentJobId] = useState("1");
  const [currentJobData, setCurrentJobData] = useState(jobDataMap["1"]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get("jobId") || sessionStorage.getItem("selectedJobId") || "1";
    setCurrentJobId(jobId);
    setCurrentJobData(jobDataMap[jobId] || jobDataMap["1"]);
  }, []);

  // Update view mode when tab changes
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    // Set default view for each tab
    setViewMode(newTab === "pipeline" ? "pipeline" : "card");
  };

  return (
    <div className="bg-[#f2f3f5] pl-2 flex-1 min-h-screen overflow-auto">
        <JobHeader onActivityApprovalClick={() => setIsActivityApprovalOpen(true)} jobData={currentJobData} />
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