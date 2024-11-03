import React from "react";
import Navbar from "../components/Navbar";

const DisplayContact = () => {
  return (
    <>
      <Navbar />
      <div className=" text-[#F5F5F5] min-h-screen py-16 px-8 flex justify-center">
        <div className="max-w-3xl w-full bg-[#633a4b] rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#E8A2B4]">Contact Us 📬</h1>
            <p className="mt-2 text-[#FFDD93]">
              Have questions? Reach out to us anytime!
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-[#F0E2D0] font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 rounded-md bg-[#3A2431] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#E8A2B4]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#F0E2D0] font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 rounded-md bg-[#3A2431] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#E8A2B4]"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[#F0E2D0] font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 rounded-md bg-[#3A2431] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#E8A2B4]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[#F0E2D0] font-semibold mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="w-full p-3 rounded-md bg-[#3A2431] text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#E8A2B4]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 mt-4 text-lg font-semibold text-[#412C3A] bg-[#FFDD93] rounded-md hover:bg-[#E8A2B4] transition duration-200"
            >
              Send Message
            </button>
          </form>

          {/* Contact Information */}
          <div className="mt-12 text-center text-[#A3C4C9]">
            <p className="mb-2">Or reach us at:</p>
            <p>
              Email: <span className="text-[#FFDD93]">support@melodi.com</span>
            </p>
            <p>
              Phone: <span className="text-[#FFDD93]">+123 456 7890</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayContact;
