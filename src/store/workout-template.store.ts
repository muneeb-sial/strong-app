import { create } from "zustand";
import { TemplateFormType, WorkOutItemTemplateSchemaType } from "../features/workouts/workout.schema";

type WorkoutTemplateStore = {
  workoutTemplate: TemplateFormType;
  workoutItem: WorkOutItemTemplateSchemaType;

  setTitle: (title: string) => void;
  setNotes: (notes: string) => void;

  setWorkoutItemNotes: (notes: string) => void;

  addExercise: (exerciseId: string) => void;

  addSetToWorkoutItem: (index: number) => void;
  removeSetFromWorkoutItem: (index: number) => void;

  clearWorkout: () => void;

  markWorkoutItemDone: () => void;
};

const initialWorkout: TemplateFormType = {
  title: "Untitled Template",
  notes: "",
  workOutItems: [],
};

const initialWorkoutItem: WorkOutItemTemplateSchemaType = {
  exerciseId: "",
  numberOfSets: 0,
};

export const useWorkoutTemplateStore = create<WorkoutTemplateStore>((set, get) => ({
  workoutTemplate: initialWorkout,
  workoutItem: initialWorkoutItem,

  setTitle: (title) =>
    set((state) => ({
      workoutTemplate: { ...state.workoutTemplate, title },
    })),

  setNotes: (notes) =>
    set((state) => ({
      workoutTemplate: { ...state.workoutTemplate, notes },
    })),

  setWorkoutItemNotes: (notes) =>
    set((state) => ({
      workoutItem: { ...state.workoutItem, notes },
    })),

  addExercise: (exerciseId) =>
    set((state) => ({
      workoutTemplate: {
        ...state.workoutTemplate,
        workOutItems: [
          ...state.workoutTemplate.workOutItems,
          { exerciseId, numberOfSets: 1 },
        ],
      },
    })),

  addSetToWorkoutItem: (index) =>
    set((state) => {
      const items = [...state.workoutTemplate.workOutItems];
      items[index] = {
        ...items[index],
        numberOfSets: items[index].numberOfSets + 1,
      };

      return {
        workoutTemplate: {
          ...state.workoutTemplate,
          workOutItems: items,
        },
      };
    }),

  removeSetFromWorkoutItem: (index) =>
    set((state) => {
      const items = [...state.workoutTemplate.workOutItems];
      items[index] = {
        ...items[index],
        numberOfSets: Math.max(0, items[index].numberOfSets - 1),
      };

      return {
        workoutTemplate: {
          ...state.workoutTemplate,
          workOutItems: items,
        },
      };
    }),

  markWorkoutItemDone: () =>
    set((state) => ({
      workoutItem: { ...state.workoutItem, isDone: true },
    })),

  clearWorkout: () =>
    set({
      workoutTemplate: initialWorkout,
      workoutItem: initialWorkoutItem,
    }),
}));