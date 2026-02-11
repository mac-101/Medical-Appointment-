import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-10">

        {/* Updated CTA Bar for Appointments */}
        <div className="bg-blue-600 rounded-3xl p-10 flex flex-col md:flex-row justify-between items-center mb-24 -mt-32 shadow-2xl">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Ready to prioritize your health?</h2>
            <p className="text-blue-100">Book your first consultation in minutes and meet our expert doctors.</p>
          </div>
          <a href="/">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold mt-6 md:mt-0 hover:bg-gray-100 transition-colors">
              Book Appointment Now
            </button>
          </a>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {/* Newsletter/Brand Section */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center mb-5 gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105 ">
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
              <h1 className="text-white font-black text-xl tracking-tighter uppercase">
                Health<span className="text-blue-600">Core</span>
              </h1>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Providing accessible healthcare rights through digital innovation. Join our newsletter for health tips and platform updates.
            </p>
            <div className="flex max-w-md gap-2">
              <input
                type="email"
                placeholder="Doctor or Patient email"
                className="bg-gray-800 border-none rounded-lg px-4 flex-1 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-colors">
                Join
              </button>
            </div>
          </div>

          {/* Patient Links */}
          <div>
            <h4 className="font-bold mb-6 text-white">For Patients</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <a href="/search"><li className="hover:text-blue-400 cursor-pointer transition-colors">Find a Specialist</li></a>
              <a href="#howitworks"><li className="hover:text-blue-400 cursor-pointer transition-colors">How it Works</li></a>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Patient Stories</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Help Center</li>
            </ul>
          </div>

          {/* Provider Links */}
          <div>
            <h4 className="font-bold mb-6 text-white">For Doctors</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <a href="/signUp"><li className="hover:text-blue-400 cursor-pointer transition-colors font-semibold text-blue-400">Join as a Provider</li></a>
              <a href="/profile"><li className="hover:text-blue-400 cursor-pointer transition-colors">Provider Dashboard</li></a>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <div className="flex items-center gap-6">
            <span>© 2026 HealTrust Inc.</span>
            <div className="flex gap-4">
              {/* Simple Social Icons Placeholder */}
              <span className="hover:text-white cursor-pointer">Twitter</span>
              <span className="hover:text-white cursor-pointer">LinkedIn</span>
            </div>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;