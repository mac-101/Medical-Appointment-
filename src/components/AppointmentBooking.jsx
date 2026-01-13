import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentBooking = () => {
    const specialistType = 'hospital';
    
    // 1. STATE MANAGEMENT
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

    // 2. FIREBASE-READY SUBMIT FUNCTION
    const handleBooking = async () => {
        // This constant is what you send to Firestore
        const bookingData = {
            appointmentDate: date.toISOString(), // Firebase likes ISO strings or Timestamps
            time: selectedTime,
            departmentId: selectedDept,
            type: specialistType,
            status: 'pending',
            createdAt: new Date().toISOString(),
            // patientId: user.uid (You'll add this once Firebase Auth is ready)
        };

        if (!selectedTime || (specialistType === 'hospital' && !selectedDept)) {
            alert("Please select all fields");
            return;
        }

        console.log("Pushing to Firebase:", bookingData);
        // Your Firebase logic: 
        // await addDoc(collection(db, "appointments"), bookingData);
        alert("Appointment Submitted!");
    };

    return (
        <div className="max-w-xl mx-auto bg-white border border-gray-200">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-semibold text-gray-900">Book Appointment</h1>
                <p className="text-sm text-gray-500 mt-1">Select your preferred date and time</p>
            </div>

            <div className="p-6 space-y-8">
                <div className="modern-calendar-wrapper">
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
                    <section className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
                            Select Department
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {depts.map((dept) => (
                                <button
                                    key={dept.id}
                                    onClick={() => setSelectedDept(dept.name)} // Changed to name for easier reading in DB
                                    className={`p-4 border-2 transition-all flex flex-col items-center gap-2
                                    ${selectedDept === dept.name
                                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300'}`}
                                >
                                    <span className="text-xl">{dept.icon}</span>
                                    <span className="text-[10px] font-black uppercase tracking-tight text-center">
                                        {dept.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-bold text-gray-900">Available Time</h3>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                            {date.toDateString()}
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 border text-xs font-medium transition-all
                                ${selectedTime === time
                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                    : 'border-gray-200 text-gray-600 hover:border-blue-400'}`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </section>

                <button 
                    onClick={handleBooking}
                    className="w-full bg-gray-900 text-white py-4 text-sm font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                >
                    Confirm Appointment <Check size={18} />
                </button>
            </div>
        </div >
    );
};

export default AppointmentBooking;