import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
  onCompletionChange: (day: number, week: number, exerciseIndex: number, completed: boolean) => void;
  rpeValues: number[];
  completionValues: boolean[];
}

export function WorkoutCard({ day, week, title, exercises, onRPEChange, onCompletionChange, rpeValues, completionValues }: WorkoutCardProps) {
  const [hoveredExercise, setHoveredExercise] = useState<number | null>(null);

  const getRPEColor = (rpe: number, week: number) => {
    if (rpe === 0) return "bg-muted text-muted-foreground";
    
    // Week 1 is test week with different scale
    if (week === 1) {
      if (rpe === 5) return "bg-destructive text-destructive-foreground"; // Can't do
      if (rpe === 4) return "bg-warning text-warning-foreground"; // Barely
      if (rpe === 3) return "bg-primary text-primary-foreground"; // Normal
      if (rpe <= 2) return "bg-success text-success-foreground"; // Easy/Super easy
    } else {
      // Standard RPE scale for weeks 2-4
      if (rpe <= 3) return "bg-success text-success-foreground";
      if (rpe <= 6) return "bg-warning text-warning-foreground";
      return "bg-destructive text-destructive-foreground";
    }
    return "bg-muted text-muted-foreground";
  };

  const handleRPEChange = (exerciseIndex: number, value: string) => {
    const maxRPE = week === 1 ? 5 : 10; // Test week uses 1-5 scale
    const rpe = Math.max(0, Math.min(maxRPE, parseInt(value) || 0));
    onRPEChange(day, week, exerciseIndex, rpe);
  };

  const handleCompletionChange = (exerciseIndex: number, completed: boolean) => {
    onCompletionChange(day, week, exerciseIndex, completed);
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
                <Checkbox
                  checked={completionValues[index] || false}
                  onCheckedChange={(checked) => handleCompletionChange(index, !!checked)}
                  className="w-4 h-4"
                />
                <Input
                  type="number"
                  min="0"
                  max={week === 1 ? "5" : "10"}
                  value={rpeValues[index] || ""}
                  onChange={(e) => handleRPEChange(index, e.target.value)}
                  className="w-12 h-7 text-xs text-center"
                  placeholder={week === 1 ? "1-5" : "RPE"}
                />
                {rpeValues[index] > 0 && (
                  <Badge 
                    className={`text-xs px-1.5 py-0.5 ${getRPEColor(rpeValues[index], week)}`}
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