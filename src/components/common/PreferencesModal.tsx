"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { PreferencesComponent } from "@/components/common/PreferencesComponent";

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreferencesModal({ isOpen, onClose }: PreferencesModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Platform Preferences"
      description="Manage your regional language, email & SMS dispatch channels, and visual theme."
      maxWidth="xl"
    >
      <div className="pt-2">
        <PreferencesComponent compact onSaved={onClose} />
      </div>
    </Modal>
  );
}
