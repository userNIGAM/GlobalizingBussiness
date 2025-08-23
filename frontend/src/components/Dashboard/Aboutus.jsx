import React from "react";
import { Link } from "react-router-dom";

const Aboutus = () => {
  return (
    <section id="about" className="py-20 text-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 inline-block pb-2">
          About Us
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          We are a vibrant community of{" "}
          <span className="font-semibold text-blue-600">IT professionals</span>{" "}
          committed to helping each other grow through{" "}
          <span className="italic">skill exchange</span>. Whether you're a
          recruiter looking for top talent or a job seeker searching for the
          right opportunity,{" "}
          <span className="font-semibold text-blue-600">
            our platform connects you with the right people
          </span>{" "}
          to unlock your full potential.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/marketplace"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>
          <Link
            to="/network"
            className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
          >
            Join Network
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
