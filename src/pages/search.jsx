import React, { useState } from 'react';
import Teeth from '../Images/teeth.png';
import Heart from '../Images/heart.png';
import Physical from '../Images/physical.png';
import Dermatology from '../Images/dermatology.png';
import Pediatrician from '../Images/pediatrician.png';
import Orthopedics from '../Images/orthopedics.png';
import doctor1 from '../Images/doctor1.png';
import doctor2 from '../Images/doctor2.png';
import doctor3 from '../Images/doctor3.png';
import doctor4 from '../Images/doctor4.png';
import doctor5 from '../Images/doctor5.png';
import doctor6 from '../Images/doctor6.png';
import doctor7 from '../Images/doctor7.png';
import doctor8 from '../Images/doctor8.png';
import doctor9 from '../Images/doctor9.png';
import doctor10 from '../Images/doctor10.png';

// Changed name to FindDoctors to avoid conflict with the Search icon
function FindDoctors() {
  const [activeView, setActiveView] = useState('categories');

  return (
    <div className='find-doctors w-full min-h-screen bg-gray-50'>
      {/* 1. HEADER SECTION */}
      <div className='top-find flex flex-col md:flex-row justify-between items-center gap-4 p-5 md:p-10 max-w-7xl mx-auto'>
        <h1 className='font-bold text-2xl md:text-3xl text-blue-500'>
          {activeView === 'categories' ? 'Categories' : activeView}
        </h1>

        <div className='find-search w-full md:w-80 outline-1 outline-gray-300 h-11 flex items-center bg-white rounded-2xl px-4 gap-2 shadow-sm'>
          <i className="bi bi-search text-gray-400 cursor-pointer"></i>
          <input type="text" placeholder="Search doctors..." className='outline-none w-full text-sm' />
        </div>
      </div>

      {/* 2. THE SWITCHING LOGIC */}
      {activeView === 'categories' ? (
        // RESPONSIVE CATEGORY GRID
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5 md:p-10 justify-items-center max-w-7xl m-auto">

          <div
            onClick={() => setActiveView('Dentistry')}
            className="h-64 bg-white shadow-md w-full max-w-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 border-2 border-transparent transition-all"
          >
            <img src={Teeth} alt="Dentistry" className='w-12 mb-2' />
            <h6 className='text-gray-400 text-sm'>22 Specialist</h6>
            <p className="font-bold text-2xl md:text-3xl text-blue-600">Dentistry</p>
          </div>

          <div
            onClick={() => setActiveView('Cardiology')}
            className="h-64 bg-white shadow-md w-full max-w-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 border-2 border-transparent transition-all"
          >
            <img src={Heart} alt="Cardiology" className='w-12 mb-2' />
            <h6 className='text-gray-400 text-sm'>26 Specialist</h6>
            <p className="font-bold text-2xl text-blue-600">Cardiology</p>
          </div>

          <div
            onClick={() => setActiveView("Psychologist")}
            className="h-64 bg-white shadow-md w-full max-w-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 border-2 border-transparent transition-all"
          >
            <img src={Physical} alt="Psychologist" className='w-12 mb-2' />
            <h6 className='text-gray-400 text-sm'>20 Specialist</h6>
            <p className="font-bold text-2xl text-blue-600">Psychologist</p>
          </div>

          <div
            onClick={() => setActiveView("Dermatologist")}
            className="h-64 bg-white shadow-md w-full max-w-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 border-2 border-transparent transition-all"
          >
            <img src={Dermatology} alt="Dermatologist" className='w-12 mb-2' />
            <h6 className='text-gray-400 text-sm'>19 Specialist</h6>
            <p className="font-bold text-2xl text-blue-600">Dermatologist</p>
          </div>

          <div
            onClick={() => setActiveView("Pediatrician")}
            className="h-64 bg-white shadow-md w-full max-w-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 border-2 border-transparent transition-all"
          >
            <img src={Pediatrician} alt="Pediatrician" className='w-12 mb-2' />
            <h6 className='text-gray-400 text-sm'>18 Specialist</h6>
            <p className="font-bold text-2xl text-blue-600">Pediatrician</p>
          </div>

          <div
            onClick={() => setActiveView("Orthopedics")}
            className="h-64 bg-white shadow-md w-full max-w-sm rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 border-2 border-transparent transition-all"
          >
            <img src={Orthopedics} alt="Orthopedics" className='w-12 mb-2' />
            <h6 className='text-gray-400 text-sm'>29 Specialist</h6>
            <p className="font-bold text-2xl text-blue-600">Orthopedics</p>
          </div>
        </div>
      ) : (
        <div className="p-5 md:p-10 max-w-7xl mx-auto">
          <button
            onClick={() => setActiveView('categories')}
            className="text-blue-500 mb-6 hover:underline font-medium flex items-center gap-2"
          >
            ← Back to All Categories
          </button>

          <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm text-center">
            <h2 className='text-xl font-semibold mb-6'>Available {activeView} Doctors</h2>

            {/* RESPONSIVE DOCTOR GRID */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>

              {/* CARD 1 */} 
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor1} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. John Doe</b>
                  <h3 className='text-blue-600 text-sm'>Cardiologist</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 10 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>4.8</b>
                  </div>
                </div>
              </div>

              {/* CARD 2 */}
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor2} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. Sarah Chen</b>
                  <h3 className='text-blue-600 text-sm'>Dermatologist</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 11 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>4.0</b>
                  </div>
                </div>
              </div>

              {/* CARD 3 */}
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor3} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. James Wilson</b>
                  <h3 className='text-blue-600 text-sm'>Neurologist</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 13 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>4.8</b>
                  </div>
                </div>
              </div>

              {/* CARD 4 */}
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor4} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. James Wilson</b>
                  <h3 className='text-blue-600 text-sm'>Orthopedic</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 15 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>4.6</b>
                  </div>
                </div>
              </div>

              {/* CARD 5 */}
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor5} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. James Wilson</b>
                  <h3 className='text-blue-600 text-sm'>Infectious</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 9 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>3.5</b>
                  </div>
                </div>
              </div>

              {/* CARD 6 */}
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor6} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. James Wilson</b>
                  <h3 className='text-blue-600 text-sm'>Nephrologist</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 19 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>3.9</b>
                  </div>
                </div>
              </div>

              {/* CARD 7 */}
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor7} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. James Wilson</b>
                  <h3 className='text-blue-600 text-sm'>Pulmonologist</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 5 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>4.2</b>
                  </div>
                </div>
              </div>

              {/* CARD 8 */}
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor8} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. James Wilson</b>
                  <h3 className='text-blue-600 text-sm'>Ophthalmologist</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 10 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>4.2</b>
                  </div>
                </div>
              </div>

              {/* CARD 9 */}
              <div className='overflow-hidden w-full max-w-[320px] h-105 rounded-2xl shadow-md hover:border-blue-500 border-2 border-transparent transition-all relative group'>
                <img src={doctor9} alt="Doctor" className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105' />
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-sm p-4 shadow-lg rounded-2xl text-left'>
                  <b className='block text-lg'>Dr. James Wilson</b>
                  <h3 className='text-blue-600 text-sm'>Pediatrician</h3>
                  <h5 className='text-gray-600 text-xs'>Experience: 8 years</h5>
                  <div className='mt-1 flex items-center gap-1'>
                    <i className="bi bi-star-fill text-orange-500 text-xs"></i>
                    <b className='text-xs'>4.4</b>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindDoctors;