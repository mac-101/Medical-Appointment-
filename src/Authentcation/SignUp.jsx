import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PatientLogin } from "../componentPages/LoginsComponents.jsx";
import toast from "react-hot-toast";


// --- COMPONENT 1: GET STARTED (PLAIN) ---
const GetStarted = ({ onContinue, onLogin }) => {


  return (
    <div className="relative h-screen w-full bg-white flex flex-col items-center justify-between py-16 px-8 transition-all">
      <div className="flex flex-col items-center mt-10 text-center">
        {/* Minimal Logo Space */}
        <div className="w-16 h-16 mb-6 flex items-center justify-center bg-slate-900 rounded-2xl text-white">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2.9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Healthcore OS</h1>
        <p className="text-slate-500 font-medium mt-1 uppercase tracking-[0.2em] text-[10px]">Inspiring Health Everyday</p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Stay healthy and fit</h2>
        <p className="text-slate-500 mt-2">Let's get started with your account</p>
      </div>

      <div className="w-full max-w-sm space-y-3 mb-10">
        <button onClick={onLogin} className="w-full py-4 bg-slate-900 text-white font-semibold text-lg rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all">
          Sign In
        </button>
        <button onClick={onContinue} className="w-full py-4 bg-white border border-slate-200 text-slate-900 font-semibold text-lg rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all">
          Create Account
        </button>
      </div>
      <p className="absolute bottom-6 text-slate-400 text-[10px] font-medium uppercase tracking-widest">© Ayon Bepary Design</p>
    </div>
  );
};

// --- COMPONENT 2: ROLE SELECTION (PLAIN) ---
const RoleSelection = ({ onRoleSelected, pickRole }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const roles = [
    { id: 'patient', title: 'Patient', desc: 'I want to book an appointment' },
    { id: 'doctor', title: 'Doctor', desc: 'I want to manage my patients' },
    { id: 'hospital', title: 'Hospital', desc: 'Management & Administration' },
  ];

  const handleRoleSubmit = () => {
    if (!selectedRole) return toast.error("Please select a role first!");
    setIsProcessing(true);
    setTimeout(() => {
      onRoleSelected(selectedRole);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center py-16 px-8">
      <div className='relative max-w-md mx-auto min-h-[70vh] w-full flex flex-col'>

        <button onClick={pickRole} className="text-slate-400 mb-8 hover:text-slate-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="mb-12 text-left">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Select Role</h1>
          <p className="text-slate-500 mt-2">Choose how you will use the platform</p>
        </div>

        <div className="space-y-3 flex-1">

          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full p-5 rounded-xl transition-all flex items-center space-x-4 text-left border ${selectedRole === role.id
                ? "border-slate-900 bg-slate-50"
                : "border-slate-100 bg-white hover:border-slate-200"
                }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedRole === role.id ? "border-slate-900" : "border-slate-300"
                }`}>
                {selectedRole === role.id && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full" />}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 leading-none">{role.title}</h3>
                <p className="text-slate-500 text-sm mt-1.5">{role.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleRoleSubmit}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all mt-8 ${selectedRole ? "bg-slate-900 text-white active:scale-[0.98]" : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
        >
          {isProcessing ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStep, setCurrentStep] = useState('getStarted');
  const location = useLocation();

  const handleStart = () => setCurrentStep('selectRole');
  const onLogin = () => setCurrentStep('login');
  const handleRoleChoice = (role) => {
    setSelectedRole(role);
    setCurrentStep('finalForm');
  };

  useEffect(() => {
    // Reset to initial step when location changes to /signup or /login
    if (location.pathname === '/login') {
      setCurrentStep('login');
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-white">
      {currentStep === 'getStarted' && (
        <GetStarted onContinue={handleStart} onLogin={onLogin} />
      )}

      {currentStep === 'selectRole' && (
        <RoleSelection onRoleSelected={handleRoleChoice} pickRole={() => setCurrentStep('getStarted')} />
      )}

      {currentStep === 'finalForm' && (
        <PatientLogin getUser={selectedRole} loggingIn={false} pickRole={handleStart} />
      )}

      {currentStep === 'login' && (
        <PatientLogin getUser={selectedRole} loggingIn={true} pickRole={() => setCurrentStep('getStarted')} clickCreate={() => setCurrentStep('finalForm')} />
      )}
    </div>
  );
}