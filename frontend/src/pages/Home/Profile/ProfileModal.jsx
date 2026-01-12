// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   X,
//   Save,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Briefcase,
//   Clock,
//   Award,
//   FileText,
//   Settings,
//   Shield,
//   Eye,
//   Database,
//   Bell,
// } from "lucide-react";

// // Profile Modal Component
// export default function ProfileModal({ open, onOpenChange }) {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//     title: "",
//     experience: "",
//     skills: "",
//     summary: "",
//   });

//   const [accountPrefs, setAccountPrefs] = useState({
//     language: "english",
//     timezone: "UTC",
//     dateFormat: "MM/DD/YYYY",
//   });

//   const [security, setSecurity] = useState({
//     twoFactor: false,
//     loginAlerts: true,
//   });

//   const [visibility, setVisibility] = useState({
//     profilePublic: true,
//     showEmail: false,
//     showPhone: false,
//   });

//   const [privacy, setPrivacy] = useState({
//     dataSharing: false,
//     analytics: true,
//   });

//   const [notifications, setNotifications] = useState({
//     emailNotif: true,
//     pushNotif: false,
//     weeklyDigest: true,
//   });

//   if (!open) return null;

//   const handleChange = (field, value) => {
//     setProfile((prev) => ({ ...prev, [field]: value }));
//   };

//   const tabs = [
//     { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
//     {
//       id: "account",
//       label: "Account Preferences",
//       icon: <Settings className="w-4 h-4" />,
//     },
//     {
//       id: "security",
//       label: "Sign-in & Security",
//       icon: <Shield className="w-4 h-4" />,
//     },
//     {
//       id: "visibility",
//       label: "Visibility",
//       icon: <Eye className="w-4 h-4" />,
//     },
//     {
//       id: "privacy",
//       label: "Data Privacy",
//       icon: <Database className="w-4 h-4" />,
//     },
//     {
//       id: "notifications",
//       label: "Notifications",
//       icon: <Bell className="w-4 h-4" />,
//     },
//   ];

