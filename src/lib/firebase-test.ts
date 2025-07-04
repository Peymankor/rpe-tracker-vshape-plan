import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Test function to verify Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Try to add a test document
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Firebase connection test',
      timestamp: new Date().toISOString()
    });
    
    console.log('✅ Firebase connection successful! Test document ID:', testDoc.id);
    
    // Try to read documents
    const querySnapshot = await getDocs(collection(db, 'test'));
    console.log('✅ Read operation successful! Found', querySnapshot.size, 'documents');
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
}; 