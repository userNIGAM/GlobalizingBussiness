import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ModalShell from "./ModalShell";
import SidebarNav from "./SidebarNav";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import TabContent from "./TabContent";

export default function ProfileModal({ open, onOpenChange }) {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    experience: "",
    skills: "",
    summary: "",
  });

  const [accountPrefs, setAccountPrefs] = useState({
    language: "english",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const [visibility, setVisibility] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
  });

  const [notifications, setNotifications] = useState({
    emailNotif: true,
    pushNotif: false,
    weeklyDigest: true,
  });

  if (!open) return null;

  const handleSave = () => {
    console.log("Saving:", {
      profile,
      accountPrefs,
      security,
      visibility,
      privacy,
      notifications,
    });
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <ModalShell onClose={() => onOpenChange(false)}>
          <SidebarNav activeTab={activeTab} onChange={setActiveTab} />

          <div className="flex-1 flex flex-col">
            <ModalHeader
              activeTab={activeTab}
              onClose={() => onOpenChange(false)}
            />

            <TabContent
              activeTab={activeTab}
              profile={profile}
              setProfile={setProfile}
              accountPrefs={accountPrefs}
              setAccountPrefs={setAccountPrefs}
              security={security}
              setSecurity={setSecurity}
              visibility={visibility}
              setVisibility={setVisibility}
              privacy={privacy}
              setPrivacy={setPrivacy}
              notifications={notifications}
              setNotifications={setNotifications}
            />

            <ModalFooter
              onCancel={() => onOpenChange(false)}
              onSave={handleSave}
            />
          </div>
        </ModalShell>
      )}
    </AnimatePresence>
  );
}
