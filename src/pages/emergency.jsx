import React, { useState } from 'react';
import { Phone, MapPin, AlertTriangle, Navigation, XCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
function Emergency() {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const primaryContacts = [
    { name: 'General Emergency', number: '112', color: 'bg-red-600', detail: 'National Line' },
    { name: 'Lagos (LASEMA)', number: '767', color: 'bg-blue-700', detail: 'Lagos Only' },
    { name: 'Road Safety', number: '122', color: 'bg-orange-600', detail: 'Highway Help' },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const getReadableLocation = async () => {
    if (!navigator.geolocation) return alert("Enable GPS");
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      setCoords(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);

      try {
        // Turning coordinates into a real address (Reverse Geocoding)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        setAddress(data.display_name); // This is the full street address
      } catch (error) {
        setAddress("Coordinates found, but couldn't load address. Check data.");
      } finally {
        setLoading(false);
      }
    }, () => {
      setLoading(false);
      toast("Please allow location access");
    }, { enableHighAccuracy: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* URGENT HEADER */}
      <header className="bg-red-600 text-white py-12 px-6 shadow-2xl text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <AlertTriangle size={64} className="mx-auto animate-pulse" />
          <h1 className="text-5xl font-black uppercase tracking-tighter">Emergency Help</h1>
          <p className="text-red-100 font-bold uppercase tracking-[0.2em] text-xs">Response available 24/7</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        
        {/* BIG CONTACT BUTTONS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryContacts.map((contact, i) => (
            <button
              key={i}
              onClick={() => handleCall(contact.number)}
              className={`${contact.color} text-white p-8 rounded-[3rem] flex flex-col items-center gap-2 shadow-xl active:scale-95 transition-all`}
            >
              <Phone size={28} />
              <span className="font-black uppercase text-[10px] tracking-widest opacity-80">{contact.name}</span>
              <span className="text-4xl font-black">{contact.number}</span>
              <span className="text-[10px] font-bold bg-black/20 px-4 py-1 rounded-full mt-2">{contact.detail}</span>
            </button>
          ))}
        </section>

        {/* THE "WHERE AM I?" SECTION */}
        <section className="bg-white p-8 rounded-[3.5rem] border-2 border-red-100 shadow-sm flex flex-col items-center text-center gap-6">
          <div className="bg-red-50 p-5 rounded-full text-red-600">
            <MapPin size={40} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tight">Your Current Location</h2>
            <p className="text-slate-500 text-sm font-medium">Read this address to the dispatcher:</p>
          </div>

          <div className="w-full bg-slate-50 p-6 rounded-[2.5rem] border-2 border-dashed border-slate-200 min-h-[120px] flex items-center justify-center">
            {loading ? (
              <div className="flex items-center gap-3 text-red-600 font-bold uppercase tracking-widest text-xs">
                <Loader2 className="animate-spin" /> Fetching GPS Data...
              </div>
            ) : address ? (
              <div className="space-y-3">
                <p className="text-lg font-black text-slate-800 leading-tight">
                  {address}
                </p>
                <div className="inline-block px-4 py-1 bg-red-600 text-white text-[10px] font-mono font-bold rounded-full">
                  GPS: {coords}
                </div>
              </div>
            ) : (
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">No location data yet</p>
            )}
          </div>

          <button
            onClick={getReadableLocation}
            className="w-full max-w-sm bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs py-6 rounded-2xl flex items-center justify-center gap-3 active:bg-red-600 transition-all shadow-lg shadow-slate-200"
          >
            <Navigation size={20} />
            Identify My Address
          </button>
        </section>

        {/* SURVIVAL TIPS */}
        <div className="bg-blue-900 text-white p-10 rounded-[3.5rem] shadow-xl">
          <h3 className="font-black uppercase tracking-[0.3em] text-xs mb-6 text-blue-300 italic">Critical Protocol</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-blue-200 font-black mb-2">01. CALL</p>
              <p className="font-medium">Dial 112. Stay calm. Speak clearly.</p>
            </div>
            <div>
              <p className="text-blue-200 font-black mb-2">02. IDENTIFY</p>
              <p className="font-medium">Read out the address shown above.</p>
            </div>
            <div>
              <p className="text-blue-200 font-black mb-2">03. WAIT</p>
              <p className="font-medium">Do not hang up until confirmed.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center pb-12 opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.6em]">MediCare_Naija_Emergency</p>
      </footer>
    </div>
  );
}

export default Emergency;
