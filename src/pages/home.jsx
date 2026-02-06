import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDirectory } from '../Data/MockData';
import { DoctorCard } from '../components/doctorCard';
import { useAuth } from '../services/useAuthContext';
import { Search, AlertCircle, User, ChevronRight, Stethoscope, MapPin, Activity, ShieldCheck, HeartPulse, Baby, Scissors } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const dropdownRef = useRef(null); // Added for functional closing

  const { topDoctors, loading: directoryLoading } = useDirectory(50);
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState(""); // Added location state
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
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const searchTerm = specialty || location;
      if (searchTerm.trim() !== "") {
        navigate('/search', { state: { incomingSearch: searchTerm } });
      }
    }
  };

  const InlineLoading = () => (
    <div className="flex space-x-2 py-10 justify-center w-full">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] font-sans selection:bg-blue-100">

      {/* 1. System Header */}
      <header className="px-6 md:px-16 pt-8 pb-20 flex justify-between items-center max-w-7xl mx-auto rounded-b-[3rem] shadow-xl">
        {/* SIMPLE HERO SECTION */}
        <section className="px-8 pt-16 pb-10 text-center md:text-left md:flex items-center justify-between gap-10">
          <div className="md:w-3/5">
            <h2 className="text-5xl font md:text-7xl leading-16 text-slate-900  uppercase mb-6">
              Find <span className="text-blue-600">Doctors</span> <br />
              & Discover <span className="italic font-medium text-slate-400">Care</span>.
            </h2>
            <p className="text-slate-500 font-bold text-sm md:text-base max-w-lg leading-relaxed uppercase tracking-tight">
              Search the directory to find verified specialists, hospitals, and clinics near you. No stress, just health.
            </p>
          </div>

          {/* Visual side - simple & matured */}
          <div className="hidden md:flex md:w-2/5 justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500 rounded-full blur-3xl"></div>
              <Stethoscope size={180} className="text-slate-100 relative z-10 -rotate-12" />
            </div>
          </div>
        </section>
      </header>

      <main className="relative -mt-12 pb-20 ">
        <div className="max-w-7xl bg-white rounded-t-[3.5rem] overflow-hidden mx-auto shadow-2xl border border-slate-100">

          {/* 2. FUNCTIONAL SEARCH AREA */}
          <div className="px-4 pt-12 pb-8 bg-slate-50/50 border-b border-slate-100">
            <h2 className="text-xl font  text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
              <Activity className="text-blue-600 " size={20} /> Discovery Engine
            </h2>

            <div className="grid grid-cols-2 gap-4 max-w-4xl">
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Location (e.g. Ikeja)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full border border-slate-200 py-4 pl-14 pr-6 rounded-2xl outline-none focus:border-blue-300 bg-white transition-all shadow-sm"
                />
              </div>

              <div className="relative group" ref={dropdownRef}>
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Specialty (e.g. Cardiology)"
                  className="w-full border border-slate-200 py-4 pl-14 pr-6 rounded-2xl outline-none focus:border-blue-300 bg-white transition-all shadow-sm"
                  value={specialty}
                  onChange={(e) => { setSpecialty(e.target.value); setIsOpen(true); }}
                  onFocus={() => setIsOpen(true)}
                  onKeyDown={handleSearch}
                />

                {isOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto py-2">
                    {ALL_SPECIALTIES.filter(item => item.toLowerCase().includes(specialty.toLowerCase())).map((item) => (
                      <div
                        key={item}
                        className="px-6 py-3 hover:bg-blue-50 cursor-pointer text-sm font-bold text-slate-700"
                        onClick={() => { setSpecialty(item); setIsOpen(false); }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>


          </div>

          {/* 3. DOCTOR GRID */}
          <section className="py-12 px-3 md:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="font text-slate-900 text-xl uppercase tracking-tight">Top Specialists</h3>
                <p className="text-slate-400 text-[10px] roboto-font">Verified and Active</p>
              </div>
              <Link to="/search" className="text-blue-600 text-[10px] font-black flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest">
                Explore Full Directory <ChevronRight size={14} />
              </Link>
            </div>

            {directoryLoading ? (
              <InlineLoading />
            ) : (
              <div
                className="grid gap-3 md:gap-6"
                style={{
                  display: "grid",
                  gridTemplateColumns: window.innerWidth < 640
                    ? "repeat(2, 1fr)" // Force exactly 2 columns on small mobile
                    : "repeat(auto-fill, minmax(200px, 1fr))" // Responsive "Discovery" blocks for desktop
                }}
              >
                {topDoctors
                  .filter((doc) => {
                    // 1. Check if specialty matches (or if specialty input is empty)
                    const matchesSpecialty = specialty === "" ||
                      doc.specialty.toLowerCase().includes(specialty.toLowerCase());

                    // 2. Check if location matches (or if location input is empty)
                    const matchesLocation = location === "" ||
                      doc.location.toLowerCase().includes(location.toLowerCase());

                    return matchesSpecialty && matchesLocation;
                  })
                  .map((doc) => (
                    <DoctorCard
                      key={doc.id}
                      doc={doc}
                      navigate={() => navigate(`doctor/${doc.id}`)}
                    />
                  ))}
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}