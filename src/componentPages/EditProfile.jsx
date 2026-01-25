import React, { useState } from 'react';
import { updateUserInfo } from '../services/userServices';
import { Camera, Check, Loader2 } from 'lucide-react';

const EditProfile = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  
  // 1. IMAGE CAPTURE LOGIC
  const [selectedImage, setSelectedImage] = useState(null); // The actual File object
  const [previewUrl, setPreviewUrl] = useState(userData?.image?.url || null);

  const [formData, setFormData] = useState({
    name: userData?.name || "",
    specialty: userData?.specialty || "",
    location: userData?.location || ""
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // This is the constant holding the file
      setPreviewUrl(URL.createObjectURL(file)); // Preview logic
    }
  };

  const handleSave = async () => {
    setLoading(true);
    // Note: selectedImage is currently ignored here as per instructions
    const result = await updateUserInfo(userData.uid, formData);
    if (result.success) {
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b border-blue-50 pb-6">
        <div>
          <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter">Edit_Profile</h2>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">{userData?.role}_Access</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={loading}
          className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-xl transition-all active:scale-95 ${
            status === 'success' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'
          }`}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : status === 'success' ? <Check size={14} /> : null}
          {loading ? 'Syncing...' : status === 'success' ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* IMAGE PREVIEW COMPONENT */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-blue-50 bg-blue-50 flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <Camera className="text-blue-200" size={32} />
              )}
            </div>
            <label className="absolute inset-0 flex items-center justify-center bg-blue-600/80 opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity cursor-pointer">
              <Camera className="text-white" size={24} />
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
          <p className="text-[9px] font-black text-blue-300 uppercase tracking-widest">Update Photo</p>
        </div>

        {/* INPUT FIELDS */}
        <div className="flex-1 space-y-8">
          <InputGroup label="Display Name" value={formData.name} onChange={(val) => setFormData({...formData, name: val})} />
          
          {(userData?.role === 'doctor' || userData?.role === 'hospital') && (
            <InputGroup label="Specialization" value={formData.specialty} onChange={(val) => setFormData({...formData, specialty: val})} />
          )}

          {userData?.role === 'hospital' && (
            <InputGroup label="Facility Location" value={formData.location} onChange={(val) => setFormData({...formData, location: val})} />
          )}
        </div>
      </div>
    </div>
  );
};

// Simplified Input Group
const InputGroup = ({ label, value, onChange }) => (
  <div className="group">
    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2">{label}</label>
    <input 
      type="text" 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pb-2 bg-transparent border-b-2 border-blue-50 outline-none font-black text-blue-900 focus:border-blue-600 transition-all" 
    />
  </div>
);

export default EditProfile;