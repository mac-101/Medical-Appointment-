import React from 'react';
import { MapPin, BookIcon } from 'lucide-react'; 

const Services = () => {
  return (
    <section id='howitworks' className="py-20 bg-white">
      

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative hidden md:block rounded-sm overflow-hidden shadow-sm max-h-150">
          <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop" alt="Cooking" />
          
        </div>

        <div>
          <span className="text-blue-600 font-semibold font px-4 py-1 rounded-full text-sm">
            Book an Appointment
          </span>
          <h2 className="text-4xl font-bold font mt-4 mb-6 text-gray-900">
            Quality Care on Your Schedule
          </h2>
          <p className="text-gray-500 font-serif mb-10">
            Skip the waiting room. Schedule a virtual or in-person visit with our
            specialists in just a few clicks.
          </p>

          <div className="grid grid-cols-2 gap-8">

            {/* Option 1: Virtual Visit */}
            <div className="flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold mb-2">Search Specialist</h4>
                <p className="text-sm text-gray-500">Find and connect with the right medical professional near you.</p>
              </div>
            </div>

            {/* Option 2: Clinic Visit */}
            <div className="flex flex-col gap-4 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                <BookIcon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold mb-2">Book your appointment</h4>
                <p className="text-sm text-gray-500">Book a slot with your chosen specialist at your convenience.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/">
            <button className="backdrop-blur-md px-6 py-2 rounded-full border border-black/30 hover:bg-gray-50 font-semibold  text-blue-600 transition">
              Book Appointment
            </button>
            </a>
            <a href="/appointments">
            <button className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-all">
              View Appointments
            </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;