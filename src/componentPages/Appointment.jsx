export default function AppointmentsList() {
  const mockAppts = [
    { date: 'Jan 20', time: '10:00 AM', doc: 'Dr. Smith', status: 'Confirmed' },
    { date: 'Feb 05', time: '02:30 PM', doc: 'General Clinic', status: 'Pending' }
  ];
  return (
    <div className="space-y-3">
      {mockAppts.map((item, i) => (
        <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div>
            <p className="font-bold text-gray-800">{item.doc}</p>
            <p className="text-xs text-gray-400">{item.date} • {item.time}</p>
          </div>
          <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-lg">{item.status}</span>
        </div>
      ))}
    </div>
  );
}