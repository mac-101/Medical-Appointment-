import React from 'react'; // Fixed: Removed { React } as it's a default import
import Article from '../componentPages/Article';
import { Link, useNavigate } from 'react-router-dom';
import { useDirectory } from '../Data/MockData';
import { DoctorCard, HospitalCard } from '../components/doctorCard';
import { useAuth } from '../services/useAuthContext'; // Ensure this path is correct
import { Search, AlertCircle, Star, MapPin, ChevronRight, Stethoscope, Truck, ClipboardList } from 'lucide-react';

export default function Home() {
    // 1. ALL hooks at the top - Order matters!
    const navigate = useNavigate();
    const { userData, loading: authLoading } = useAuth();
    const { topDoctors, hospitals, loading: directoryLoading } = useDirectory(50);

    // 2. Loading state (only blocks if directory data is missing)
    if (directoryLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
            </div>
        );
    }

    const categories = [
        { id: 1, name: "Top Doctors", icon: <Stethoscope size={28} />, color: "bg-blue-600", link: "/search" },
        { id: 2, name: "Ambulance", icon: <Truck size={28} />, color: "bg-red-500", link: "/emergency" },
        { id: 3, name: "Reports", icon: <ClipboardList size={28} />, color: "bg-blue-500", link: "/reports" },
    ];

    const handleSearch = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== "") {
            navigate('/search', { state: { incomingSearch: e.target.value } });
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f8fafc]">
            {/* 1. Header */}
            <header className="px-6 md:px-15 pt-12 pb-24 flex justify-between items-center max-w-7xl mx-auto bg-linear-to-br from-blue-700 via-blue-600 to-blue-500">
                <div className='md:flex items-end gap-5 animate-in fade-in slide-in-from-left-5 duration-700'>
                    <div className="relative">
                        <img
                            src={userData?.image?.url || "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"}
                            alt="Profile"
                            className="w-20 h-20 md:w-32 md:h-32 rounded-full border-1 border-white/30 shadow-xl object-cover bg-blue-400"
                        />
                        
                    </div>
                    <div className="mt-4 md:mt-0">
                        <h1 className="text-xl md:text-2xl font-medium text-blue-100">Welcome,</h1>
                        <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
                            {userData?.name || "Health Core User"}
                        </h1>
                        <p className="text-blue-50/80 font-medium">How's your health today?</p>
                    </div>
                </div>

                <Link
                    to="/emergency"
                    className="relative flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-red-500 transition-all duration-300 group"
                >
                    <AlertCircle size={20} className="text-white group-hover:animate-bounce" />
                    <span className="text-white font-bold text-xs tracking-widest uppercase">Emergency</span>
                </Link>
            </header>

            {/* 2. Main Content */}
            <main className="relative -mt-16">
                <div className="max-w-7xl bg-white rounded-t-[3.5rem] pt-12 mx-auto min-h-screen pb-10 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]">

                    {/* Search Bar */}
                    <div className="px-6 mb-8">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors, clinics..."
                                onKeyDown={handleSearch}
                                className="w-full bg-slate-50 border border-slate-100 py-5 pl-14 pr-6 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-200 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Category Circles */}
                    <div className="px-6 mb-12 flex justify-around items-start">
                        {categories.map((cat) => (
                            <Link key={cat.id} to={cat.link} className="flex flex-col items-center gap-4 group">
                                <div className={`w-16 h-16 md:w-20 md:h-20 ${cat.color} rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300`}>
                                    {cat.icon}
                                </div>
                                <span className="text-slate-600 font-bold text-xs uppercase tracking-wider">{cat.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Top Doctors Section */}
                    <section className="mb-12">
                        <div className="px-8 flex justify-between items-center mb-6">
                            <h3 className="font-black text-slate-900 text-xl tracking-tight">Top Rated Doctors</h3>
                            <Link to="/search" className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                See All <ChevronRight size={18} />
                            </Link>
                        </div>
                        <div className="flex overflow-x-auto gap-4 px-8 pb-6 no-scrollbar">
                            {topDoctors.map((doc) => (
                                <DoctorCard doc={doc} navigate={() => navigate(`doctor/${doc.id}`)} />
                            ))}
                        </div>
                    </section>

                    {/* Hospital Section */}
                    <section className="mb-12">
                        <div className="px-8 flex justify-between items-center mb-6">
                            <h3 className="font-black text-slate-900 text-xl tracking-tight">Hospitals Near You</h3>
                            <Link to="/search" className="text-blue-600 text-sm font-bold flex items-center gap-1">
                                See All <ChevronRight size={18} />
                            </Link>
                        </div>
                        <div className="flex overflow-x-auto gap-6 px-8 pb-6 no-scrollbar">
                            {hospitals.map((hosp) => (
                                <HospitalCard hosp={hosp} navigate={() => navigate(`/hospital/${hosp.id}`)} />
                            ))}
                        </div>
                    </section>

                    <Article />
                </div>
            </main>
        </div>
    );
}