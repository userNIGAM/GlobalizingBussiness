import React, { useState } from "react";
import { Search, PlusCircle, Bell, HelpCircle } from "lucide-react";
import Avatar from "./Avatar";
import ProfileModal from "./Profile/ProfileModal";

export default function Header({ onCreatePost }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleClick = () => {
    setIsProfileOpen(true);
    // console.log("Clicked")
    // alert("Profile modal opened");
  }
  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">HC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                  HireConnect
                </h1>
                <p className="text-xs text-gray-500">Professional Network</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search professionals, topics, or companies..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onCreatePost}
                className="flex items-center space-x-2 px-5 py-3 bg-linear-to-r from-blue-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <PlusCircle size={20} />
                <span className="font-semibold">Create</span>
              </button>

              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <HelpCircle size={24} />
              </button>

            <div>
                <button onClick={handleClick}>
                  <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                size="md"
                className="cursor-pointer hover:ring-2 hover:ring-blue-500"
                // onClick={() => setIsProfileOpen(true)}
                // onClick={handleClick}
              />
                </button>
            </div>
            </div>
          </div>
        </div>
      </header>
      {/* Profile Modal */}
      <ProfileModal open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </>
  );
}
