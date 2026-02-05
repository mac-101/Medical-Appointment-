import React, { useState, useEffect } from 'react';
import { Check, X, Loader2, Clock } from 'lucide-react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { db } from '../../firebase.config';
import { ref, get, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


// 1. Helper function to turn "09:00" and "17:00" into ["09:00 AM", ...]
const generateTimeSlots = (startTime, endTime) => {
  if (!startTime || !endTime) return [];
  const slots = [];
  let current = new Date(`2026-01-01T${startTime}:00`);
  const end = new Date(`2026-01-01T${endTime}:00`);

  while (current < end) {
    slots.push(
      current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    );
    current.setMinutes(current.getMinutes() + 60); // 1 hour intervals
  }
  return slots;
};

const AppointmentBooking = ({ onClose, specialistId, specialistType }) => {
  const auth = getAuth();
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [specialistData, setSpecialistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userRef = ref(db, `users/${specialistId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setSpecialistData(data);
          if (data.availabilityTime) {
            const slots = generateTimeSlots(data.availabilityTime.start, data.availabilityTime.end);
            setAvailableSlots(slots);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [specialistId]);

  // 4. Handle Confirm Booking
  const handleConfirm = async () => {
    if (!auth.currentUser) {
      navigate("/login")
      toast("Please login to book");

      return
    }

    // Prevent self-booking
    if (auth.currentUser.uid === specialistId) {
      return toast.error("You cannot book an appointment with yourself.");
    }

    if (!selectedTime) return toast("Please select a time slot");
    setBookingLoading(true);

    const bookingData = {
      patientId: auth.currentUser.uid,
      specialistId: specialistId,
      specialistName: specialistData.name,
      date: date.toISOString().split('T')[0],
      time: selectedTime,
      // CHANGE: Store the name string, not the whole object
      specialty: specialistData.specialty || specialistData.department || "General",
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      const bookingsRef = ref(db, 'bookings');
      const newBookingRef = push(bookingsRef);
      await set(newBookingRef, bookingData);
      toast.success("Appointment Requested Successfully!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      toast.error("Booking failed. Please try again.")
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div onClick={onClose} className="fixed md:relative inset-0 z-50 md:z-0 lg:backdrop-blur-md  flex items-end md:items-center justify-center ">
      <div onClick={(e) => e.stopPropagation()} className="relative scrollUP w-full max-w-xl bg-white shadow-2xl h-[90lvh] md:h-auto md:max-h-[90vh] rounded-t-[2.5rem] md:rounded-3xl overflow-hidden flex flex-col">

        <header className="p-8 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h1 className="text-lg font text-gray-900 ">Confirm Schedule With</h1>
            <p className="text-xl font text-blue-500">Dr {specialistData?.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          {loading ? <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-600" /></div> : (
            <>
              <div className="modern-calendar-wrapper flex justify-center">
                <Calendar onChange={setDate} value={date} minDate={new Date()} className="border-none shadow-none" />
              </div>



              <section>
                <h3 className="text-[15px] text-gray-400 mb-4">Available Slots</h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.length > 0 ? availableSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl border-2 text-[11px] font-bold transition-all ${selectedTime === time
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-50 text-gray-400 hover:border-blue-200'
                        }`}
                    >
                      {time}
                    </button>
                  )) : <p className="col-span-3 text-center text-xs text-gray-400 font-bold">No slots set by provider</p>}
                </div>
              </section>
            </>
          )}
        </div>

        <footer className="p-6 bg-white border-t border-gray-50 sticky bottom-0">
          <button
            // UPDATED DISABLE LOGIC: Must have time AND (if hospital) must have dept
            disabled={!selectedTime || !date || bookingLoading}
            onClick={handleConfirm}
            className="w-full bg-blue-600 disabled:bg-gray-200 text-white py-4 rounded-2xl text-sm font shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            {bookingLoading ? <Loader2 className="animate-spin" size={16} /> : <><Check size={16} /> Confirm Booking</>}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AppointmentBooking;