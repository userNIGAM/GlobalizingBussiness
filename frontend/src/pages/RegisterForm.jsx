import React, { useState } from "react";

const RegisterForm = () => {
  const [role, setRole] = useState(""); // recruiter or jobseeker
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-950 p-6">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          GSEM Registration
        </h2>

        {/* Step 1: Select Role */}
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
          I am a:
        </label>
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg font-medium ${
              role === "recruiter"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setRole("recruiter")}
          >
            Recruiter
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg font-medium ${
              role === "jobseeker"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
            }`}
            onClick={() => setRole("jobseeker")}
          >
            Job Seeker
          </button>
        </div>

        {/* Step 2: Dynamic Form */}
        {role && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              />
            </div>

            {/* Recruiter-specific fields */}
            {role === "recruiter" && (
              <>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Position to Hire
                  </label>
                  <input
                    type="text"
                    name="position"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  />
                </div>
              </>
            )}

            {/* Jobseeker-specific fields */}
            {role === "jobseeker" && (
              <>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Desired Job Title
                  </label>
                  <input
                    type="text"
                    name="desiredJob"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="e.g. Web Development, Graphic Design"
                    required
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
