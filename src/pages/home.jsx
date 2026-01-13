import React from 'react';
import Article from '../componentPages/Article';
import { Link } from 'react-router-dom';
import AppointmentBooking from '../components/AppointmentBooking'
import { Search, Bell, AlertCircle, Star, MapPin, ChevronRight, Stethoscope, Truck, ClipboardList } from 'lucide-react';

export default function Home() {
    const categories = [
        { id: 1, name: "Top Doctors", icon: <Stethoscope size={28} />, color: "bg-blue-600", link: "/search" },
        { id: 2, name: "Ambulance", icon: <Truck size={28} />, color: "bg-red-500", link: "/emergency" },
        { id: 3, name: "Reports", icon: <ClipboardList size={28} />, color: "bg-blue-500", link: "/reports" },
    ];

    const topDoctors = [
        { id: 1, name: "Dr. Maria Elena", specialty: "Psychologist", rating: 4.9, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" },
        { id: 2, name: "Dr. James Wilson", specialty: "Cardiologist", rating: 4.8, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300" },
        { id: 3, name: "Dr. Sarah Chen", specialty: "Dermatologist", rating: 5.0, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" },
        { id: 4, name: "Dr. Robert Fox", specialty: "Neurologist", rating: 4.7, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300" },
        { id: 5, name: "Dr. Arlene McCoy", specialty: "Pediatrician", rating: 4.9, image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=300" },
        { id: 6, name: "Dr. Jerome Bell", specialty: "Orthopedic", rating: 4.6, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300" },
        { id: 7, name: "Dr. Eleanor Pena", specialty: "Oncologist", rating: 4.8, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" },
        { id: 8, name: "Dr. Marvin McKinney", specialty: "Surgeon", rating: 4.7, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300" },
        { id: 9, name: "Dr. Leslie Alexander", specialty: "Dentist", rating: 4.9, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" },
        { id: 10, name: "Dr. Wade Warren", specialty: "General Physician", rating: 4.5, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300" }
    ];

    const hospitals = [
        { id: 1, name: "City General", location: "Downtown", rating: 4.7, image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=500" },
        { id: 2, name: "St. Lukes Care", location: "North Wing", rating: 4.5, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=500" },
        { id: 3, name: "Eastside Medical", location: "East District", rating: 4.8, image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500" },
        { id: 4, name: "Mayo Clinic", location: "West Side", rating: 4.9, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500" },
        { id: 5, name: "Unity Health", location: "South Station", rating: 4.4, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500" },
        { id: 6, name: "Grace Hospital", location: "Old Town", rating: 4.6, image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=500" },
        { id: 7, name: "Central Wellness", location: "Park Avenue", rating: 4.7, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500" },
        { id: 8, name: "Mercy Clinic", location: "Industrial Road", rating: 4.3, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500" },
        { id: 9, name: "Northstar Med", location: "Skyline Blvd", rating: 4.8, image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500" },
        { id: 10, name: "Legacy Hospital", location: "Heritage Square", rating: 4.9, image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500" }
    ];

    return (
        <div className="min-h-screen w-full">
            {/* 1. Header */}
            <header className="px-6 md:px-15 pt-12 pb-24 flex justify-between items-center max-w-7xl mx-auto bg-linear-to-br from-blue-700 via-blue-600 to-blue-500">
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
            <main className="relative -mt-16">
                <div className="max-w-7xl bg-white rounded-t-[3.5rem] pt-12 mx-auto min-h-screen pb-10">



                    {/* Search Bar */}
                    <div className="px-6 mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors, clinics..."
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
                                <Link to='/profile/:id'>
                                    <div key={doc.id} className="min-w-40 md:min-w-50 shadow-sm rounded-2xl p-3">
                                        <img src={doc.image} alt={doc.name} className="w-full h-32 object-cover rounded-2xl mb-3" />
                                        <h4 className="font-bold text-gray-800 text-sm truncate">{doc.name}</h4>
                                        <p className="text-xs text-gray-400 mb-2">{doc.specialty}</p>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star size={14} fill="currentColor" />
                                            <span className="text-xs font-bold text-gray-700">{doc.rating}</span>
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
                                <Link to='/profile/:id'>
                                    <div key={hosp.id} className="min-w-65 md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
                                        <img src={hosp.image} alt={hosp.name} className="w-full h-40 object-cover" />
                                        <div className="p-4 flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-gray-800">{hosp.name}</h4>
                                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                    <MapPin size={12} />
                                                    {hosp.location}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg">
                                                <Star size={14} className="text-yellow-500" fill="currentColor" />
                                                <span className="text-xs font-bold text-gray-700">{hosp.rating}</span>
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