import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workout } from '@/types';
import { toast } from 'react-toastify';

interface FitlogState {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: string) => void;
  markAsDone: (id: string) => void;
}

export const useFitlogStore = create<FitlogState>()(
  persist(
    (set, get) => ({
      todaysPlan: [],
      savedWorkouts: [],

      addToPlan: (workout) => {
        const currentPlan = get().todaysPlan;
        if (currentPlan.length >= 5) {
          toast.error("You've reached the cap of 5 lifts for today!");
          return;
        }
        if (currentPlan.find(w => w.id === workout.id)) {
          toast.info("Already in today's plan!");
          return;
        }
        set({ todaysPlan: [...currentPlan, workout] });
        toast.success("Added to today's plan");
      },

      removeFromPlan: (id) => {
        set({ todaysPlan: get().todaysPlan.filter(w => w.id !== id) });
        toast.info("Removed from plan");
      },

      saveForLater: (workout) => {
        const saved = get().savedWorkouts;
        if (saved.find(w => w.id === workout.id)) {
          toast.info("Already saved for later!");
          return;
        }
        set({ savedWorkouts: [...saved, workout] });
        toast.success("Saved for later");
      },

      removeFromSaved: (id) => {
        set({ savedWorkouts: get().savedWorkouts.filter(w => w.id !== id) });
      },

      markAsDone: (id) => {
        // You can expand this to move it to a 'completed' list if you want
        get().removeFromPlan(id);
        toast.success("Great job! Workout completed.");
      }
    }),
    {
      name: 'fitlog-storage', // name of the item in local storage
    }
  )
);