// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CreateProfile({ setUserRole }) {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     headline: "",
//     location: "",
//     role: "seeker",
//     skills: "",
//     bio: "",
//   });
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [serverError, setServerError] = useState("");
//   const fileInputRef = useRef();

//   // Clear avatar preview when component unmounts
//   useEffect(() => {
//     return () => {
//       if (avatarPreview) URL.revokeObjectURL(avatarPreview);
//     };
//   }, [avatarPreview]);

//   const validate = () => {
//     const e = {};
//     if (!form.fullName.trim()) e.fullName = "Full name is required";
//     if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Valid email required";
//     if (form.skills.trim().length === 0) e.skills = "Add at least one skill";
//     return e;
//   };

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const onFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Validate file type and size
//     if (!file.type.match("image.*")) {
//       setErrors((prev) => ({ ...prev, avatar: "Please select an image file" }));
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       setErrors((prev) => ({
//         ...prev,
//         avatar: "File size must be less than 2MB",
//       }));
//       return;
//     }

//     setAvatarFile(file);
//     if (avatarPreview) URL.revokeObjectURL(avatarPreview);
//     setAvatarPreview(URL.createObjectURL(file));
//     setErrors((prev) => ({ ...prev, avatar: "" }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length) {
//       setErrors(validationErrors);
//       return;
//     }

//     setErrors({});
//     setServerError("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No authentication token found");

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": avatarFile
//             ? "multipart/form-data"
//             : "application/json",
//         },
//       };

//       let data;
//       if (avatarFile) {
//         const formData = new FormData();
//         Object.entries(form).forEach(([key, value]) => {
//           formData.append(key, value);
//         });
//         formData.append("avatar", avatarFile);
//         data = formData;
//       } else {
//         data = form;
//       }

//       const response = await axios.post("/api/profiles", data, config);

//       if (response.data.success) {
//         if (setUserRole) setUserRole(form.role);
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       console.error("Profile creation error:", err);
//       setServerError(
//         err.response?.data?.message ||
//           err.message ||
//           "Failed to create profile. Please try again."
//       );

//       // Fallback to localStorage if API fails
//       try {
//         const localProfiles = JSON.parse(
//           localStorage.getItem("localProfiles") || "[]"
//         );
//         const newProfile = {
//           id: Date.now().toString(),
//           ...form,
//           avatar: avatarPreview || null,
//           createdAt: new Date().toISOString(),
//         };
//         localStorage.setItem(
//           "localProfiles",
//           JSON.stringify([...localProfiles, newProfile])
//         );
//         if (setUserRole) setUserRole(form.role);
//         navigate("/dashboard");
//       } catch (localErr) {
//         console.error("Local storage fallback failed:", localErr);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
//       <h2 className="text-2xl font-semibold mb-4">Create your profile</h2>

//       {serverError && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//           {serverError}
//         </div>
//       )}

//       <form onSubmit={submit} className="flex flex-col h-full">
//         <div className="overflow-y-auto max-h-[calc(100vh-220px)] pr-2 mb-4">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Full name *
//               </label>
//               <input
//                 name="fullName"
//                 value={form.fullName}
//                 onChange={onChange}
//                 className={`mt-1 block w-full rounded border px-3 py-2 ${
//                   errors.fullName ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {errors.fullName && (
//                 <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email *
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={onChange}
//                 className={`mt-1 block w-full rounded border px-3 py-2 ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {errors.email && (
//                 <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Role *
//                 </label>
//                 <select
//                   name="role"
//                   value={form.role}
//                   onChange={onChange}
//                   className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
//                 >
//                   <option value="seeker">Job Seeker</option>
//                   <option value="provider">Service Provider</option>
//                   <option value="employer">Employer / Company</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Location
//                 </label>
//                 <input
//                   name="location"
//                   value={form.location}
//                   onChange={onChange}
//                   className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Headline
//               </label>
//               <input
//                 name="headline"
//                 value={form.headline}
//                 onChange={onChange}
//                 placeholder="e.g. Frontend Developer"
//                 className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Skills (comma separated) *
//               </label>
//               <input
//                 name="skills"
//                 value={form.skills}
//                 onChange={onChange}
//                 placeholder="React, Node.js, UI Design"
//                 className={`mt-1 block w-full rounded border px-3 py-2 ${
//                   errors.skills ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               {errors.skills && (
//                 <p className="text-red-600 text-sm mt-1">{errors.skills}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Bio
//               </label>
//               <textarea
//                 name="bio"
//                 value={form.bio}
//                 onChange={onChange}
//                 rows="4"
//                 className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
//                 placeholder="Tell us about yourself..."
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Profile Picture
//               </label>
//               <div className="flex items-center space-x-4 mt-2">
//                 <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
//                   {avatarPreview ? (
//                     <img
//                       src={avatarPreview}
//                       alt="Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-sm text-gray-500">Preview</span>
//                   )}
//                 </div>
//                 <div>
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current.click()}
//                     className="px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
//                   >
//                     Choose Image
//                   </button>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={onFile}
//                     className="hidden"
//                   />
//                   <div className="text-sm text-gray-500 mt-1">
//                     PNG, JPG up to 2MB
//                   </div>
//                   {errors.avatar && (
//                     <p className="text-red-600 text-sm mt-1">{errors.avatar}</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center space-x-3 pt-4 border-t">
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <span className="flex items-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Creating...
//               </span>
//             ) : (
//               "Create Profile"
//             )}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
