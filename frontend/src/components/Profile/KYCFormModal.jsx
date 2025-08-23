// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const KYCForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     dob: "",
//     idType: "aadhaar",
//     idNumber: "",
//   });
//   const [files, setFiles] = useState({
//     profilePicture: null,
//     idDocument: null,
//     addressProof: null,
//     resume: null,
//   });
//   const [previews, setPreviews] = useState({
//     profilePicture: null,
//     idDocument: null,
//     addressProof: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [currentSection, setCurrentSection] = useState(0);
//   const fileInputRef = useRef({});
//   const formRef = useRef();
//   const navigate = useNavigate();

//   const sections = [
//     "Personal Information",
//     "ID Verification",
//     "Address Proof",
//     "Profile Picture",
//     "Resume",
//   ];

//   useEffect(() => {
//     return () => {
//       // Clean up object URLs
//       Object.values(previews).forEach((preview) => {
//         if (preview) URL.revokeObjectURL(preview);
//       });
//     };
//   }, [previews]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file size
//     const maxSize = field === "resume" ? 5 : 2; // MB
//     if (file.size > maxSize * 1024 * 1024) {
//       setError(
//         `${
//           field === "resume" ? "Resume" : "Document"
//         } should be less than ${maxSize}MB`
//       );
//       return;
//     }

//     // Set file
//     setFiles((prev) => ({ ...prev, [field]: file }));
//     setError(null);

//     // Create preview for images
//     if (field !== "resume") {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviews((prev) => ({ ...prev, [field]: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Please login first");
//       }

//       const formDataToSend = new FormData();

//       // Append form data
//       Object.entries(formData).forEach(([key, value]) => {
//         formDataToSend.append(key, value);
//       });

//       // Append files
//       Object.entries(files).forEach(([key, file]) => {
//         if (file) {
//           formDataToSend.append(key, file);
//         }
//       });

//       const response = await axios.post(
//         "http://localhost:5000/api/kyc/submit",
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success("KYC submitted successfully!");
//         setSuccess(true);
//         setTimeout(() => navigate("/dashboard"), 2000);
//       }
//     } catch (err) {
//       console.error("KYC submission error:", err);
//       setError(
//         err.response?.data?.message || err.message || "Submission failed"
//       );
//       toast.error(err.response?.data?.message || "Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nextSection = () => {
//     if (currentSection < sections.length - 1) {
//       setCurrentSection(currentSection + 1);
//     }
//   };

//   const prevSection = () => {
//     if (currentSection > 0) {
//       setCurrentSection(currentSection - 1);
//     }
//   };

//   if (success) {
//     return (
//       <div className="flex items-center justify-center min-h-screen ">
//         <div className="p-8 rounded-xl shadow-lg text-center max-w-md w-full mx-4">
//           <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg
//               className="w-10 h-10 text-green-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M5 13l4 4L19 7"
//               ></path>
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             KYC Submitted Successfully!
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Your documents are under verification. You will be notified once the
//             verification is complete.
//           </p>
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-2 px-4 overflow-hidden">
//       <div className="max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-indigo-700 text-white p-6">
//           <h1 className="text-2xl font-bold">Complete Your KYC Verification</h1>
//           <p className="text-indigo-100 mt-1">
//             Please provide all required information for identity verification
//           </p>
//         </div>

//         {/* Progress bar */}
//         <div className="px-6 pt-6">
//           <div className="flex justify-between mb-2">
//             {sections.map((section, index) => (
//               <div
//                 key={index}
//                 className={`flex-1 flex items-center ${
//                   index !== sections.length - 1 ? "mr-2" : ""
//                 }`}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                     index === currentSection
//                       ? "bg-indigo-600 text-white"
//                       : index < currentSection
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-200 text-gray-600"
//                   }`}
//                 >
//                   {index + 1}
//                 </div>
//                 {index !== sections.length - 1 && (
//                   <div
//                     className={`flex-1 h-1 mx-2 ${
//                       index < currentSection ? "bg-green-500" : "bg-gray-200"
//                     }`}
//                   ></div>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="text-center text-sm text-gray-600 mt-2">
//             Step {currentSection + 1} of {sections.length}:{" "}
//             {sections[currentSection]}
//           </div>
//         </div>

