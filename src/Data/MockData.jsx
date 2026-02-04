import { useState, useEffect } from "react";
import { db } from "../../firebase.config";
// 1. Import limitToFirst
import { ref, get, query, orderByChild, equalTo, limitToFirst } from "firebase/database";

export const useDirectory = (limit = null) => {
  const [topDoctors, setTopDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersRef = ref(db, 'users');

        // 2. Create constraints array
        const getConstraints = (role) => {
          const constraints = [orderByChild('role'), equalTo(role)];
          if (limit) constraints.push(limitToFirst(limit)); // Only add limit if provided
          return constraints;
        };

        // Fetch Doctors
        const doctorsQuery = query(usersRef, ...getConstraints('doctor'));
        const docSnapshot = await get(doctorsQuery);
        const docs = [];
        docSnapshot.forEach((child) => {
          docs.push({ id: child.key, ...child.val() });
        });
        setTopDoctors(docs);

        // Fetch Hospitals
       

      } catch (error) {
        console.error("Directory Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]); // Re-run if limit changes

  return { topDoctors, loading };
};