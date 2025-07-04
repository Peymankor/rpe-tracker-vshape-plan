import { createClient } from '@supabase/supabase-js';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";

const supabaseUrl = 'https://bcymicgfsmnfyesdpgqa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjeW1pY2dmc21uZnllc2RwZ3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzIyMTUsImV4cCI6MjA2NzIwODIxNX0.lIFIBu-eQzuz7BPH3UIiG2Cvqcvj2GHpeitToOBXUig';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function addWorkout(workout) {
  await addDoc(collection(db, "workouts"), workout);
}

export async function getWorkouts() {
  const querySnapshot = await getDocs(collection(db, "workouts"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

const saveCurrentSession = async (day, week) => {
  // ...existing code...
  try {
    await addWorkout({
      day,
      week,
      text,
      created_at: new Date().toISOString(),
    });
    setSaveStatus(`Saved for Day ${day}, Week ${week}`);
    console.log('Saved to Supabase!');
  } catch (e) {
    setSaveStatus('Error saving to database');
    console.error('Supabase error:', e);
  }
};

supabase.from('workouts').insert([{ text: 'test', day: 1, week: 1, created_at: new Date().toISOString() }])
  .then(console.log)
  .catch(console.error);