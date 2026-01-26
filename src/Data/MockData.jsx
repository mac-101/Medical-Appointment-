// export const topDoctors = [
//     { id: 1, name: "Dr. Maria Elena", specialty: "Psychologist", rating: 4.9, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" },
//     { id: 2, name: "Dr. James Wilson", specialty: "Cardiologist", rating: 4.8, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300" },
//     { id: 3, name: "Dr. Sarah Chen", specialty: "Dermatologist", rating: 5.0, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" },
//     { id: 4, name: "Dr. Robert Fox", specialty: "Neurologist", rating: 4.7, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300" },
//     { id: 5, name: "Dr. Arlene McCoy", specialty: "Pediatrician", rating: 4.9, image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=300" },
//     { id: 6, name: "Dr. Jerome Bell", specialty: "Orthopedic", rating: 4.6, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300" },
//     { id: 7, name: "Dr. Eleanor Pena", specialty: "Oncologist", rating: 4.8, image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300" },
//     { id: 8, name: "Dr. Marvin McKinney", specialty: "Surgeon", rating: 4.7, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300" },
//     { id: 9, name: "Dr. Leslie Alexander", specialty: "Dentist", rating: 4.9, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" },
//     { id: 10, name: "Dr. Wade Warren", specialty: "General Physician", rating: 4.5, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300" }
// ];

// export const hospitals = [
//     { id: 1, name: "City General", location: "Downtown", rating: 4.7, image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=500" },
//     { id: 2, name: "St. Lukes Care", location: "North Wing", rating: 4.5, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=500" },
//     { id: 3, name: "Eastside Medical", location: "East District", rating: 4.8, image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500" },
//     { id: 4, name: "Mayo Clinic", location: "West Side", rating: 4.9, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500" },
//     { id: 5, name: "Unity Health", location: "South Station", rating: 4.4, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500" },
//     { id: 6, name: "Grace Hospital", location: "Old Town", rating: 4.6, image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=500" },
//     { id: 7, name: "Central Wellness", location: "Park Avenue", rating: 4.7, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500" },
//     { id: 8, name: "Mercy Clinic", location: "Industrial Road", rating: 4.3, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500" },
//     { id: 9, name: "Northstar Med", location: "Skyline Blvd", rating: 4.8, image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500" },
//     { id: 10, name: "Legacy Hospital", location: "Heritage Square", rating: 4.9, image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500" }
// ];

import { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";

export const useDirectory = () => {
  const [topDoctors, setTopDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersRef = ref(db, 'users');

        // 1. Fetch Doctors
        const doctorsQuery = query(usersRef, orderByChild('role'), equalTo('doctor'));
        const docSnapshot = await get(doctorsQuery);
        const docs = [];
        docSnapshot.forEach((child) => {
          docs.push({ id: child.key, ...child.val() });
        });
        setTopDoctors(docs);

        // 2. Fetch Hospitals
        const hospitalsQuery = query(usersRef, orderByChild('role'), equalTo('hospital'));
        const hospSnapshot = await get(hospitalsQuery);
        const hosps = [];
        hospSnapshot.forEach((child) => {
          hosps.push({ id: child.key, ...child.val() });
        });
        setHospitals(hosps);

      } catch (error) {
        console.error("Directory Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { topDoctors, hospitals, loading };
};