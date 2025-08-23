import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-5xl font-bold leading-tight">
            Connect, Collaborate, and Grow
          </h2>
          <p className="mt-6 text-lg text-blue-100 max-w-lg">
            Join our platform to exchange skills and services with IT
            professionals worldwide. Build connections, share expertise, and
            accelerate your career.
          </p>
          <a
            href="#features"
            className="mt-8 inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-50 transition"
          >
            Explore Features
          </a>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4206/4206231.png"
            alt="Skill Exchange Platform"
            className="w-full max-w-md drop-shadow-2xl rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
