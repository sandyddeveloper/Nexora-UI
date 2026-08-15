"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  User,
  Shield,
  Key,
  Smartphone,
  MapPin,
  Building,
  Mail,
  Camera,
  CheckCircle2,
  Lock,
  Globe,
  Clock,
} from "lucide-react";

export default function ProfilePage() {
  const { user, role, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "Alex Morgan");
  const [email, setEmail] = useState(user?.email || "alex.morgan@company.com");
  const [title, setTitle] = useState(user?.title || "Product Lead");
  const [department, setDepartment] = useState(user?.department || "Growth & Innovation");
  const [location, setLocation] = useState(user?.location || "San Francisco, CA");
  const [bio, setBio] = useState(user?.bio || "Passionate about building scalable digital experiences.");
  const [twoFactor, setTwoFactor] = useState(user?.twoFactorEnabled ?? true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      title,
      department,
      location,
      bio,
      twoFactorEnabled: twoFactor,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Account & Security Profile
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your personal identity, enterprise role permissions, and authentication credentials.
          </p>
        </div>

        {isSaved && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" /> Changes Saved Successfully
          </div>
        )}
      </div>

      {/* Main Profile Form Card */}
      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your public identity and departmental affiliation</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Avatar Row */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
              <div className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={user?.name || "Avatar"}
                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-purple-500/20"
                />
                <button
                  type="button"
                  className="absolute inset-0 rounded-2xl bg-zinc-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                  title="Change avatar photo"
                >
                  <Camera className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">{user?.name}</h3>
                  <Badge variant={role === "staff" ? "amber" : "purple"}>
                    {role === "staff" ? "Staff Member" : "Standard User"}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500">{user?.email} • Joined {user?.joinedDate || "March 2024"}</p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                  <Button type="button" variant="outline" size="sm" className="text-xs">
                    Upload New Picture
                  </Button>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="h-4 w-4" />}
                required
              />

              <Input
                label="Work Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />

              <Input
                label="Professional Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                leftIcon={<Building className="h-4 w-4" />}
              />

              <Input
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                leftIcon={<Shield className="h-4 w-4" />}
              />

              <Input
                label="Location / Office"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                leftIcon={<MapPin className="h-4 w-4" />}
              />

              <Input
                label="Status Indicator"
                defaultValue="Active / Available"
                disabled
              />
            </div>

            {/* Bio textarea */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Bio & Responsibilities
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Authentication Card */}
        <Card>
          <CardHeader>
            <CardTitle>Security & Access Control</CardTitle>
            <CardDescription>Manage your passwords and two-factor authentication security</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* 2FA Toggle Row */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Require an authenticator app TOTP code on every login attempt.
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* Active Sessions */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Active Login Sessions</h4>
              <div className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-emerald-500" />
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Chrome on macOS (Current)</span>
                    <p className="text-[11px] text-zinc-400">IP: 192.168.1.42 • San Francisco, CA</p>
                  </div>
                </div>
                <Badge variant="emerald" size="sm">Active Now</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="purple-glow">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
