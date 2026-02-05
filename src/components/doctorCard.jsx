import { Hospital, Star, MapPin } from 'lucide-react';
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
                    src={doc.image?.url || "https://api.dicebear.com/9.x/avataaars/svg?seed=leah"}
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

                <div className="items-start gap-2">
                    <h4 className="font-black text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        Dr. {doc.name}
                    </h4>
                    <h4 className="flex py-1 items-center text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        <Hospital className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={15} />
                        {doc.hospital || "No Hospital Assigned"}
                    </h4>
                    <h4 className="flex py-1 items-center text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        <MapPin className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={15} />
                        {doc.location || "Unknown Location"}
                    </h4>
                    

                </div>
            </div>

            {/* Hover Highlight (Subtle bottom bar) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 rounded-t-full group-hover:w-1/3 transition-all duration-500" />
        </div>
    );
};

