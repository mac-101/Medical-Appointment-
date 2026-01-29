import { auth, db } from "../../firebase.config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export const signUpUser = async (userData) => {
  // 1. Destructure the core Auth fields, and catch everything else in 'rest'
  const { email, password, fullName, role, ...rest } = userData;

  try {
    // 2. Create the credentials in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 3. Create the profile object
    let profileData = {
      uid: user.uid,
      name: fullName,
      email: email,
      role: role || 'patient',
      createdAt: new Date().toISOString(),
      image: {
        url: "", 
        public_id: "" 
      },
      // 4. Spread the rest of the fields (searchIndex, specialty, location, etc.)
      ...rest 
    };

    // Role-Specific defaults if they don't exist in 'rest'
    if (role === 'doctor' && !profileData.experience) {
      profileData.experience = ""; 
    } 
    
    if (role === 'hospital' && !profileData.departments) {
      profileData.departments = []; 
    }

    // 5. Save to Realtime Database
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