import { useState } from 'react';
import Article from '../componentPages/Article';
import { Link, useNavigate } from 'react-router-dom';
import { useDirectory } from '../Data/MockData';
import { DoctorCard, HospitalCard } from '../components/doctorCard';
import { useAuth } from '../services/useAuthContext';
import { Search, AlertCircle, User, ChevronRight, Stethoscope, Truck, ClipboardList, Loader2 } from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();
    const { userData } = useAuth();
    // Fetch data - loading state is handled inline now
    const { topDoctors, hospitals, loading: directoryLoading } = useDirectory(10);
    const [homeTab, setHomeTab] = useState('doctors');

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

    const SignInBtn = () => (
        <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
            Sign In
        </button>
    );

    // Reusable Loading Dots Component
    const InlineLoading = () => (
        <div className="flex space-x-2 py-10 justify-center w-full">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-[#f8fafc]">
            {/* 1. Header (Always Visible) */}
            <header
                className="relative px-6 md:px-15 pt-12 pb-24 flex justify-between items-center max-w-7xl mx-auto overflow-hidden rounded-b-[3rem]"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Dark Overlay - Crucial for making text pop against an image */}
                <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-[2px]" />

                <div className='relative md:flex items-end gap-5 animate-in fade-in slide-in-from-left-5 duration-700 z-10'>
                    <div className="relative">
                        {userData?.image?.url ? (
                            <img
                                src={userData.image.url}
                                className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-white/20 shadow-2xl object-cover"
                                alt="User"
                            />
                        ) : (
                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-blue-500/50 backdrop-blur-md border-4 border-white/20 flex items-center justify-center">
                                <User size={40} className="text-white/50" />
                            </div>
                        )}
                    </div>

                    <div className="mt-4 md:mt-0">
                        <h1 className="text-xl md:text-2xl font-medium text-shadow-2xs text-blue-100/90">
                            {userData?.role !== "hospital" ? "Hi!" : "Welcome Hospital Admin"}
                        </h1>
                        <h1 className="text-2xl md:text-3xl text-shadow-stone-950 font-black text-shadow-2xs text-white leading-tight drop-shadow-md">
                            {userData?.role === "doctor" && "Dr."} {userData?.name || <SignInBtn />}
                        </h1>
                        <p className="text-white/80 text-shadow-stone-950 text-shadow-2xs font-medium italic">
                            {userData?.role === "patient" ? "How's your health today?" : "Do you have an appointment?"}
                        </p>
                    </div>
                </div>

                <Link
                    to="/emergency"
                    className="relative z-10 flex items-center gap-2 px-6 py-3 bg-red-600/20 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-red-600 transition-all duration-300 group shadow-lg"
                >
                    <AlertCircle size={20} className="text-white group-hover:animate-bounce" />
                    <span className="text-white font-bold text-xs tracking-widest uppercase">Emergency</span>
                </Link>
            </header>

            {/* 2. Main Content */}
            <main className="relative -mt-16">
                <div className="max-w-7xl bg-white rounded-t-[3.5rem] pt-12 mx-auto min-h-screen pb-10 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]">

                    {/* Search Bar (Always Visible) */}
                    <div className="px-6 mb-8">
                        <div className="relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors, clinics..."
                                onKeyDown={handleSearch}
                                className="w-full border border-slate-100 py-4 pl-14 pr-6 rounded-4xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-200 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Categories (Always Visible) */}
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



                    {/* MOBILE TOGGLE - Only visible on small screens */}
                    <div className="flex lg:hidden px-8 mb-6">
                        {/* The Wrapper: No background, just a clean layout */}
                        <div className="flex items-center gap-4 border-b border-slate-100 w-full">
                            <button
                                onClick={() => setHomeTab('doctors')}
                                className={`pb-2 text-[11px] font-black uppercase tracking-[0.12em] transition-all relative ${homeTab === 'doctors' ? 'text-blue-600' : 'text-slate-400'
                                    }`}
                            >
                                Doctors
                                {/* The Active Indicator: A simple line instead of a box */}
                                {homeTab === 'doctors' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                                )}
                            </button>

                            <button
                                onClick={() => setHomeTab('hospitals')}
                                className={`pb-2 text-[11px] font-black uppercase tracking-[0.12em] transition-all relative ${homeTab === 'hospitals' ? 'text-blue-600' : 'text-slate-400'
                                    }`}
                            >
                                Hospitals
                                {homeTab === 'hospitals' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {/* DOCTOR SECTION */}
                        <section className={`mb-12 ${homeTab === 'doctors' ? 'block' : 'hidden'} lg:block`}>
                            <div className="px-8 flex justify-between items-center mb-6">
                                <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Top Rated Doctors</h3>
                                <Link to="/search" className="text-blue-600 text-[11px] font-black flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest">
                                    See All <ChevronRight size={16} />
                                </Link>
                            </div>

                            <div className="px-2 md:px-4 lg:px-8">
                                {directoryLoading ? (
                                    <InlineLoading />
                                ) : (
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                                        {topDoctors.map((doc) => (
                                            <DoctorCard
                                                key={doc.id}
                                                doc={doc}
                                                navigate={() => navigate(`doctor/${doc.id}`)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* HOSPITAL SECTION */}
                        <section className={`mb-12 ${homeTab === 'hospitals' ? 'block' : 'hidden'} lg:block`}>
                            <div className="px-8 flex justify-between items-center mb-6">
                                <h3 className="font-black text-slate-900 text-xl tracking-tight uppercase">Hospitals Near You</h3>
                                <Link to="/search" className="text-blue-600 text-[11px] font-black flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest">
                                    See All <ChevronRight size={16} />
                                </Link>
                            </div>

                            <div className="px-2 md:px-4 lg:px-8">
                                {directoryLoading ? (
                                    <InlineLoading />
                                ) : (
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
                                        {hospitals.map((hosp) => (
                                            <HospitalCard
                                                key={hosp.id}
                                                hosp={hosp}
                                                navigate={() => navigate(`/hospital/${hosp.id}`)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    <Article />
                </div>
            </main>
        </div>
    );
}