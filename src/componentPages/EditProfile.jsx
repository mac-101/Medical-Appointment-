import React, { useState, useEffect } from 'react';
import { updateUserInfo } from '../services/userServices';
import toast from 'react-hot-toast';
import { Camera, Check, User, Loader2, Clock, Calendar, Search } from 'lucide-react';

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEPT_OPTIONS = [
  "Cardiology", "Dermatology", "Endocrinology", "Family Medicine",
  "Gastroenterology", "Internal Medicine", "Neurology", "Pediatrics",
  "Psychiatry", "Radiology", "Urology" // ... keep your full list here
];

const EditProfile = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(userData?.image?.url || null);

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    bio: userData?.bio || "",
    specialty: userData?.specialty || "",
    location: userData?.location || "",
    hospital: userData?.hospital || "",
    availabilityTime: userData?.availabilityTime || { start: "09:00", end: "17:00" },
    availableDays: userData?.availableDays || []
  });

  // Filter specialty options based on search
  const filteredSpecialties = DEPT_OPTIONS.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = () => setIsSpecialtyOpen(false);
    if (isSpecialtyOpen) window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isSpecialtyOpen]);

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
        const res = await fetch('https://api.cloudinary.com/v1_1/dwn42jqmq/image/upload', {
          method: 'POST',
          body: data
        });
        const imgData = await res.json();
        imageUrl = { url: imgData.secure_url, public_id: imgData.public_id };
      } catch (error) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }
    }

    try {
      await updateUserInfo(userData.uid, { ...formData, image: imageUrl });
      setStatus('success');
      toast.success('Profile Updated');
      setTimeout(() => setStatus(null), 2000);
    } catch (err) {
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-2 space-y-10 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 font-medium text-sm">Manage doctor profile</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 ${status === 'success' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
            }`}
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : status === 'success' ? <Check size={18} /> : 'Save Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: PHOTO */}
        <div className="lg:col-span-4 flex flex-col items-center gap-6">
          <div className="relative group w-48 h-48">
            <div className="w-full h-full rounded-[3.5rem] overflow-hidden bg-slate-100 shadow-xl">
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="flex h-full items-center justify-center"><User size={48} className="text-slate-300" /></div>
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center  opacity-0 group-hover:opacity-100 rounded-[3.5rem] transition-all cursor-pointer backdrop-blur-[2px]">
              <Camera className="text-white" size={28} />
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900">{formData.name || "Identity Unset"}</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Verified Doctor</span>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
              <input
                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 outline-none font-bold"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Location</label>
              <input
                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 outline-none font-bold"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Hospital</label>
              <input
                className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 outline-none font-bold"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              />
            </div>

            {/* SPECIALTY SELECTION */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Medical Specialty</label>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Select..."
                  className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 outline-none font-bold"
                  value={isSpecialtyOpen ? searchTerm : formData.specialty}
                  onFocus={() => { setIsSpecialtyOpen(true); setSearchTerm(""); }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
              {isSpecialtyOpen && (
                <div className="absolute z-30 w-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl max-h-60 overflow-y-auto p-2">
                  {filteredSpecialties.map((opt) => (
                    <button
                      key={opt}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold hover:bg-blue-50 flex justify-between items-center"
                      onClick={() => { setFormData({ ...formData, specialty: opt }); setIsSpecialtyOpen(false); }}
                    >
                      {opt} {formData.specialty === opt && <Check size={16} className="text-blue-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Professional Bio</label>
            <textarea
              className="w-full p-4 bg-slate-50 rounded-2xl min-h-[120px] outline-none font-medium"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          {/* AVAILABILITY */}
          <div className="p-6 bg-slate-50 rounded-[2.5rem] space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Schedule</label>
              <div className="flex gap-2 items-center">
                <input type="time" className="bg-transparent font-bold" value={formData.availabilityTime.start} onChange={(e) => setFormData({ ...formData, availabilityTime: { ...formData.availabilityTime, start: e.target.value } })} />
                <span className="text-slate-300">to</span>
                <input type="time" className="bg-transparent font-bold" value={formData.availabilityTime.end} onChange={(e) => setFormData({ ...formData, availabilityTime: { ...formData.availabilityTime, end: e.target.value } })} />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              {DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${formData.availableDays.includes(day) ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-100'}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;