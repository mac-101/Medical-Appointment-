import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-gray-600 body-font bg-linear-to-b from-white to-blue-50 border-t border-blue-100 ">
      {/* Main Footer Content */}
      <div className=" px-5 py-12 mx-auto w-[85%]">
        <div className="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
          {/* Company Info */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 mb-4">
              <div className="w-10 h-10 text-white p-2 bg-blue-600 rounded-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold text-blue-900">HealthConnect</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your trusted partner in healthcare navigation. Connecting patients with the right doctors and hospitals since 2010.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-blue-600">Email:</span> support@healthconnect.com
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium text-blue-600">Phone:</span> 1-800-HEALTH-12
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:w-1/6 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              QUICK LINKS
            </h2>
            <nav className="list-none mb-10">
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Find a Doctor
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Browse Hospitals
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Book Appointment
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Emergency Services
                </a>
              </li>
            </nav>
          </div>

          {/* Resources */}
          <div className="lg:w-1/6 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              RESOURCES
            </h2>
            <nav className="list-none mb-10">
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Health Articles
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Patient Reviews
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Insurance Guides
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Wellness Tips
                </a>
              </li>
            </nav>
          </div>

          {/* Company */}
          <div className="lg:w-1/6 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              COMPANY
            </h2>
            <nav className="list-none mb-10">
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Press
                </a>
              </li>
              <li className="mb-2">
                <a className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                  Contact
                </a>
              </li>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              STAY CONNECTED
            </h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-full sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2 mb-2 sm:mb-0">
                <label htmlFor="footer-field" className="leading-7 text-sm text-gray-600">
                  Get health tips & updates
                </label>
                <input 
                  type="email" 
                  id="footer-field" 
                  name="footer-field" 
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Your email"
                />
              </div>
              <button className="lg:mt-2 xl:mt-0 shrink-0 inline-flex text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-3 md:text-left text-center">
              Get weekly healthcare insights delivered to your inbox.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-50 border-t border-blue-100">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-blue-200 sm:py-2 sm:mt-0 mt-4">
            © {currentYear} HealthConnect — 
            <span className="text-gray-600 ml-1">Connecting patients with quality healthcare.</span>
          </p>
          
          <div className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors duration-200">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors duration-200">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors duration-200">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors duration-200">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
            <a className="ml-3 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors duration-200">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
              </svg>
            </a>
          </div>

          {/* Legal Links */}
          <div className="sm:ml-6 mt-4 sm:mt-0">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-gray-300">•</span>
              <a className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                Terms of Service
              </a>
              <span className="text-gray-300">•</span>
              <a className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                HIPAA Compliance
              </a>
              <span className="text-gray-300">•</span>
              <a className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-blue-600 text-white py-3 max-md:hidden">
          <div className="container mx-auto px-5">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L2.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="font-medium">For medical emergencies, call 911 immediately.</span>
              <span className="hidden md:inline">•</span>
              <span>This platform is for non-emergency healthcare navigation only.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer