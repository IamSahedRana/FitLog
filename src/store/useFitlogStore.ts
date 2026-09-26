"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Workout } from "@/types";
import { toast } from "react-toastify";

interface FitlogState {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  toggleSaveWorkout: (workout: Workout) => void;

  markAsDone: (id: number) => void;
}

export const useFitlogStore = create<FitlogState>()(
  persist(
    (set, get) => ({
      todaysPlan: [],
      savedWorkouts: [],

      
      addToPlan: (workout) => {
        const currentPlan = get().todaysPlan;

        if (currentPlan.length >= 5) {
          toast.error("You've reached the cap of 5 lifts for today!", {
            toastId: "plan-limit",
          });
          return;
        }

        const alreadyExists = currentPlan.some(
          (item) => item.id === workout.id
        );

        if (alreadyExists) {
          toast.info("This workout is already in your plan!", {
            toastId: `already-in-plan-${workout.id}`,
          });
          return;
        }

        set({
          todaysPlan: [...currentPlan, workout],
        });

        toast.success("Added to today's plan!", {
          toastId: `added-plan-${workout.id}`,
        });
      },

  
      removeFromPlan: (id) => {
        const currentPlan = get().todaysPlan;

        const workoutExists = currentPlan.some(
          (workout) => workout.id === id
        );

        if (!workoutExists) {
          return;
        }

        set({
          todaysPlan: currentPlan.filter(
            (workout) => workout.id !== id
          ),
        });

        toast.info("Removed from today's plan.", {
          toastId: `removed-plan-${id}`,
        });
      },

      
      saveForLater: (workout) => {
        const saved = get().savedWorkouts;

        const alreadySaved = saved.some(
          (item) => item.id === workout.id
        );

        if (alreadySaved) {
          toast.info("This workout is already saved!", {
            toastId: `already-saved-${workout.id}`,
          });
          return;
        }

        set({
          savedWorkouts: [...saved, workout],
        });

        toast.success("Workout saved successfully!", {
          toastId: `saved-${workout.id}`,
        });
      },

      removeFromSaved: (id) => {
        const saved = get().savedWorkouts;

        const workoutExists = saved.some(
          (workout) => workout.id === id
        );

        if (!workoutExists) {
          return;
        }

        set({
          savedWorkouts: saved.filter(
            (workout) => workout.id !== id
          ),
        });

        toast.info("Removed from saved workouts.", {
          toastId: `removed-saved-${id}`,
        });
      },

    
      toggleSaveWorkout: (workout) => {
        const saved = get().savedWorkouts;

        const isSaved = saved.some(
          (item) => item.id === workout.id
        );

        if (isSaved) {
          set({
            savedWorkouts: saved.filter(
              (item) => item.id !== workout.id
            ),
          });

          toast.info("Removed from saved workouts.", {
            toastId: `removed-saved-${workout.id}`,
          });

          return;
        }

        set({
          savedWorkouts: [...saved, workout],
        });

        toast.success("Workout saved successfully!", {
          toastId: `saved-${workout.id}`,
        });
      },

     
      markAsDone: (id) => {
        const currentPlan = get().todaysPlan;

        const workoutExists = currentPlan.some(
          (workout) => workout.id === id
        );

        if (!workoutExists) {
          return;
        }

        set({
          todaysPlan: currentPlan.filter(
            (workout) => workout.id !== id
          ),
        });

        toast.success("Great job! Workout completed.", {
          toastId: `completed-${id}`,
        });
      },
    }),
    {
      name: "fitlog-storage",
    }
  )
);