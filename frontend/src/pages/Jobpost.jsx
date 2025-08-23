// import React, { useState } from "react";

// const JobPost = () => {
//   const [applied, setApplied] = useState(false);

//   const job = {
//     title: "Frontend Developer",
//     company: "GlobalTech Solutions",
//     location: "Remote",
//     type: "Full-time",
//     description:
//       "We are looking for a skilled frontend developer to join our team. Must know React, Tailwind, and modern JS.",
//     skills: ["React", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
//     salary: "$1000 - $2000 / month",
//   };

//   const handleApply = () => {
//     setApplied(true);
//     alert(`✅ You have applied for the position: ${job.title}`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg my-6">
//       <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
//       <p className="text-gray-600 mb-1">
//         <strong>Company:</strong> {job.company}
//       </p>
//       <p className="text-gray-600 mb-1">
//         <strong>Location:</strong> {job.location}
//       </p>
//       <p className="text-gray-600 mb-1">
//         <strong>Type:</strong> {job.type}
//       </p>
//       <p className="text-gray-600 mb-3">
//         <strong>Salary:</strong> {job.salary}
//       </p>
//       <p className="text-gray-800 mb-4">{job.description}</p>

//       <div className="flex flex-wrap gap-2 mb-4">
//         {job.skills.map((skill) => (
//           <span
//             key={skill}
//             className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
//           >
//             {skill}
//           </span>
//         ))}
//       </div>

//       <button
//         onClick={handleApply}
//         disabled={applied}
//         className={`w-full py-2 rounded-lg font-semibold text-white ${
//           applied
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-green-600 hover:bg-green-700"
//         }`}
//       >
//         {applied ? "Applied" : "Apply Now"}
//       </button>
//     </div>
//   );
// };

// export default JobPost;
// export const jobs = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     company: "BlueSky Technologies",
//     location: "Kathmandu, Nepal",
//     type: "Full-time",
//     salary: "NRs. 50,000 - 80,000 / month",
//     postedDate: "2025-08-10",
//     description:
//       "We are looking for a skilled frontend developer with experience in React and TailwindCSS to join our growing team.",
//     requirements: ["React", "JavaScript", "REST APIs", "TailwindCSS"],
//     applyLink: "https://example.com/apply/1",
//   },
//   {
//     id: 2,
//     title: "Backend Engineer",
//     company: "CodeWave Pvt. Ltd.",
//     location: "Lalitpur, Nepal",
//     type: "Remote",
//     salary: "NRs. 70,000 - 1,00,000 / month",
//     postedDate: "2025-08-12",
//     description:
//       "We are seeking a backend engineer proficient in Node.js, Express, and MongoDB for high-scale web applications.",
//     requirements: ["Node.js", "Express", "MongoDB", "REST APIs"],
//     applyLink: "https://example.com/apply/2",
//   },
//   {
//     id: 3,
//     title: "UI/UX Designer",
//     company: "PixelCraft Studios",
//     location: "Pokhara, Nepal",
//     type: "Part-time",
//     salary: "NRs. 40,000 - 60,000 / month",
//     postedDate: "2025-08-14",
//     description:
//       "Looking for a creative designer to craft modern, user-friendly designs for mobile and web platforms.",
//     requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
//     applyLink: "https://example.com/apply/3",
//   },
//   // ✅ You can add 20-30 similar objects
// ];
import React from "react";
import { jobs } from "./jobsData";

export default function JobList() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="border p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">
            {job.company} • {job.location}
          </p>
          <p className="text-sm text-blue-600">
            {job.type} • {job.salary}
          </p>
          <p className="mt-2 text-gray-700">{job.description}</p>
          <a
            href={job.applyLink}
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </a>
        </div>
      ))}
    </div>
  );
}
