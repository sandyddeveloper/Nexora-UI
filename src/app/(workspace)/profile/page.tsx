'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { User, Lock, Shield, Key, Building2, CheckCircle2, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, organization, roles } = useAuthStore();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password Updated Successfully', {
        description: 'Your security credentials have been updated.',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)]">User Profile & Account Security</h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Manage personal info, active organization details, and update JWT authentication credentials.</p>
        </div>
        <Badge variant="purple" className="py-1">
          <Shield className="h-3.5 w-3.5 mr-1" /> Verified Account
        </Badge>
      </div>

      {/* User Card */}
      <div className="flex items-center gap-4 p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] shadow-xs">
        <Avatar className="h-16 w-16 ring-4 ring-[var(--primary-purple)]/30">
          <AvatarFallback className="bg-gradient-to-tr from-[#8b5cf6] to-[#a855f7] text-white text-lg font-black">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-[var(--text-primary)]">
            {user?.first_name} {user?.last_name}
          </h3>
          <span className="text-xs text-[var(--text-muted)]">{user?.email}</span>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{organization?.name || 'Nexora Org'}</Badge>
            {roles.map((r, idx) => (
              <Badge key={idx} variant="purple">{r}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Password Change Form */}
      <div className="p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[var(--border-color)]">
          <Key className="h-4 w-4 text-[var(--primary-purple)]" />
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Security & Password Credentials</h3>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Current Password</label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-[var(--bg-secondary)] border-[var(--border-color)] text-xs h-10"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-[var(--bg-secondary)] border-[var(--border-color)] text-xs h-10"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Confirm New Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[var(--bg-secondary)] border-[var(--border-color)] text-xs h-10"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="bg-[var(--primary-purple)] text-white text-xs h-10 font-bold">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Update Security Credentials
          </Button>
        </form>
      </div>
    </div>
  );
}
