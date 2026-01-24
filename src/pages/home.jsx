import React from 'react';
import Article from '../componentPages/Article';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { topDoctors, hospitals } from '../Data/MockData';
import { Search, AlertCircle, Star, MapPin, ChevronRight, Stethoscope, Truck, ClipboardList } from 'lucide-react';

export default function Home() {
    const categories = [
        { id: 1, name: "Top Doctors", icon: <Stethoscope size={28} />, color: "bg-blue-600", link: "/search" },
        { id: 2, name: "Ambulance", icon: <Truck size={28} />, color: "bg-red-500", link: "/emergency" },
        { id: 3, name: "Reports", icon: <ClipboardList size={28} />, color: "bg-blue-500", link: "/reports" },
    ];
    const navigate = useNavigate()

    const handleSearch = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== "") {
            // Navigate to the search page and pass the term in the state
            navigate('/search', { state: { incomingSearch: e.target.value } });
        }
    };

    return (
        <div className="min-h-screen w-full">
            {/* 1. Header */}
            <header className="px-6 zoomIN md:px-15 pt-12 pb-24 flex justify-between items-center max-w-7xl mx-auto bg-linear-to-br from-blue-700 via-blue-600 to-blue-500">
                <div className='md:flex items-end gap-5 '>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                            alt="Profile"
                            className="w-15 h-15 md:w-32 md:h-32 rounded-full border-4 border-white/30 shadow-lg object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-medium text-blue-100">Welcome,</h1>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Olivia Cartlee,</h1>
                        <p className="text-blue-50/80 font-medium">How's your health today?</p>
                    </div>
                </div>

                <Link
                    to="/emergency"
                    className="relative flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-md rounded-2xl border border-white/30 hover:bg-red-500/40 transition-all group"
                >
                    <div className="relative flex items-center justify-center">
                        <AlertCircle size={24} className="text-white animate-pulse" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
                    </div>
                    <span className="text-white font-bold text-sm tracking-wide uppercase">Emergency</span>
                </Link>
            </header>

            {/* 2. Main Content Wrapper */}
            <main className="relative scrollUP -mt-16">
                <div className="max-w-7xl bg-white rounded-t-[3.5rem] pt-12 mx-auto min-h-screen pb-10">



                    {/* Search Bar */}
                    <div className="px-6 mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors, clinics..."
                                onKeyDown={handleSearch} // Listen for Enter key
                                className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                            />
                        </div>
                    </div>

                    {/* Category Circles Section */}
                    <div className="px-6 mb-10 flex justify-around items-start">
                        {categories.map((cat) => (
                            <Link key={cat.id} to={cat.link} className="flex flex-col items-center gap-3 group">
                                <div className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                    {cat.icon}
                                </div>
                                <span className="text-gray-700 font-semibold text-sm">{cat.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Top Doctors Section */}
                    <section className="mb-8">
                        <div className="px-6 flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900 text-lg">Top Rated Doctors</h3>
                            <Link to="/search" className="text-blue-600 text-sm font-semibold flex items-center">
                                See All <ChevronRight size={16} />
                            </Link>
                        </div>
                        <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar">
                            {topDoctors.map((doc) => (
                                /* We pass the actual ID in the URL and the whole object in state as a backup */
                                <Link
                                    to={`/doctor/${doc.id}`}
                                    state={{ doctorData: doc }}
                                    key={doc.id}
                                >
                                    <div className="min-w-40 md:min-w-50 shadow-sm rounded-2xl p-3 border border-slate-50 hover:border-blue-500 transition-all bg-white group">
                                        <img src={doc.image} alt={doc.name} className="w-full h-32 object-cover rounded-2xl mb-3 group-hover:scale-105 transition-transform" />
                                        <h4 className="font-bold text-[#0f172a] text-sm truncate">{doc.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{doc.specialty}</p>
                                        <div className="flex items-center gap-1 text-blue-500">
                                            <Star size={14} fill="currentColor" />
                                            <span className="text-xs font-bold text-[#0f172a]">{doc.rating}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* --- HOSPITAL SECTION BROUGHT BACK --- */}
                    <section className="mb-8">
                        <div className="px-6 flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-900 text-lg">Hospitals Near You</h3>
                            <Link to="/search" className="text-blue-600 text-sm font-semibold flex items-center">
                                See All <ChevronRight size={16} />
                            </Link>
                        </div>
                       <div className="flex overflow-x-auto gap-4 px-6 pb-4 no-scrollbar">
    {hospitals.map((hosp) => (
        /* FIX: Use backticks and the specific hospital ID */
        <Link to={`/hospital/${hosp.id}`} key={hosp.id}>
            <div className="min-w-65 md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col border border-transparent hover:border-blue-500 transition-all">
                <img src={hosp.image} alt={hosp.name} className="w-full h-40 object-cover" />
                <div className="p-4 flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-[#0f172a]">{hosp.name}</h4>
                        <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                            <MapPin size={12} className="text-blue-500" />
                            {hosp.location}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-lg">
                        <Star size={14} className="text-blue-500" fill="currentColor" />
                        <span className="text-xs font-bold text-[#0f172a]">{hosp.rating}</span>
                    </div>
                </div>
            </div>
        </Link>
    ))}
</div>
                    </section>
                    <section>
                        <Article />
                    </section>

                </div>
            </main>
        </div>
    );
}