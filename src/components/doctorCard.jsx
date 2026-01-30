import {ChevronRight, Star, MapPin} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const DoctorCard = ({ doc }) => {
    const navigate = useNavigate();

   return (
    <div
        key={doc.id}
        onClick={() => navigate(`/doctor/${doc.id}`)}
        className="group relative bg-white rounded-[2rem] p-2 pb-4 border border-slate-50 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(8,112,184,0.08)] transition-all duration-500 cursor-pointer overflow-hidden"
    >
        {/* Image Container with Zoom & Badge */}
        <div className="relative aspect-[4/4] mb-3 overflow-hidden rounded-[1.7rem] bg-slate-100">
            <img
                src={doc.image?.url || "https://via.placeholder.com/150"}
                alt={doc.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Minimalist Rating Overlay */}
            <div className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1 shadow-sm border border-white/20">
                <Star size={10} className="text-amber-500" fill="currentColor" />
                <span className="text-[10px] font-black text-slate-700">{doc.rating || "5.0"}</span>
            </div>
        </div>

        {/* Text Content */}
        <div className="px-2">
            <span className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1 block">
                {doc.specialty}
            </span>
            
            <div className="flex justify-between items-start gap-2">
                <h4 className="font-black text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    Dr. {doc.name}
                </h4>
                
                {/* Visual "Go" Indicator */}
                <div className="mt-0.5 p-1.5 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <ChevronRight size={12} />
                </div>
            </div>
        </div>

        {/* Hover Highlight (Subtle bottom bar) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 rounded-t-full group-hover:w-1/3 transition-all duration-500" />
    </div>
);};

export const HospitalCard = ({ hosp, navigate }) => (

<div
    key={hosp.id}
    className=" group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col"
>
    {/* Image Area */}
    <div className="relative h-48 overflow-hidden">
        <img
            src={hosp.image?.url || "https://via.placeholder.com/400x250"}
            alt={hosp.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-green-600 px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm border border-slate-100 uppercase tracking-wider">
                Available Now
            </span>
        </div>
    </div>

    {/* Content Area */}
    <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-3">
            <div>
                <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {hosp.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-xs font-medium truncate max-w-45">{hosp.location}</span>
                </div>
            </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 flex items-center gap-3">
            <Link
                to={`/hospital/${hosp.id}`}
                className="flex-1 text-center py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors"
            >
                View Details
            </Link>

            <button
                onClick={navigate}
                className="flex-[1.5] bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                Book Appointment
                <ChevronRight size={16} />
            </button>
        </div>
    </div>
</div>
);