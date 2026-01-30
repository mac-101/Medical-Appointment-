import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from "../Authentcation/LoginIn.jsx";
import { signUpUser } from '../services/firebaseAuth.jsx'
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

const PatientLogin = ({ getUser, loggingIn, pickRole, clickCreate }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const ALL_SPECIALTIES = [
        "Addiction Medicine", "Adolescent Medicine", "Aerospace Medicine", "Allergy and Immunology",
        "Anesthesiology", "Audiology", "Bariatric Surgery", "Cardiology", "Cardiothoracic Surgery",
        "Child Psychiatry", "Chiropractic", "Clinical Genetics", "Colon and Rectal Surgery",
        "Critical Care Medicine", "Cytopathology", "Dentistry", "Dermatology", "Diagnostic Radiology",
        "Dietetics & Nutrition", "Emergency Medicine", "Endocrinology", "Family Medicine",
        "Fertility Specialist", "Forensic Pathology", "Gastroenterology", "General Practice",
        "General Surgery", "Geriatric Medicine", "Gynecologic Oncology", "Hematology",
        "Hepatology", "Hospice and Palliative Medicine", "Infectious Disease", "Internal Medicine",
        "Interventional Cardiology", "Medical Genetics", "Neonatology", "Nephrology",
        "Neurology", "Neuropsychology", "Neurosurgery", "Nuclear Medicine", "Nursing",
        "Obstetrics and Gynecology (OB-GYN)", "Occupational Medicine", "Oncology",
        "Ophthalmology", "Optometry", "Oral and Maxillofacial Surgery", "Orthodontics",
        "Orthopedic Surgery", "Otolaryngology (ENT)", "Pain Management", "Pathology",
        "Pediatric Surgery", "Pediatrics", "Physical Medicine and Rehabilitation",
        "Physical Therapy", "Plastic Surgery", "Podiatry", "Preventive Medicine",
        "Psychiatry", "Psychology", "Pulmonology", "Radiation Oncology", "Radiology",
        "Reproductive Endocrinology", "Rheumatology", "Sleep Medicine", "Sports Medicine",
        "Thoracic Surgery", "Urology", "Vascular Surgery"
    ]; // Already sorted by nature of the list

    const navigate = useNavigate();
    const selectedRole = getUser;
    const [isLogin, setisLogin] = useState(loggingIn);

    const goSign = () => {
        setisLogin(!isLogin);
    };

    let displayTitle = "Sign Up";
    let bgImage = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200";

    if (selectedRole === 'doctor') {
        displayTitle = "Doctor Registration";
        bgImage = "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200";
    } else if (selectedRole === 'hospital') {
        displayTitle = "Hospital Partnership";
        bgImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200";
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // 1. Safety Check: Ensure there is always a role!
        // If selectedRole is null/undefined, default to 'patient'
        const finalRole = selectedRole || 'patient';

        const searchTerms = [
            fullName,
            finalRole === 'doctor' ? specialty : '',
            finalRole === 'hospital' ? location : '',
        ].filter(Boolean).join(' ').toLowerCase();

        // 2. Package the data using finalRole
        const dataToSave = {
            email,
            password,
            fullName,
            name: fullName,
            role: finalRole, // Use the safety-checked role here
            specialty: finalRole === 'doctor' ? specialty : null,
            location: (finalRole === 'hospital' || finalRole === 'doctor') ? location : null,
            searchIndex: searchTerms,
            createdAt: new Date().toISOString(), // Good for records
        };

        const result = await signUpUser(dataToSave);
        setIsLoading(false);

        if (result.success) {
            toast.success("Signed In Succesfuly")
            setTimeout(() => {
                navigate('/');
            }, 2500);
        } else {
            toast.error(result.error);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-white">

            {/* LEFT SIDE: Image */}
            <div className="hidden lg:block sticky top-0 h-screen w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
                <div className="absolute inset-0 bg-slate-900/20" />
            </div>

            {/* RIGHT SIDE: Centered Content */}
            <div className="flex items-center justify-center w-full bg-white p-8 sm:p-12 lg:p-20">
                <div className="w-full max-w-md">
                    {!isLogin ? (
                        <>
                            {/* Plain Back Button */}
                            <button onClick={pickRole} className="text-slate-400 mb-8 hover:text-slate-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="mb-10">
                                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">{displayTitle}</h1>
                                <p className="text-slate-500 mt-2">Enter your details to create an account</p>
                            </div>

                            <form onSubmit={handleSignUp} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        {selectedRole === 'hospital' ? 'Hospital Name' : 'Full Name'}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 outline-none transition-all"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 outline-none transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 outline-none transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {selectedRole === 'hospital' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Hospital Location</label>
                                        <input
                                            type="text"
                                            placeholder="City, Country"
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 outline-none transition-all"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        />
                                    </div>
                                )}

                                {selectedRole === 'doctor' && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 relative">
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                                            Medical Specialty
                                        </label>

                                        {/* The Search Input */}
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search specialty (e.g. Surgery)"
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-600 outline-none transition-all"
                                                value={specialty}
                                                onChange={(e) => {
                                                    setSpecialty(e.target.value);
                                                    setIsOpen(true); // Show results as user types
                                                }}
                                                onFocus={() => setIsOpen(true)}
                                            />
                                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        </div>

                                        {/* The Results Dropdown */}
                                        {isOpen && (
                                            <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto no-scrollbar">
                                                {ALL_SPECIALTIES.filter(item =>
                                                    item.toLowerCase().includes(specialty.toLowerCase())
                                                ).length > 0 ? (
                                                    ALL_SPECIALTIES
                                                        .filter(item => item.toLowerCase().includes(specialty.toLowerCase()))
                                                        .map((item) => (
                                                            <div
                                                                key={item}
                                                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-slate-700 font-medium transition-colors"
                                                                onClick={() => {
                                                                    setSpecialty(item);
                                                                    setIsOpen(false);
                                                                }}
                                                            >
                                                                {item}
                                                            </div>
                                                        ))
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-slate-400">No specialty found...</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full py-4 mt-4 rounded-lg font-bold text-lg transition-all flex justify-center items-center ${isLoading
                                        ? "bg-slate-200 text-slate-400"
                                        : "bg-[#0f172a] text-white hover:bg-[#1e293b] active:scale-[0.99]"
                                        }`}
                                >
                                    {isLoading ? "Processing..." : "Create Account"}
                                </button>
                            </form>

                            <p className="mt-8 text-sm text-slate-600">
                                Already have an account? <span onClick={goSign} className="text-blue-700 font-bold cursor-pointer hover:underline">Log in</span>
                            </p>
                        </>
                    ) : (
                        <LoginPage onclick={goSign} pickRole={pickRole} create={clickCreate} />
                    )}
                </div>
            </div>
        </div>
    );
};

export { PatientLogin };