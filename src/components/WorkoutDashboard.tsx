import { useState } from "react";
import { WorkoutCard } from "./WorkoutCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Target, TrendingUp } from "lucide-react";
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { testFirebaseConnection } from '@/lib/firebase-test';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

const workoutData = [
  // Week 1
  {
    day: 1,
    week: 1,
    title: "Pull (Lats · Traps)",
    exercises: [
      { name: "Wide-Grip Pull-ups", sets: "4", reps: "5", weight: "bodyweight" },
      { name: "Barbell Row", sets: "4", reps: "6", weight: "50 kg" },
      { name: "Barbell Shrug", sets: "3", reps: "8", weight: "60 kg" },
      { name: "Barbell Curl", sets: "3", reps: "10", weight: "20 kg" }
    ]
  },
  {
    day: 2,
    week: 1,
    title: "Push (Shoulders · Chest)",
    exercises: [
      { name: "Standing OHP", sets: "4", reps: "5", weight: "40 kg" },
      { name: "Weighted Push-ups", sets: "4", reps: "6", weight: "10 kg" },
      { name: "DB Lateral Raise", sets: "3", reps: "12", weight: "5 kg" },
      { name: "Weighted Dips", sets: "3", reps: "8", weight: "bodyweight" }
    ]
  },
  {
    day: 3,
    week: 1,
    title: "Pull (Lats · Arms)",
    exercises: [
      { name: "Under-hand Chin-ups", sets: "4", reps: "6", weight: "bodyweight" },
      { name: "T-Bar Row", sets: "4", reps: "8", weight: "40 kg" },
      { name: "Hammer Curl", sets: "3", reps: "10", weight: "8 kg" },
      { name: "Reverse Flye", sets: "3", reps: "15", weight: "3 kg" }
    ]
  },
  {
    day: 4,
    week: 1,
    title: "Push (Shoulders · Arms)",
    exercises: [
      { name: "DB Shoulder Press", sets: "4", reps: "8", weight: "12 kg" },
      { name: "Incline Barbell Press", sets: "4", reps: "6", weight: "45 kg" },
      { name: "Cable Lateral Raise", sets: "3", reps: "15", weight: "3 kg" },
      { name: "Close-Grip Bench", sets: "3", reps: "8", weight: "35 kg" }
    ]
  },
  // Week 2 (progressive overload)
  {
    day: 1,
    week: 2,
    title: "Pull (Lats · Traps)",
    exercises: [
      { name: "Wide-Grip Pull-ups", sets: "4", reps: "6", weight: "bodyweight" },
      { name: "Barbell Row", sets: "4", reps: "7", weight: "50 kg" },
      { name: "Barbell Shrug", sets: "3", reps: "9", weight: "60 kg" },
      { name: "Barbell Curl", sets: "3", reps: "11", weight: "20 kg" }
    ]
  },
  {
    day: 2,
    week: 2,
    title: "Push (Shoulders · Chest)",
    exercises: [
      { name: "Standing OHP", sets: "4", reps: "6", weight: "40 kg" },
      { name: "Weighted Push-ups", sets: "4", reps: "7", weight: "10 kg" },
      { name: "DB Lateral Raise", sets: "3", reps: "13", weight: "5 kg" },
      { name: "Weighted Dips", sets: "3", reps: "9", weight: "bodyweight" }
    ]
  },
  {
    day: 3,
    week: 2,
    title: "Pull (Lats · Arms)",
    exercises: [
      { name: "Under-hand Chin-ups", sets: "4", reps: "7", weight: "bodyweight" },
      { name: "T-Bar Row", sets: "4", reps: "9", weight: "40 kg" },
      { name: "Hammer Curl", sets: "3", reps: "11", weight: "8 kg" },
      { name: "Reverse Flye", sets: "3", reps: "16", weight: "3 kg" }
    ]
  },
  {
    day: 4,
    week: 2,
    title: "Push (Shoulders · Arms)",
    exercises: [
      { name: "DB Shoulder Press", sets: "4", reps: "9", weight: "12 kg" },
      { name: "Incline Barbell Press", sets: "4", reps: "7", weight: "45 kg" },
      { name: "Cable Lateral Raise", sets: "3", reps: "16", weight: "3 kg" },
      { name: "Close-Grip Bench", sets: "3", reps: "9", weight: "35 kg" }
    ]
  },
  // Week 3 (continued progression)
  {
    day: 1,
    week: 3,
    title: "Pull (Lats · Traps)",
    exercises: [
      { name: "Wide-Grip Pull-ups", sets: "4", reps: "7", weight: "bodyweight" },
      { name: "Barbell Row", sets: "4", reps: "8", weight: "50 kg" },
      { name: "Barbell Shrug", sets: "3", reps: "10", weight: "60 kg" },
      { name: "Barbell Curl", sets: "3", reps: "12", weight: "20 kg" }
    ]
  },
  {
    day: 2,
    week: 3,
    title: "Push (Shoulders · Chest)",
    exercises: [
      { name: "Standing OHP", sets: "4", reps: "7", weight: "40 kg" },
      { name: "Weighted Push-ups", sets: "4", reps: "8", weight: "10 kg" },
      { name: "DB Lateral Raise", sets: "3", reps: "14", weight: "5 kg" },
      { name: "Weighted Dips", sets: "3", reps: "10", weight: "bodyweight" }
    ]
  },
  {
    day: 3,
    week: 3,
    title: "Pull (Lats · Arms)",
    exercises: [
      { name: "Under-hand Chin-ups", sets: "4", reps: "8", weight: "bodyweight" },
      { name: "T-Bar Row", sets: "4", reps: "10", weight: "40 kg" },
      { name: "Hammer Curl", sets: "3", reps: "12", weight: "8 kg" },
      { name: "Reverse Flye", sets: "3", reps: "17", weight: "3 kg" }
    ]
  },
  {
    day: 4,
    week: 3,
    title: "Push (Shoulders · Arms)",
    exercises: [
      { name: "DB Shoulder Press", sets: "4", reps: "10", weight: "12 kg" },
      { name: "Incline Barbell Press", sets: "4", reps: "8", weight: "45 kg" },
      { name: "Cable Lateral Raise", sets: "3", reps: "17", weight: "3 kg" },
      { name: "Close-Grip Bench", sets: "3", reps: "10", weight: "35 kg" }
    ]
  },
  // Week 4 (Deload week)
  {
    day: 1,
    week: 4,
    title: "Pull (Lats · Traps) - DELOAD",
    exercises: [
      { name: "Wide-Grip Pull-ups", sets: "2", reps: "6", weight: "bodyweight" },
      { name: "Barbell Row", sets: "2", reps: "6", weight: "25 kg" },
      { name: "Barbell Shrug", sets: "2", reps: "8", weight: "30 kg" },
      { name: "Barbell Curl", sets: "2", reps: "10", weight: "10 kg" }
    ]
  },
  {
    day: 2,
    week: 4,
    title: "Push (Shoulders · Chest) - DELOAD",
    exercises: [
      { name: "Standing OHP", sets: "2", reps: "5", weight: "20 kg" },
      { name: "Weighted Push-ups", sets: "2", reps: "6", weight: "5 kg" },
      { name: "DB Lateral Raise", sets: "2", reps: "12", weight: "2.5 kg" },
      { name: "Weighted Dips", sets: "2", reps: "8", weight: "bodyweight" }
    ]
  },
  {
    day: 3,
    week: 4,
    title: "Pull (Lats · Arms) - DELOAD",
    exercises: [
      { name: "Under-hand Chin-ups", sets: "2", reps: "6", weight: "bodyweight" },
      { name: "T-Bar Row", sets: "2", reps: "8", weight: "20 kg" },
      { name: "Hammer Curl", sets: "2", reps: "10", weight: "4 kg" },
      { name: "Reverse Flye", sets: "2", reps: "15", weight: "1.5 kg" }
    ]
  },
  {
    day: 4,
    week: 4,
    title: "Push (Shoulders · Arms) - DELOAD",
    exercises: [
      { name: "DB Shoulder Press", sets: "2", reps: "8", weight: "6 kg" },
      { name: "Incline Barbell Press", sets: "2", reps: "6", weight: "22.5 kg" },
      { name: "Cable Lateral Raise", sets: "2", reps: "15", weight: "1.5 kg" },
      { name: "Close-Grip Bench", sets: "2", reps: "8", weight: "17.5 kg" }
    ]
  }
];

