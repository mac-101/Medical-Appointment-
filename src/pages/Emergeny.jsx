
import React, { useState } from 'react';
import './Emergency.css';
import { Phone, MapPin, AlertTriangle, Heart, Ambulance, Clock, Navigation, Shield } from 'lucide-react';

function Emergency() {
  const [emergencyType, setEmergencyType] = useState('general');
  const [userLocation, setUserLocation] = useState('');

  const emergencyContacts = [
    { id: 1, name: 'National Emergency', number: '911', icon: <AlertTriangle />, color: 'bg-red-500' },
    { id: 2, name: 'Ambulance', number: '112', icon: <Ambulance />, color: 'bg-orange-500' },
    { id: 3, name: 'Poison Control', number: '1-800-222-1222', icon: <Shield />, color: 'bg-purple-500' },
    { id: 4, name: 'Mental Health Crisis', number: '988', icon: <Heart />, color: 'bg-blue-500' },
    { id: 5, name: 'Police Department', number: '911', icon: <Shield />, color: 'bg-indigo-500' },
    { id: 6, name: 'Fire Department', number: '911', icon: <AlertTriangle />, color: 'bg-yellow-600' },
  ];

  const emergencySteps = [
    { step: 1, instruction: 'Stay calm and assess the situation' },
    { step: 2, instruction: 'Check for danger to yourself and the patient' },
    { step: 3, instruction: 'Call emergency services immediately' },
    { step: 4, instruction: 'Provide clear location and situation details' },
    { step: 5, instruction: 'Follow dispatcher instructions until help arrives' },
    { step: 6, instruction: 'Perform first aid if trained and safe to do so' },
  ];

  const nearbyHospitals = [
    { id: 1, name: 'City General Hospital', distance: '2.3 miles', address: '123 Medical Center Dr', phone: '(555) 123-4567', emergency: true },
    { id: 2, name: 'Westside Medical Center', distance: '3.1 miles', address: '456 Health Ave', phone: '(555) 234-5678', emergency: true },
    { id: 3, name: 'Children\'s Hospital', distance: '4.5 miles', address: '789 Pediatric Way', phone: '(555) 345-6789', emergency: true },
    { id: 4, name: 'Urgent Care Clinic', distance: '1.2 miles', address: '101 Quick St', phone: '(555) 456-7890', emergency: false },
  ];

  const emergencyTypes = [
    { id: 'general', label: 'General Emergency' },
    { id: 'cardiac', label: 'Cardiac Emergency' },
    { id: 'trauma', label: 'Trauma/Injury' },
    { id: 'respiratory', label: 'Breathing Difficulty' },
    { id: 'pediatric', label: 'Pediatric Emergency' },
    { id: 'mental', label: 'Mental Health Crisis' },
  ];

  const handleCall = (number) => {
    alert(`Calling ${number}...\n\nIf this is a real emergency, please hang up and dial 911 immediately.`);
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          alert('Location shared with emergency services');
        },
        () => alert('Unable to retrieve location')
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      {/* Emergency Header */}
      <header className="bg-linear-to-r from-red-600 to-red-700 text-white py-6 px-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <AlertTriangle className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">EMERGENCY ASSISTANCE</h1>
                <p className="text-red-100">Immediate Medical Help Available 24/7</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold bg-white text-red-600 px-4 py-2 rounded-lg inline-block animate-pulse">
                CALL 911
              </div>
              <p className="text-sm mt-1">For Life-Threatening Emergencies</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Emergency Contacts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Emergency Type Selector */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
                Select Emergency Type
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emergencyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEmergencyType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${emergencyType === type.id ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 hover:border-red-300'}`}
                  >
                    <div className="font-semibold">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Contacts Grid */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Phone className="w-6 h-6 mr-2 text-green-600" />
                Emergency Contacts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className={`${contact.color} p-2 rounded-lg text-white mr-3`}>
                        {contact.icon}
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">{contact.name}</h3>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-4">{contact.number}</div>
                    <button
                      onClick={() => handleCall(contact.number)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Steps */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-blue-600" />
                Emergency Response Steps
              </h2>
              <div className="space-y-4">
                {emergencySteps.map((item) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 font-bold">
                      {item.step}
                    </div>
                    <div className="bg-white p-4 rounded-xl grow shadow-sm">
                      <p className="text-gray-700">{item.instruction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Map & Quick Actions */}
          <div className="space-y-8">
            {/* Location Services */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-red-500" />
                Your Location
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-gray-600 mb-2">Share your location with emergency services:</p>
                  <div className="text-sm text-gray-500 mb-4">
                    {userLocation || 'Location not shared'}
                  </div>
                  <button
                    onClick={handleLocationShare}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Navigation className="w-5 h-5 mr-2" />
                    Share My Location
                  </button>
                </div>
              </div>
            </div>

            {/* Nearby Hospitals */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                Nearby Emergency Facilities
              </h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {nearbyHospitals.map((hospital) => (
                  <div key={hospital.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{hospital.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        {hospital.distance}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{hospital.address}</p>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-semibold ${hospital.emergency ? 'text-red-600' : 'text-yellow-600'}`}>
                        {hospital.emergency ? '24/7 ER' : 'Urgent Care'}
                      </span>
                      <button
                        onClick={() => handleCall(hospital.phone)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-linear-to-r from-green-50 to-teal-50 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors">
                  <Heart className="w-5 h-5 mr-2" />
                  CPR Instructions
                </button>
                <button className="w-full bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors">
                  <Ambulance className="w-5 h-5 mr-2" />
                  First Aid Guide
                </button>
                <button className="w-full bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-4 rounded-xl flex items-center justify-center transition-colors">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Emergency Checklist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Alert Banner */}
        <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
            <div>
              <h3 className="font-bold text-lg text-red-700">CRITICAL EMERGENCY ALERT</h3>
              <p className="text-red-600">
                If you or someone else is experiencing chest pain, difficulty breathing, severe bleeding, 
                loss of consciousness, or stroke symptoms (FAST: Face drooping, Arm weakness, Speech difficulty, Time to call 911),
                call 911 immediately. Do not wait.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">MediCare Emergency Services</h3>
              <p className="text-gray-400">24/7 Emergency Medical Assistance</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">Non-emergency inquiries: (555) 555-HELP</p>
              <p className="text-gray-400 text-sm mt-2">
                This page is for emergency use only. For non-urgent matters, visit our main website.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Emergency;