//         {error && (
//           <div className="mx-6 mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-start">
//             <svg
//               className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               ></path>
//             </svg>
//             <span>{error}</span>
//           </div>
//         )}

//         <form ref={formRef} onSubmit={handleSubmit} className="p-6">
//           {/* Personal Information Section */}
//           {currentSection === 0 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                 Personal Information
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                     placeholder="Enter your full name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                     placeholder="your.email@example.com"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                     placeholder="+91 1234567890"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date of Birth *
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                   rows="3"
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                   placeholder="Enter your complete address"
//                 />
//               </div>
//             </div>
//           )}

//           {/* ID Verification Section */}
//           {currentSection === 1 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                 ID Verification
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     ID Type *
//                   </label>
//                   <select
//                     name="idType"
//                     value={formData.idType}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
//                   >
//                     <option value="aadhaar">Aadhaar Card</option>
//                     <option value="pan">PAN Card</option>
//                     <option value="passport">Passport</option>
//                     <option value="voter">Voter ID</option>
//                     <option value="driving">Driving License</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     ID Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="idNumber"
//                     value={formData.idNumber}
//                     onChange={handleChange}
//                     required
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                     placeholder="Enter your ID number"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   ID Document *
//                 </label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//                   <div className="space-y-1 text-center">
//                     {previews.idDocument ? (
//                       <div className="mt-2">
//                         <img
//                           src={previews.idDocument}
//                           alt="ID Document Preview"
//                           className="mx-auto h-40 border rounded object-contain"
//                         />
//                         <p className="text-xs text-gray-500 mt-2">
//                           {files.idDocument?.name}
//                         </p>
//                       </div>
//                     ) : (
//                       <>
//                         <svg
//                           className="mx-auto h-12 w-12 text-gray-400"
//                           stroke="currentColor"
//                           fill="none"
//                           viewBox="0 0 48 48"
//                           aria-hidden="true"
//                         >
//                           <path
//                             d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                         <div className="flex text-sm text-gray-600 justify-center">
//                           <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
//                             <span>Upload a file</span>
//                             <input
//                               ref={(el) =>
//                                 (fileInputRef.current.idDocument = el)
//                               }
//                               type="file"
//                               accept="image/*,.pdf"
//                               onChange={(e) =>
//                                 handleFileChange(e, "idDocument")
//                               }
//                               required
//                               className="sr-only"
//                             />
//                           </label>
//                           <p className="pl-1">or drag and drop</p>
//                         </div>
//                       </>
//                     )}
//                     <p className="text-xs text-gray-500">
//                       JPEG, PNG or PDF, max 2MB
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Address Proof Section */}
//           {currentSection === 2 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                 Address Proof
//               </h3>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Proof Document *
//                 </label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//                   <div className="space-y-1 text-center">
//                     {previews.addressProof ? (
//                       <div className="mt-2">
//                         <img
//                           src={previews.addressProof}
//                           alt="Address Proof Preview"
//                           className="mx-auto h-40 border rounded object-contain"
//                         />
//                         <p className="text-xs text-gray-500 mt-2">
//                           {files.addressProof?.name}
//                         </p>
//                       </div>
//                     ) : (
//                       <>
//                         <svg
//                           className="mx-auto h-12 w-12 text-gray-400"
//                           stroke="currentColor"
//                           fill="none"
//                           viewBox="0 0 48 48"
//                           aria-hidden="true"
//                         >
//                           <path
//                             d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                         <div className="flex text-sm text-gray-600 justify-center">
//                           <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
//                             <span>Upload a file</span>
//                             <input
//                               ref={(el) =>
//                                 (fileInputRef.current.addressProof = el)
//                               }
//                               type="file"
//                               accept="image/*,.pdf"
//                               onChange={(e) =>
//                                 handleFileChange(e, "addressProof")
//                               }
//                               required
//                               className="sr-only"
//                             />
//                           </label>
//                           <p className="pl-1">or drag and drop</p>
//                         </div>
//                       </>
//                     )}
//                     <p className="text-xs text-gray-500">
//                       JPEG, PNG or PDF, max 2MB
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Profile Picture Section */}
//           {currentSection === 3 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                 Profile Picture
//               </h3>

