import { useState } from "react";
import { WorkoutCard } from "./WorkoutCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Target, TrendingUp } from "lucide-react";

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

  const handleRPEChange = (day: number, week: number, exerciseIndex: number, rpe: number) => {
    const key = `${day}-${week}`;
    setRPEData(prev => {
      const current = prev[key] || [0, 0, 0, 0];
      const updated = [...current];
      updated[exerciseIndex] = rpe;
      return { ...prev, [key]: updated };
    });
  };

  const getRPEForSession = (day: number, week: number): number[] => {
    const key = `${day}-${week}`;
    return rpeData[key] || [0, 0, 0, 0];
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
          {workoutData.map((workout, index) => (
            <WorkoutCard
              key={index}
              day={workout.day}
              week={workout.week}
              title={workout.title}
              exercises={workout.exercises}
              onRPEChange={handleRPEChange}
              rpeValues={getRPEForSession(workout.day, workout.week)}
            />
          ))}
        </div>

        {/* RPE Guide */}
        <Card className="bg-workout-card border-border p-6">
          <h3 className="text-lg font-semibold mb-4">RPE Scale Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
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
              <Badge className="bg-destructive text-destructive-foreground mb-2">8-9</Badge>
              <p className="text-muted-foreground">Very hard</p>
            </div>
            <div className="text-center">
              <Badge className="bg-destructive text-destructive-foreground mb-2">10</Badge>
              <p className="text-muted-foreground">Maximum effort</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}