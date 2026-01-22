import React, { useState } from 'react';
import { Search, ArrowLeft, Star, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  { name: "Dentistry", count: 22, img: "https://cdn-icons-png.flaticon.com/512/3467/3467561.png" },
  { name: "Cardiology", count: 26, img: "https://cdn-icons-png.flaticon.com/512/833/833472.png" },
  { name: "Psychologist", count: 20, img: "https://cdn-icons-png.flaticon.com/512/2643/2643120.png" },
  { name: "Dermatologist", count: 19, img: "https://cdn-icons-png.flaticon.com/512/2813/2813136.png" },
  { name: "Pediatrician", count: 18, img: "https://cdn-icons-png.flaticon.com/512/1041/1041926.png" },
  { name: "Orthopedics", count: 29, img: "https://cdn-icons-png.flaticon.com/512/2992/2992147.png" },
];

const DOCTORS = [
  { name: "Dr. John Doe", role: "Cardiology", exp: 10, rate: 4.8, img: "https://img.freepik.com/free-photo/doctor-offering-medical-teleconsultation_23-2149329007.jpg" },
  { name: "Dr. Sarah Chen", role: "Dermatology", exp: 11, rate: 4.0, img: "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827756.jpg" },
  { name: "Dr. James Wilson", role: "Dentistry", exp: 13, rate: 4.9, img: "https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-stethoscope_23-2148827763.jpg" },
  { name: "Dr. Elena Rossi", role: "Pediatrician", exp: 8, rate: 4.7, img: "https://img.freepik.com/free-photo/smiling-female-doctor-with-white-coat-stethoscope_23-2148827761.jpg" },
];

export default function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Filter logic: Searches by Name OR Role
  const filteredDoctors = DOCTORS.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (catName) => {
    setSearchTerm(catName);
    setIsSearching(true);
  };

  const handleBack = () => {
    if (isSearching) {
      setSearchTerm("");
      setIsSearching(false);
    } else {
      window.history.back(); // Goes to -1
    }
  };

  return (
    <div className='w-full min-h-screen bg-white font-sans'>
      {/* NAVIGATION HEADER */}
      <nav className='sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex items-center gap-4'>
          <button 
            onClick={handleBack}
            className='p-2 hover:bg-blue-50 rounded-full text-[#0f172a] transition-colors'
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className='relative flex-1 group'>
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchTerm ? 'text-blue-500' : 'text-slate-400'}`} size={18} />
            <input 
              type="text" 
              placeholder="Search by name or specialty..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearching(e.target.value.length > 0);
              }}
              className='w-full bg-slate-50 border border-slate-100 py-3 pl-12 pr-4 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-medium' 
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {!isSearching ? (
          <>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1">Explore</h2>
                <h1 className="text-3xl font-black text-[#0f172a] tracking-tighter">Specialities</h1>
              </div>
            </div>

            {/* SMALL CATEGORY CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="group p-4 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all text-center"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <img src={cat.img} alt="" className='w-7 h-7 object-contain group-hover:brightness-0 group-hover:invert transition-all' />
                  </div>
                  <p className="font-bold text-sm text-[#0f172a] mb-1">{cat.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{cat.count} Doctors</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-[#0f172a]">
                 Results for <span className="text-blue-500">"{searchTerm}"</span>
               </h2>
               <span className="text-xs font-bold text-slate-400 uppercase">{filteredDoctors.length} Found</span>
            </div>

            {/* DOCTOR LIST GRID */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {filteredDoctors.length > 0 ? filteredDoctors.map((doc, i) => (
                <div key={i} className='group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:border-blue-200 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-500/5'>
                  <div className="relative aspect-square overflow-hidden">
                    <img src={doc.img} alt={doc.name} className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-700' />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Star size={12} className="fill-blue-500 text-blue-500" />
                      <span className="text-[10px] font-black text-[#0f172a]">{doc.rate}</span>
                    </div>
                  </div>
                  
                  <div className='p-5'>
                    <h3 className='text-blue-500 text-[10px] font-black uppercase tracking-widest mb-1'>{doc.role}</h3>
                    <b className='block text-[#0f172a] text-lg mb-4 tracking-tight'>{doc.name}</b>
                    
                    <button className="w-full bg-[#0f172a] hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn">
                      Book Appointment 
                      <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-400 font-bold italic">No doctors found matching that search.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}