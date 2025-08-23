import React from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import Comment from "./Comment";
import Aboutus from "./Aboutus";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <Comment />
      <Aboutus />
      <section id="contact" className="py-20 text-center bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl">Get in Touch</h2>
          <p className="mt-4">
            Have questions or want to learn more? Reach out to us!
          </p>
          <a
            href="mailto:info@skillexchange.com"
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded"
          >
            Contact Us
          </a>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2023 Skill Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
