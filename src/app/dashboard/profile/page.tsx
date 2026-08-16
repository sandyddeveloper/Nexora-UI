"use client";

import React, { useState, useEffect } from "react";
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

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [title, setTitle] = useState(user?.title || "");
  const [department, setDepartment] = useState(user?.department || "");
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [twoFactor, setTwoFactor] = useState(user?.twoFactorEnabled ?? false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setTitle(user.title || "");
      setDepartment(user.department || "");
      setLocation(user.location || "");
      setBio(user.bio || "");
      setTwoFactor(user.twoFactorEnabled ?? false);
    }
  }, [user]);

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

  const dynamicAvatar = user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || user?.name || "User")}`;

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
                  src={dynamicAvatar}
                  alt={user?.name || "Avatar"}
                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-purple-500/20"
                />
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">{user?.name || "User"}</h3>
                  <Badge variant={role === "staff" ? "amber" : "purple"} size="sm">
                    {role === "staff" ? "Company Staff" : "Client User"}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500">{user?.email || "No email on record"}</p>
                <p className="text-[11px] text-zinc-400 font-mono mt-1">User ID: #{user?.id || "N/A"}</p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="Enter full name"
                leftIcon={<User className="h-4 w-4" />}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Enter email address"
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />

              <Input
                label="Professional Title"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                placeholder="e.g. Lead Engineer, Product Owner"
                leftIcon={<Shield className="h-4 w-4" />}
              />

              <Input
                label="Department"
                value={department}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)}
                placeholder="e.g. Engineering, Platform Operations"
                leftIcon={<Building className="h-4 w-4" />}
              />
            </div>

            {/* Bio Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Biography
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Write a brief professional bio..."
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Multi-Factor Section */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication & Security</CardTitle>
            <CardDescription>Multi-factor protection and active cryptographic session tokens</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Secure your account with time-based one-time password (TOTP) verification.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={twoFactor ? "emerald" : "gray"} size="sm" dot>
                  {twoFactor ? "Enabled" : "Disabled"}
                </Badge>
                <Button
                  type="button"
                  size="sm"
                  variant={twoFactor ? "outline" : "primary"}
                  onClick={() => setTwoFactor(!twoFactor)}
                  className="text-xs"
                >
                  {twoFactor ? "Disable 2FA" : "Enable 2FA"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" variant="primary" size="md" className="px-6 font-bold shadow-md">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
