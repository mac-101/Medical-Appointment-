export default function Departments() {
  const depts = ["Emergency", "Cardiology", "Pediatrics", "Radiology"];
  return (
    <>
      <h1 className="text-2xl px-4 pb-5 font-medium">Departments</h1>

      <div className="grid grid-cols-2 gap-3">
        {depts.map(d => (
          <div key={d} className="p-4 bg-white rounded-xl border border-gray-100 text-center font-semibold text-gray-600 hover:bg-blue-50 cursor-pointer">
            {d}
          </div>
        ))}
      </div>
    </>
  );
}