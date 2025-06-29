// src/utils/cleanupDuplicates.ts
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

export const cleanupDuplicateAlgorithms = async (): Promise<number> => {
  // Get all algorithms
  const algorithmsSnapshot = await getDocs(collection(db, 'algorithms'));
  
  // Create a map to track unique algorithms by type and name
  const uniqueAlgorithms = new Map<string, string>();
  const duplicates: string[] = [];
  
  // Find duplicates
  algorithmsSnapshot.docs.forEach(docSnap => {
    const data = docSnap.data();
    const key = `${data.type}-${data.name}`;
    
    if (!uniqueAlgorithms.has(key)) {
      uniqueAlgorithms.set(key, docSnap.id);
    } else {
      duplicates.push(docSnap.id);
      console.log(`Found duplicate: ${data.type}-${data.name} (ID: ${docSnap.id})`);
    }
  });
  
  console.log(`Found ${duplicates.length} duplicate algorithms`);
  
  // Delete duplicates
  for (const docId of duplicates) {
    await deleteDoc(doc(db, 'algorithms', docId));
    console.log(`Deleted duplicate algorithm with ID ${docId}`);
  }
  
  console.log('Finished cleaning up duplicates');
  return duplicates.length;
};