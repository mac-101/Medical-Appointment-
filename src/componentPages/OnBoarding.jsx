import React, { useState } from 'react';

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

 const slides = [
  {
    id: 1,
    title: "Find a Lot of Specialist Doctors in One Place",
    bgImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Complete Network of Health Care",
    bgImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop"
  }
];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* BACKGROUND IMAGES LAYER */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        />
      ))}

      {/* OVERLAY: Darkens the image slightly so white text is readable */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10"></div>

      {/* CONTENT BOX */}
      <div className="absolute bottom-0 w-full px-10 pb-16 flex flex-col items-center z-20">
        
        {/* Dash Controllers */}
        <div className="flex space-x-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === index ? "w-12 bg-blue-500" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Headline - Larger, White, and Bold */}
        <h1 className="text-4xl font-black text-center text-white drop-shadow-lg leading-tight tracking-tight">
          {slides[currentSlide].title}
        </h1>

        {/* Navigation Row */}
        <div className="w-full flex justify-between items-center mt-16 px-2">
          <button 
            className="text-white/80 font-bold text-xl hover:text-white transition-colors" 
            onClick={() => console.log("Skip")}
          >
            Skip
          </button>

          <button 
            onClick={handleNext}
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-blue-500 active:scale-90 transition-all border-4 border-white/30"
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

export default Onboarding;