//   const inputFields = [
//     {
//       label: "Full Name",
//       field: "fullName",
//       icon: <User className="w-4 h-4 text-gray-400" />,
//       colSpan: "md:col-span-1",
//     },
//     {
//       label: "Email",
//       field: "email",
//       type: "email",
//       icon: <Mail className="w-4 h-4 text-gray-400" />,
//       colSpan: "md:col-span-1",
//     },
//     {
//       label: "Phone",
//       field: "phone",
//       icon: <Phone className="w-4 h-4 text-gray-400" />,
//       colSpan: "md:col-span-1",
//     },
//     {
//       label: "Location",
//       field: "location",
//       icon: <MapPin className="w-4 h-4 text-gray-400" />,
//       colSpan: "md:col-span-1",
//     },
//     {
//       label: "Current Job Title",
//       field: "title",
//       icon: <Briefcase className="w-4 h-4 text-gray-400" />,
//       colSpan: "md:col-span-2",
//     },
//     {
//       label: "Years of Experience",
//       field: "experience",
//       icon: <Clock className="w-4 h-4 text-gray-400" />,
//       colSpan: "md:col-span-1",
//     },
//     {
//       label: "Key Skills",
//       field: "skills",
//       icon: <Award className="w-4 h-4 text-gray-400" />,
//       colSpan: "md:col-span-1",
//     },
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "profile":
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {inputFields.map(
//               ({ label, field, type = "text", icon, colSpan }) => (
//                 <div key={field} className={colSpan}>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     <div className="flex items-center gap-2">
//                       {icon}
//                       {label}
//                     </div>
//                   </label>
//                   <input
//                     type={type}
//                     value={profile[field]}
//                     onChange={(e) => handleChange(field, e.target.value)}
//                     className="w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 placeholder:text-gray-400"
//                     placeholder={`Enter ${label.toLowerCase()}`}
//                   />
//                 </div>
//               )
//             )}
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <div className="flex items-center gap-2">
//                   <FileText className="w-4 h-4 text-gray-400" />
//                   Professional Summary
//                 </div>
//               </label>
//               <textarea
//                 value={profile.summary}
//                 onChange={(e) => handleChange("summary", e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 placeholder:text-gray-400 resize-none"
//                 placeholder="Describe your professional background and achievements..."
//               />
//             </div>
//           </div>
//         );

//       case "account":
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Language
//               </label>
//               <select
//                 value={accountPrefs.language}
//                 onChange={(e) =>
//                   setAccountPrefs({ ...accountPrefs, language: e.target.value })
//                 }
//                 className="w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
//               >
//                 <option value="english">English</option>
//                 <option value="spanish">Spanish</option>
//                 <option value="french">French</option>
//                 <option value="german">German</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Timezone
//               </label>
//               <select
//                 value={accountPrefs.timezone}
//                 onChange={(e) =>
//                   setAccountPrefs({ ...accountPrefs, timezone: e.target.value })
//                 }
//                 className="w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
//               >
//                 <option value="UTC">UTC</option>
//                 <option value="EST">Eastern Time</option>
//                 <option value="PST">Pacific Time</option>
//                 <option value="CST">Central Time</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Date Format
//               </label>
//               <select
//                 value={accountPrefs.dateFormat}
//                 onChange={(e) =>
//                   setAccountPrefs({
//                     ...accountPrefs,
//                     dateFormat: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 bg-white/50 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
//               >
//                 <option value="MM/DD/YYYY">MM/DD/YYYY</option>
//                 <option value="DD/MM/YYYY">DD/MM/YYYY</option>
//                 <option value="YYYY-MM-DD">YYYY-MM-DD</option>
//               </select>
//             </div>
//           </div>
//         );

//       case "security":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">
//                   Two-Factor Authentication
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Add an extra layer of security to your account
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={security.twoFactor}
//                 onChange={(checked) =>
//                   setSecurity({ ...security, twoFactor: checked })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">Login Alerts</h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Get notified of new sign-ins to your account
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={security.loginAlerts}
//                 onChange={(checked) =>
//                   setSecurity({ ...security, loginAlerts: checked })
//                 }
//               />
//             </div>
//             <button className="w-full px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all">
//               Change Password
//             </button>
//           </div>
//         );

//       case "visibility":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">Public Profile</h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Make your profile visible to everyone
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={visibility.profilePublic}
//                 onChange={(checked) =>
//                   setVisibility({ ...visibility, profilePublic: checked })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">
//                   Show Email Address
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Display your email on your public profile
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={visibility.showEmail}
//                 onChange={(checked) =>
//                   setVisibility({ ...visibility, showEmail: checked })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">Show Phone Number</h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Display your phone on your public profile
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={visibility.showPhone}
//                 onChange={(checked) =>
//                   setVisibility({ ...visibility, showPhone: checked })
//                 }
//               />
//             </div>
//           </div>
//         );

//       case "privacy":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">Data Sharing</h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Allow sharing data with third-party partners
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={privacy.dataSharing}
//                 onChange={(checked) =>
//                   setPrivacy({ ...privacy, dataSharing: checked })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">
//                   Analytics & Tracking
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Help us improve by allowing usage analytics
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={privacy.analytics}
//                 onChange={(checked) =>
//                   setPrivacy({ ...privacy, analytics: checked })
//                 }
//               />
//             </div>
//             <button className="w-full px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all">
//               Download My Data
//             </button>
//             <button className="w-full px-4 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all">
//               Delete Account
//             </button>
//           </div>
//         );

//       case "notifications":
//         return (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">
//                   Email Notifications
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Receive updates and alerts via email
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={notifications.emailNotif}
//                 onChange={(checked) =>
//                   setNotifications({ ...notifications, emailNotif: checked })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">
//                   Push Notifications
//                 </h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Get instant notifications on your device
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={notifications.pushNotif}
//                 onChange={(checked) =>
//                   setNotifications({ ...notifications, pushNotif: checked })
//                 }
//               />
//             </div>
//             <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-300/50">
//               <div>
//                 <h4 className="font-medium text-gray-900">Weekly Digest</h4>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Get a summary of your activity every week
//                 </p>
//               </div>
//               <ToggleSwitch
//                 checked={notifications.weeklyDigest}
//                 onChange={(checked) =>
//                   setNotifications({ ...notifications, weeklyDigest: checked })
//                 }
//               />
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => onOpenChange(false)}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
//           />

//           {/* Modal */}
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               transition={{ type: "spring", damping: 25, stiffness: 400 }}
//               className="relative w-full max-w-5xl h-[85vh]"
//             >
//               {/* Glass effect container */}
//               <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-white/30 overflow-hidden h-full flex">
//                 {/* Side Navigation */}
//                 <div className="w-64 border-r border-gray-200/30 bg-linear-to-b from-gray-50/50 to-white/50 p-6">
//                   <div className="mb-8">
//                     <h2 className="text-xl font-bold text-gray-900">
//                       Settings
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Manage your account
//                     </p>
//                   </div>
//                   <nav className="space-y-1">
//                     {tabs.map((tab) => (
//                       <button
//                         key={tab.id}
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                           activeTab === tab.id
//                             ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
//                             : "text-gray-700 hover:bg-gray-100/50"
//                         }`}
//                       >
//                         {tab.icon}
//                         <span>{tab.label}</span>
//                       </button>
//                     ))}
//                   </nav>
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="flex-1 flex flex-col">
//                   {/* Header */}
//                   <div className="relative p-6 border-b border-gray-200/30">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h2 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//                           {tabs.find((t) => t.id === activeTab)?.label}
//                         </h2>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {activeTab === "profile" &&
//                             "Update your professional information"}
//                           {activeTab === "account" &&
//                             "Customize your account settings"}
//                           {activeTab === "security" &&
//                             "Manage your security preferences"}
//                           {activeTab === "visibility" &&
//                             "Control what others can see"}
//                           {activeTab === "privacy" &&
//                             "Manage your data and privacy"}
//                           {activeTab === "notifications" &&
//                             "Choose how you want to be notified"}
//                         </p>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => onOpenChange(false)}
//                         aria-label="Close profile modal"
//                         className="group inline-flex items-center justify-center h-10 w-10 rounded-xl hover:bg-gray-100/50 transition-all cursor-pointer" > 
//                         <X className="h-5 w-5 relative top-3 -left-3 text-gray-500 group-hover:text-gray-700 transition-colors" />
//                       </button>
//                     </div>
//                     <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-green-500 to-pink-500" />
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 p-6 overflow-y-auto">
//                     <AnimatePresence mode="wait">
//                       <motion.div
//                         key={activeTab}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -20 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         {renderTabContent()}
//                       </motion.div>
//                     </AnimatePresence>
//                   </div>

//                   {/* Footer */}
//                   <div className="p-6 border-t border-gray-200/30 bg-linear-to-r from-gray-50/50 to-white/50">
//                     <div className="flex items-center justify-end gap-3">
//                       <button
//                         onClick={() => onOpenChange(false)}
//                         className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300/50 hover:border-gray-400 rounded-xl transition-all duration-200 hover:shadow-md active:scale-95"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={() => {
//                           // Save logic here
//                           console.log("Saving:", {
//                             profile,
//                             accountPrefs,
//                             security,
//                             visibility,
//                             privacy,
//                             notifications,
//                           });
//                           onOpenChange(false);
//                         }}
//                         className="px-6 py-3 text-sm font-medium text-white bg-linear-to-b from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2 active:scale-95"
//                       >
//                         <Save className="w-4 h-4" />
//                         Save Changes
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Decorative elements */}
//               <div className="absolute -top-6 -right-6 w-24 h-24 bg-linear-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl" />
//               <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-xl" />
//             </motion.div>
//           </div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// // Toggle Switch Component
// function ToggleSwitch({ checked, onChange }) {
//   return (
//     <label className="relative inline-flex items-center cursor-pointer">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={(e) => onChange(e.target.checked)}
//         className="sr-only peer"
//       />
//       <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//     </label>
//   );
// }
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
    console.log({
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
