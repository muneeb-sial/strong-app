import { View, ScrollView, Text } from "react-native";
import React, { useMemo } from "react";
import { useGetAllWorkouts } from "@/features/workouts/useWorkout";
import { HistoryItem } from "../components/history-item";
import NoHistoryScreen from "./no-history.screen";
import { WorkOutType } from "@/db/schema.type";

interface GroupedWorkouts {
  month: string;
  workoutCount: number;
  workouts: WorkOutType[];
}

const formatMonthHeader = (date: Date): string => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
};

const groupWorkoutsByMonth = (workouts: WorkOutType[]): GroupedWorkouts[] => {
  const sorted = [...workouts].sort((a, b) => {
    const dateA = a.finishedAt || a.createdAt;
    const dateB = b.finishedAt || b.createdAt;
    return dateB.getTime() - dateA.getTime();
  });

  const groups: Record<string, WorkOutType[]> = {};
  sorted.forEach((workout) => {
    const date = workout.finishedAt || workout.createdAt;
    const key = formatMonthHeader(date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(workout);
  });

  return Object.entries(groups).map(([month, workouts]) => ({
    month,
    workoutCount: workouts.length,
    workouts,
  }));
};

const AllHistoryScreen = () => {
  const { data } = useGetAllWorkouts();

  const groupedWorkouts = useMemo(() => {
    if (!data) return [];
    return groupWorkoutsByMonth(data);
  }, [data]);

  if (!data || data.length === 0) {
    return <NoHistoryScreen />;
  }

  return (
    <View className="flex-1">
      <ScrollView className="px-4 pt-2">
        {groupedWorkouts.map((group) => (
          <View key={group.month} className="mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-semibold">
                {group.month}
              </Text>
              <Text className="text-sm">
                {group.workoutCount} workout{group.workoutCount !== 1 ? "s" : ""}
              </Text>
            </View>
            {group.workouts.map((workout) => (
              <HistoryItem key={workout._id} {...workout} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllHistoryScreen;
