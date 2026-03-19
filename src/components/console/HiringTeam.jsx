import React, { useState } from "react";
import { Edit2, Trash2, Plus, Save, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const permissionOptions = [
  { value: "view", label: "View Only" },
  { value: "edit", label: "Edit Job Details" },
  { value: "manage_candidates", label: "Manage Candidates" },
  { value: "full_access", label: "Full Access" },
];

export default function HiringTeam() {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Sarah Chen", email: "sarah.chen@company.com", permission: "full_access" },
    { id: 2, name: "Mike Roberts", email: "mike.roberts@company.com", permission: "edit" },
    { id: 3, name: "Jessica Taylor", email: "jessica.taylor@company.com", permission: "manage_candidates" },
  ]);
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
          ...newMember,
        },
      ]);
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
    <div className="p-6 rounded-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold text-gray-900">Hiring Team</h3>
        <div className="flex gap-2">
          {isEditMode ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditMode(false)}
              className="h-8"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" />
              Done
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditMode(true)}
              className="h-8"
            >
              <Edit2 className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-gray-900">{member.name}</p>
              <p className="text-[11px] text-gray-500">{member.email}</p>
            </div>

            {isEditMode ? (
              <div className="flex items-center gap-2">
                <Select value={member.permission} onValueChange={(value) => handleUpdatePermission(member.id, value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {permissionOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveMember(member.id)}
                  className="h-8 w-8 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <span className="text-[12px] font-medium text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                {getPermissionLabel(member.permission)}
              </span>
            )}
          </div>
        ))}
      </div>

      {isEditMode && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddDialogOpen(true)}
          className="mt-4 w-full h-9"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Team Member
        </Button>
      )}

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
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="email@company.com"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-medium text-gray-700">Permission Level</label>
              <Select value={newMember.permission} onValueChange={(value) => setNewMember({ ...newMember, permission: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {permissionOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
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
    </div>
  );
}