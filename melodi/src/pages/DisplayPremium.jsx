import React from "react";
import Navbar from "../components/Navbar";

const DisplayPremium = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen  text-[#F5F5F5] py-16 px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#FFDD93]">
            Upgrade to Premium
          </h1>
          <p className="mt-4 text-[#E8A2B4] text-lg">
            Unlock all the amazing features and take your experience to the next
            level!
          </p>
        </div>

        {/* Premium Plans */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Basic Plan */}
          <div className="bg-[#633a4b] rounded-lg shadow-lg p-8 w-full md:w-1/3 max-w-md text-center">
            <h2 className="text-3xl font-bold text-[#FFDD93]">Basic</h2>
            <p className="mt-2 text-[#A3C4C9]">Perfect for individuals</p>
            <p className="mt-4 text-4xl font-semibold text-[#E8A2B4]">
              $5/month
            </p>
            <ul className="mt-6 space-y-4">
              <li>• Access to 1,000 songs</li>
              <li>• Limited skips</li>
              <li>• Standard audio quality</li>
            </ul>
            <button className="mt-8 w-full py-3 text-lg font-semibold text-[#412C3A] bg-[#FFDD93] rounded-md hover:bg-[#E8A2B4] transition duration-200">
              Choose Basic
            </button>
          </div>

          {/* Standard Plan */}
          <div className="bg-[#633a4b] rounded-lg shadow-lg p-8 w-full md:w-1/3 max-w-md text-center">
            <h2 className="text-3xl font-bold text-[#FFDD93]">Standard</h2>
            <p className="mt-2 text-[#A3C4C9]">Best for music enthusiasts</p>
            <p className="mt-4 text-4xl font-semibold text-[#E8A2B4]">
              $10/month
            </p>
            <ul className="mt-6 space-y-4">
              <li>• Unlimited songs</li>
              <li>• Ad-free experience</li>
              <li>• High audio quality</li>
            </ul>
            <button className="mt-8 w-full py-3 text-lg font-semibold text-[#412C3A] bg-[#FFDD93] rounded-md hover:bg-[#E8A2B4] transition duration-200">
              Choose Standard
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-[#633a4b] rounded-lg shadow-lg p-8 w-full md:w-1/3 max-w-md text-center">
            <h2 className="text-3xl font-bold text-[#FFDD93]">Premium</h2>
            <p className="mt-2 text-[#A3C4C9]">For ultimate music lovers</p>
            <p className="mt-4 text-4xl font-semibold text-[#E8A2B4]">
              $15/month
            </p>
            <ul className="mt-6 space-y-4">
              <li>• Everything in Standard</li>
              <li>• Offline downloads</li>
              <li>• Exclusive content access</li>
            </ul>
            <button className="mt-8 w-full py-3 text-lg font-semibold text-[#412C3A] bg-[#FFDD93] rounded-md hover:bg-[#E8A2B4] transition duration-200">
              Choose Premium
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center text-[#A3C4C9]">
          <p>
            Join thousands of users enjoying premium features. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayPremium;
