import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Find Doctors Nearby",
      description:
        "Search by location, specialty, or specific healthcare needs to find qualified medical professionals in your area.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
      ),
      color: "bg-blue-500",
    },
    {
      number: 2,
      title: "View Profiles & Reviews",
      description:
        "Check doctor qualifications, experience, patient ratings, and reviews to make an informed decision.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      color: "bg-green-500",
    },
    {
      number: 3,
      title: "Book Appointment Online",
      description:
        "Schedule your visit instantly with real-time availability and receive instant confirmation.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
      ),
      color: "bg-purple-500",
    },
    {
      number: 4,
      title: "Get Quality Healthcare",
      description:
        "Attend your appointment and receive professional medical care from trusted healthcare providers.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          ></path>
        </svg>
      ),
      color: "bg-red-500",
    },
  ];

  return (
    <div className="w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and connect with healthcare professionals in just a few simple
            steps
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0  transform -translate-y-1/2 h-0.5 bg-gray-200 mb-12"></div>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number Circle */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div
                    className={`w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 mt-8">
                  <div
                    className={`w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mb-4`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 -z-10"></div>

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Number Circle */}
                  <div
                    className={`absolute left-6 top-0 transform -translate-x-1/2 w-12 h-12 ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white z-10`}
                  >
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="ml-20 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-10 h-10 ${step.color} rounded-lg flex items-center justify-center text-white mr-3`}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="mt-20 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                500+
              </div>
              <div className="text-gray-700 font-medium">Verified Doctors</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                10K+
              </div>
              <div className="text-gray-700 font-medium">Patients Helped</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                50+
              </div>
              <div className="text-gray-700 font-medium">Specialties</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                24/7
              </div>
              <div className="text-gray-700 font-medium">Support Available</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HowItWorks;
