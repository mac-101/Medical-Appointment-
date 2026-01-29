import {ChevronRight, Star, MapPin} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const DoctorCard = ({ doc }) => {
    const navigate = useNavigate();

    return (
        <div
        key={doc.id}
        className=" bg-white border border-slate-100 rounded-2xl p-3 hover:border-blue-500/20 transition-all group"
    >
        {/* Simple Image */}
        <div className="relative mb-3">
            <img
                src={doc.image?.url || "https://via.placeholder.com/150"}
                alt={doc.name}
                className="w-full h-32 md:h-40 object-cover rounded-xl"
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-lg flex items-center gap-1">
                <Star size={10} className="text-orange-400" fill="currentColor" />
                <span className="text-[10px] font-bold">{doc.rating || "5.0"}</span>
            </div>
        </div>

        {/* Name & Specialty */}
        <div className="mb-3">
            <h4 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h4>
            <p className="text-[10px] font-medium text-slate-400">{doc.specialty}</p>
        </div>

        {/* The One Important Button */}
        <button
            onClick={() => navigate(`/doctor/${doc.id}`)}
            
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-[11px] font-bold hover:bg-blue-700 transition-colors"
        >
            Book Now
        </button>
    </div>
)};

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