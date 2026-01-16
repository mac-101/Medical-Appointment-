import React, { useState } from 'react';

// --- 1. ONBOARDING COMPONENT ---
// Added { onFinish } to the props so the Skip/Next buttons work
const Onboarding = ({ onFinish }) => {
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
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${
            index === currentSlide ? "opacity-100" : "opacity-0"
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
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === index ? "w-12 bg-blue-500" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>

        <h1 className="text-4xl font-black text-center text-white drop-shadow-lg leading-tight tracking-tight">
          {slides[currentSlide].title}
        </h1>

        <div className="w-full flex justify-between items-center mt-12 px-2">
          <button
            className="text-white/80 font-bold text-xl hover:text-white"
            onClick={onFinish} // Skip goes to GetStarted
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

// --- 2. GET STARTED COMPONENT ---
const GetStarted = ({ onLogin, onSignUp }) => {
  return (
    <div className="relative h-screen w-full bg-linear-to-b from-white via-blue-50 to-blue-300 flex flex-col items-center justify-between py-16 px-8 transition-all">
      <div className="flex flex-col items-center mt-10">
        <div className="w-24 h-24 mb-4 flex items-center justify-center bg-white rounded-3xl shadow-xl p-4">
          <div className="relative w-full h-full text-blue-600">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-800">Healthcare OS</h1>
        <p className="text-blue-600 font-medium mt-1 uppercase tracking-widest text-xs">Inspiring Health Everyday</p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">Login to Stay healthy and fit</h2>
        <p className="text-xl font-black text-slate-800 mt-2">Let's get started!</p>
      </div>

      <div className="w-full space-y-4 mb-10">
        <button onClick={onLogin} className="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-full shadow-lg active:scale-95 transition-all">Login</button>
        <button onClick={onSignUp} className="w-full py-4 bg-transparent border-2 border-blue-400 text-blue-700 font-bold text-lg rounded-full active:scale-95 transition-all">Sign Up</button>
      </div>
      <p className="absolute bottom-4 text-slate-500 text-xs font-medium uppercase tracking-tighter text-center">© Ayon Bepary Design</p>
    </div>
  );
};

// --- 3. ROLE SELECTION COMPONENT ---
const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const roles = [
    { id: 'patient', title: 'Patient', icon: '👤', desc: 'I want to book an appointment' },
    { id: 'doctor', title: 'Doctor', icon: '🩺', desc: 'I want to manage my patients' },
    { id: 'hospital', title: 'Hospital', icon: '🏥', desc: 'Management & Administration' },
  ];

  const handleRoleSubmit = () => {
    if (!selectedRole) return alert("Please select a role first!");
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Role: ${selectedRole.toUpperCase()} selected. Ready for Hub!`);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-b from-white to-blue-50 flex flex-col px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-slate-800">Select Your Role</h1>
        <p className="text-slate-500 mt-2">How will you be using HealthCore?</p>
      </div>
      <div className="space-y-4 flex-1">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`w-full p-5 rounded-3xl border-2 transition-all flex items-center space-x-4 text-left ${
              selectedRole === role.id ? "border-blue-600 bg-blue-50 shadow-md scale-[1.02]" : "border-slate-100 bg-white"
            }`}
          >
            <span className="text-4xl bg-white p-3 rounded-2xl shadow-sm">{role.icon}</span>
            <div>
              <h3 className={`font-bold text-lg ${selectedRole === role.id ? "text-blue-700" : "text-slate-800"}`}>{role.title}</h3>
              <p className="text-slate-500 text-sm">{role.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={handleRoleSubmit}
        disabled={isProcessing}
        className={`w-full py-4 mt-8 rounded-full font-bold text-lg shadow-xl transition-all ${
          selectedRole ? "bg-blue-600 text-white active:scale-95" : "bg-slate-200 text-slate-400"
        }`}
      >
        {isProcessing ? "Processing..." : "Continue"}
      </button>
    </div>
  );
};

// --- MAIN APP CONTROLLER ---
export default function FirstPage() {
  const [step, setStep] = useState('onboarding');

  // This logic now correctly toggles between screens
  return (
    <main className="w-full min-h-screen bg-white">
      {step === 'onboarding' && <Onboarding onFinish={() => setStep('getstarted')} />}
      {step === 'getstarted' && <GetStarted onSignUp={() => setStep('roles')} />}
      {step === 'roles' && <RoleSelection />}
    </main>
  );
}