import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ChevronRight, MapPin, Building2, Filter, Users, Hospital } from 'lucide-react';
import { db } from '../../firebase.config';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { DoctorCard, HospitalCard } from '../components/doctorCard'; // Adjust path

export default function FindDoctors() {
  const navigate = useNavigate();

  // Data States
  const [allData, setAllData] = useState({ doctors: [], hospitals: [] });
  const [filteredResults, setFilteredResults] = useState([]);

  // UI States
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("doctor"); // 'doctor' or 'hospital'
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  // 1. Initial Load: Fetch everything once to make search instant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = ref(db, 'users');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const rawData = Object.entries(snapshot.val()).map(([id, data]) => ({
            id, ...data
          }));

          const doctors = rawData.filter(u => u.role === 'doctor');
          const hospitals = rawData.filter(u => u.role === 'hospital');

          setAllData({ doctors, hospitals });
          // Default view: Show doctors
          setFilteredResults(doctors);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Search Logic (Triggered on Enter or Button Click)
  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    setIsSearching(true);
    setVisibleCount(10); // Reset pagination on new search

    const source = searchMode === 'doctor' ? allData.doctors : allData.hospitals;

    if (!term) {
      setFilteredResults(source);
      return;
    }

    const filtered = source.filter(item => {
      const name = item.name?.toLowerCase() || "";
      const specialty = item.specialty?.toLowerCase() || "";
      const location = item.location?.toLowerCase() || "";
      const hospName = item.hospitalName?.toLowerCase() || "";
      const searchIndex = item.searchIndex?.toLowerCase() || "";

      return name.includes(term) ||
        specialty.includes(term) ||
        location.includes(term) ||
        hospName.includes(term) ||
        searchIndex.includes(term);
    });

    setFilteredResults(filtered);
  };

  // Switch between Doctor/Hospital view
  const toggleMode = (mode) => {
    setSearchMode(mode);
    setSearchTerm("");
    setIsSearching(false);
    setFilteredResults(mode === 'doctor' ? allData.doctors : allData.hospitals);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='w-full min-h-screen bg-slate-50/50'>
      {/* Navigation */}
      <nav className='sticky top-0 z-30 bg-white border-b border-slate-100 px-6 py-4 shadow-sm'>
        <div className='max-w-7xl mx-auto space-y-4'>
          <div className='flex items-center gap-4'>
            <button onClick={() => navigate(-1)} className='p-2 hover:bg-slate-100 rounded-full'>
              <ArrowLeft size={24} />
            </button>
            <div className='relative flex-1'>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${searchMode}s by name, location, or specialty...`}
                value={searchTerm}
                onKeyDown={onKeyDown}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-slate-100 py-3.5 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium'
              />
            </div>
          </div>

          {/* Toggle Tabs */}
          <div className='flex gap-2 p-1 bg-slate-100 rounded-xl w-fit'>
            <button
              onClick={() => toggleMode('doctor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${searchMode === 'doctor' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Users size={14} /> Doctors
            </button>
            <button
              onClick={() => toggleMode('hospital')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${searchMode === 'hospital' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Hospital size={14} /> Hospitals
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <></>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 capitalize">
                {isSearching ? `Results for "${searchTerm}"` : `Recommended ${searchMode}s`}
              </h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{filteredResults.length} found</p>
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
                <p className="text-slate-400 font-medium">No {searchMode}s found matching your criteria.</p>
                <button onClick={() => toggleMode(searchMode)} className="mt-4 text-blue-600 font-bold hover:underline">Clear Search</button>
              </div>
            )}

            {/* View More Button */}
            {visibleCount < filteredResults.length && (
              <div className="flex justify-center pt-10">
                <button
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2"
                >
                  View More {searchMode}s <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}