//               <div className="flex flex-col items-center">
//                 <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300">
//                   {previews.profilePicture ? (
//                     <img
//                       src={previews.profilePicture}
//                       alt="Profile Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <svg
//                       className="w-12 h-12 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       ></path>
//                     </svg>
//                   )}
//                 </div>

//                 <label className="mt-6 cursor-pointer">
//                   <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
//                     Choose Image
//                   </span>
//                   <input
//                     ref={(el) => (fileInputRef.current.profilePicture = el)}
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleFileChange(e, "profilePicture")}
//                     required
//                     className="sr-only"
//                   />
//                 </label>
//                 <p className="text-xs text-gray-500 mt-2">
//                   JPG or PNG, max 2MB
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Resume Section */}
//           {currentSection === 4 && (
//             <div className="space-y-6">
//               <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
//                 Resume
//               </h3>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Upload Resume *
//                 </label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//                   <div className="space-y-1 text-center">
//                     {files.resume ? (
//                       <div className="mt-2">
//                         <svg
//                           className="mx-auto h-12 w-12 text-gray-400"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                           ></path>
//                         </svg>
//                         <p className="text-sm text-gray-900 mt-2">
//                           {files.resume.name}
//                         </p>
//                       </div>
//                     ) : (
//                       <>
//                         <svg
//                           className="mx-auto h-12 w-12 text-gray-400"
//                           stroke="currentColor"
//                           fill="none"
//                           viewBox="0 0 48 48"
//                           aria-hidden="true"
//                         >
//                           <path
//                             d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                         <div className="flex text-sm text-gray-600 justify-center">
//                           <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
//                             <span>Upload a file</span>
//                             <input
//                               ref={(el) => (fileInputRef.current.resume = el)}
//                               type="file"
//                               accept=".pdf,.doc,.docx"
//                               onChange={(e) => handleFileChange(e, "resume")}
//                               required
//                               className="sr-only"
//                             />
//                           </label>
//                           <p className="pl-1">or drag and drop</p>
//                         </div>
//                       </>
//                     )}
//                     <p className="text-xs text-gray-500">
//                       PDF or DOC/DOCX, max 5MB
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation buttons */}
//           <div className="flex justify-between mt-8">
//             <button
//               type="button"
//               onClick={prevSection}
//               disabled={currentSection === 0}
//               className={`px-6 py-2 rounded-lg ${
//                 currentSection === 0
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Previous
//             </button>

