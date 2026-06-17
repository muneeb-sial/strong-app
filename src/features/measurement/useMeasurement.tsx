import { useFormMutation } from "@/shared/hook/useFormMutationHook";
import { toast } from "sonner-native";
import {
  createMeasurementInstance,
  getMeasurementByBodyPart,
} from "./measurement.service";
import { MeasurementZodSchema } from "./measurement.schema";
import { getAllMeasurement } from "./measurement.service";
import { BodyPartEnum, MeasurementsType } from "@/db/schema.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateMeasurement = ({
  debugMode = false,
}: {
  debugMode?: boolean;
}) => {
  const queryClient = useQueryClient();
  const hook = useFormMutation({
    mutationFn: createMeasurementInstance,
    schema: MeasurementZodSchema,
    mutationKey: ["createMeasurement"],
    debugMode,
    mutationOptions: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["measurements-bodyPart"] });
        toast.success("Measurement created successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Error creating measurement");
      },
    },
  });
  return hook;
};

export const useGetAllMeasurement = () => {
  const { data, isLoading, error } = useQuery<MeasurementsType[]>({
    queryKey: ["measurements-all"],
    queryFn: getAllMeasurement,
  });
  return { data, isLoading, error };
};

export const useGetMeasurementByBodyPart = (bodyPart: BodyPartEnum) => {
  const { data, isLoading, error, refetch } = useQuery<MeasurementsType[]>({
    queryKey: ["measurements-bodyPart", bodyPart],
    queryFn: () => getMeasurementByBodyPart(bodyPart),
    enabled: !!bodyPart,
  });
  return { data, isLoading, error, refetch };
};
