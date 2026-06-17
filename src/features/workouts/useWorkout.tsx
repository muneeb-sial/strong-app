import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormMutation } from "@/shared/hook/useFormMutationHook";
import { toast } from "sonner-native";
import { router } from "expo-router";
import {
  SetsSchemaType,
  WorkOutItemSchemaType,
  WorkoutSchema,
  WorkoutSchemaType,
} from "./workout.schema";
import { SetTypeEnum, WorkOutType } from "@/db/schema.type";
import { useWorkoutRepo } from "./workout.service";

export const useWorkout = (props: { debugMode?: boolean }) => {
  const queryClient = useQueryClient();
  const { createWorkoutInstance } = useWorkoutRepo();
  const hook = useFormMutation({
    mutationFn: createWorkoutInstance,
    schema: WorkoutSchema,
    mutationKey: ["createWorkout"],
    debugMode: props.debugMode,
    mutationOptions: {
      onSuccess: () => {
        toast.success("Workout created successfully");
        queryClient.invalidateQueries({ queryKey: ["workouts-all"] });
        router.replace("/workouts");
      },
      onError: (error) => {
        console.error({ error });
        toast.error("Exercise creation failed");
      },
    },
  });
  return hook;
};

export const useCreateWorkout = () => {
  const { createWorkoutInstance } = useWorkoutRepo();
  const [workout, setWorkout] = React.useState<WorkoutSchemaType>({
    title: "Untitled Workout",
    notes: "Untitled Workout Notes",
    workOutItems: [],
    isFinished: false,
    finishedAt: new Date(),
  });

  const [workoutItem, setWorkoutItem] = React.useState<WorkOutItemSchemaType>({
    exerciseId: "",
    sets: [],
    notes: "",
    isDone: false,
  });

  const [setItem, setSet] = React.useState<SetsSchemaType>({
    exerciseId: "",
    rpe: null,
    setType: SetTypeEnum.NORMAL as string,
    weight: null,
    reps: null,
    restTimmer: null,
    isDone: false,
  });

  const UpdateWorkoutTitle = ({ title }: { title: string }) => {
    setWorkout((prev) => ({ ...prev, title }));
  };

  const UpdateWorkoutNotes = ({ notes }: { notes: string }) => {
    setWorkout((prev) => ({ ...prev, notes }));
  };

  const UpdateWorkoutItemNotes = ({ notes }: { notes: string }) => {
    setWorkoutItem((prev) => ({ ...prev, notes }));
  };

  const UpdateSet = ({
    workoutIndex,
    setIndex,
    setData,
  }: {
    workoutIndex: number;
    setIndex: number;
    setData: SetsSchemaType;
  }) => {
    setWorkout((prev) => ({
      ...prev,
      workOutItems: prev.workOutItems.map((workoutItem, index) =>
        index === workoutIndex
          ? {
              ...workoutItem,
              sets: workoutItem.sets.map((set, index) =>
                index === setIndex ? { ...set, ...setData } : set
              ),
            }
          : workoutItem
      ),
    }));
  };

  const CompleteSet = () => {
    setWorkoutItem((prev) => ({
      ...prev,
      sets: prev.sets.map((set) =>
        set.exerciseId === setItem.exerciseId ? { ...set, isDone: true } : set
      ),
    }));
  };

  const CompleteWorkoutItem = () => {
    setWorkoutItem((prev) => ({ ...prev, isDone: true }));
  };

  const FinishWorkout = () => {
    let isFinished = true;

    if (workout.workOutItems.length === 0) {
      toast.error("Please add at least one workout item.");
      return;
    }

    workout.workOutItems.map((e) => {
      e.sets.forEach((set) => {
        if (!set.isDone) {
          toast.error("Please completed all sets.");
          isFinished = false;
          return;
        }
      });
      if (!isFinished) return;
    });
    const workoutInstance = WorkoutSchema.safeParse(workout);
    if (!workoutInstance.success) {
      toast.error("Workout is not valid");
      console.error(workoutInstance.error);
      return;
    }
    if (isFinished) {
      setWorkout((prev) => ({ ...prev, isFinished: true }));
      createWorkoutInstance({
        ...workoutInstance.data,
        isFinished: true,
        finishedAt: new Date(),
      });
      toast.success("Workout finished successfully");
    }
  };

  const _RemoveSetFromWorkout = ({
    workoutIndex,
    setIndex,
  }: {
    workoutIndex: number;
    setIndex: number;
  }) => {
    setWorkout((prev) => ({
      ...prev,
      workOutItems: prev.workOutItems.map((workoutItem, index) =>
        index === workoutIndex
          ? {
              ...workoutItem,
              sets: workoutItem.sets.filter((set, index) =>
                index !== setIndex
              ),
            }
          : workoutItem
      ),
    }));
  };

  const RemoveSetFromWorkout = ({
    workoutIndex,
    setIndex,
  }: {
    workoutIndex: number;
    setIndex: number;
  }) => {
    setWorkout((prev) => ({
      ...prev,
      workOutItems: prev.workOutItems.map((workoutItem, index) =>
        index === workoutIndex
          ? {
              ...workoutItem,
              sets: workoutItem.sets.filter((_, i) => i !== setIndex),
            }
          : workoutItem
      ),
    }));
  };
  

  const ClearWorkout = () => {
    setWorkout({
      title: "",
      notes: "",
      workOutItems: [],
      isFinished: false,
      finishedAt: new Date(),
    });
  };

  const AddWorkoutItem = () => {
    setWorkout((prev) => ({
      ...prev,
      workOutItems: [
        ...prev.workOutItems,
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
        } as WorkOutItemSchemaType,
      ],
    }));
  };

  const AddSetToWorkoutItem = (workoutIndex: number) => {
    setWorkout((prev) => ({
      ...prev,
      workOutItems: prev.workOutItems.map((workoutItem, index) =>
        index === workoutIndex
          ? {
              ...workoutItem,
              sets: [
                ...workoutItem.sets,
                {
                  exerciseId: workoutItem.exerciseId,
                  rpe: null,
                  setType: SetTypeEnum.NORMAL as string,
                  weight: 0,
                  reps: 0,
                  restTimmer: 0,
                  isDone: false,
                } as SetsSchemaType,
              ],
            }
          : workoutItem
      ),
    }));
  };

  const AddExercise = (workoutIndex: number) => {
    router.canGoBack();
    router.push(`/workout/search-exercise?workoutIndex=${workoutIndex}`);
  };

  const UpdateWorkoutItemExerciseId = (exerciseId: string) => {
    setWorkout((prev) => ({
      ...prev,
      workOutItems: [
        ...prev.workOutItems,
        {
          exerciseId: exerciseId,
          sets: [
            {
              exerciseId: exerciseId,
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
        } as WorkOutItemSchemaType,
      ],
    }));
  };

  return {
    workout,
    setWorkout,
    workoutItem,
    setWorkoutItem,
    setItem,
    setSet,
    UpdateWorkoutTitle,
    UpdateWorkoutNotes,
    UpdateWorkoutItemNotes,
    UpdateSet,
    CompleteSet,
    CompleteWorkoutItem,
    AddWorkoutItem,
    AddSetToWorkoutItem,
    ClearWorkout,
    FinishWorkout,
    AddExercise,
    UpdateWorkoutItemExerciseId,
    RemoveSetFromWorkout
  };
};

export const useGetAllWorkouts = () => {
  const { getAllWorkouts } = useWorkoutRepo();
  return { data: getAllWorkouts(), isLoading: false, error: null };
};

export const useGetWorkoutById = (id: string) => {
  const { getWorkoutById } = useWorkoutRepo();
  return { data: getWorkoutById(id), isLoading: false, error: null };
};

export type useCreateWorkoutReturnType = ReturnType<typeof useCreateWorkout>;
