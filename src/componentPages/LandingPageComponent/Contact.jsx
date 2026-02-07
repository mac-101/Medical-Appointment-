import React from 'react'

const Contact = () => {
  return (
    <div>
      <section className="text-gray-600 body-font   ">
        <div className="container px-5 py-24 mx-auto lg:flex gap-12 justify-between items-center">
          {/* Left Side - Content */}
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Connect with Healthcare Providers That Understand Your Needs
            </h1>
            <p className="leading-relaxed mt-4">
              Join thousands of patients who have found their perfect healthcare match through our platform. 
              Get personalized doctor recommendations, access verified patient reviews, and receive appointment 
              availability directly in your inbox.
            </p>
            
            {/* Additional Benefits List */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Receive personalized doctor matches based on your health needs</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Get notified about appointment openings and waitlist reductions</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Access exclusive healthcare resources and wellness tips</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-3/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Create Your Healthcare Profile</h2>
            
            <div className="relative mb-4">
              <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
              <input 
                type="text" 
                id="full-name" 
                name="full-name" 
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="relative mb-4">
              <label htmlFor="zip-code" className="leading-7 text-sm text-gray-600">ZIP Code</label>
              <input 
                type="text" 
                id="zip-code" 
                name="zip-code" 
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter your ZIP code"
              />
            </div>

            <div className="relative mb-6">
              <label htmlFor="health-concern" className="leading-7 text-sm text-gray-600 mb-2 block">Primary Health Interest</label>
              <select 
                id="health-concern" 
                name="health-concern" 
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="">Select an option</option>
                <option value="primary-care">Primary Care Physician</option>
                <option value="specialist">Specialist Referral</option>
                <option value="pediatrics">Pediatric Care</option>
                <option value="mental-health">Mental Health Services</option>
                <option value="preventive">Preventive Care</option>
                <option value="chronic">Chronic Condition Management</option>
                <option value="emergency">Emergency & Urgent Care</option>
              </select>
            </div>
            
            <button className="text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-700 rounded text-lg transition-colors duration-200">
              Find Healthcare Providers
            </button>
            
            <p className="text-xs text-gray-500 mt-3">
              By signing up, you agree to our Privacy Policy and consent to receive healthcare updates and provider recommendations. 
              You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact