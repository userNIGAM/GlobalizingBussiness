import React from "react";

const Comment = () => {
  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 text-center"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-gray-900">
          What Our <span className="text-blue-600">Users</span> Say
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Hear from professionals who have transformed their careers through our
          platform.
        </p>

        {/* Testimonials Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Alex J."
                className="w-16 h-16 rounded-full border-4 border-blue-100 shadow-md"
              />
              <p className="mt-4 italic text-gray-700 leading-relaxed">
                "Skill Exchange has transformed my career! I've connected with
                amazing professionals and found great opportunities."
              </p>
              <footer className="mt-4 font-semibold text-gray-900">
                — Alex J.,{" "}
                <span className="text-blue-600">Software Developer</span>
              </footer>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Sarah K."
                className="w-16 h-16 rounded-full border-4 border-blue-100 shadow-md"
              />
              <p className="mt-4 italic text-gray-700 leading-relaxed">
                "The platform is user-friendly and has helped me find the right
                talent for my projects."
              </p>
              <footer className="mt-4 font-semibold text-gray-900">
                — Sarah K., <span className="text-blue-600">IT Recruiter</span>
              </footer>
            </div>
          </div>

          {/* Another Testimonial for balance */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
            <div className="flex flex-col items-center">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Michael T."
                className="w-16 h-16 rounded-full border-4 border-blue-100 shadow-md"
              />
              <p className="mt-4 italic text-gray-700 leading-relaxed">
                "I’ve gained valuable connections and found multiple freelance
                projects. Highly recommend!"
              </p>
              <footer className="mt-4 font-semibold text-gray-900">
                — Michael T.,{" "}
                <span className="text-blue-600">Freelance Designer</span>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
