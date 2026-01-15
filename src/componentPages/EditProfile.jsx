export default function EditProfile() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-bold text-gray-700">Account Information</h3>
        <button className="text-blue-600 text-sm font-medium">Update</button>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4">
        <input type="text" placeholder="Full Name" className="p-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
        <input type="email" placeholder="Email Address" className="p-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
      </div>
    </div>
  );
}