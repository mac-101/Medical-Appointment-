import React, { useState, useEffect } from 'react';
import { updateUserInfo } from '../services/userServices';
import toast from 'react-hot-toast';
import { Camera, Check, Loader2, Clock, Calendar, Building2, Search, X } from 'lucide-react';

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEPT_OPTIONS = ["Addiction Medicine", "Adolescent Medicine", "Aerospace Medicine", "Allergy and Immunology",
  "Anesthesiology", "Audiology", "Bariatric Surgery", "Cardiology", "Cardiothoracic Surgery",
  "Child Psychiatry", "Chiropractic", "Clinical Genetics", "Colon and Rectal Surgery",
  "Critical Care Medicine", "Cytopathology", "Dentistry", "Dermatology", "Diagnostic Radiology",
  "Dietetics & Nutrition", "Emergency Medicine", "Endocrinology", "Family Medicine",
  "Fertility Specialist", "Forensic Pathology", "Gastroenterology", "General Practice",
  "General Surgery", "Geriatric Medicine", "Gynecologic Oncology", "Hematology",
  "Hepatology", "Hospice and Palliative Medicine", "Infectious Disease", "Internal Medicine",
  "Interventional Cardiology", "Medical Genetics", "Neonatology", "Nephrology",
  "Neurology", "Neuropsychology", "Neurosurgery", "Nuclear Medicine", "Nursing",
  "Obstetrics and Gynecology (OB-GYN)", "Occupational Medicine", "Oncology",
  "Ophthalmology", "Optometry", "Oral and Maxillofacial Surgery", "Orthodontics",
  "Orthopedic Surgery", "Otolaryngology (ENT)", "Pain Management", "Pathology",
  "Pediatric Surgery", "Pediatrics", "Physical Medicine and Rehabilitation",
  "Physical Therapy", "Plastic Surgery", "Podiatry", "Preventive Medicine",
  "Psychiatry", "Psychology", "Pulmonology", "Radiation Oncology", "Radiology",
  "Reproductive Endocrinology", "Rheumatology", "Sleep Medicine", "Sports Medicine",
  "Thoracic Surgery", "Urology", "Vascular Surgery"
];

