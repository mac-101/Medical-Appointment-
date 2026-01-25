import React, { useState } from 'react';
import { Phone, MapPin, AlertTriangle, Ambulance, Navigation, XCircle } from 'lucide-react';

function Emergency() {
  const [userLocation, setUserLocation] = useState('');

  // Combined the most critical contacts for instant access
  const primaryContacts = [
    { name: 'National Emergency', number: '911', color: 'bg-red-600' },
    { name: 'Ambulance', number: '112', color: 'bg-orange-600' },
    { name: 'Poison Control', number: '1-800-222-1222', color: 'bg-purple-600' },
  ];

  // ACTUAL CALL FUNCTION: This triggers the phone's dialer
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        () => alert('Please enable GPS for location')
      );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. URGENT HEADER */}
      <header className="bg-red-600 text-white py-8 px-6 shadow-2xl">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
          <AlertTriangle className="w-16 h-16 animate-pulse" />
          <h1 className="text-4xl font-black uppercase tracking-tighter">Emergency Assistance</h1>
          <button 
            onClick={() => handleCall('911')}
            className="w-full max-w-sm bg-white text-red-600 text-3xl font-black py-6 rounded-2xl shadow-xl active:scale-95 transition-transform"
          >
            CALL 911 NOW
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        
        {/* 2. INSTANT CONTACTS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryContacts.map((contact, i) => (
            <button
              key={i}
              onClick={() => handleCall(contact.number)}
              className={`${contact.color} text-white p-6 rounded-[2rem] flex flex-col items-center gap-2 shadow-lg active:scale-95 transition-all`}
            >
              <Phone size={24} />
              <span className="font-black uppercase text-[10px] tracking-widest opacity-80">{contact.name}</span>
              <span className="text-2xl font-bold">{contact.number}</span>
            </button>
          ))}
        </section>

        {/* 3. LOCATION SHARING (CRITICAL) */}
        <section className="bg-blue-50 p-8 rounded-[2.5rem] border-2 border-blue-100 flex flex-col items-center text-center gap-4">
          <div className="bg-blue-600 p-4 rounded-full text-white">
            <MapPin size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-blue-900">Transmit Your Location</h2>
            <p className="text-blue-700 text-sm font-medium mt-1">Help responders find you faster.</p>
          </div>
          
          <div className="w-full max-w-xs space-y-4">
            {userLocation && (
              <div className="bg-white py-3 rounded-xl font-mono font-bold text-blue-600 border border-blue-200 uppercase tracking-tighter">
                Coords: {userLocation}
              </div>
            )}
            <button
              onClick={handleLocationShare}
              className="w-full bg-blue-600 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl flex items-center justify-center gap-2"
            >
              <Navigation size={18} />
              {userLocation ? "Update Location" : "Share My Location"}
            </button>
          </div>
        </section>

        {/* 4. FAST INSTRUCTIONS (REDUCED TO 3 STEPS) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-slate-100 p-6 rounded-3xl">
            <span className="text-red-600 font-black text-2xl">01</span>
            <p className="font-bold uppercase text-xs tracking-widest mt-2">Assess Danger</p>
            <p className="text-slate-500 text-sm mt-1 font-medium">Clear the area around the patient.</p>
          </div>
          <div className="border-2 border-slate-100 p-6 rounded-3xl">
            <span className="text-red-600 font-black text-2xl">02</span>
            <p className="font-bold uppercase text-xs tracking-widest mt-2">Call & Speak</p>
            <p className="text-slate-500 text-sm mt-1 font-medium">State location and nature of injury.</p>
          </div>
          <div className="border-2 border-slate-100 p-6 rounded-3xl">
            <span className="text-red-600 font-black text-2xl">03</span>
            <p className="font-bold uppercase text-xs tracking-widest mt-2">Wait for Help</p>
            <p className="text-slate-500 text-sm mt-1 font-medium">Follow dispatcher instructions exactly.</p>
          </div>
        </section>

      </main>

      {/* 5. MINIMAL FOOTER */}
      <footer className="text-center pb-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Medicare Emergency Response Unit</p>
      </footer>
    </div>
  );
}

export default Emergency;
