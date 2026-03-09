import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Send, Sparkles, MapPin, Briefcase, GraduationCap, Star, Maximize2, Minimize2, Bell, Settings, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabSwitcher from "@/components/shared/TabSwitcher";
import AITalentFinderPanel from "@/components/console/AITalentFinderPanel";

const candidates = [
{
  id: 1,
  name: "Emma Rodriguez",
  title: "Senior Full Stack Developer",
  location: "Austin, TX",
  experience: "8 years",
  skills: ["React", "Node.js", "Python", "AWS"],
  education: "MS Computer Science - MIT",
  availability: "Available",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
},
{
  id: 2,
  name: "David Chen",
  title: "Product Designer",
  location: "San Francisco, CA",
  experience: "6 years",
  skills: ["Figma", "UI/UX", "Design Systems", "User Research"],
  education: "BFA Design - Stanford",
  availability: "2 weeks notice",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
},
{
  id: 3,
  name: "Sophia Martinez",
  title: "Marketing Manager",
  location: "New York, NY",
  experience: "7 years",
  skills: ["Content Strategy", "SEO", "Analytics", "Brand Management"],
  education: "MBA Marketing - Columbia",
  availability: "Available",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
},
{
  id: 4,
  name: "Michael Anderson",
  title: "Data Scientist",
  location: "Seattle, WA",
  experience: "5 years",
  skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
  education: "PhD Data Science - UC Berkeley",
  availability: "Available",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
},
{
  id: 5,
  name: "Olivia Williams",
  title: "DevOps Engineer",
  location: "Boston, MA",
  experience: "4 years",
  skills: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
  education: "BS Computer Engineering - MIT",
  availability: "1 month notice",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
},
{
  id: 6,
  name: "James Wilson",
  title: "Backend Engineer",
  location: "Portland, OR",
  experience: "6 years",
  skills: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
  education: "BS Software Engineering - Carnegie Mellon",
  availability: "Available",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
},
{
  id: 7,
  name: "Isabella Garcia",
  title: "UX Researcher",
  location: "Chicago, IL",
  experience: "5 years",
  skills: ["User Testing", "Analytics", "Wireframing", "A/B Testing"],
  education: "MA Human-Computer Interaction - Northwestern",
  availability: "2 weeks notice",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
},
{
  id: 8,
  name: "Ethan Brown",
  title: "Mobile Developer",
  location: "Denver, CO",
  experience: "7 years",
  skills: ["React Native", "Swift", "Kotlin", "Firebase"],
  education: "BS Computer Science - University of Colorado",
  availability: "Available",
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
},
{
  id: 9,
  name: "Ava Thompson",
  title: "Data Analyst",
  location: "Atlanta, GA",
  experience: "4 years",
  skills: ["Tableau", "Python", "SQL", "Excel"],
  education: "MS Data Science - Georgia Tech",
  availability: "1 month notice",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
},
{
  id: 10,
  name: "Noah Davis",
  title: "Cloud Architect",
  location: "Miami, FL",
  experience: "9 years",
  skills: ["AWS", "Azure", "GCP", "Microservices"],
  education: "MS Cloud Computing - Stanford",
  availability: "Available",
  avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face"
},
{
  id: 11,
  name: "Mia Johnson",
  title: "Content Strategist",
  location: "Los Angeles, CA",
  experience: "5 years",
  skills: ["Copywriting", "SEO", "Content Marketing", "Social Media"],
  education: "BA Communications - UCLA",
  availability: "2 weeks notice",
  avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
},
{
  id: 12,
  name: "Liam Martinez",
  title: "Security Engineer",
  location: "Washington, DC",
  experience: "6 years",
  skills: ["Penetration Testing", "Cryptography", "Security Auditing", "Python"],
  education: "MS Cybersecurity - Johns Hopkins",
  availability: "Available",
  avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face"
},
{
  id: 13,
  name: "Charlotte Lee",
  title: "AI/ML Engineer",
  location: "San Jose, CA",
  experience: "5 years",
  skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"],
  education: "PhD Machine Learning - Stanford",
  availability: "1 month notice",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
},
{
  id: 14,
  name: "Benjamin Taylor",
  title: "Frontend Architect",
  location: "Philadelphia, PA",
  experience: "8 years",
  skills: ["Vue.js", "TypeScript", "GraphQL", "Webpack"],
  education: "BS Computer Science - Penn State",
  availability: "Available",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
},
{
  id: 15,
  name: "Amelia White",
  title: "Scrum Master",
  location: "Phoenix, AZ",
  experience: "6 years",
  skills: ["Agile", "Jira", "Scrum", "Team Leadership"],
  education: "MBA - Arizona State University",
  availability: "2 weeks notice",
  avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face"
}];


function CandidatePoolCard({ candidate }) {
  return (
    <div className="p-5 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[15px] font-semibold text-gray-900 truncate">
              {candidate.name}
            </h3>
            <Star className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-400 transition-colors cursor-pointer" />
          </div>
          <p className="text-[13px] text-gray-600 mb-1">{candidate.title}</p>
          <div className="flex items-center gap-3 text-[12px] text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {candidate.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {candidate.experience}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-2 text-[12px] text-gray-500">
          <GraduationCap className="w-3.5 h-3.5" />
          {candidate.education}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {candidate.skills.slice(0, 4).map((skill, idx) =>
        <span
          key={idx}
          className="px-2 py-1 text-[11px] font-medium rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">

            {skill}
          </span>
        )}
        {candidate.skills.length > 4 &&
        <span className="px-2 py-1 text-[11px] font-medium rounded-md bg-gray-50 text-gray-500">
            +{candidate.skills.length - 4}
          </span>
        }
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span
          className={`text-[11px] font-semibold ${
          candidate.availability === "Available" ?
          "text-emerald-600" :
          "text-amber-600"}`
          }>

          {candidate.availability}
        </span>
        <Button size="sm" variant="outline" className="h-7 text-[11px]">
          View Profile
        </Button>
      </div>
    </div>);

}

