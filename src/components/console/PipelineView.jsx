import React, { useState } from "react";
import { Users, ChevronDown, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialStages = [
  {
    id: "1",
    name: "In Review",
    agents: ["Outreach Agent", "Screening Bot", "Resume Parser"],
    candidates: [
      { id: "c1", name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", score: 91 },
      { id: "c2", name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", score: 78 },
      { id: "c3", name: "David Wilson", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face", score: 85 },
      { id: "c4", name: "Sophie Martinez", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face", score: 79 },
      { id: "c5", name: "Ryan Thompson", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face", score: 88 },
      { id: "c6", name: "Olivia Brown", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face", score: 82 },
      { id: "c7", name: "Lucas Garcia", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face", score: 90 },
      { id: "c8", name: "Isabella Lopez", avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face", score: 76 },
      { id: "c9", name: "Noah Anderson", avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&crop=face", score: 84 },
      { id: "c10", name: "Ava Taylor", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop&crop=face", score: 81 },
      { id: "c11", name: "Ethan Davis", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop&crop=face", score: 87 },
      { id: "c12", name: "Mia Robinson", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face", score: 83 },
    ],
  },
  {
    id: "2",
    name: "Assessment",
    agents: ["Assessment Engine", "Skills Evaluator"],
    candidates: [
      { id: "c13", name: "James Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", score: 82 },
    ],
  },
  {
    id: "3",
    name: "Interview",
    agents: ["Interview Scheduler", "Feedback Collector"],
    candidates: [
      { id: "c14", name: "Maya Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", score: 94 },
      { id: "c15", name: "Sarah Mitchell", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", score: 87 },
      { id: "c16", name: "Emma Collins", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face", score: 85 },
    ],
  },
  {
    id: "4",
    name: "Technical",
    agents: ["Code Challenge", "Technical Interviewer"],
    candidates: [
      { id: "c17", name: "Marcus Rivera", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", score: 89 },
    ],
  },
  {
    id: "5",
    name: "Final Round",
    agents: ["Executive Interviewer"],
    candidates: [
      { id: "c18", name: "Lena Kim", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", score: 92 },
    ],
  },
  {
    id: "6",
    name: "Offer",
    agents: ["Offer Manager"],
    candidates: [
      { id: "c19", name: "Daniel Wright", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", score: 96 },
    ],
  },
];

function CandidatePipelineCard({ candidate, provided, snapshot }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`p-3 rounded-lg bg-white border transition-all cursor-grab active:cursor-grabbing select-none ${
        snapshot.isDragging
          ? "border-blue-300 shadow-lg ring-2 ring-blue-100 rotate-1 scale-105"
          : "border-gray-200 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 truncate">{candidate.name}</p>
          <p className="text-[11px] text-gray-400">Score: {candidate.score}</p>
        </div>
      </div>
    </div>
  );
}

export default function PipelineView() {
  const [stages, setStages] = useState(initialStages);
  const [expandedStageId, setExpandedStageId] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceStageIdx = stages.findIndex((s) => s.id === source.droppableId);
    const destStageIdx = stages.findIndex((s) => s.id === destination.droppableId);

    const newStages = stages.map((s) => ({ ...s, candidates: [...s.candidates] }));
    const [movedCandidate] = newStages[sourceStageIdx].candidates.splice(source.index, 1);
    newStages[destStageIdx].candidates.splice(destination.index, 0, movedCandidate);

    setStages(newStages);
  };

  return (
    <div className="px-8 pt-5 pb-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-[280px] flex flex-col gap-3">

              {/* Stage Header */}
              <button
                onClick={() => setExpandedStageId(expandedStageId === stage.id ? null : stage.id)}
                className="w-full bg-white text-slate-600 px-4 py-2.5 rounded-xl border-2 border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-[13px] font-bold">{stage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold px-2 py-0.5 rounded-md bg-white/60">
                    {stage.candidates.length}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${expandedStageId === stage.id ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* Agents Section - Expanded */}
              {expandedStageId === stage.id && (
                <div className="bg-white rounded-xl p-3 border border-gray-100 space-y-2.5">
                  <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Agentic Layer</h4>
                  <div className="bg-[hsl(var(--background))] p-2.5 rounded-lg flex items-center gap-2.5">
                    <div className="bg-blue-50 rounded-[28px] w-8 h-8 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-800 truncate">{stage.agents[0]}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-emerald-600 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/Agents"
                    className="bg-blue-50 text-blue-600 px-3 py-2 text-xs font-medium rounded-lg flex items-center justify-between w-full hover:bg-indigo-100 transition-colors group"
                  >
                    View Agent Activity
                  </Link>
                </div>
              )}

              {/* Droppable candidates list */}
              <Droppable droppableId={stage.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex flex-col gap-2 min-h-[60px] rounded-xl p-1 transition-colors ${
                      snapshot.isDraggingOver ? "bg-blue-50/60" : ""
                    }`}
                  >
                    {stage.candidates.map((candidate, idx) => (
                      <Draggable key={candidate.id} draggableId={candidate.id} index={idx}>
                        {(provided, snapshot) => (
                          <CandidatePipelineCard
                            candidate={candidate}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {stage.candidates.length === 0 && !snapshot.isDraggingOver && (
                      <div className="text-[11px] text-gray-300 text-center py-4">Drop here</div>
                    )}
                  </div>
                )}
              </Droppable>

            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}