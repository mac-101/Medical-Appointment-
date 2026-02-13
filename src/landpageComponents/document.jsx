import React from 'react';
import { Shield, Activity, Users, Globe, ChevronRight, FileText } from 'lucide-react';

const DocPage = () => {
  const sections = [
    { id: 'protocol', title: 'The Core Protocol', icon: <Activity size={20} /> },
    { id: 'infrastructure', title: 'Seamless Infrastructure', icon: <Shield size={20} /> },
    { id: 'initiatives', title: 'Medical Aid Initiatives', icon: <Globe size={20} /> },
    { id: 'standards', title: 'Collaboration Standards', icon: <Users size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* HERO SECTION */}
      <header className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
            Official Documentation
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            The HealTrust <span className="text-blue-600">Framework.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-medium">
            Defining the global standard for seamless medical aid, digital health rights, and provider-patient transparency.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* STICKY SIDEBAR NAVIGATION */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-28 space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-4">Contents</p>
              {sections.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-bold transition-all group"
                >
                  <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="text-sm">{item.title}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* MAIN DOCUMENTATION CONTENT */}
          <main className="flex-1 max-w-3xl space-y-24">
            
            {/* 01. THE CORE PROTOCOL */}
            <section id="protocol" className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
                  <Activity size={24} />
                </div>
                <h2 className="text-3xl font-black tracking-tight">01. The Core Protocol</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  At HealTrust, we view medical aid not as a premium service, but as a fundamental human right. Our protocol is designed to eliminate the <strong>"Access Gap"</strong>—the friction caused by geography, bureaucracy, and socio-economic status.
                </p>
                <blockquote className="border-l-4 border-blue-600 pl-6 my-8 italic text-xl text-slate-700 font-medium">
                  "Our mandate is to dissolve the distance between a patient’s symptom and a doctor’s solution."
                </blockquote>
              </div>
            </section>

            {/* 02. INFRASTRUCTURE */}
            <section id="infrastructure" className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-100">
                  <Shield size={24} />
                </div>
                <h2 className="text-3xl font-black tracking-tight">02. Seamless Infrastructure</h2>
              </div>
              <div className="space-y-8">
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest text-xs mb-4">Verification Standards</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Every provider on our network undergoes the <strong>Multi-Tier Credentialing Process</strong>. This includes primary source verification of medical licenses, clinical history audits, and digital-first bedside manner training.
                  </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                  <h4 className="font-black text-blue-600 uppercase tracking-widest text-xs mb-4">Data Sovereignty</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Seamless care requires data mobility. Our infrastructure ensures your medical history follows you across our network, encrypted end-to-end, owned entirely by you.
                  </p>
                </div>
              </div>
            </section>

            {/* 03. INITIATIVES */}
            <section id="initiatives" className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-xl shadow-blue-50">
                  <Globe size={24} />
                </div>
                <h2 className="text-3xl font-black tracking-tight">03. Medical Aid Initiatives</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                We dedicate 15% of our platform’s operational capacity to public health initiatives. This is how we transform a booking site into a medical aid engine.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border-2 border-slate-100 rounded-3xl">
                  <h5 className="font-bold text-slate-900 mb-2">Pro-Bono Triage</h5>
                  <p className="text-sm text-slate-500">Free digital screening for underserved communities during health outbreaks.</p>
                </div>
                <div className="p-6 border-2 border-slate-100 rounded-3xl">
                  <h5 className="font-bold text-slate-900 mb-2">Health Literacy Doc</h5>
                  <p className="text-sm text-slate-500">Open-source medical resources verified by our lead specialists.</p>
                </div>
              </div>
            </section>

            {/* FINAL CTA BOX */}
            <section className="bg-blue-600 rounded-[3rem] p-12 text-white text-center relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-3xl font-black mb-4">Be Part of the Ecosystem</h2>
                 <p className="text-blue-100 mb-8 max-w-md mx-auto">Join the 5,000+ professionals and patients redefining medical aid.</p>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all">Get Started</button>
                    <button className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black border border-blue-500">Contact Board</button>
                 </div>
               </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default DocPage;