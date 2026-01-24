import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const AppointmentBooking = ({ onClose, specialistType }) => {
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDept, setSelectedDept] = useState(null);

    const depts = [
        { id: 1, name: "Emergency", icon: "🚨" },
        { id: 2, name: "Cardiology", icon: "❤️" },
        { id: 3, name: "Pediatrics", icon: "👶" },
        { id: 4, name: "Radiology", icon: "🩻" },
    ];

    const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);
    

    return (
        <div 
            onClick={onClose} 
            className="fixed inset-0 z-50 lg:backdrop-blur-md bg-gray-900/20 flex items-end md:items-center justify-center transition-all"
        >
            {/* MOBILE: h-[90lvh], rounded-t-3xl, no bottom space 
               DESKTOP: max-h-[85vh], rounded-2xl, margin-y for padding 
            */}
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="scrollUP relative w-full max-w-xl bg-white border border-gray-100 shadow-2xl 
               h-[90lvh] md:h-auto md:max-h-[85vh] md:my-10
               rounded-t-[2.5rem] md:rounded-2xl overflow-hidden flex flex-col transition-all"
                >
                
                {/* ABSOLUTE HEADER */}
                <header className="absolute top-0 left-0 w-full h-20 bg-white/90 backdrop-blur-sm border-b border-gray-50 px-8 flex justify-between items-center z-20">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Book Appointment</h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Select Schedule</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                    >
                        <X size={20} />
                    </button>
                </header>

                {/* SCROLLABLE CONTENT (Padded to avoid being hidden by absolute elements) */}
                <div className="flex-1 overflow-y-auto pt-24 pb-28 px-8 space-y-8 scrollbar-hide">
                    
                    <div className="modern-calendar-wrapper flex justify-center py-2">
                        <Calendar
                            onChange={setDate}
                            value={date}
                            minDate={new Date()}
                            view="month"
                            prev2Label={null}
                            next2Label={null}
                        />
                    </div>

                    {specialistType === 'hospital' && (
                        <section className="animate-in fade-in duration-700">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-4">Department</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {depts.map((dept) => (
                                    <button
                                        key={dept.id}
                                        onClick={() => setSelectedDept(dept.name)}
                                        className={`p-4 border transition-all flex items-center gap-3 rounded-xl
                                        ${selectedDept === dept.name
                                            ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                                            : 'border-gray-50 bg-gray-50/30 text-gray-500 hover:border-gray-200'}`}
                                    >
                                        <span className="text-lg">{dept.icon}</span>
                                        <span className="text-xs font-bold uppercase">{dept.name}</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Available Slots</h3>
                            <span className="text-[10px] font-bold text-blue-500 px-2 py-1 bg-blue-50 rounded">
                                {date.toDateString()}
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-3 rounded-xl border text-[11px] font-bold transition-all
                                    ${selectedTime === time
                                        ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200'
                                        : 'border-gray-100 text-gray-400 hover:border-blue-300'}`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ABSOLUTE FOOTER BUTTON */}
                <footer className="absolute bottom-0 left-0 w-full p-6 bg-white/90 backdrop-blur-sm border-t border-gray-50 z-20">
                    <button
                        onClick={() => alert("Booking Sent")}
                        className="w-full bg-gray-900 text-white py-4 rounded-2xl text-xs font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl"
                    >
                        Confirm Booking <Check size={16} />
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AppointmentBooking;