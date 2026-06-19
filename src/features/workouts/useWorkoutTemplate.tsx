import { useQueryClient } from "@tanstack/react-query";
import { useFormMutation } from "@/src/shared/hook/useFormMutationHook";
import { toast } from "sonner-native";
import { router } from "expo-router";
import {
  WorkoutTemplateSchema,
} from "./workout.schema";
import { useWorkoutTemplateStore } from "@/src/store/workout-template.store";

export const useWorkout = (props: { debugMode?: boolean }) => {
  const {createWorkoutTemplate} = useWorkoutTemplateRepo();
  const queryClient = useQueryClient();
  const hook = useFormMutation({
    mutationFn: createWorkoutTemplate,
    schema: WorkoutTemplateSchema,
    mutationKey: ["createWorkoutTemplate"],
    debugMode: props.debugMode,
    mutationOptions: {
      onSuccess: () => {
        toast.success("workoutTemplate created successfully");
        queryClient.invalidateQueries({ queryKey: ["workoutTemplates-all"] });
        router.replace("/workout-templates");
      },
      onError: (error) => {
        console.error({ error });
        toast.error("Exercise creation failed");
      },
    },
  });
  return hook;
};

export const useCreateWorkoutTemplate = () => {
  const repo = useWorkoutTemplateRepo();

  const {
    workoutTemplate,
    workoutItem,
    setTitle,
    setNotes,
    setWorkoutItemNotes,
    addExercise,
    addSetToWorkoutItem,
    removeSetFromWorkoutItem,
    clearWorkout,
    
  } = useWorkoutTemplateStore();

  const finishWorkout = () => {
    if (workoutTemplate.workOutItems.length === 0) {
      toast.error("Please add at least one exercise.");
      return;
    }

    const invalid = workoutTemplate.workOutItems.some(
      (i) => i.numberOfSets === 0
    );

    if (invalid) {
      toast.error("Each exercise must have at least one set.");
      return;
    }

    const parsed = WorkoutTemplateSchema.safeParse(workoutTemplate);

    if (!parsed.success) {
      toast.error("Template is not valid");
      return;
    }

    repo.createWorkoutTemplate(parsed.data);
    toast.success("Template saved successfully");

    clearWorkout();
    router.replace("/workout");
  };

  const addExerciseFlow = (index: number) => {
    router.push(
      `/workout/search-exercise?mode=template&workoutIndex=${index}`
    );
  };

  return {
    workoutTemplate,
    workoutItem,

    setTitle,
    setNotes,
    setWorkoutItemNotes,

    addSetToWorkoutItem,
    removeSetFromWorkoutItem,

    addExercise,
    addExerciseFlow,

    finishWorkout,
    clearWorkout,
  };
};

export const useGetAllWorkoutTemplates = () => {
  const workoutTemplateRepo = useWorkoutTemplateRepo();

  return {
    data: workoutTemplateRepo.getAllWorkoutTemplates(),
    isLoading: false,
    error: null,
  };
};

export const useGetWorkoutTemplateById = (id?: string) => {
  const workoutTemplateRepo = useWorkoutTemplateRepo();
  return {
    data: id ? workoutTemplateRepo.getWorkoutTemplateById(id) : null,
    isLoading: false,
    error: null,
    refetch: () => {},
  };
};

export type useCreateWorkoutTemplateReturnType = ReturnType<
  typeof useCreateWorkoutTemplate
>;
export type useGetWorkoutTemplateByIdReturnType = ReturnType<
  typeof useGetWorkoutTemplateById
>;
