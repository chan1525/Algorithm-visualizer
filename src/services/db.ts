// src/services/db.ts
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  Timestamp, 
  addDoc 
} from 'firebase/firestore';
import { db } from './firebase';

// Types for our database
export interface AlgorithmConfig {
  id?: string;
  type: 'sorting' | 'graph' | 'tree' | 'search';
  name: string;
  description: string;
  parameters: Record<string, any>;
  createdBy: string;
  createdAt: string;
}

export interface PerformanceResult {
  id?: string;
  algorithmId: string;
  userId: string;
  executionTimeMs: number;
  memoryUsageBytes: number;
  parameters: Record<string, any>;
  timestamp: string;
}

// Get all algorithms
export const getAlgorithms = async (): Promise<AlgorithmConfig[]> => {
  const snapshot = await getDocs(collection(db, 'algorithms'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as AlgorithmConfig[];
};

// Get algorithms by type
export const getAlgorithmsByType = async (type: string): Promise<AlgorithmConfig[]> => {
  const q = query(collection(db, 'algorithms'), where('type', '==', type));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as AlgorithmConfig[];
};

// Get a specific algorithm
export const getAlgorithm = async (id: string): Promise<AlgorithmConfig | null> => {
  const docRef = doc(db, 'algorithms', id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as AlgorithmConfig;
  }
  
  return null;
};

// Save performance result
export const savePerformanceResult = async (result: PerformanceResult): Promise<string> => {
  const docRef = await addDoc(collection(db, 'results'), {
    ...result,
    timestamp: new Date().toISOString()
  });
  
  return docRef.id;
};

// Get user's performance history
export const getUserPerformanceHistory = async (userId: string): Promise<PerformanceResult[]> => {
  const q = query(collection(db, 'results'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as PerformanceResult[];
};