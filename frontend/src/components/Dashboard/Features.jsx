import React from "react";

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 bg-linear-to-b from-white via-blue-50 to-white text-center"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-gray-900">
          Powerful <span className="text-blue-600">Features</span> to Empower
          You
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Everything you need to connect, collaborate, and grow your career or
          business — all in one platform.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Item */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-full">
              📄
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Profile Creation
            </h3>
            <p className="mt-2 text-gray-600">
              Build a professional profile showcasing your skills.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center w-12 h-12 mx-auto bg-green-100 text-green-600 rounded-full">
              🤝
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Skill Matching
            </h3>
            <p className="mt-2 text-gray-600">
              Get matched with professionals who need your expertise.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center w-12 h-12 mx-auto bg-yellow-100 text-yellow-600 rounded-full">
              🔄
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Service Exchange
            </h3>
            <p className="mt-2 text-gray-600">
              Offer your services and receive help in return.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center w-12 h-12 mx-auto bg-purple-100 text-purple-600 rounded-full">
              🌐
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Networking Opportunities
            </h3>
            <p className="mt-2 text-gray-600">
              Connect with like-minded professionals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center w-12 h-12 mx-auto bg-red-100 text-red-600 rounded-full">
              💼
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Job Listings
            </h3>
            <p className="mt-2 text-gray-600">
              Access exclusive job opportunities tailored for IT professionals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
            <div className="flex justify-center items-center w-12 h-12 mx-auto bg-pink-100 text-pink-600 rounded-full">
              💬
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              Community Forums
            </h3>
            <p className="mt-2 text-gray-600">
              Engage in discussions and share knowledge with peers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