export function WorkoutDashboard() {
  const [rpeData, setRPEData] = useState<{ [key: string]: number[] }>({});
  const [completionData, setCompletionData] = useState<{ [key: string]: boolean[] }>({});
  const [adjustedWorkouts, setAdjustedWorkouts] = useState(workoutData);
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [testStatus, setTestStatus] = useState<string>("");

  const adjustWeightBasedOnRPE = (originalWeight: string, rpe: number): string => {
    // Parse weight (handle different formats like "50 kg", "bodyweight", etc.)
    if (originalWeight.toLowerCase().includes('bodyweight')) {
      if (rpe <= 2) return originalWeight + " + 2.5kg";
      if (rpe === 4) return originalWeight + " - 2.5kg";
      if (rpe === 5) return originalWeight + " - 5kg";
      return originalWeight; // RPE 3 stays same
    }

    const weightMatch = originalWeight.match(/(\d+(?:\.\d+)?)/);
    if (!weightMatch) return originalWeight;
    
    const weight = parseFloat(weightMatch[1]);
    let newWeight = weight;

    if (rpe <= 2) {
      newWeight = weight + 5; // Increase by 5kg for easy
    } else if (rpe === 4) {
      newWeight = weight - 2.5; // Decrease by 2.5kg for barely
    } else if (rpe === 5) {
      newWeight = weight - 5; // Decrease by 5kg for can't do
    }
    // RPE 3 keeps same weight

    return originalWeight.replace(/\d+(?:\.\d+)?/, newWeight.toString());
  };

  const checkAndAdjustWeek2 = () => {
    // Check if Week 1 is complete (all 4 days have RPE data)
    const week1Days = [1, 2, 3, 4];
    const week1Complete = week1Days.every(day => {
      const rpeValues = getRPEForSession(day, 1);
      return rpeValues.every(rpe => rpe > 0);
    });

    if (week1Complete) {
      const newWorkouts = [...workoutData];
      
      // Adjust Week 2 workouts based on Week 1 RPE
      week1Days.forEach(day => {
        const week1RPE = getRPEForSession(day, 1);
        const week2Index = newWorkouts.findIndex(w => w.day === day && w.week === 2);
        
        if (week2Index !== -1) {
          const adjustedExercises = newWorkouts[week2Index].exercises.map((exercise, exerciseIndex) => ({
            ...exercise,
            weight: adjustWeightBasedOnRPE(exercise.weight, week1RPE[exerciseIndex])
          }));
          
          newWorkouts[week2Index] = {
            ...newWorkouts[week2Index],
            exercises: adjustedExercises,
            title: newWorkouts[week2Index].title + " (Auto-Adjusted)"
          };
        }
      });
      
      setAdjustedWorkouts(newWorkouts);
    }
  };

  const handleRPEChange = (day: number, week: number, exerciseIndex: number, rpe: number) => {
    const key = `${day}-${week}`;
    setRPEData(prev => {
      const current = prev[key] || [0, 0, 0, 0];
      const updated = [...current];
      updated[exerciseIndex] = rpe;
      const newData = { ...prev, [key]: updated };
      
      // Check if Week 1 is complete after this change
      if (week === 1) {
        setTimeout(() => checkAndAdjustWeek2(), 100);
      }
      
      return newData;
    });
  };

  const handleCompletionChange = (day: number, week: number, exerciseIndex: number, completed: boolean) => {
    const key = `${day}-${week}`;
    setCompletionData(prev => {
      const current = prev[key] || [false, false, false, false];
      const updated = [...current];
      updated[exerciseIndex] = completed;
      return { ...prev, [key]: updated };
    });
  };

  const getRPEForSession = (day: number, week: number): number[] => {
    const key = `${day}-${week}`;
    return rpeData[key] || [0, 0, 0, 0];
  };

  const getCompletionForSession = (day: number, week: number): boolean[] => {
    const key = `${day}-${week}`;
    return completionData[key] || [false, false, false, false];
  };

  const calculateMonthlyAverage = (): number => {
    const allRPEs = Object.values(rpeData).flat().filter(rpe => rpe > 0);
    return allRPEs.length > 0 ? allRPEs.reduce((a, b) => a + b, 0) / allRPEs.length : 0;
  };

  const getCompletedSessions = (): number => {
    return Object.values(rpeData).filter(session => 
      session.some(rpe => rpe > 0)
    ).length;
  };

  const totalSessions = 16;
  const completedSessions = getCompletedSessions();
  const monthlyAverage = calculateMonthlyAverage();

  // Helper to save current session's workout data to Firebase Firestore
  const saveCurrentSession = async (day: number, week: number) => {
    const workout = adjustedWorkouts.find(w => w.day === day && w.week === week);
    if (!workout) return;
    
    const rpeValues = getRPEForSession(day, week);
    const completionValues = getCompletionForSession(day, week);
    
    // Check if there's any data to save
    const hasData = rpeValues.some(rpe => rpe > 0) || completionValues.some(completed => completed);
    if (!hasData) {
      setSaveStatus('No data to save. Please enter RPE values or mark exercises as completed.');
      setTimeout(() => setSaveStatus(''), 3000);
      return;
    }
    
    // Compose a text summary
    const text = workout.exercises.map((ex, i) =>
      `${ex.name}: ${ex.sets}x${ex.reps} @ ${ex.weight} | RPE: ${rpeValues[i] || '-'} | Done: ${completionValues[i] ? 'Yes' : 'No'}`
    ).join('\n');
    
    setSaveStatus('Saving...');
    
    try {
      const docRef = await addDoc(collection(db, 'workouts'), {
        day,
        week,
        title: workout.title,
        text,
        rpeValues,
        completionValues,
        created_at: new Date().toISOString(),
      });
      setSaveStatus(`Successfully saved for Day ${day}, Week ${week}!`);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      setSaveStatus('Error saving to database. Please check your internet connection and try again.');
      console.error('Error saving workout:', e);
    }
    
    // Clear status after 3 seconds
    setTimeout(() => setSaveStatus(''), 3000);
  };

  // Test Firebase connection
  const handleTestConnection = async () => {
    setTestStatus('Testing connection...');
    const success = await testFirebaseConnection();
    setTestStatus(success ? '✅ Firebase connection successful!' : '❌ Firebase connection failed. Check console for details.');
    setTimeout(() => setTestStatus(''), 5000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            V-Shape Workout Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Month 1 – Foundation Block • Track your RPE for optimal progression
          </p>
          <button
            onClick={handleTestConnection}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Test Firebase Connection
          </button>
          {testStatus && (
            <div className={`text-center font-semibold p-2 rounded-md ${
              testStatus.includes('✅') 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : testStatus.includes('❌') 
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-blue-100 text-blue-700 border border-blue-300'
            }`}>
              {testStatus}
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-workout-card border-border p-6">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
                <p className="text-2xl font-bold">{completedSessions}/{totalSessions}</p>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(completedSessions / totalSessions) * 100} className="h-2" />
            </div>
          </Card>

          <Card className="bg-workout-card border-border p-6">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Average RPE</p>
                <p className="text-2xl font-bold">{monthlyAverage.toFixed(1)}</p>
              </div>
            </div>
            <div className="mt-4">
              <Badge className={`${
                monthlyAverage <= 6 ? 'bg-success' : 
                monthlyAverage <= 8 ? 'bg-warning' : 'bg-destructive'
              }`}>
                {monthlyAverage <= 6 ? 'Sustainable' : 
                 monthlyAverage <= 8 ? 'Moderate' : 'Intense'}
              </Badge>
            </div>
          </Card>

          <Card className="bg-workout-card border-border p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold">{Math.round((completedSessions / totalSessions) * 100)}%</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                Week {Math.min(4, Math.floor(completedSessions / 4) + 1)} of 4
              </p>
            </div>
          </Card>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adjustedWorkouts.map((workout, index) => (
            <div key={index}>
              <WorkoutCard
                day={workout.day}
                week={workout.week}
                title={workout.title}
                exercises={workout.exercises}
                onRPEChange={handleRPEChange}
                onCompletionChange={handleCompletionChange}
                rpeValues={getRPEForSession(workout.day, workout.week)}
                completionValues={getCompletionForSession(workout.day, workout.week)}
              />
              <button
                className="mt-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary/80"
                onClick={() => saveCurrentSession(workout.day, workout.week)}
              >
                Save Session to Database
              </button>
            </div>
          ))}
        </div>
        {saveStatus && (
          <div className={`text-center font-semibold mt-4 p-3 rounded-md ${
            saveStatus.includes('Error') 
              ? 'bg-red-100 text-red-700 border border-red-300' 
              : saveStatus.includes('Successfully') 
                ? 'bg-green-100 text-green-700 border border-green-300'
                : saveStatus.includes('No data') 
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  : 'bg-blue-100 text-blue-700 border border-blue-300'
          }`}>
            {saveStatus}
          </div>
        )}

        {/* RPE Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-workout-card border-border p-6">
            <h3 className="text-lg font-semibold mb-4">Week 1 - Test Week (1-5 Scale)</h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center justify-between">
                <Badge className="bg-success text-success-foreground">1</Badge>
                <span className="text-muted-foreground">Super Easy</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-success text-success-foreground">2</Badge>
                <span className="text-muted-foreground">Easy</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-primary text-primary-foreground">3</Badge>
                <span className="text-muted-foreground">Normal</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-warning text-warning-foreground">4</Badge>
                <span className="text-muted-foreground">Barely manageable</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className="bg-destructive text-destructive-foreground">5</Badge>
                <span className="text-muted-foreground">Can't complete</span>
              </div>
            </div>
          </Card>

          <Card className="bg-workout-card border-border p-6">
            <h3 className="text-lg font-semibold mb-4">Weeks 2-4 - Standard RPE (1-10)</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center">
                <Badge className="bg-success text-success-foreground mb-2">1-3</Badge>
                <p className="text-muted-foreground">Easy recovery</p>
              </div>
              <div className="text-center">
                <Badge className="bg-success text-success-foreground mb-2">4-5</Badge>
                <p className="text-muted-foreground">Moderate effort</p>
              </div>
              <div className="text-center">
                <Badge className="bg-warning text-warning-foreground mb-2">6-7</Badge>
                <p className="text-muted-foreground">Hard but doable</p>
              </div>
              <div className="text-center">
                <Badge className="bg-destructive text-destructive-foreground mb-2">8-10</Badge>
                <p className="text-muted-foreground">Very hard to max</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}