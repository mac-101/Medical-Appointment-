import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';


const Hero = () => {


  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="relative h-dvh min-h-175 w-full text-white">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1758691461957-474a7686e388?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover"
          alt="Doctors"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Navbar */}
      <div className={`relative w-full  z-400 `}>
        <nav className="relative z-10 flex items-center justify-between px-4 md:px-10 py-6 max-w-7xl mx-auto">
          <div className="text-2xl font-bold flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-lg shadow-slate-200">
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
              <h1 className="text-black font-black text-xl tracking-tighter uppercase">
                Health<span className="text-blue-600">Core</span>
              </h1>
            </Link>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a className='hover:scale-115 hover:text-blue-600' href="/signUp">Join as provider</a>
            <a className='hover:scale-115 hover:text-blue-600' href="/">Find care</a>
            <a className='hover:scale-115 hover:text-blue-600' href="/document">Docs</a>
            <a className='hover:scale-115 hover:text-blue-600' href="/">Sponsor</a>
          </div>
          <div className='flex items-center gap-2'>
            <a href="/signUp" >
              <button className="bg-gray-200/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition">
                Sign Up
              </button>
            </a>
            <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon />

            </button>
          </div>
        </nav>
        {isOpen && (
          <div className={`text-white absolute top-22.9 md:hidden w-full ${isOpen && "bg-black/50 backdrop-blur-2xl"} `}>
            <div className="flex flex-col text-center gap-2 text-lg w-full font-medium">
              <a className='hover:scale-105 hover:backdrop-blur-sm w-full p-4' href="/signUp">Join as provider</a>
              <a className='hover:scale-105 hover:backdrop-blur-sm w-full p-4' href="/">Find care</a>
              <a className='hover:scale-105 hover:backdrop-blur-sm w-full p-4' href="/document">Docs</a>
              <a className='hover:scale-105 hover:backdrop-blur-sm w-full p-4' href="/">Sponsor</a>
            </div>

          </div>
        )}

      </div>
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center lg:justify-end h-[calc(100%-100px)]">
        {/* <p className="text-xl max-w-sm text-blue-600 font-serif">
                    Make appointment with top doctors anytime, from any location.
                </p> */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font  leading-tight mb-15 reveal" data-animation="zoom-in" data-delay="0.2s">
          Book Appointment With Specialist <br /> Anytime, Anywhere
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 reveal" data-animation="zoom-in" data-delay="0.2s">
          <p className="text-sm  md:text-lg text-gray-200 max-w-xl mb-8">
            Access top-tier health consultations from the comfort of your home or on the go.
            Our platform connects you with experienced professionals around the clock.
          </p>

          <a href="/">
            <button className="bg-gray-200/20 lg:mr-50 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition">
              {/* <span className="w-10 h-10 border border-white rounded-full flex items-center justify-center">▶</span> */}
              Find Doctors
            </button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;