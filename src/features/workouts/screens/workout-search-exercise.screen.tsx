import { View, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetAllExercise } from "@/features/exercise/useExercise";
import { WorkoutExerciseItem } from "@/features/workouts/components/WorkoutExerciseItem";

const WorkoutSearchExerciseScreen = () => {
  const { data, isLoading } = useGetAllExercise();
  if (isLoading) return <ActivityIndicator />;
  const { workoutIndex, mode } = useLocalSearchParams<{ workoutIndex: string; mode?: "workout" | "template" }>();
  return (
    <View>
      {data && (
        <FlatList
          data={data || []}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <WorkoutExerciseItem 
              workoutIndex={workoutIndex} 
              exercise={item} 
              mode={mode || "workout"}
            />
          )}
        />
      )}
    </View>
  );
};

export default WorkoutSearchExerciseScreen;
