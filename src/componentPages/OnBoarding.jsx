import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 1. ONBOARDING COMPONENT ---
// Added { onFinish } to the props so the Skip/Next buttons work
const Onboarding = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  // Slide data

  const slides = [
    {
      id: 1,
      title: "Access World-Class Specialists in Seconds",
      description: "Connect with verified medical professionals across all specialties in one unified platform.",
      bgImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "The All-in-One Healthcare Operating System",
      description: "Manage appointments, medical records, and prescriptions with a seamless, digital-first experience.",
      bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Bridging the Gap Between Doctors and Hospitals",
      description: "A complete network designed to provide faster care and better health outcomes for everyone.",
      bgImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onFinish(); // This triggers the move to GetStarted
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* BACKGROUND IMAGES LAYER */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        />
      ))}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10"></div>

      {/* CONTENT BOX */}
      <div className="absolute bottom-0 w-full px-10 pb-16 flex flex-col items-center z-20">
        <div className="flex space-x-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index ? "w-12 bg-blue-500" : "w-4 bg-white/40"
                }`}
            />
          ))}
        </div>

        <h1 className="text-4xl font-black text-center text-white drop-shadow-lg leading-tight tracking-tight">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg font-semibold text-center text-white drop-shadow-lg leading-tight tracking-tight">
          {slides[currentSlide].description}
        </p>

        <div className="w-full flex justify-between items-center mt-12 px-2">
          <button
            className="text-white/80 font-bold text-xl hover:text-white"
            onClick={() => navigate('/signup')} // Skip goes to GetStarted
          >
            Skip
          </button>

          <button
            onClick={handleNext}
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white/30 transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};



// --- MAIN APP CONTROLLER ---
export default function FirstPage({ }) {

  const navigate = useNavigate();


  return (
    <main className="w-full min-h-screen bg-white">
      <Onboarding onFinish={() => navigate('/signup')} />

    </main>
  );
}