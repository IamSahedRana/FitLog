export interface Workout {
  id: string;
  name: string;
  description: string;
  category: string[]; // e.g., ["Chest", "Arms"]
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number; // in minutes
  calories: number;
  rating: number;
  image: string;
  instructions: string[];
}