//             {currentSection < sections.length - 1 ? (
//               <button
//                 type="button"
//                 onClick={nextSection}
//                 className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center disabled:opacity-70`}
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : (
//                   "Submit KYC"
//                 )}
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default KYCForm;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const KYCFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    idType: "aadhaar",
    idNumber: "",
  });
  const [files, setFiles] = useState({
    profilePicture: null,
    idDocument: null,
    addressProof: null,
    resume: null,
  });
  const [previews, setPreviews] = useState({
    profilePicture: null,
    idDocument: null,
    addressProof: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const fileInputRef = useRef({});
  const formRef = useRef();
  const modalRef = useRef();
  const navigate = useNavigate();

  const sections = [
    "Personal Information",
    "ID Verification",
    "Address Proof",
    "Profile Picture",
    "Resume",
  ];

  useEffect(() => {
    // Close modal when clicking outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset"; // Re-enable scrolling

      // Clean up object URLs
      Object.values(previews).forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [isOpen, previews]);

  const handleClose = () => {
    if (!loading) {
      onClose();
      // Reset form when closing
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        dob: "",
        idType: "aadhaar",
        idNumber: "",
      });
      setFiles({
        profilePicture: null,
        idDocument: null,
        addressProof: null,
        resume: null,
      });
      setPreviews({
        profilePicture: null,
        idDocument: null,
        addressProof: null,
      });
      setCurrentSection(0);
      setError(null);
      setSuccess(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size
    const maxSize = field === "resume" ? 5 : 2; // MB
    if (file.size > maxSize * 1024 * 1024) {
      setError(
        `${
          field === "resume" ? "Resume" : "Document"
        } should be less than ${maxSize}MB`
      );
      return;
    }

    // Set file
    setFiles((prev) => ({ ...prev, [field]: file }));
    setError(null);

    // Create preview for images
    if (field !== "resume") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login first");
      }

      const formDataToSend = new FormData();

      // Append form data
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file);
        }
      });

      const response = await axios.post(
        "http://localhost:8000/api/kyc/submit",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("KYC submitted successfully!");
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.error("KYC submission error:", err);
      setError(
        err.response?.data?.message || err.message || "Submission failed"
      );
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              KYC Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your documents are under verification. You will be notified once
              the verification is complete.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-indigo-700 text-white p-6">
              <h1 className="text-2xl font-bold">
                Complete Your KYC Verification
              </h1>
              <p className="text-indigo-100 mt-1">
                Please provide all required information for identity
                verification
              </p>
            </div>

            {/* Progress bar */}
            <div className="px-6 pt-6">
              <div className="flex justify-between mb-2">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={`flex-1 flex items-center ${
                      index !== sections.length - 1 ? "mr-2" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index === currentSection
                          ? "bg-indigo-600 text-white"
                          : index < currentSection
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index !== sections.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          index < currentSection
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                Step {currentSection + 1} of {sections.length}:{" "}
                {sections[currentSection]}
              </div>
            </div>

            {error && (
              <div className="mx-6 mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-start">
                <svg
                  className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
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
                <span>{error}</span>
              </div>
            )}

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-6 overflow-y-auto max-h-[50vh]"
            >
              {/* Personal Information Section */}
              {currentSection === 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="Enter your complete address"
                    />
                  </div>
                </div>
              )}

              {/* ID Verification Section */}
              {currentSection === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    ID Verification
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID Type *
                      </label>
                      <select
                        name="idType"
                        value={formData.idType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
                      >
                        <option value="aadhaar">Aadhaar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="passport">Passport</option>
                        <option value="voter">Voter ID</option>
                        <option value="driving">Driving License</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ID Number *
                      </label>
                      <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Enter your ID number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Document *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        {previews.idDocument ? (
                          <div className="mt-2">
                            <img
                              src={previews.idDocument}
                              alt="ID Document Preview"
                              className="mx-auto h-40 border rounded object-contain"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              {files.idDocument?.name}
                            </p>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input
                                  ref={(el) =>
                                    (fileInputRef.current.idDocument = el)
                                  }
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) =>
                                    handleFileChange(e, "idDocument")
                                  }
                                  required
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                          </>
                        )}
                        <p className="text-xs text-gray-500">
                          JPEG, PNG or PDF, max 2MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Address Proof Section */}
              {currentSection === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Address Proof
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Proof Document *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        {previews.addressProof ? (
                          <div className="mt-2">
                            <img
                              src={previews.addressProof}
                              alt="Address Proof Preview"
                              className="mx-auto h-40 border rounded object-contain"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              {files.addressProof?.name}
                            </p>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input
                                  ref={(el) =>
                                    (fileInputRef.current.addressProof = el)
                                  }
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) =>
                                    handleFileChange(e, "addressProof")
                                  }
                                  required
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                          </>
                        )}
                        <p className="text-xs text-gray-500">
                          JPEG, PNG or PDF, max 2MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Picture Section */}
              {currentSection === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Profile Picture
                  </h3>

                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300">
                      {previews.profilePicture ? (
                        <img
                          src={previews.profilePicture}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
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

                    <label className="mt-6 cursor-pointer">
                      <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                        Choose Image
                      </span>
                      <input
                        ref={(el) => (fileInputRef.current.profilePicture = el)}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "profilePicture")}
                        required
                        className="sr-only"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">
                      JPG or PNG, max 2MB
                    </p>
                  </div>
                </div>
              )}

              {/* Resume Section */}
              {currentSection === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Resume
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Resume *
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        {files.resume ? (
                          <div className="mt-2">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                            </svg>
                            <p className="text-sm text-gray-900 mt-2">
                              {files.resume.name}
                            </p>
                          </div>
                        ) : (
                          <>
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input
                                  ref={(el) =>
                                    (fileInputRef.current.resume = el)
                                  }
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) =>
                                    handleFileChange(e, "resume")
                                  }
                                  required
                                  className="sr-only"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                          </>
                        )}
                        <p className="text-xs text-gray-500">
                          PDF or DOC/DOCX, max 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className={`px-6 py-2 rounded-lg ${
                    currentSection === 0
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>

                {currentSection < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextSection}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center disabled:opacity-70`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Submit KYC"
                    )}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default KYCFormModal;
