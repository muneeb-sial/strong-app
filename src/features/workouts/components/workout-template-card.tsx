import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { WorkOutTemplateType } from "@/db/schema.type";
import { useRouter } from "expo-router";

export const WorkoutTemplateCard = ({
  item,
}: {
  item: WorkOutTemplateType;
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="flex-1 bg-primary p-4 rounded-xl"
      onPress={() => router.push(`/workout/template/${item._id}`)}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-primary-foreground font-semibold">
          {item.title}
        </Text>
        <Text className="text-gray-400">⋯</Text>
      </View>

      {item.workOutItems && item.workOutItems.slice(0, 3).map((e) => (
        <Text key={e._id} numberOfLines={3} className="text-gray-400 text-sm mb-3">
          {e.exercise.name?.slice(0, 10)} x {e.numberOfSets} sets
        </Text>
      ))}

      <Text className="text-gray-500 text-xs">
        {item.createdAt?.toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
};
