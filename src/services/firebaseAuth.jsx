import { auth, db } from "../../firebase.config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export const signUpUser = async (userData) => {
  const { email, password, fullName, role, location, specialty } = userData;

  try {
    // 1. Create the credentials in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Create the base profile object
    let profileData = {
      uid: user.uid,
      name: fullName,
      email: email,
      role: role, // 'patient', 'doctor', or 'hospital'
      createdAt: new Date().toISOString(),
      // Creating the image object with empty strings for Cloudinary later
      image: {
        url: "", 
        public_id: "" 
      }
    };

    // 3. Add Role-Specific Data
    if (role === 'doctor') {
      profileData.specialty = specialty;
      profileData.experience = ""; // Optional: add more doctor-specific fields
    } 
    
    if (role === 'hospital') {
      profileData.location = location;
      profileData.departments = []; // Optional: for the hospital's tab
    }

    // 4. Save to Realtime Database under the unique UID
    await set(ref(db, `users/${user.uid}`), profileData);

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};



export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    // Return a friendly error message
    return { success: false, error: error.message };
  }
};