export default function TalentPool() {
  const [messages, setMessages] = useState([
  {
    role: "assistant",
    content:
    "Hi! I'm here to help you find the perfect candidates. What type of talent are you looking for?"
  }]
  );
  const [input, setInput] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [sourcedCandidates, setSourcedCandidates] = useState([]);
  const [selectedSourced, setSelectedSourced] = useState(new Set());

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Simulate AI response with sourced candidates
    setTimeout(() => {
      setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
        "I've found 5 candidates matching your criteria. Review them below and add the ones you want to your prospects!"
      }]
      );
      // Simulate sourcing candidates
      const sampled = candidates.sort(() => Math.random() - 0.5).slice(0, 5);
      setSourcedCandidates(sampled);
      setSelectedSourced(new Set());
    }, 500);
  };

  const toggleSourcedCandidate = (id) => {
    const updated = new Set(selectedSourced);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedSourced(updated);
  };

  const handleApplyAll = () => {
    setSelectedSourced(new Set(sourcedCandidates.map(c => c.id)));
  };

  const handleAddAsProspect = () => {
    if (selectedSourced.size > 0) {
      alert(`Added ${selectedSourced.size} candidate(s) to prospects!`);
      setSourcedCandidates([]);
      setSelectedSourced(new Set());
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] bg-[#FAFAFA] overflow-hidden">
      {/* Top Navigation */}
      
















      
      <div className="bg-[#f2f3f5] flex flex-1 overflow-hidden">
      {/* Left Panel - AI Talent Finder */}
      <AITalentFinderPanel />

      {/* Right Panel - Candidate List */}
      <div className="flex-1 overflow-y-auto h-full">
        <div className="pt-4 pr-8 pb-4 pl-2">
          <div className="mb-6">
            <div className="mb-1 flex items-center gap-2">
              <Link to={createPageUrl("Home")}>
                
              </Link>
              <h1 className="text-gray-900 text-lg font-semibold">Talent Pool

                </h1>
            </div>
            <p className="text-gray-500 pr-1 pl-2 text-sm">
              {candidates.length} candidates found
            </p>
          </div>

          {/* Sourced Candidates Section */}
          {sourcedCandidates.length > 0 && (
            <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[16px] font-semibold text-gray-900">Sourced Candidates</h2>
                <Button 
                  onClick={handleApplyAll}
                  variant="outline"
                  size="sm"
                  className="text-[12px]">
                  + Apply All Prospects
                </Button>
              </div>

              {/* Match indicator */}
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[13px] text-emerald-700 font-medium">Sourcing match : {sourcedCandidates.length}00</p>
              </div>

              {/* Candidate cards */}
              <div className="space-y-4">
                {sourcedCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-all">
                    <div className="flex items-start gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={selectedSourced.has(candidate.id)}
                        onChange={() => toggleSourcedCandidate(candidate.id)}
                        className="w-4 h-4 mt-1 accent-indigo-600 cursor-pointer" />
                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[14px] font-semibold text-gray-900">{candidate.name}</h3>
                          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Strong 78%</span>
                        </div>
                        <p className="text-[12px] text-gray-600">{candidate.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <span className="text-[13px]">🔗</span>
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <span className="text-[13px]">📧</span>
                        </button>
                      </div>
                    </div>

                    {/* Info row */}
                    <div className="ml-7 mb-3 space-y-1">
                      <p className="text-[12px] text-gray-600">
                        {candidate.education} @ {candidate.location}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        <span className="font-medium">Experience:</span> {candidate.experience} | <span className="font-medium">Skills:</span> {candidate.skills.length} match | <span className="font-medium">Attributes:</span> 5/6 match
                      </p>
                      <p className="text-[12px] text-blue-600">
                        Sequence: Warm Outreach, Active
                      </p>
                    </div>

                    {/* Add as prospect button */}
                    <div className="ml-7 flex justify-end">
                      <button
                        onClick={() => {
                          toggleSourcedCandidate(candidate.id);
                        }}
                        className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                          selectedSourced.has(candidate.id)
                            ? "bg-indigo-50 border border-indigo-300 text-indigo-700"
                            : "border border-gray-300 text-gray-700 hover:border-indigo-300"
                        }`}>
                        {selectedSourced.has(candidate.id) ? "✓ Selected" : "Add As Prospect"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              {selectedSourced.size > 0 && (
                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSourced(new Set())}
                    className="text-[12px]">
                    Clear Selection
                  </Button>
                  <Button
                    onClick={handleAddAsProspect}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-[12px]">
                    Add {selectedSourced.size} to Prospects
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {candidates.map((candidate) =>
              <CandidatePoolCard key={candidate.id} candidate={candidate} />
              )}
          </div>
        </div>
      </div>
      </div>
    </div>);

}