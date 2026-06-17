import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { WorkoutTemplateCard } from "./workout-template-card";
import { useRouter } from "expo-router";
import { WorkOutTemplateType } from "@/src/db/schema.type";

type Props = {
  title: string;
  templates: WorkOutTemplateType[];
};

export const WorkoutTemplates = ({ title, templates }: Props) => {
  const router = useRouter();

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-primary-foreground text-lg font-semibold">
          {title} ({templates.length})
        </Text>

        <TouchableOpacity onPress={() => router.push("/workout/template/create")}>
          <Text className="text-primary-foreground text-3xl">+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={templates}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        scrollEnabled={false}
        renderItem={({ item }) => <WorkoutTemplateCard item={item} />}
      />
    </View>
  );
};