const EditProfile = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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

  const filteredOptions = DEPT_OPTIONS.filter(opt =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

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

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "health core profiles");
    const response = await fetch('https://api.cloudinary.com/v1_1/dwn42jqmq/image/upload', {
      method: 'POST',
      body: data
    });
    return response.json();
  };

  const handleSave = async () => {
    setLoading(true);
    let imageUrl = userData.image;

    if (selectedImage) {
      try {
        const imgData = await uploadImage();
        imageUrl = { url: imgData.secure_url, public_id: imgData.public_id };
      } catch (error) {
        console.error("Upload Error:", error);
        setLoading(false);
        return;
      }
    }

    try {
      const finalData = { ...formData, image: imageUrl };
      finalData.searchIndex = [
        finalData.name,
        finalData.specialty,
        finalData.location,
        ...finalData.departments.map(d => typeof d === 'string' ? d : d.name)
      ].filter(Boolean).join(' ').toLowerCase();

      await updateUserInfo(userData.uid, finalData);
      setStatus('success');
      toast.success('Profile Updated')
      setTimeout(() => setStatus(null), 2000);
    } catch (err) {
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 pb-20">
      <Header handleSave={handleSave} loading={loading} status={status} userData={userData} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <ProfileSection previewUrl={previewUrl} handleImageChange={handleImageChange} formData={formData} userData={userData} />
        <FormSection
          formData={formData}
          setFormData={setFormData}
          userData={userData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          filteredOptions={filteredOptions}
          toggleDay={toggleDay}
        />
      </div>
    </div>
  );
};

const Header = ({ handleSave, loading, status, userData }) => (
  <div className="flex items-center justify-between border-b border-slate-100 pb-8">
    <div>
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
      <p className="text-slate-500 font-medium text-sm">Manage your {userData?.role} profile information</p>
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
);

const ProfileSection = ({ previewUrl, handleImageChange, formData, userData }) => (
  <div className="lg:col-span-4 flex flex-col items-center gap-6">
    <div className="relative group w-48 h-48">
      <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-sm bg-slate-100">
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
);

const FormSection = ({ formData, setFormData, userData, searchTerm, setSearchTerm, isOpen, setIsOpen, filteredOptions, toggleDay }) => (
  <div className="lg:col-span-8 space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputGroup label="Full Name / Facility Name" value={formData.name} onChange={(val) => setFormData({ ...formData, name: val })} />
      {userData?.role === 'doctor' && <InputGroup label="Medical Specialty" value={formData.specialty} onChange={(val) => setFormData({ ...formData, specialty: val })} />}
      {userData?.role === 'hospital' && <InputGroup label="Location Address" value={formData.location} onChange={(val) => setFormData({ ...formData, location: val })} />}
    </div>

    <TextArea label="About / Bio" value={formData.bio} onChange={(val) => setFormData({ ...formData, bio: val })} placeholder={`Write a brief description for your ${userData?.role} profile...`} />

    {userData?.role === 'hospital' && (
      <DepartmentSection
        formData={formData}
        setFormData={setFormData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        filteredOptions={filteredOptions}
      />
    )}

    {(userData?.role === 'doctor' || userData?.role === 'hospital') && (
      <AvailabilitySection formData={formData} setFormData={setFormData} toggleDay={toggleDay} />
    )}
  </div>
);

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

const TextArea = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 focus:bg-white transition-all outline-none font-medium text-slate-700 min-h-[120px]"
      placeholder={placeholder}
    />
  </div>
);

const DepartmentSection = ({ formData, setFormData, searchTerm, setSearchTerm, isOpen, setIsOpen, filteredOptions }) => (
  <div className="space-y-4">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
      <Building2 size={14} /> Hospital Departments
    </label>

    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <input
          type="text"
          placeholder="Select or search departments..."
          className="w-full px-4 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 focus:bg-white outline-none transition-all font-bold text-slate-700"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      </div>

      {isOpen && (
        <Dropdown filteredOptions={filteredOptions} formData={formData} setFormData={setFormData} setSearchTerm={setSearchTerm} setIsOpen={setIsOpen} />
      )}
    </div>

    <div className="flex flex-wrap gap-2">
      {formData.departments.map((dept, index) => (
        <div key={index} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-blue-100">
          {typeof dept === 'string' ? dept : dept.name}
          <button
            type="button"
            onClick={() => setFormData({
              ...formData,
              departments: formData.departments.filter(d => (typeof d === 'string' ? d !== dept : d.name !== dept.name))
            })}
            className="hover:text-red-500 transition-colors"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const Dropdown = ({ filteredOptions, formData, setFormData, setSearchTerm, setIsOpen }) => (
  <div className="absolute z-20 w-full mt-2 bg-white border border-slate-100 shadow-xl rounded-2xl max-h-60 overflow-y-auto p-2 scrollbar-hide animate-in fade-in slide-in-from-top-2 duration-200">
    {filteredOptions.length > 0 ? (
      filteredOptions.map((opt) => {
        const exists = formData.departments.find(d =>
          (typeof d === 'string' ? d === opt : d.name === opt)
        );

        return (
          <button
            key={opt}
            type="button"
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors flex justify-between items-center ${exists ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : 'hover:bg-blue-50 text-slate-700'
              }`}
            onClick={() => {
              if (!exists) {
                const newDept = {
                  id: Date.now().toString(),
                  name: opt,
                  status: "Open 24/7",
                  description: `Specialized ${opt} services and care.`,
                  color: "border-l-blue-500",
                };
                setFormData({ ...formData, departments: [...formData.departments, newDept] });
                setSearchTerm("");
                setIsOpen(false);
              }
            }}
          >
            {opt}
            {exists && <Check size={14} className="text-blue-500" />}
          </button>
        );
      })
    ) : (
      <div className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
        No departments match your search
      </div>
    )}
  </div>
);

const AvailabilitySection = ({ formData, setFormData, toggleDay }) => (
  <div className="p-6 bg-slate-50 rounded-[2.5rem] space-y-6">
    <div className="flex items-center justify-between">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <Calendar size={14} /> Availability Schedule
      </label>
      <TimeInputs formData={formData} setFormData={setFormData} />
    </div>
    <div className="flex justify-between gap-2">
      {DAYS.map(day => (
        <DayButton key={day} day={day} formData={formData} toggleDay={toggleDay} />
      ))}
    </div>
  </div>
);

const TimeInputs = ({ formData, setFormData }) => (
  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
    <Clock size={14} className="text-blue-500" />
    <input type="time" value={formData.availabilityTime.start} onChange={(e) => setFormData({ ...formData, availabilityTime: { ...formData.availabilityTime, start: e.target.value } })} className="bg-transparent outline-none" />
    <span>-</span>
    <input type="time" value={formData.availabilityTime.end} onChange={(e) => setFormData({ ...formData, availabilityTime: { ...formData.availabilityTime, end: e.target.value } })} className="bg-transparent outline-none" />
  </div>
);

const DayButton = ({ day, formData, toggleDay }) => (
  <button
    onClick={() => toggleDay(day)}
    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${formData.availableDays.includes(day) ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-white text-slate-400 border border-slate-100'
      }`}
  >
    {day}
  </button>
);

export default EditProfile;