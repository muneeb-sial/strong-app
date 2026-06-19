import { ExerciseZodSchema } from "./exercise.schema";
import { toast } from "sonner-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useFormMutation } from "@/src/shared/hook/useFormMutationHook";

export const useCreateExercise = (props: { debugMode?: boolean }) => {
  const { createExerciseInstance } = useExerciseRepo();
  const queryClient = useQueryClient();
  const hook = useFormMutation({
    mutationFn: createExerciseInstance,
    schema: ExerciseZodSchema,
    mutationKey: ["createExercise"],
    debugMode: props.debugMode,
    mutationOptions: {
      onSuccess: () => {
        toast.success("Exercise created successfully");
        queryClient.invalidateQueries({ queryKey: ["exercises-all"] });
        router.replace("/exercises");
      },
      onError: (error) => {
        console.error({ error });
        toast.error("Exercise creation failed");
      },
    },
  });
  return hook;
};

export const useGetAllExercise = () => {
  const { getAllExercises } = useExerciseRepo();
  const { data, isLoading, error } = useQuery<ExerciseType[]>({
    queryKey: ["exercises-all"],
    queryFn: getAllExercises,
  });
  return { data, isLoading, error };
};

export const useGetExerciseById = (id: string) => {
  const { getExerciseById } = useExerciseRepo();
  return { data:getExerciseById(id), isLoading: false, error: null, refetch: () => {} };
};

export const useSearchExercises = (searchQuery: string) => {
  const { searchExercises } = useExerciseRepo();
  const { data, isLoading, error } = useQuery<ExerciseType[]>({
    queryKey: ["exercises-search", searchQuery],
    queryFn: () => searchExercises(searchQuery),
    enabled: true,
  });
  return { data, isLoading, error };
};
