// src/services/auth.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// Register new user
export const registerUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Create user document in Firestore
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email: userCredential.user.email,
    createdAt: new Date().toISOString(),
    savedAlgorithms: [],
    performanceHistory: []
  });
  
  return userCredential.user;
};

// Login user
export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};