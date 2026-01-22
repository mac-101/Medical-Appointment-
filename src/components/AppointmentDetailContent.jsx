import { Calendar, Clock, MapPin, X } from "lucide-react";

const getStatusStyle = (status) => {
    if (status === "Confirmed") return "bg-green-50 text-green-600 border-green-100";
    if (status === "Pending") return "bg-amber-50 text-amber-600 border-amber-100";
    if (status === "Cancelled") return "bg-red-50 text-red-600 border-red-100";
    return "bg-gray-50 text-gray-500";
};

const DetailContent = ({ data, isModal, onClick }) => (
    <div className={`bg-white rounded-2xl h-90lvh `}>
        <div className="h-2 bg-blue-600"></div>
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-[0.2em] bg-blue-50 px-2 py-1 rounded">
                    {data.specialty || data.department}
                </span>
                {isModal && (
                    <button onClick={onClick} className="p-1 hover:bg-slate-100 rounded-full text-slate-400">
                        <X size={20} />
                    </button>
                )}
            </div>

            <h1 className="text-2xl font-black text-slate-900 mt-4 leading-tight">
                {data.hospitalName || data.doctorName}
            </h1>

            <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-slate-600">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Calendar size={20} /></div>
                    <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Date</p>
                        <p className="text-sm font-semibold text-slate-900">{data.date}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-slate-600">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><Clock size={20} /></div>
                    <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Time</p>
                        <p className="text-sm font-semibold text-slate-900">{data.time}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-slate-600">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><MapPin size={20} /></div>
                    <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Location</p>
                        <p className="text-sm font-semibold text-slate-900">{data.location}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Current Status</p>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyle(data.status)}`}>
                        {data.status}
                    </span>
                </div>
                {data.status !== 'Cancelled' && (
                    <button className="text-xs font-bold text-red-500 hover:underline">Cancel Booking</button>
                )}
            </div>
        </div>
    </div>
);

export default DetailContent