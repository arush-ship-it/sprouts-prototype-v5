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

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
        "I've found several candidates matching your criteria. Take a look at the profiles on the right!"
      }]
      );
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-[#FAFAFA]">
      {/* Top Navigation */}
      
















      
      <div className="flex flex-1 overflow-hidden">
      {/* Left Panel - AI Talent Finder */}
      <AITalentFinderPanel />

      {/* Right Panel - Candidate List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Link to={createPageUrl("Home")}>
                
              </Link>
              <h1 className="text-[24px] font-semibold text-gray-900">
                Talent Pool
              </h1>
            </div>
            <p className="text-gray-500 px-1 text-xs">
              {candidates.length} candidates found
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {candidates.map((candidate) =>
              <CandidatePoolCard key={candidate.id} candidate={candidate} />
              )}
          </div>
        </div>
      </div>
      </div>
    </div>);

}