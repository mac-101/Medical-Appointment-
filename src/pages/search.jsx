import React, { useState } from 'react';
import { Search, ArrowLeft, ChevronRight, MapPin, Building2 } from 'lucide-react';
import { db } from '../../firebase.config';
import { ref, get, query, orderByChild, startAt, endAt } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { DoctorCard } from '../components/doctorCard';

export default function FindDoctors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return;

    setLoading(true);
    setIsSearching(true);

    try {
      const usersRef = ref(db, 'users');

      // We query against the combined 'searchIndex' field
      const q = query(
        usersRef,
        orderByChild('searchIndex'), // Make sure this is indexed in Firebase Rules
        startAt(term),
        endAt(term + '\uf8ff')
      );

      const snapshot = await get(q);

      if (snapshot.exists()) {
        const docs = Object.entries(snapshot.val())
          .map(([id, data]) => ({ id, ...data }))
          .filter(u => u.role === 'doctor');
        setResults(docs);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='w-full min-h-screen bg-white'>
      <nav className='sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex items-center gap-4'>
          <button onClick={() => isSearching ? setIsSearching(false) : navigate(-1)} className='p-2 hover:bg-slate-100 rounded-full'>
            <ArrowLeft size={24} />
          </button>

          <div className='relative flex-1'>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search name, specialty, location, or hospital..."
              value={searchTerm}
              onKeyDown={onKeyDown}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-slate-50 py-3 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium'
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : isSearching ? (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#0f172a]">Search Results ({results.length})</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {results.map((doc) => (
                <DoctorCard doc={doc} navigate={() => navigate(`doctor/${doc.id}`)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 text-center opacity-40">
            <Search size={48} className="mx-auto mb-4" />
            <p className="font-medium uppercase tracking-widest text-xs">Enter a keyword to search the directory</p>
          </div>
        )}
      </main>
    </div>
  );
}