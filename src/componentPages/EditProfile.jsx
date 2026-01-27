import React, { useState } from 'react';
import { updateUserInfo } from '../services/userServices';
import { Camera, Check, Loader2, Clock, Calendar, Building2 } from 'lucide-react';

const EditProfile = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const DEPT_OPTIONS = ["Emergency", "Pediatrics", "Radiology", "Surgery", "Pharmacy", "Cardiology", "Maternity", "Neurology"];

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData?.image?.url || null);

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    bio: userData?.bio || "",
    specialty: userData?.specialty || "",
    location: userData?.location || "",
    departments: userData?.departments || [],
    availabilityTime: userData?.availabilityTime || { start: "09:00", end: "17:00" },
    availableDays: userData?.availableDays || []
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    let imageUrl = userData.image;

    if (selectedImage) {
      try {
        const data = new FormData();
        data.append("file", selectedImage);
        data.append("upload_preset", "health core profiles");
        const response = await fetch('https://api.cloudinary.com/v1_1/dwn42jqmq/image/upload', {
          method: 'POST',
          body: data
        });
        const imgData = await response.json();
        imageUrl = { url: imgData.secure_url, public_id: imgData.public_id };
      } catch (error) {
        console.error("Upload Error:", error);
        setLoading(false);
        return;
      }
    }

    try {
      // Include role-specific logic before saving
      const finalData = { ...formData, image: imageUrl };
      
      // Update the Search Index so new bio/depts are searchable
      finalData.searchIndex = [
        finalData.name,
        finalData.specialty,
        finalData.location,
        ...finalData.departments
      ].filter(Boolean).join(' ').toLowerCase();

      await updateUserInfo(userData.uid, finalData);
      setStatus('success');
      setTimeout(() => setStatus(null), 2000);
    } catch (err) {
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 font-medium text-sm">Manage your {userData?.role} profile information</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${
            status === 'success' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
          }`}
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : status === 'success' ? <Check size={18} /> : 'Save Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* PROFILE PIC SECTION */}
        <div className="lg:col-span-4 flex flex-col items-center gap-6">
          <div className="relative group w-48 h-48">
            <div className="w-full h-full rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100">
              {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" /> : <Camera className="m-auto mt-16 text-slate-300" size={40} />}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-[3rem] transition-all cursor-pointer">
              <Camera className="text-white" size={32} />
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
          <div className="text-center">
             <h3 className="font-bold text-slate-900">{formData.name || "Set Name"}</h3>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{userData?.role}</p>
          </div>
        </div>

        {/* DATA FORM SECTION */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* COMMON FIELDS: NAME & BIO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Full Name / Facility Name" value={formData.name} onChange={(val) => setFormData({...formData, name: val})} />
            {userData?.role === 'doctor' && (
              <InputGroup label="Medical Specialty" value={formData.specialty} onChange={(val) => setFormData({...formData, specialty: val})} />
            )}
            {userData?.role === 'hospital' && (
              <InputGroup label="Location Address" value={formData.location} onChange={(val) => setFormData({...formData, location: val})} />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">About / Bio</label>
            <textarea 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 focus:bg-white transition-all outline-none font-medium text-slate-700 min-h-[120px]"
              placeholder={`Write a brief description for your ${userData?.role} profile...`}
            />
          </div>

          {/* HOSPITAL SPECIFIC: DEPARTMENTS */}
          {userData?.role === 'hospital' && (
            <div className="space-y-4">
               <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Building2 size={14}/> Hospital Departments
               </label>
               <select 
                className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-700"
                onChange={(e) => {
                  if(e.target.value && !formData.departments.includes(e.target.value)) {
                    setFormData({...formData, departments: [...formData.departments, e.target.value]})
                  }
                }}
               >
                 <option value="">Select and add a department...</option>
                 {DEPT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
               </select>
               <div className="flex flex-wrap gap-2">
                 {formData.departments.map(dept => (
                   <span key={dept} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                     {dept} <button onClick={() => setFormData({...formData, departments: formData.departments.filter(d => d !== dept)})} className="hover:text-red-500">×</button>
                   </span>
                 ))}
               </div>
            </div>
          )}

          {/* AVAILABILITY SECTION: DOCTORS & HOSPITALS */}
          {(userData?.role === 'doctor' || userData?.role === 'hospital') && (
            <div className="p-6 bg-slate-50 rounded-[2.5rem] space-y-6">
               <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14}/> Availability Schedule
                  </label>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Clock size={14} className="text-blue-500"/>
                    <input type="time" value={formData.availabilityTime.start} onChange={(e) => setFormData({...formData, availabilityTime: {...formData.availabilityTime, start: e.target.value}})} className="bg-transparent"/>
                    <span>-</span>
                    <input type="time" value={formData.availabilityTime.end} onChange={(e) => setFormData({...formData, availabilityTime: {...formData.availabilityTime, end: e.target.value}})} className="bg-transparent"/>
                  </div>
               </div>
               
               <div className="flex justify-between gap-2">
                  {DAYS.map(day => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                        formData.availableDays.includes(day) ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white text-slate-400 border border-slate-100'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 focus:bg-white transition-all outline-none font-bold text-slate-700"
    />
  </div>
);

export default EditProfile;