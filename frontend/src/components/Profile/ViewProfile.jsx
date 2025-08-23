import React, { useState, useEffect } from "react";
import KYCForm from "./KYCFormModal";
import KYCFormModal from "./KYCFormModal";

const ViewProfile = () => {
  const [userData, setUserData] = useState(null);
  const [kycStatus, setKycStatus] = useState("not_submitted");
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile and KYC status
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This is crucial for cookie-based auth
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleKYCUpdate = () => {
    // Refresh KYC status after form submission
    const fetchKYCStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setKycStatus(data.kycStatus || "not_submitted");
        }
      } catch (error) {
        console.error("Error fetching KYC status:", error);
      }
    };

    fetchKYCStatus();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-700 text-white p-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>

        <div className="p-6">
          {userData ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  {userData.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">KYC Status</h3>

                {/* KYC Status Display */}
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                    kycStatus === "approved"
                      ? "bg-green-100 text-green-800"
                      : kycStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : kycStatus === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {kycStatus.replace("_", " ").toUpperCase()}
                </div>

                {/* Status-specific messages and actions */}
                {kycStatus === "not_submitted" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div>
                        <h4 className="text-blue-800 font-medium">
                          KYC Verification Required
                        </h4>
                        <p className="text-blue-600 text-sm mt-1">
                          Please complete your KYC verification to access all
                          features.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowKYCModal(true)}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Complete KYC Verification
                    </button>
                  </div>
                )}

                {kycStatus === "pending" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div>
                        <h4 className="text-yellow-800 font-medium">
                          Verification in Progress
                        </h4>
                        <p className="text-yellow-600 text-sm mt-1">
                          Your KYC documents are under review. This process
                          typically takes 24-48 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {kycStatus === "rejected" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                      <div>
                        <h4 className="text-red-800 font-medium">
                          KYC Verification Failed
                        </h4>
                        <p className="text-red-600 text-sm mt-1">
                          Your KYC submission was rejected. Please review the
                          requirements and submit again.
                        </p>
                        <p className="text-red-500 text-xs mt-2 italic">
                          Reason: Documents were unclear or incomplete
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowKYCModal(true)}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Resubmit KYC
                    </button>
                  </div>
                )}

                {kycStatus === "approved" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <div>
                        <h4 className="text-green-800 font-medium">
                          KYC Verified Successfully
                        </h4>
                        <p className="text-green-600 text-sm mt-1">
                          Your identity has been verified. You now have full
                          access to all platform features.
                        </p>
                        <p className="text-green-500 text-xs mt-2">
                          Verified on: {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => setShowKYCModal(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Update KYC Information
                      </button>
                      <button
                        onClick={() => {
                          /* View KYC details */
                        }}
                        className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="text-gray-500 mt-2">
                Unable to load profile information
              </p>
            </div>
          )}
        </div>
      </div>

      {/* KYC Modal */}
      <KYCFormModal
        isOpen={showKYCModal}
        onClose={() => {
          setShowKYCModal(false);
          handleKYCUpdate();
        }}
      />
    </div>
  );
};

export default ViewProfile;
