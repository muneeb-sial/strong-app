import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect } from "react";
import { WorkOutItemTemplateSchemaType } from "../workout.schema";
import { useGetExerciseById } from "@/features/exercise/useExercise";
import { AntDesign } from "@expo/vector-icons";
import { useCreateWorkoutTemplateReturnType } from "../useWorkoutTemplate";
import { toast } from "sonner-native";

interface TemplateWorkoutItemProps {
  workoutItem: WorkOutItemTemplateSchemaType;
  workoutIndex: number;
  hook: useCreateWorkoutTemplateReturnType;
}

const TemplateWorkoutItem = ({
  workoutItem,
  workoutIndex,
  hook,
}: TemplateWorkoutItemProps) => {
  const { data, refetch } = useGetExerciseById(workoutItem.exerciseId);

  useEffect(() => {
    refetch();
  }, [workoutItem.exerciseId]);

  const handleAddSet = () => {
    toast.success("Set added");
    hook.addSetToWorkoutItem(workoutIndex);
  };

  const handleRemoveSet = () => {
    toast.success("Set removed");
    hook.removeSetFromWorkoutItem(workoutIndex);
  };

  return (
    <View className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      {/* Exercise Name Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold">{data?.name || "Exercise"}</Text>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="close" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>

      {/* Sets Count Display */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-gray-600">Number of Sets</Text>
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => {
              if (workoutItem.numberOfSets > 1) {
                handleRemoveSet();
              }
            }}
            className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
          >
            <AntDesign name="minus" size={16} color="#374151" />
          </Pressable>

          <Text className="text-xl font-semibold min-w-[40px] text-center">
            {workoutItem.numberOfSets}
          </Text>

          <Pressable
            onPress={handleAddSet}
            className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center"
          >
            <AntDesign name="plus" size={16} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Sets List (Simple Display) */}
      <View className="flex-row flex-wrap gap-2">
        {Array.from({ length: workoutItem.numberOfSets }).map((_, index) => (
          <View
            key={index}
            className="bg-blue-100 px-3 py-1 rounded-full"
          >
            <Text className="text-blue-700 text-sm font-medium">
              Set {index + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TemplateWorkoutItem;
