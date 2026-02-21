import React, { useState } from "react";
import { Users, Maximize2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const stages = [
{
  id: 1,
  name: "Screening",
  count: 18,
  color: "bg-blue-50 border-blue-200 text-blue-700",
  candidates: [
  { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", score: 91 },
  { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", score: 78 },
  { name: "David Wilson", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face", score: 85 },
  { name: "Sophie Martinez", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face", score: 79 },
  { name: "Ryan Thompson", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face", score: 88 },
  { name: "Olivia Brown", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face", score: 82 },
  { name: "Lucas Garcia", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face", score: 90 },
  { name: "Isabella Lopez", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face", score: 76 },
  { name: "Noah Anderson", avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face", score: 84 },
  { name: "Ava Taylor", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face", score: 81 },
  { name: "Ethan Davis", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face", score: 87 },
  { name: "Mia Robinson", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face", score: 83 }]

},
{
  id: 2,
  name: "Assessment",
  count: 5,
  color: "bg-violet-50 border-violet-200 text-violet-700",
  candidates: [
  { name: "James Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", score: 82 }]

},
{
  id: 3,
  name: "Interview",
  count: 4,
  color: "bg-amber-50 border-amber-200 text-amber-700",
  candidates: [
  { name: "Maya Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", score: 94 },
  { name: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", score: 87 },
  { name: "Emma Collins", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face", score: 85 }]

},
{
  id: 4,
  name: "Technical",
  count: 3,
  color: "bg-orange-50 border-orange-200 text-orange-700",
  candidates: [
  { name: "Marcus Rivera", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", score: 89 }]

},
{
  id: 5,
  name: "Final Round",
  count: 2,
  color: "bg-pink-50 border-pink-200 text-pink-700",
  candidates: [
  { name: "Lena Kim", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", score: 92 }]

},
{
  id: 6,
  name: "Offer",
  count: 1,
  color: "bg-emerald-50 border-emerald-200 text-emerald-700",
  candidates: [
  { name: "Daniel Wright", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", score: 96 }]

}];


function CandidatePipelineCard({ candidate }) {
  return (
    <div className="p-3 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition-all cursor-pointer">
      <div className="flex items-center gap-2.5 mb-2">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-9 h-9 rounded-full object-cover" />

        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 truncate">
            {candidate.name}
          </p>
          <p className="text-[11px] text-gray-400">Score: {candidate.score}</p>
        </div>
      </div>
    </div>);

}

export default function PipelineView() {
  const [expandedStageId, setExpandedStageId] = useState(null);

  return (
    <div className="px-8 pt-5 pb-8">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) =>
        <div
          key={stage.id}
          className="flex-shrink-0 w-[280px] flex flex-col gap-3">

          {/* Stage Header */}
          <div className="bg-[#ffffff] text-slate-600 px-4 py-2.5 rounded-xl border-2 border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-[13px] font-bold">{stage.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold px-2 py-0.5 rounded-md bg-white/60">
                {stage.count}
              </span>
              <button
                onClick={() => setExpandedStageId(stage.id)}
                className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Maximize2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

            {/* Candidates */}
            <div className="flex flex-col gap-2">
              {stage.candidates.slice(0, 3).map((candidate, idx) =>
            <CandidatePipelineCard key={idx} candidate={candidate} />
            )}
              {stage.candidates.length > 3 &&
              <div className="text-[11px] text-gray-500 px-3 py-2">
                +{stage.candidates.length - 3} more
              </div>
              }
            </div>
            </div>
            )}
            </div>

            {/* Expanded Stage Modal */}
            <Dialog open={expandedStageId !== null} onOpenChange={() => setExpandedStageId(null)}>
            <DialogContent className="max-w-2xl">
            {expandedStageId && stages.find(s => s.id === expandedStageId) &&
            (() => {
              const stage = stages.find(s => s.id === expandedStageId);
              return (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {stage.name} - All Candidates ({stage.candidates.length})
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto">
                    {stage.candidates.map((candidate, idx) =>
                    <CandidatePipelineCard key={idx} candidate={candidate} />
                    )}
                  </div>
                </>
              );
            })()
            }
            </DialogContent>
            </Dialog>
            </div>);

}