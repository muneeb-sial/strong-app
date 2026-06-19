// import { createWorkoutInstance } from "@/features/workouts/workout.service";
import { toast } from "sonner-native";
import { create } from "zustand";
import { router } from "expo-router";
import { SetsSchemaType, WorkOutItemSchemaType, WorkoutSchemaType } from "../features/workouts/workout.schema";
import { SetTypeEnum } from "../shared/data/db-data.";

type WorkoutStore = {
  workout: WorkoutSchemaType;
  workoutItem: WorkOutItemSchemaType;
  setItem: SetsSchemaType;

  // setters
  setWorkout: (workout: WorkoutSchemaType | ((prev: WorkoutSchemaType) => WorkoutSchemaType)) => void;
  setWorkoutItem: (workoutItem: WorkOutItemSchemaType) => void;
  setSet: (set: SetsSchemaType) => void;

  // actions
  UpdateWorkoutTitle: (title: string) => void;
  UpdateWorkoutNotes: ({ notes }: { notes: string }) => void;
  UpdateWorkoutItemNotes: (notes: string) => void;

  UpdateSet: (args: {
    workoutIndex: number;
    setIndex: number;
    setData: SetsSchemaType;
  }) => void;

  CompleteSet: () => void;
  CompleteWorkoutItem: () => void;

  AddWorkoutItem: () => void;
  AddSetToWorkoutItem: (workoutIndex: number) => void;

  RemoveSetFromWorkout: (args: {
    workoutIndex: number;
    setIndex: number;
  }) => void;

  ClearWorkout: () => void;

  FinishWorkout: () => void;
  FinishWorkoutReturn: () => any;

  AddExercise: (workoutIndex: number) => void;

  UpdateWorkoutItemExerciseId: (exerciseId: string) => void;
};

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workout: {
    title: "Untitled Workout",
    notes: "Untitled Workout Notes",
    workOutItems: [],
    isFinished: false,
    finishedAt: new Date(),
  },

  workoutItem: {
    exerciseId: "",
    sets: [],
    notes: "",
    isDone: false,
  },

  setItem: {
    exerciseId: "",
    rpe: null,
    setType: SetTypeEnum.NORMAL as string,
    weight: null,
    reps: null,
    restTimmer: null,
    isDone: false,
  },

  // setters
  setWorkout: (workout) =>
    set((state) => ({
      workout: typeof workout === "function" ? workout(state.workout) : workout,
    })),

  setWorkoutItem: (workoutItem) =>
    set((state) => ({
      workoutItem,
    })),

  setSet: (set_) =>
    set((state) => ({
      setItem: set_,
    })),

  // actions
  UpdateWorkoutTitle: (title) =>
    set((state) => ({
      workout: { ...state.workout, title },
    })),

  UpdateWorkoutNotes: ({ notes }) =>
    set((state) => ({
      workout: { ...state.workout, notes },
    })),

  UpdateWorkoutItemNotes: (notes) =>
    set((state) => ({
      workoutItem: { ...state.workoutItem, notes },
    })),

  UpdateSet: ({ workoutIndex, setIndex, setData }) =>
    set((state) => ({
      workout: {
        ...state.workout,
        workOutItems: state.workout.workOutItems.map((item, i) =>
          i === workoutIndex
            ? {
              ...item,
              sets: item.sets.map((s, j) =>
                j === setIndex ? { ...s, ...setData } : s
              ),
            }
            : item
        ),
      },
    })),

  CompleteSet: () => {
    const { setItem } = get();
    set((state) => ({
      workoutItem: {
        ...state.workoutItem,
        sets: state.workoutItem.sets.map((s) =>
          s.exerciseId === setItem.exerciseId
            ? { ...s, isDone: true }
            : s
        ),
      },
    }));
  },

  CompleteWorkoutItem: () =>
    set((state) => ({
      workoutItem: { ...state.workoutItem, isDone: true },
    })),

  AddWorkoutItem: () =>
    set((state) => ({
      workout: {
        ...state.workout,
        workOutItems: [
          ...state.workout.workOutItems,
          {
            exerciseId: "",
            sets: [
              {
                exerciseId: "",
                rpe: 0,
                setType: SetTypeEnum.NORMAL as string,
                weight: 0,
                reps: 0,
                restTimmer: 0,
                isDone: false,
              },
            ],
            notes: "",
            isDone: false,
          },
        ],
      },
    })),

  AddSetToWorkoutItem: (workoutIndex) =>
    set((state) => ({
      workout: {
        ...state.workout,
        workOutItems: state.workout.workOutItems.map((item, i) =>
          i === workoutIndex
            ? {
              ...item,
              sets: [
                ...item.sets,
                {
                  exerciseId: item.exerciseId,
                  rpe: null,
                  setType: SetTypeEnum.NORMAL as string,
                  weight: 0,
                  reps: 0,
                  restTimmer: 0,
                  isDone: false,
                },
              ],
            }
            : item
        ),
      },
    })),

  RemoveSetFromWorkout: ({ workoutIndex, setIndex }) =>
    set((state) => ({
      workout: {
        ...state.workout,
        workOutItems: state.workout.workOutItems.map((item, i) =>
          i === workoutIndex
            ? {
              ...item,
              sets: item.sets.filter((_, j) => j !== setIndex),
            }
            : item
        ),
      },
    })),

  ClearWorkout: () =>
    set({
      workout: {
        title: "",
        notes: "",
        workOutItems: [],
        isFinished: false,
        finishedAt: new Date(),
      },
    }),

  FinishWorkout: () => {
    const { createWorkoutInstance } = useWorkoutRepo();
    const { workout } = get();

    if (workout.workOutItems.length === 0) {
      console.error("Please add at least one workout item.")
      toast.error("Please add at least one workout item.");
      return;
    }

    for (const item of workout.workOutItems) {
      for (const setItem of item.sets) {
        if (!setItem.isDone) {
          console.error("Please completed all sets.");
          toast.error("Please completed all sets.");
          return;
        }
      }
    }

    const parsed = WorkoutSchema.safeParse(workout);
    if (!parsed.success) {
      console.error("Workout is not valid");
      toast.error("Workout is not valid");
      return;
    }

    set((state) => ({
      workout: { ...state.workout, isFinished: true },
    }));
    toast.success("Workout finished successfully");
  },

  FinishWorkoutReturn: () => {
    const { workout } = get();

    if (workout.workOutItems.length === 0) {
      console.error("Please add at least one workout item.");
      toast.error("Please add at least one workout item.");
      return;
    }

    for (const item of workout.workOutItems) {
      for (const setItem of item.sets) {
        if (!setItem.isDone) {
          console.error("Please completed all sets.");
          toast.error("Please completed all sets.");
          return;
        }
      }
    }

    const parsed = WorkoutSchema.safeParse(workout);
    if (!parsed.success) {
      console.error("Workout is not valid");
      toast.error("Workout is not valid");
      return;
    }

    set((state) => ({
      workout: { ...state.workout, isFinished: true },
    }));
    const payload = {
      ...parsed.data,
      isFinished: true,
      finishedAt: new Date(),
    };
    console.log({
      payload_: payload,
    });

    return payload;
  },

  AddExercise: (workoutIndex: number) => {
    router.canGoBack();
    router.push(`/workout/search-exercise?workoutIndex=${workoutIndex}`);
  },

  UpdateWorkoutItemExerciseId: (exerciseId) =>
    set((state) => ({
      workout: {
        ...state.workout,
        workOutItems: [
          ...state.workout.workOutItems,
          {
            exerciseId,
            sets: [
              {
                exerciseId,
                rpe: 0,
                setType: SetTypeEnum.NORMAL as string,
                weight: 0,
                reps: 0,
                restTimmer: 0,
                isDone: false,
              },
            ],
            notes: "",
            isDone: false,
          },
        ],
      },
    })),
}));

export type useWorkoutStoreReturnType = WorkoutStore;
// export type useWorkoutStoreReturnType = ReturnType<typeof useWorkoutStore>;