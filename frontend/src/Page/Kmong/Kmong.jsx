import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Kmong = () => {
  return (
    <motion.div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center text-center py-32 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-bold">Your Company Name</h1>
        <p className="text-lg mt-4">Innovating the Future with Technology</p>
        <motion.button
          className="mt-8 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-200 transition"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/contact">Get in Touch</Link>
        </motion.button>
      </motion.section>

      {/* Services Section */}
      <motion.section className="py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          {[
            { title: "Software Development", icon: "💻" },
            { title: "Cloud Solutions", icon: "☁️" },
            { title: "Security & Compliance", icon: "🔒" },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-5xl">{service.icon}</div>
              <h3 className="text-2xl font-bold mt-4">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section className="py-24 bg-gray-200 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          We are a leading tech company providing top-tier solutions to our
          clients worldwide.
        </p>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="py-24 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg">Let's build something amazing together.</p>
        <motion.button
          className="mt-8 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-200 transition"
          whileHover={{ scale: 1.1 }}
        >
          <Link to="/contact">Contact Us</Link>
        </motion.button>
      </motion.section>
    </motion.div>
  );
};

export default Kmong;
