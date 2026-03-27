import React, { useState } from "react";
import { Edit2, Trash2, Plus, Save, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter } from
"@/components/ui/dialog";

const permissionOptions = [
{ value: "view", label: "View Only" },
{ value: "edit", label: "Edit Job Details" },
{ value: "manage_candidates", label: "Manage Candidates" },
{ value: "full_access", label: "Full Access" }];


export default function HiringTeam() {
  const [teamMembers, setTeamMembers] = useState([
  { id: 1, name: "Sarah Chen", email: "sarah.chen@company.com", permission: "full_access", stats: { screened: 48, interviews: 22, placements: 6, avgTtf: 24 } },
  { id: 2, name: "Mike Roberts", email: "mike.roberts@company.com", permission: "edit", stats: { screened: 41, interviews: 18, placements: 5, avgTtf: 27 } },
  { id: 3, name: "Jessica Taylor", email: "jessica.taylor@company.com", permission: "manage_candidates", stats: { screened: 37, interviews: 15, placements: 4, avgTtf: 31 } }]
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", permission: "view" });
  const [editingId, setEditingId] = useState(null);

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setTeamMembers([
      ...teamMembers,
      {
        id: Date.now(),
        ...newMember
      }]
      );
      setNewMember({ name: "", email: "", permission: "view" });
      setIsAddDialogOpen(false);
    }
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const handleUpdatePermission = (id, newPermission) => {
    setTeamMembers(
      teamMembers.map((member) =>
      member.id === id ? { ...member, permission: newPermission } : member
      )
    );
  };

  const getPermissionLabel = (value) => {
    return permissionOptions.find((opt) => opt.value === value)?.label || value;
  };

  return (
    <div className="bg-white p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold text-gray-900">Hiring Team</h3>
        <div className="flex gap-2">
          {isEditMode ?
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditMode(false)}
            className="h-8">
            
              <Save className="w-3.5 h-3.5 mr-1.5" />
              Done
            </Button> :

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditMode(true)}
            className="h-8">
            
              <Edit2 className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
          }
        </div>
      </div>

      <div className="space-y-3">
        {teamMembers.map((member) =>
        <div
          key={member.id}
          className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100/70 transition-colors">
          
            {/* Top row: name + permission/actions */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[13px] font-semibold text-gray-900">{member.name}</p>
                <p className="text-[11px] text-gray-500">{member.email}</p>
              </div>

              {isEditMode ?
            <div className="flex items-center gap-2">
                  <Select value={member.permission} onValueChange={(value) => handleUpdatePermission(member.id, value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {permissionOptions.map((opt) =>
                  <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                  )}
                    </SelectContent>
                  </Select>
                  <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveMember(member.id)}
                className="h-8 w-8 text-red-600 hover:bg-red-50">
                
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div> :

            <span className="text-[12px] font-medium text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                  {getPermissionLabel(member.permission)}
                </span>
            }
            </div>

            {/* Stats row */}
            {!isEditMode && member.stats &&
          <div className="grid grid-cols-4 gap-2">
                {[
            { icon: Users, label: "Screened", value: member.stats.screened, color: "text-indigo-600", bg: "bg-indigo-50" },
            { icon: CheckCircle, label: "Interviews", value: member.stats.interviews, color: "text-emerald-600", bg: "bg-emerald-50" },
            { icon: TrendingUp, label: "Placements", value: member.stats.placements, color: "text-violet-600", bg: "bg-violet-50" },
            { icon: Clock, label: "Avg TTF", value: `${member.stats.avgTtf}d`, color: "text-amber-600", bg: "bg-amber-50" }].
            map((stat) =>
            <div key={stat.label} className={`${stat.bg} rounded-lg px-3 py-2 flex flex-col gap-0.5`}>
                    <div className="flex items-center gap-1">
                      <stat.icon className={`w-3 h-3 ${stat.color}`} />
                      <span className="text-[10px] text-gray-500 font-medium">{stat.label}</span>
                    </div>
                    <p className={`text-[15px] font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
            )}
              </div>
          }
          </div>
        )}
      </div>

      {isEditMode &&
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsAddDialogOpen(true)}
        className="mt-4 w-full h-9">
        
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Team Member
        </Button>
      }

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700">Name</label>
              <Input
                placeholder="Full name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
              
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="email@company.com"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} />
              
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700">Permission Level</label>
              <Select value={newMember.permission} onValueChange={(value) => setNewMember({ ...newMember, permission: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {permissionOptions.map((opt) =>
                  <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>);

}