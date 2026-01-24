import { db } from '../../firebase.config'; 
import { ref, update } from 'firebase/database';

export const updateUserInfo = async (uid, data) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    await update(userRef, data);
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: error.message };
  }
};