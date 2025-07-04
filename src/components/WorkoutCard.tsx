import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface WorkoutCardProps {
  day: number;
  week: number;
  title: string;
  exercises: Exercise[];
  onRPEChange: (day: number, week: number, exerciseIndex: number, rpe: number) => void;
  rpeValues: number[];
}

export function WorkoutCard({ day, week, title, exercises, onRPEChange, rpeValues }: WorkoutCardProps) {
  const [hoveredExercise, setHoveredExercise] = useState<number | null>(null);

  const getRPEColor = (rpe: number) => {
    if (rpe === 0) return "bg-muted text-muted-foreground";
    if (rpe <= 3) return "bg-success text-success-foreground";
    if (rpe <= 6) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const handleRPEChange = (exerciseIndex: number, value: string) => {
    const rpe = Math.max(0, Math.min(10, parseInt(value) || 0));
    onRPEChange(day, week, exerciseIndex, rpe);
  };

  return (
    <Card className="bg-workout-card border-border hover:bg-workout-card-hover transition-colors duration-200 p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-primary text-sm">
            Day {day} • Week {week}
          </h3>
          <Badge variant="outline" className="text-xs">
            {title}
          </Badge>
        </div>
        
        <div className="space-y-2">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-md bg-background/50 hover:bg-background/70 transition-colors"
              onMouseEnter={() => setHoveredExercise(index)}
              onMouseLeave={() => setHoveredExercise(null)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {exercise.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {exercise.sets} × {exercise.reps} @ {exercise.weight}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 ml-2">
                <Input
                  type="number"
                  min="0"
                  max="10"
                  value={rpeValues[index] || ""}
                  onChange={(e) => handleRPEChange(index, e.target.value)}
                  className="w-12 h-7 text-xs text-center"
                  placeholder="RPE"
                />
                {rpeValues[index] > 0 && (
                  <Badge 
                    className={`text-xs px-1.5 py-0.5 ${getRPEColor(rpeValues[index])}`}
                  >
                    {rpeValues[index]}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {rpeValues.some(rpe => rpe > 0) && (
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Session Avg:</span>
              <Badge className="bg-primary text-primary-foreground">
                {(rpeValues.filter(rpe => rpe > 0).reduce((a, b) => a + b, 0) / 
                  rpeValues.filter(rpe => rpe > 0).length || 0).toFixed(1)}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}