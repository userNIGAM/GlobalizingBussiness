// import React from "react";
// import { jobs } from "./jobsData";

// export default function JobList() {
//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {jobs.map((job) => (
//         <div
//           key={job.id}
//           className="border p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition"
//         >
//           <h2 className="text-xl font-semibold">{job.title}</h2>
//           <p className="text-gray-600">
//             {job.company} • {job.location}
//           </p>
//           <p className="text-sm text-blue-600">
//             {job.type} • {job.salary}
//           </p>
//           <p className="mt-2 text-gray-700">{job.description}</p>
//           <a
//             href={job.applyLink}
//             className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Apply Now
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }
