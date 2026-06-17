import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetWorkoutTemplateById } from "../useWorkoutTemplate";
import { useGetExerciseById } from "@/features/exercise/useExercise";
import { Button, ButtonText } from "@/components/ui/button";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { WorkOutItemTemplateType } from "@/db/schema.type";
import { router } from "expo-router";
import { normalizeBodyPart } from "@/shared/utils";

interface ExerciseItemProps {
  workoutItem: WorkOutItemTemplateType;
}

const ExerciseItem = ({ workoutItem }: ExerciseItemProps) => {
  const { data: exercise } = useGetExerciseById(
    typeof workoutItem.exercise === "string"
      ? workoutItem.exercise
      : workoutItem.exercise._id || "",
  );

  const muscleGroup =
    exercise?.majorMuscleHit || exercise?.musclesTargeting?.[0] || "";

  return (
    <View className="flex-row items-center py-3 w-full">
      {/* Exercise Icon */}
      <View className="w-10 h-10 justify-center items-center mr-3">
        {exercise?.imageUrl ? (
          <Image
            source={{ uri: exercise.imageUrl }}
            className="w-8 h-8 rounded"
            resizeMode="contain"
          />
        ) : (
          <Ionicons name="fitness-outline" size={24} color="#9CA3AF" />
        )}
      </View>

      {/* Exercise Info */}
      <View className="flex-1">
        <Text className="text-primary-foreground font-semibold text-base">
          {workoutItem.numberOfSets} × {exercise?.name || "Exercise"}
        </Text>
        <Text className="text-gray-400 text-sm">{normalizeBodyPart(muscleGroup)}</Text>
      </View>
    </View>
  );
};

interface TemplateDetailScreenProps {
  id: string;
}

const TemplateDetailScreen = ({ id }: TemplateDetailScreenProps) => {
  const { data: template } = useGetWorkoutTemplateById(id);

  const handleStartWorkout = () => {
    if (!template?._id) return;
    router.push(`/workout/create?templateId=${template._id}`);
  };

  // Format date - show last performed or created date
  const formatDate = (date: Date | undefined) => {
    if (!date) return "Never";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView className="w-full h-full bg-primary flex justify-between flex-col p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View className="mb-2">
          <Text className="text-primary-foreground text-3xl font-semibold">
            {template?.title || "New template"}
          </Text>
          <Text className="text-gray-400 text-base mt-1">
            Last performed:{" "}
            {formatDate(template?.updatedAt || template?.createdAt)}
          </Text>
        </View>

        {/* Exercises List */}
        <View className="mt-4">
          {template?.workOutItems?.map((item, index) => (
            <ExerciseItem key={item._id || index} workoutItem={item} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <Button onPress={handleStartWorkout} className="bg-black rounded-lg">
        <ButtonText className="text-white font-semibold text-base tracking-wide">
          START WORKOUT
        </ButtonText>
      </Button>
    </SafeAreaView>
  );
};

export default TemplateDetailScreen;
