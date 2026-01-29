import React, { useState, useEffect, useMemo } from 'react';
import { Search, ArrowLeft, ChevronRight, Users, Hospital, Loader2 } from 'lucide-react';
import { db } from '../../firebase.config';
import { useLocation } from 'react-router-dom'; // Add useLocation to your imports
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { DoctorCard, HospitalCard } from '../components/doctorCard';

export default function FindDoctors() {
  const navigate = useNavigate();
  const location = useLocation();

  // Data States
  const [allData, setAllData] = useState({ doctors: [], hospitals: [] });
  const [loading, setLoading] = useState(true);

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("doctor"); // 'doctor' or 'hospital'
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    if (location.state?.incomingSearch) {
      setSearchTerm(location.state.incomingSearch);
      
      // Optional: Clear the state so it doesn't re-apply if they refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // 1. Initial Load: Fetch everything once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, 'users'));
        if (snapshot.exists()) {
          const rawData = Object.entries(snapshot.val()).map(([id, data]) => ({
            id, ...data
          }));

          setAllData({
            doctors: rawData.filter(u => u.role === 'doctor'),
            hospitals: rawData.filter(u => u.role === 'hospital')
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Live Filtering Logic
  // useMemo ensures we only re-calculate when searchTerm, mode, or data actually changes
  const filteredResults = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const source = searchMode === 'doctor' ? allData.doctors : allData.hospitals;

    if (!term) return source;

    return source.filter(item => {
      return (
        item.name?.toLowerCase().includes(term) ||
        item.specialty?.toLowerCase().includes(term) ||
        item.location?.toLowerCase().includes(term) ||
        item.hospitalName?.toLowerCase().includes(term) ||
        item.searchIndex?.toLowerCase().includes(term)
      );
    });
  }, [searchTerm, searchMode, allData]);

  // Reset pagination when searching or switching modes
  useEffect(() => {
    setVisibleCount(10);
  }, [searchTerm, searchMode]);

  return (
    <div className='w-full min-h-screen'>
      {/* Navigation */}
      <nav className='sticky top-0 z-30 bg-white px-2 md:px-10 py-4'>
        <div className='max-w-7xl mx-auto space-y-4'>
          <div className='flex items-center gap-4'>
            <button onClick={() => navigate(-1)} className='p-2 hover:bg-slate-100 rounded-full text-slate-900'>
              <ArrowLeft size={24} />
            </button>
            <div className='relative flex-1'>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${searchMode}s...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-slate-100 py-3.5 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium'
              />
            </div>
          </div>

          <div className='flex gap-2 p-1 bg-slate-100 rounded-xl w-fit'>
            <button
              onClick={() => setSearchMode('doctor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${searchMode === 'doctor' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Users size={14} /> Doctors
            </button>
            <button
              onClick={() => setSearchMode('hospital')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${searchMode === 'hospital' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Hospital size={14} /> Hospitals
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="min-h-[60dvh] flex flex-col items-center justify-center bg-white">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
            </div>
        ) : (
          <div className="space-y-8">
            <div className="flex px-2 items-center justify-between">
              <h2 className="text-xl lg:text-2xl font-black text-slate-900 capitalize">
                {searchTerm ? `Searching ${searchMode}s` : `Recommended ${searchMode}s`}
              </h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                {filteredResults.length} Found
              </p>
            </div>

            {/* Results Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredResults.slice(0, visibleCount).map((item) => (
                searchMode === 'doctor'
                  ? <DoctorCard key={item.id} doc={item} />
                  : <HospitalCard key={item.id} hosp={item} navigate={() => navigate(`/hospital/${item.id}`)} />
              ))}
            </div>

            {/* Empty State */}
            {filteredResults.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="inline-flex p-6 rounded-full bg-slate-50 text-slate-300 mb-4">
                  <Search size={40} />
                </div>
                <p className="text-slate-500 font-bold text-lg">No results found</p>
                <p className="text-slate-400 text-sm mb-6">Try adjusting your search or category.</p>
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Pagination */}
            {visibleCount < filteredResults.length && (
              <div className="flex justify-center pt-10">
                <button
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2"
                >
                  View More <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}